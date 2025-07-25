import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import _ from 'lodash';
import BaseComponent from '../BaseComponent';
import {mTheme} from '@theme';
import {FORM_STATE} from '../helper';
import dateModal from './dateModal';
import moment from 'moment';
import {objectOmit, px2dp, showDefaultValue} from '@utils';
import {isTRNumber} from '@utils/attribute';
import Toast from '#/component/toast';

const DEFAULT_VALUE_TYPE = {
  currentDayEnd: new Date(
    new Date(new Date().toLocaleDateString()).getTime() +
      24 * 60 * 60 * 1000 -
      1,
  ),
};

class TRDateSelect extends BaseComponent {
  static defaultProps = {
    format: 'yyyy-MM-DD',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {
      id,
      formData = {},
      onChange,
      defaultValuePlus,
      defaultValueType,
    } = this.props;
    if (!formData[id]) {
      if (defaultValuePlus) {
        let time = new Date().getTime() + 60 * 1000 * defaultValuePlus;
        formData[id] = time;
        onChange && onChange(objectOmit(formData));
      } else if (defaultValueType) {
        let time = DEFAULT_VALUE_TYPE[defaultValueType] || 0;
        formData[id] = time;
        onChange && onChange(objectOmit(formData));
      }
    }
  }

  componentWillUnmount() {
    dateModal.dismiss();
  }

  async _onChoosePress() {
    const {
      title,
      id,
      formData,
      onChange,
      formErrorMsg,
      format = 'YYYY-MM-DD',
      isMaxNow = false,
      maxNowMessage = '',
      isMinNow = false,
      minNowMessage = '',
      omitList = [],
      rules1 = [],
      isInit = false,
      isMust = [],
    } = this.props;
    let message = '';
    _.forEach(isMust, item => {
      if (isTRNumber(formData[item.key]) && formData[item.key] > 0) {
        formData[item.key] = moment(parseInt(formData[item.key])).format(
          format,
        );
      }
      if (_.isEmpty(formData[item.key])) {
        message = item.message;
        return false;
      }
    });
    if (message) {
      Toast.show(message);
      return;
    }
    let selectTime = formData[id] ? moment(formData[id]) : moment();
    let hasDay = format.toLocaleLowerCase().indexOf('dd') !== -1;
    let selectArray = [
      `${selectTime.year()}年`,
      `${selectTime.month() + 1}月`,
      `${selectTime.date()}日`,
    ];

    let hasHour = format.toLocaleLowerCase().indexOf('hh') !== -1;
    let hasMin =
      format.toLocaleLowerCase().replace('mm', '').indexOf('mm') !== -1;
    let hasSecond = format.toLocaleLowerCase().indexOf('ss') !== -1;
    hasHour && selectArray.push(selectTime.hour() + '时');
    hasMin && selectArray.push(selectTime.minute() + '分');
    hasSecond && selectArray.push(selectTime.second() + '秒');
    let res = await dateModal.show({
      title: title,
      ...this.props,
      isMaxNow: isMaxNow,
      maxNowMessage: maxNowMessage,
      isMinNow: isMinNow,
      minNowMessage: minNowMessage,
      hasDay: hasDay,
      hasHour,
      hasMin,
      hasSecond,
      defaultValue: [...selectArray],
    });
    if (res.index === 1) {
      let newFormData = {...formData, ...res.data};
      let errObj = {...formErrorMsg};
      errObj[id] = '';
      omitList.map((frontItem, index) => {
        delete newFormData[frontItem];
      });
      rules1.map((item, index) => {
        let values = item.value || {};
        let tempStrIds = values.strIds || [];
        let tempMessage = '';
        tempStrIds.map((itemStr, index) => {
          let tempStr = itemStr.isDate
            ? moment(newFormData[itemStr.key]).format(
                itemStr.format || 'YYYY-MM-DD HH:mm:ss',
              )
            : newFormData[itemStr.key] || '';
          tempMessage += tempStr + ' ';
        });

        let tempOtherValue = values.otherValue || {};
        let tempKey = newFormData[tempOtherValue.key || ''];
        let tempValues = tempOtherValue.value || {};
        let tempValue1 = tempValues[tempKey] || '';
        tempMessage += tempValue1 || '';
        newFormData[item.key] = tempMessage;
        errObj[item.key] = '';
      });
      onChange(newFormData, errObj);
    }
  }

  clearContent() {
    const {id, formData, onChange, clearDefaultStringValue} = this.props;
    let newFormData = {...formData};
    if (clearDefaultStringValue) {
      newFormData[id] = '';
    } else {
      delete newFormData[id];
    }
    onChange && onChange(newFormData);
  }

  _renderContent() {
    const {
      id,
      readonly,
      formData,
      formState = FORM_STATE.READ,
      placeholder = '请选择内容',
      format,
    } = this.props;
    let text = '';
    if (formData[id]) {
      let n = moment(formData[id]);
      if (n.isValid()) {
        text = n.format(format);
      }
    }
    const isPlaceholder = formState !== FORM_STATE.READ && text.length === 0;
    if (isPlaceholder) {
      text = placeholder;
    }

    return (
      <TouchableOpacity
        style={[mTheme.container, mTheme.flex_row]}
        disabled={readonly}
        activeOpacity={0.9}
        onPress={
          formState !== FORM_STATE.READ && this._onChoosePress.bind(this)
        }>
        <Text
          style={[
            mTheme.container,
            mTheme.font_from_title,
            styles.lab,
            isPlaceholder ? mTheme.placeholderStyle : {},
          ]}>
          {showDefaultValue(text)}
        </Text>
        {isPlaceholder
          ? this._onArrowRender()
          : this._onClearRender(() => {
              this.clearContent();
            })}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  lab: {marginTop: px2dp(6)},
});

export default TRDateSelect;
