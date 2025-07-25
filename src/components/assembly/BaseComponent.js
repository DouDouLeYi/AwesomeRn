import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Fontsize, mTheme} from '@theme';
import px2dp from '@utils/px2dp';
import {isEmpty} from 'lodash';
import {ImageRes} from '@assets';

class BaseComponent extends Component {
  static defaultProps = {
    label: '', //显示title
    style: {}, //外部传入主组件样式用
    arrow: {}, //外部传入是否显示组件右上角按钮用
    formData: {}, //表单数据
    onChange: () => {},
    layoutId: '43',
    isNoShow: false,
    intervalNum: 0, //组件间隔
    isBorder: false,
    isLast: false, //是否是最后一个元素
    isArrow: false,
    formState: '', //表单状态
  };
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  componentWillUnmount(): void {}

  _onArrowRender() {
    return (
      <Image
        resizeMode={'contain'}
        style={styles.arrow_image}
        source={ImageRes.from_arrow}
      />
    );
  }

  _onClearRender(callBack) {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={callBack && callBack}>
        <Image
          resizeMode={'contain'}
          style={styles.clear_image}
          source={ImageRes.eamClear}
        />
      </TouchableOpacity>
    );
  }

  _renderContent() {}

  _renderError() {
    const {id, formErrorMsg} = this.props;
    if (formErrorMsg?.[id]) {
      return (
        <View
          style={[
            styles.content,
            mTheme.flex_row,
            mTheme.from_padding_horizontal,
            styles.error,
          ]}>
          <Text style={{color: '#ff4d4f'}}>{formErrorMsg?.[id] || ''}</Text>
        </View>
      );
    }
    return null;
  }

  _onRenderCopy() {}

  _onRenderStatus() {
    const {showStatusObj, formData} = this.props;
    if (!isEmpty(showStatusObj)) {
      const {valueKey, colorObj} = showStatusObj;
      const currentObj = colorObj[formData[valueKey]] ?? false;
      return (
        currentObj && (
          <View style={[styles.statusWrap, {backgroundColor: currentObj.bg}]}>
            <Text style={[styles.textIn, {color: currentObj.color}]}>
              {currentObj.text}
            </Text>
          </View>
        )
      );
    }
  }

  render() {
    const {
      label,
      appendValue = '',
      isLast,
      display,
      rules = [],
      formState = 'readOnly',
      intervalNum,
      showRequired = false,
      mustShowBorder = false,
      notShowStyle,
    } = this.props;
    let isBorder = this.props.isBorder; //是否显示底边距
    if (isBorder && isLast) {
      isBorder = false;
    }
    if (mustShowBorder) {
      isBorder = true;
    }
    const isEidte = formState !== 'readOnly';
    let isRequired = true;
    //兼容表单
    return (
      <View
        style={[this.props.style, styles.main, {marginTop: px2dp(intervalNum)}]}
        ref={ref => (this._input = ref)}>
        <View
          style={[
            styles.header,
            mTheme.flex_row,
            mTheme.flex_row_center,
            mTheme.from_padding_horizontal,
            styles.title_dx,
            {alignItems: 'flex-start'},
          ]}>
          {isRequired || showRequired ? (
            <Text style={styles.required}>*</Text>
          ) : null}
          <View
            style={[
              mTheme.flex_row,
              mTheme.flex_row_center,
              {flex: 1, minHeight: px2dp(25)},
            ]}>
            <Text
              style={[
                mTheme.font_from_title,
                formState === 'readonly' ? styles.title_style : {},
              ]}>
              {label}
              <Text style={[{fontSize: 13}, styles.title_style]}>
                {appendValue}
              </Text>
            </Text>
            {this._onRenderCopy()}
          </View>
          {this._onRenderStatus()}
        </View>
        <View
          style={[
            isEidte ? styles.content : {},
            mTheme.flex_row,
            mTheme.from_padding_horizontal,
          ]}>
          {this._renderContent()}
        </View>
        {this._renderError()}
        {isBorder ? (
          <View
            style={[
              mTheme.borer_bottom,
              {marginHorizontal: px2dp(15), marginTop: px2dp(5)},
            ]}
          />
        ) : null}
        {isLast ? <View style={styles.bottom_space} /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {},
  container: {minHeight: px2dp(75)},
  title_dx: {paddingTop: px2dp(6)},
  header: {minHeight: px2dp(25), marginTop: px2dp(5)},
  content: {paddingBottom: px2dp(6)},
  error: {fontSize: Fontsize.fs_13},
  title_style: {color: '#888E95'},
  arrow_button: {height: px2dp(25), borderRadius: px2dp(2)},
  arrow_button_content: {
    borderWidth: px2dp(0.5),
    borderStyle: 'solid',
    borderColor: Colors.Orange,
    borderRadius: px2dp(2),
    paddingHorizontal: px2dp(6),
    paddingVertical: px2dp(1),
  },
  required: {
    color: '#EC5A5C',
    fontSize: Fontsize.fs_14,
    lineHeight: px2dp(24),
    marginRight: 8,
    marginLeft: -15,
  },
  arrow_button_text: {
    color: Colors.Orange,
    fontSize: Fontsize.fs_13,
    minWidth: px2dp(78),
    textAlign: 'center',
  },
  bottom_space: {height: px2dp(6)},
  arrow_image: {
    height: px2dp(8),
    width: px2dp(8),
    marginLeft: px2dp(10),
    marginTop: px2dp(8),
  },
  clear_image: {
    height: px2dp(12),
    width: px2dp(12),
    marginLeft: px2dp(10),
    marginTop: px2dp(6),
  },
  copyText: {
    fontSize: Fontsize.fs_12,
    color: Colors.Blue,
    borderRadius: px2dp(3),
    marginLeft: px2dp(10),
    paddingVertical: px2dp(1),
    paddingHorizontal: px2dp(2),
    borderColor: Colors.Blue,
    borderWidth: px2dp(0.5),
    borderStyle: 'solid',
  },
  statusWrap: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: px2dp(8),
    height: px2dp(24),
    borderRadius: 3,
  },
  textIn: {
    fontSize: 12,
    fontWeight: '400',
  },
});

export default BaseComponent;
