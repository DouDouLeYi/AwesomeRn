import React, {Component} from 'react';
import DatePicker from '../../../../app/component/datecomponent/DatePicker';
import YMDatePicker from '../../../../app/component/datecomponent/YMDatePicker';
import px2dp from '#/utils/Ratio';
import moment from 'moment';
import {Colors} from '@theme';
import Portal from '#/component/portal';
import Toast from '#/component/toast';

class DQDatePicker extends Component {
  static propTypes = {};

  static defaultProps = {
    defaultValue: [
      new Date().getFullYear() + '年',
      new Date().getMonth() + 1 + '月',
      new Date().getDate() + '日',
    ],
    format: 'yyyy-MM-DD',
    title: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      //状态机变量声明
      unit: ['年', '月', '日'],
      selectedValue: props.defaultValue,
      date: [],
    };
  }

  componentDidMount() {
    this.DatePicker && this.DatePicker.show();
  }

  formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  }

  render() {
    const {selectedValue} = this.state;
    const {
      title,
      hasDay = true,
      hasHour = false,
      hasMin = false,
      hasSecond = false,
      maxNowMessage = '',
      isMaxNow = false,
      isMinNow = false,
      minNowMessage = '',
    } = this.props;
    const TRDatePicker = hasDay ? DatePicker : YMDatePicker;
    return (
      <TRDatePicker
        ref={ref => (this.DatePicker = ref)}
        unit={this.state.unit}
        startYear={1970}
        ensureStyle={{color: Colors.Orange}}
        title={title || ''}
        endYear={2050}
        selectedValue={selectedValue}
        itemHeight={px2dp(97)}
        onPickerConfirm={value => {
          let array = value.map(m =>
            this.formatNumber(
              String(m)
                .replace(/年/g, '')
                .replace(/月/g, '')
                .replace(/日/g, '')
                .replace(/时/g, '')
                .replace(/分/g, '')
                .replace(/秒/g, ''),
            ),
          );
          let result = '';
          if (array.length <= 3) {
            result = array.join('-');
          } else if (array.length > 3) {
            result =
              array.slice(0, 3).join('-') +
              ' ' +
              array.slice(3, array.length).join(':');
          }
          let tempResult = result.replace(/\-/g, '/');
          let date = new Date(tempResult).valueOf();
          let startTime = moment(date);
          let endTime = moment(new Date().valueOf());
          // 用来判断日期是否不能大于当前日期
          if (isMaxNow && startTime.isAfter(endTime)) {
            Toast.show(maxNowMessage);
            return;
          }
          // 用来判断日期是否不能小于当前日期
          if (isMinNow) {
            let pickerShowTime = moment(new Date().valueOf() - 60000); // 大于等于当前时间可选
            if (pickerShowTime.isAfter(startTime)) {
              Toast.show(minNowMessage);
              return;
            }
          }
          this.props.onClose(result);
        }}
        onCoverPress={() => {
          this.props.onClose();
        }}
        HH={hasHour}
        mm={hasMin}
        ss={hasSecond}
        onPickerCancel={() => {
          this.props.onClose();
        }}
      />
    );
  }

  componentWillUnmount(): void {
    this.props.onClose();
    this.DatePicker && this.DatePicker.dismiss();
  }
}

class DatePickerComponent {
  __PortalKey__: string = '';
  show = (props): Promise => {
    if (this.__PortalKey__ !== '') {
      this.__PortalKey__ = Portal.removePortal(this.__PortalKey__);
    }
    return new Promise((resolve, reject) => {
      const {
        id,
        title,
        label,
        formData,
        defaultValue,
        hasDay = true,
        hasHour = false,
        hasMin = false,
        hasSecond = false,
        isMaxNow = false,
        maxNowMessage = '',
        isMinNow = false,
        minNowMessage = '',
      } = props;
      let dateStr = formData[id] || '';
      if (this.__PortalKey__ === '') {
        this.__PortalKey__ = Portal.createPortal(
          <DQDatePicker
            dateStr={dateStr}
            title={title}
            defaultValue={defaultValue}
            hasHour={hasHour}
            hasDay={hasDay}
            hasMin={hasMin}
            hasSecond={hasSecond}
            isMaxNow={isMaxNow}
            maxNowMessage={maxNowMessage}
            isMinNow={isMinNow}
            minNowMessage={minNowMessage}
            onClose={date => {
              this.__PortalKey__ = Portal.removePortal(this.__PortalKey__);
              if (date !== undefined) {
                let obj = {};
                obj[`${id}`] = date;
                resolve({index: 1, data: {...obj}});
              } else {
                resolve({index: 0});
              }
            }}
          />,
          this.dismiss,
        );
      }
    });
  };

  dismiss = (): void => {
    if (this.__PortalKey__.length > 0) {
      this.__PortalKey__ = Portal.removePortal(this.__PortalKey__);
    }
  };
}

const dateModal = new DatePickerComponent();
export default dateModal;
