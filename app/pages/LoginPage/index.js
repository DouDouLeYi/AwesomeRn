import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {screenH, screenW} from '../../utils/ScreenUtil';
import {isIphonex, px2dp} from '../../utils';
import {Colors, Fsize, ImageRes} from '../../assets/Assets';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LargeButton from '../../component/button/LargeButton';
import _ from 'lodash';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //状态机变量声明
      account: '', // 账户
      password: '', // 密码
      isChecked: false, // 是否记住密码
      isShowIcon: false,
      secureTextEntry: true,
      isKeyboard: false,
      userId: '', // 用户id
      errorMsg: '', // 错误提示
      isShowEyeIcon: false, // 是否显示小眼睛
      isAccountTextInputEmpty: false, // 账号输入框是否为空
      isPwdTextInputEmpty: false, // 密码输入框是否为空
      companynum: 'goldwind',
    };
  }

  async componentDidMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow,
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide,
    );
  }

  keyboardWillShow = event => {
    this.setState({isKeyboard: true});
  };

  keyboardWillHide = event => {
    this.setState({isKeyboard: false});
  };

  /**
   * 头部
   * @returns {*}
   * @private
   */
  _renderHeader() {
    return (
      <ImageBackground
        style={{
          width: screenW,
          height: px2dp(400),
          resizeMode: 'contain',
        }}>
        <Image
          source={ImageRes.login_logo}
          style={{
            width: px2dp(144),
            height: px2dp(144),
            marginTop: px2dp(isIphonex ? 200 : 136),
            marginLeft: px2dp(80),
          }}
        />
        <Text
          style={{
            fontSize: Fsize.fs_30,
            color: Colors.c_gray_5,
            marginLeft: px2dp(80),
            marginTop: px2dp(48),
          }}>
          欢迎登录
        </Text>
      </ImageBackground>
    );
  }

  /**
   * 账户输入框
   * @returns {*}
   * @private
   */
  _renderAccountInputView() {
    return (
      <View
        style={{
          marginHorizontal: px2dp(80),
          marginTop: px2dp(isIphonex ? 132 : 112),
        }}>
        <Text style={styles.title}>{`账号`}</Text>
        <View style={styles.contentView}>
          <TextInput
            ref={ref => (this.accountInput = ref)}
            style={styles.textInput}
            placeholder={'请输入用户名'}
            placeholderTextColor={Colors.c_gray_3}
            value={this.state.account}
            onChangeText={this._onChangeTextAccount}
            autoCorrect={false}
            autoCapitalize={'none'}
            clearButtonMode={'never'}
            keyboardType={'default'}
            returnKeyType={'done'}
            underlineColorAndroid={'transparent'}
            onBlur={() => {}}
          />
          {this.state.isShowIcon ? (
            <TouchableOpacity
              style={styles.touch}
              activeOpacity={0.8}
              onPress={this._onClickIcon}>
              <Image style={styles.image} source={ImageRes.icon_clean} />
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
        <View style={styles.sep_line} />
      </View>
    );
  }

  /**
   * 密码输入框
   * @returns {*}
   * @private
   */
  _renderPwdInputView() {
    const {password, isShowEyeIcon, secureTextEntry} = this.state;

    return (
      <View
        style={{
          marginHorizontal: px2dp(80),
          marginTop: px2dp(40),
          justifyContent: 'flex-start',
        }}>
        <Text style={styles.title}>{`密码`}</Text>
        <View style={styles.contentView}>
          <TextInput
            ref={ref => (this.pwdInput = ref)}
            style={styles.textInput}
            placeholder={'请输入密码'}
            placeholderTextColor={Colors.c_gray_3}
            value={password}
            onChangeText={this._onChangeTextPassword}
            autoCorrect={false}
            autoCapitalize={'none'}
            clearButtonMode={'never'}
            keyboardType={'default'}
            returnKeyType={'done'}
            secureTextEntry={secureTextEntry}
            underlineColorAndroid={'transparent'}
          />

          {isShowEyeIcon && (
            <TouchableOpacity
              style={styles.touch}
              activeOpacity={0.8}
              onPress={this._onClickEyeShow}>
              <Image
                style={styles.image}
                source={
                  !secureTextEntry
                    ? ImageRes.icon_eye_show
                    : ImageRes.icon_eye_hide
                }
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.sep_line} />
      </View>
    );
  }

  /**
   * 输入框监听
   * @param text
   * @private
   */
  _onChangeTextAccount = text => {
    if (_.isEmpty(text)) {
      // 输入框为空
      this.setState({
        account: '',
        isShowIcon: false,
        isAccountTextInputEmpty: false,
        errorMsg: '',
      });
    } else {
      if (!_.isEqual(text, this.state.account)) {
        this.setState({
          account: text,
          isShowIcon: true,
          isAccountTextInputEmpty: true,
          errorMsg: '',
        });
      }
    }
  };

  /**
   * 密码输入框监听
   * @param text
   * @private
   */
  _onChangeTextPassword = text => {
    if (_.isEmpty(text)) {
      // 输入框为空
      this.setState({
        password: '',
        isShowEyeIcon: false,
        isPwdTextInputEmpty: false,
        errorMsg: '',
      });
    } else if (!_.isEqual(text, this.state.password)) {
      this.setState({
        isShowEyeIcon: true,
        password: text,
        isPwdTextInputEmpty: true,
        errorMsg: '',
      });
    }
  };

  /**
   * 右侧按钮点击事件 清空输入框的内容
   * @private
   */
  _onClickIcon = () => {
    this.setState({
      isShowIcon: false,
      account: '',
      isAccountTextInputEmpty: false,
    });
  };

  /**
   * 小眼睛点击事件
   * @private
   */
  _onClickEyeShow = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry, // 是否密文显示
    });
  };

  /**
   * 按钮
   * @private
   */
  _renderBtn() {
    const {isAccountTextInputEmpty, isPwdTextInputEmpty} = this.state;
    return (
      <View
        style={{
          marginTop: px2dp(60),
        }}>
        {this.state.errorMsg.length > 0 ? (
          <Text
            style={{
              fontSize: Fsize.fs_11,
              height: px2dp(40),
              lineHeight: px2dp(40),
              color: Colors.c_sub_7,
              marginLeft: screenW - px2dp(668),
            }}>
            {this.state.errorMsg}
          </Text>
        ) : (
          <View style={{height: 20}} />
        )}
        <LargeButton
          title={'登录'}
          textStyle={
            isAccountTextInputEmpty && isPwdTextInputEmpty
              ? styles.txt_h
              : styles.txt_n
          }
          containerStyle={
            isAccountTextInputEmpty && isPwdTextInputEmpty
              ? styles.btn_height
              : styles.btn_normal
          }
          // disabled={!isAccountTextInputEmpty || !isPwdTextInputEmpty}
          onPress={this._onSubmit}
        />
      </View>
    );
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={{
          width: screenW,
          height: screenH,
        }}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={this.state.isKeyboard}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {this._renderHeader()}
          {this._renderAccountInputView()}
          {this._renderPwdInputView()}
          {this._renderBtn()}
        </View>
      </KeyboardAwareScrollView>
    );
  }

  onErrorMgs(message) {
    if (message) {
      this.setState({errorMsg: message});
    }
  }

  /**
   * 登录接口
   * @private
   */
  _onSubmit = async () => {
    dismissKeyboard();
    this.props.navigation.replace('main');
  };

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
    this.timer && clearTimeout(this.timer);
  }
}

const styles = StyleSheet.create({
  container: {
    height: screenH,
    backgroundColor: 'white',
  },

  contentView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: Fsize.fs_15,
    color: Colors.c_gray_5,
  },

  textInput: {
    flex: 1,
    padding: 0,
    fontSize: Fsize.fs_14,
    height: px2dp(74),
  },

  sep_line: {
    backgroundColor: Colors.c_gray_2,
    height: StyleSheet.hairlineWidth,
  },

  image: {
    width: px2dp(36),
    height: px2dp(36),
    resizeMode: 'cover',
  },

  touch: {
    paddingVertical: px2dp(10),
    paddingLeft: px2dp(30),
  },

  btn_normal: {
    height: px2dp(88),
    width: px2dp(590),
    backgroundColor: Colors.c_gray_1,
  },

  btn_height: {
    height: px2dp(88),
    width: px2dp(590),
    marginTop: px2dp(12),
  },

  txt_n: {
    color: Colors.c_gray_3,
  },

  txt_h: {
    color: Colors.c_gray_0,
  },
});
