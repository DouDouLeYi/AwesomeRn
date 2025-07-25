import React, {Component} from 'react';
import DatePicker from './DatePicker';
import YMDatePicker from './YMDatePicker';
import px2dp from '../../utils/Ratio';
import Portal from '#/component/portal';

class DQDatePicker extends Component {
  static propTypes = {};

  static defaultProps = {
    selectedValue: [
      new Date().getFullYear() + '年',
      new Date().getMonth() + 1 + '月',
      new Date().getDate() + '日',
    ],
  };

  constructor(props) {
    super(props);
    this.state = {
      //状态机变量声明
      unit: ['年', '月', '日'],
      date: [],
    };
  }

  componentDidMount() {
    this.DatePicker && this.DatePicker.show();
  }

  render() {
    return (
      <DatePicker
        ref={ref => (this.DatePicker = ref)}
        unit={this.state.unit}
        startYear={1970}
        selectedValue={[
          new Date().getFullYear() + '年',
          new Date().getMonth() + 1 + '月',
          new Date().getDate() + '日',
        ]}
        itemHeight={px2dp(97)}
        onPickerConfirm={value => {
          this.props.onClose(value);
        }}
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

class DQYMDatePicker extends Component {
  static defaultProps = {
    title: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      //状态机变量声明
      unit: ['年', '月'],
      date: [],
    };
  }

  componentDidMount() {
    this.DatePicker && this.DatePicker.show();
  }

  render() {
    return (
      <YMDatePicker
        ref={ref => (this.DatePicker = ref)}
        unit={this.state.unit}
        selectedValue={this.props.dateStr}
        title={this.props.title}
        startYear={1970}
        itemHeight={px2dp(97)}
        onPickerConfirm={value => {
          this.props.onClose(value);
        }}
        onPickerCancel={value => {
          this.props.onClose();
        }}
      />
    );
  }
}

class DatePickerComponent {
  __PortalKey__: string = '';
  show = (dateStr): Promise => {
    if (this.__PortalKey__ !== '') {
      this.__PortalKey__ = Portal.removePortal(this.__PortalKey__);
    }
    return new Promise((resolve, reject) => {
      if (this.__PortalKey__ === '') {
        this.__PortalKey__ = Portal.createPortal(
          <DQDatePicker
            dateStr={dateStr}
            onClose={date => {
              this.__PortalKey__ = Portal.removePortal(this.__PortalKey__);
              resolve(date || []);
            }}
          />,
        );
      }
    });
  };
  showYearMoth = (dateStr, title): Promise => {
    if (this.__PortalKey__ !== '') {
      this.__PortalKey__ = Portal.removePortal(this.__PortalKey__);
    }
    return new Promise((resolve, reject) => {
      if (this.__PortalKey__ === '') {
        this.__PortalKey__ = Portal.createPortal(
          <DQYMDatePicker
            dateStr={dateStr}
            title={title}
            onClose={date => {
              this.__PortalKey__ = Portal.removePortal(this.__PortalKey__);
              resolve(date);
            }}
          />,
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

const datePicker = new DatePickerComponent();
export default datePicker;
