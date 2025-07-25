import React, {PureComponent} from 'react';
import {
  DeviceEventEmitter,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import px2dp from '@utils/px2dp';
import {ImageRes} from '#/assets/Assets';
import {scaleSize} from '#/utils/ScreenUtil';

export default class SearchViewBar extends PureComponent {
  static propTypes = {
    text: PropTypes.string,
    reset: PropTypes.func,
    autoFocus: PropTypes.bool,
    searchAction: PropTypes.func,
    onPressCancel: PropTypes.func,
    onPressClear: PropTypes.func,
    alwaySearch: PropTypes.bool,
    isShowClearBtn: PropTypes.bool,
  };

  static defaultProps = {
    iconStyle: {},
    text: '搜索',
    reset: () => {},
    autoFocus: true,
    searchAction: () => {},
    onPressCancel: () => {},
    onPressClear: () => {},
    containerStyle: {},
    inputStyle: {},
    textStyle: {},
    isShowClearBtn: false, // 当输入框为空的时候 是否依然搜索
    alwaySearch: false, // 当输入框为空的时候 是否依然搜索
    onContentChange: () => {}, // 当输入框里面的内容变更的时候 执行的方法
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowClearBtn: props.isShowClearBtn || false, // 是否显示清空按钮
      isChangeSearchBtnTxt: false, // 搜索按钮文本 是否从 "搜索" 变成 "取消"
      inputTxt: this.props.keywords || '', // 输入的搜索条件
      isDisabled: false, // 搜索按钮是否灰显
    };
  }

  componentWillUnmount(): void {
    this.emit && this.emit.remove();
  }

  componentDidMount(): void {
    const {id = ''} = this.props;
    this.emit = DeviceEventEmitter.addListener(
      'searchWord' + id,
      (obj = '') => {
        this.setState({
          inputTxt: obj,
          isShowClearBtn: obj.length > 0,
        });
      },
    );
  }

  render() {
    const {
      text,
      searchEditAble,
      iconStyle,
      containerStyle,
      inputStyle,
      alwaySearch,
      textStyle,
      showCancel = false,
    } = this.props;
    let edit = searchEditAble != false;
    return (
      <View style={[styles.container_bar, containerStyle]}>
        <View style={[styles.searchRow, inputStyle]}>
          <Image
            style={[styles.icon, iconStyle]}
            source={ImageRes.icon_search}
          />
          <TextInput
            style={[
              styles.searchTextInput,
              textStyle,
              edit ? {} : {color: '#888E95'},
            ]}
            underlineColorAndroid="transparent"
            ref={c => (this.textInput = c)}
            autoCapitalize="none"
            editable={edit}
            autoCorrect={false}
            placeholder={text}
            placeholderTextColor={'#b2b3b5'}
            returnKeyType="search"
            keyboardType="web-search"
            autoFocus={this.props.autoFocus}
            value={this.state.inputTxt}
            onChangeText={text => this._changeText(text)}
            onSubmitEditing={this._onSubmit.bind(this, alwaySearch)}
          />

          {this.state.isShowClearBtn ? (
            <TouchableOpacity
              style={{
                width: 34,
                height: 34,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
              onPress={this._clickClear.bind(this)}>
              <Image
                style={[styles.icon, iconStyle]}
                source={ImageRes.icon_clean}
              />
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>

        {/* {
                    this.state.isChangeSearchBtnTxt ?
                        <TouchableOpacity onPress={this._clickCancel.bind(this)}>
                            <View style={styles.cancelView}>
                                <Text style={styles.touchTxt}>
                                    取消
                                </Text>
                            </View>
                        </TouchableOpacity>
                        : <TouchableOpacity onPress={this._onSubmit.bind(this)}>
                            <View style={styles.cancelView}>
                                <Text style={[styles.touchTxt, {color: this.state.isDisabled ? '#222222' : '#b2b3b5'}]}>
                                    搜索
                                </Text>
                            </View>
                        </TouchableOpacity>
                } */}
        {showCancel ? (
          <TouchableOpacity onPress={this._clickCancel.bind(this)}>
            <View style={styles.cancelView}>
              <Text style={styles.touchTxt}>取消</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  /**
   * 输入框文本捕获
   * @param text
   * @private
   */
  _changeText(text) {
    if (!_.isEmpty(text)) {
      if (!_.isEqual(text, this.state.inputTxt)) {
        this.setState(
          {
            isShowClearBtn: true,
            inputTxt: text,
            isDisabled: true,
            isChangeSearchBtnTxt: false,
          },
          this.props.onContentChange(text),
        );
      }
    } else {
      this.setState({
        isShowClearBtn: false,
        isDisabled: false,
        isChangeSearchBtnTxt: false,
        inputTxt: '',
      });
      this.props.reset(); // 恢复初始状态
    }
  }

  /**
   * 搜索动作
   * @private
   */
  _onSubmit(alwaySearch) {
    if (this.state.isDisabled) {
      this.setState({
        isChangeSearchBtnTxt: true,
      });
      this.textInput && this.textInput.blur();
      this.props.searchAction(this.state.inputTxt);
    } else if (alwaySearch) {
      this.textInput && this.textInput.blur();
      this.props.searchAction(this.state.inputTxt);
    }
  }

  /**
   * 取消按钮
   * @private
   */
  _clickCancel() {
    this.setState({
      inputTxt: '',
      isDisabled: false,
      isShowClearBtn: false,
      isChangeSearchBtnTxt: false,
    });
    this.textInput && this.textInput.blur();
    this.props.onPressCancel();
  }

  /**
   * 清空按钮
   * @private
   */
  _clickClear() {
    this.setState({
      inputTxt: '',
      isShowClearBtn: false,
      isDisabled: false,
      isChangeSearchBtnTxt: false,
    });
    this.textInput && this.textInput.blur();
    this.props.onPressClear();
  }
}

const styles = StyleSheet.create({
  container_bar: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 7,
    paddingLeft: 12,
  },
  searchRow: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 6 : 0,
  },

  icon: {
    width: scaleSize(16),
    height: scaleSize(16),
  },

  searchTextInput: {
    flex: 1,
    textAlignVertical: 'center',
    fontSize: 14,
    color: '#222222',
    paddingVertical: 0,
    marginLeft: 10,
  },
  cancelView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: px2dp(8),
  },

  touchTxt: {
    fontSize: 15,
    color: '#1E7CE8',
  },
});
