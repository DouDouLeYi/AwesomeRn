import React, {Component} from 'react';
import {View} from 'react-native';
import {NavigationBar} from 'beeshell';

class Message extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <NavigationBar
          testID="nav1"
          title="标题"
          backLabelText="返回"
          forwardLabelText="下一步"
          onPressBack={() => {
            this.handlePress('返回');
          }}
          onPressForward={() => {
            this.handlePress('下一步');
          }}></NavigationBar>
      </View>
    );
  }
}

export default Message;
