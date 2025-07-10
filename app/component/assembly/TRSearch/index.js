import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {Colors} from '#/theme';
import {px2dp} from '#/utils';

class BaseSearch extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: '搜索页面',
    };
  };

  static defaultProps = {
    isCannEdit: true,
  };
  static propTypes = {
    onSearch: PropTypes.func,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    onScan: PropTypes.func,
    onGoback: PropTypes.func,
    onPress: PropTypes.func,
    placeholder: PropTypes.any,
    iconStyle: PropTypes.any,
    textStyle: PropTypes.any,
    containerStyle: PropTypes.any,
    style: PropTypes.any,
    showScan: PropTypes.bool, //是否展示扫一扫
    isTextInput: PropTypes.bool,
    isOnpress: PropTypes.bool,
    isCannEdit: PropTypes.bool,
    showCancel: PropTypes.bool,
    values: PropTypes.string,
    autoFocus: PropTypes.bool,
    showBack: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.values || '',
    };
  }

  /**
   * 输入框监听
   * @param text
   * @private
   */
  _onChangeText = text => {
    this.setState(
      {
        inputValue: text,
      },
      () => {
        let {onSearch} = this.props;
        onSearch && onSearch(text);
      },
    );
  };

  /**
   * 清空输入框
   * @param text
   * @private
   */
  _onClearText = text => {
    let {isCannEdit} = this.props;
    if (isCannEdit) {
      this._onChangeText('');
    }
  };

  _renderCancel() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          let {onCancel} = this.props;
          onCancel && onCancel();
        }}
        style={{marginLeft: px2dp(10)}}>
        <Text style={{color: '#1E7CE8', fontSize: Fsize.fs_17}}>取消</Text>
      </TouchableOpacity>
    );
  }

  _onSubmit() {
    let {inputValue} = this.state;
    let {onSubmit} = this.props;
    onSubmit && onSubmit(inputValue);
  }

  _renderGoBack() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.backImage, {marginRight: px2dp(10)}]}
        onPress={() => {
          let {onGoback} = this.props;
          onGoback && onGoback();
        }}>
        <Image style={[styles.backImage]} source={ImageResSrc.eamBack} />
      </TouchableOpacity>
    );
  }

  render() {
    let {
      onPress,
      placeholder,
      iconStyle,
      textStyle,
      containerStyle,
      style,
      showScan, //是否展示扫一扫
      isTextInput,
      isOnpress,
      isCannEdit,
      showCancel,
      values,
      autoFocus,
      showBack,
    } = this.props;
    let {inputValue} = this.state;
    placeholder = !_.isEmpty(placeholder) ? placeholder : '搜索';
    inputValue = values || inputValue || '';
    let url = !isTextInput
      ? ImageResSrc.scaner
      : !_.isEmpty(inputValue)
      ? ImageResSrc.eamClear
      : '';
    let searchWidth = showCancel
      ? screenWidth - px2dp(70)
      : screenWidth - px2dp(40);

    let widths =
      showBack && showCancel
        ? px2dp(256)
        : showCancel
        ? px2dp(290)
        : searchWidth;
    if (showScan) {
      return this._renderFirstPage();
    }
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          },
          style,
        ]}>
        {showBack ? this._renderGoBack() : <View />}
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.container1,
            {width: widths, height: px2dp(40), alignItems: 'center'},
          ]}
          onPress={onPress}>
          <View style={[styles.left, containerStyle || {}]}>
            <Image
              style={[styles.image, iconStyle || {}]}
              source={Imageres.icon_search}
            />
            {isTextInput && !isOnpress ? (
              <TextInput
                style={styles.text}
                ref={ref => (this.comment = ref)}
                placeholder={placeholder}
                value={inputValue}
                onChangeText={this._onChangeText}
                isCannEdit={isCannEdit}
                keyboardType={'web-search'}
                onSubmitEditing={this._onSubmit.bind(this)}
                autoFocus={autoFocus || false}
              />
            ) : (
              <Text
                style={[
                  styles.text,
                  textStyle,
                  {
                    color: _.isEqual(placeholder, '搜索')
                      ? '#888E95'
                      : '#1F1F1F',
                  },
                ]}>
                {placeholder || '搜索'}
              </Text>
            )}
          </View>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.right}
            onPress={() => {
              if (isTextInput) {
                // var comment = this.refs.comment;
                this.comment.focus();
                this._onClearText();
              } else if (showScan) {
                let {onScan} = this.props;
                onScan && onScan();
              } else if (isOnpress) {
                let {onSearch} = this.props;
                onSearch && onSearch();
              }
            }}>
            <Image style={[styles.imageRight, iconStyle]} source={url} />
          </TouchableOpacity>
        </TouchableOpacity>
        {showCancel ? this._renderCancel() : <View />}
      </View>
    );
  }

  _renderFirstPage() {
    let {
      onPress,
      placeholder,
      iconStyle,
      textStyle,
      containerStyle,
      style,
      showScan, //是否展示扫一扫
      isTextInput,
      isOnpress,
      isCannEdit,
      showCancel,
      values,
      autoFocus,
      showBack,
    } = this.props;
    let {inputValue} = this.state;
    placeholder = !_.isEmpty(placeholder) ? placeholder : '搜索';
    inputValue = values || inputValue || '';

    let url = !isTextInput
      ? ImageResSrc.scaner
      : !_.isEmpty(inputValue)
      ? ImageResSrc.eamClear
      : '';
    let searchWidth = showCancel
      ? screenWidth - px2dp(70)
      : screenWidth - px2dp(30);

    let widths =
      showBack && showCancel
        ? px2dp(256)
        : showCancel
        ? px2dp(290)
        : searchWidth;
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: px2dp(50),
          },
          style,
        ]}>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.container,
            {
              width: widths,
              borderWidth: px2dp(1.5),
              // borderColor: '#1E7CE8',
              borderColor: Colors.Orange,
              height: px2dp(43),
              alignItems: 'center',
            },
          ]}
          onPress={onPress}>
          <View style={[styles.left, containerStyle || {}]}>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                paddingLeft: px2dp(16),
                borderTopLeftRadius: px2dp(50),
                borderBottomLeftRadius: px2dp(50),
              }}
              onPress={() => {
                let {onScan} = this.props;
                onScan && onScan();
              }}>
              <Image
                style={[styles.imageLeft, iconStyle]}
                source={ImageResSrc.greenScan}
              />
            </TouchableOpacity>
            <View
              style={{
                width: px2dp(1),
                height: px2dp(20),
                backgroundColor: '#E6E6E6',
                marginLeft: px2dp(11),
              }}
            />
            <Text style={[styles.text1, textStyle, {marginLeft: px2dp(10)}]}>
              {placeholder || '搜索'}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              onPress && onPress();
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              // backgroundColor: '#3A6DEE',
              width: px2dp(66),
              height: px2dp(43),
              borderRadius: px2dp(50),
              alignItems: 'center',
            }}>
            {/* <Text style={{fontSize:Fsize.fs_15,color:"white"}}>搜索</Text> */}
            <Image
              source={ImageResSrc.searchButton}
              style={{
                height: px2dp(43),
                width: px2dp(70),
                borderRadius: px2dp(50),
              }}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  }
}

export default BaseSearch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: px2dp(50),
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F5F8FA',
    borderRadius: px2dp(50),
  },

  left: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: APPBAR_HEIGHT,
    overflow: 'hidden',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
    paddingRight: px2dp(15),
  },
  image: {
    width: px2dp(14),
    height: px2dp(14),
    marginLeft: px2dp(15),
    marginRight: px2dp(10),
  },

  backImage: {
    width: px2dp(20),
    height: px2dp(20),
  },
  imageRight: {
    width: px2dp(16),
    height: px2dp(16),
  },
  imageLeft: {
    width: px2dp(22),
    height: px2dp(22),
  },
  text: {
    marginLeft: px2dp(1),
    fontSize: 14,
    color: '#1F1F1F',
    // backgroundColor:'red'
    width: px2dp(185),
  },
  text1: {
    marginLeft: px2dp(1),
    fontSize: 14,
    color: '#888E95',
    // backgroundColor:'red'
    width: px2dp(185),
  },
  textInput: {
    flex: 1,
    padding: 0,
    fontSize: Fsize.fs_14,
    // backgroundColor:"red"
  },
});
