import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

export default class SplashPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    global.login = false; // 标记是否登录
    global.userId = ''; // 全局的用户ID
    global.name = ''; // 全局的用户ID
    global.userToken = ''; // 全局的 Token
  }

  async componentDidMount() {
    await this._init();
    SplashScreen.hide();
  }

  render() {
    return <View style={styles.container}></View>;
  }

  /**
   * 初始化
   * @private
   */

  _init = async () => {
    this.props.navigation.replace('login');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
