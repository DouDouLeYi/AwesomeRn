import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BaseComponent from '../BaseComponent';
import {Fontsize, mTheme} from '@theme';
import selectModal from './selectModal';
import {listToString, showDefaultValue} from '@utils';
import px2dp from '@utils/px2dp';
import moment from 'moment';
import {screenW} from '#/utils/ScreenUtil';

class TRSelect extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    selectModal.dismiss();
  }

  async _onChoosePress() {
    const {
      label,
      id,
      formData,
      onChange,
      formErrorMsg = {},
      rules1 = [],
      checkPeriod = false,
      isAutoCalc = false,
      autoCalcId = [],
      autoCalcResultId = '',
    } = this.props;
    //region selectModal 选择modal
    let res = await selectModal.show({title: label, ...this.props});
    if (res && res.index === 1) {
      let newFormData = {...formData, ...res.data};
      let obj = {...formErrorMsg};
      obj[id] = '';
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
          // tempMessage += tempStr + ' ';
          tempMessage = index == 0 ? tempStr : tempMessage + ' ' + tempStr;
        });

        let tempOtherValue = values.otherValue || {};
        let tempKey = newFormData[tempOtherValue.key || ''];
        let tempValues = tempOtherValue.value || {};
        let tempValue1 = tempValues[tempKey];
        // tempMessage += tempValue1 || '';
        tempMessage = tempValue1 ? tempMessage + tempValue1 : tempMessage;
        obj[item.key] = '';
        newFormData[item.key] = tempMessage;
      });
      if (checkPeriod) {
        newFormData = onBindOtherId(newFormData, this.props);
      }
      if (isAutoCalc) {
        let result = 0;
        autoCalcId.map(key => {
          result += Number(newFormData[key] || 0);
        });
        newFormData[autoCalcResultId] = result;
      }
      onChange(newFormData, obj);
    }
  }

  _clearContent() {
    const {formData = {}, id, onChange} = this.props;
    let newFormData = {...formData};
    newFormData[id] = [];
    newFormData[`${id}_desc`] = [];
    onChange(newFormData);
  }

  onRestTag(bg, textColor, text) {
    return (
      <View style={[styles.tag, {backgroundColor: bg}]}>
        <Text style={[styles.tag_text, {color: textColor}]}>{`${text}`}</Text>
      </View>
    );
  }

  _renderContent() {
    const {
      id,
      readonly,
      formData = {},
      formState = FORM_STATE.READ,
      clearAble = false,
      placeholder = '请选择内容',
      separator = '/',
      showTag = false,
      tags = '',
      noArrow = false,
      showLength = false,
    } = this.props;

    let tagsValue = showTag ? formData[tags] || '' : {};
    let tempTag = tagsValue[0] || {};
    let tagLabel = tagsValue.label || tempTag.label || '';
    let text = listToString(
      formData[`${id}_desc`] || formData[`${id}_DESC`] || formData[id],
      separator,
    );
    if (showLength) {
      text = formData[id]?.length || 0;
    }
    const isPlaceholder =
      formState !== 'readonly' &&
      (text?.length === 0 || (showLength && text === 0));
    if (isPlaceholder) {
      text = placeholder;
    }
    return (
      <TouchableOpacity
        style={[mTheme.container, mTheme.flex_row]}
        disabled={readonly}
        activeOpacity={0.9}
        onPress={() => {
          formState !== 'readonly' && this._onChoosePress();
        }}>
        <View style={[mTheme.container, styles.lab, mTheme.flex_row]}>
          <Text
            style={[
              mTheme.font_from_title,
              isPlaceholder ? mTheme.placeholderStyle : {},
              {marginRight: px2dp(6), maxWidth: screenW - px2dp(140)},
            ]}>
            {showDefaultValue(text)}
          </Text>
          {showTag && tagLabel
            ? this.onRestTag(
                tagsValue.bgColor ||
                  tempTag.bgColor ||
                  'rgba(136, 142, 149, 0.1)',
                tagsValue.color || tempTag.color || '#888E95',
                tagsValue.label || tempTag.label || formData.asset_test,
              )
            : null}
        </View>
        {clearAble && text !== placeholder
          ? this._onClearRender(this._clearContent.bind(this))
          : !noArrow
          ? this._onArrowRender()
          : null}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  lab: {marginTop: px2dp(6)},
  tag: {
    borderRadius: px2dp(2),
    marginRight: px2dp(6),
    height: px2dp(18),
    paddingHorizontal: px2dp(6),
  },
  tag_text: {
    fontSize: Fontsize.fs_10,
    lineHeight: px2dp(18),
    fontWeight: 'bold',
  },
});

export default TRSelect;
