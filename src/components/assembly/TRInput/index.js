import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import BaseComponent from '../BaseComponent';
import {Colors, Fontsize, mTheme} from '@theme';
import {ImageRes, isAndroid} from '#/assets/Assets';
import {screenW} from '#/utils/ScreenUtil';
import {px2dp} from '#/utils';

class TRInput extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowIcon: false,
    };
  }

  componentDidMount(): void {}

  _onChange(str) {
    console.log(str);
    const {formErrorMsg, formData, onChange, id} = this.props;
    let errObj = {...formErrorMsg};
    errObj[id] = '';
    const newFormData = {...formData, [id]: str};
    console.log(newFormData);
    onChange(newFormData, errObj);
  }

  /**
   * 右侧按钮点击事件 清空输入框的内容
   * @private
   */
  _onClickIcon = () => {
    const {id, onChange, formData, formErrorMsg = {}} = this.props;
    let newFormData = {...formData};
    newFormData[id] = '';
    let errObj = {...formErrorMsg};
    errObj[id] = '';
    this.setState({
      isShowIcon: false,
    });
    onChange(newFormData, errObj);
  };

  _renderContent() {
    //showClear 是用来判断是否展示右面的删除按钮
    const {
      id,
      label,
      placeholder,
      isArea = false,
      formData = {},
      formState,
      keyboardType = 'default',
      multiline = false,
      maxLength = 50,
      childText = '',
      showClear = false,
    } = this.props;
    let style = {};
    let isMultLine = multiline;
    let {isShowIcon} = this.state;
    let value = '';
    if (Number(maxLength) > 50) {
      style = {
        textAlignVertical: 'top',
      };
      isMultLine = true;
    }
    let obj = {};
    if (!isMultLine) {
      obj.returnKeyType = 'done';
    } else {
      if (isAndroid) {
        obj.returnKeyLabel = '换行';
      }
    }
    value = (formData[id] || '').toString();
    console.log('value', this.props);
    return (
      <View style={[mTheme.container, mTheme.flex_column]}>
        <View
          style={{
            width: screenW,
            height: px2dp(6),
          }}
        />
        <View style={styles.contentView}>
          <TextInput
            maxLength={Number(maxLength)}
            multiline={isMultLine}
            keyboardType={keyboardType}
            {...obj}
            editable={formState !== 'readonly'}
            style={[styles.input, isArea ? styles.textArea : {}, style]}
            underlineColorAndroid="transparent"
            placeholderTextColor={Colors.placeholderTextColor}
            placeholder={placeholder || `请输入${label}` || '请输入内容'}
            onChangeText={this._onChange.bind(this)}
            value={value}
          />
          {showClear && isShowIcon ? (
            <TouchableOpacity
              style={styles.touch}
              activeOpacity={1}
              onPress={this._onClickIcon.bind(this)}>
              <Image style={styles.image} source={ImageRes.icon_clean} />
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    fontSize: Fontsize.fs_13,
    color: Colors.textColor,
    textAlignVertical: 'top',
  },
  textArea: {height: px2dp(60)},
  touch: {
    paddingVertical: px2dp(5),
    paddingLeft: px2dp(15),
  },
  image: {
    flexDirection: 'row',
    width: px2dp(18),
    height: px2dp(18),
    resizeMode: 'cover',
  },
});

export default TRInput;
