import React, {Component} from 'react';
import {View, Text, TouchableHighlight, TouchableOpacity} from 'react-native';
import {Button, NavigationBar, SlideModal} from 'beeshell';
import {screenHeight, screenWidth} from '../../utils/index';
import {px2dp} from '../../utils';

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
        <Button
          size="sm"
          style={{margin: 12}}
          type="default"
          onPress={() => {
            this.slideModal.open();
          }}>
          SlideModal 基础
        </Button>
        <SlideModal
          ref={c => {
            this.slideModal = c;
          }}
          screenHeight={screenHeight}
          cancelable={true}>
          <View
            style={{
              backgroundColor: '#fff',
              padding: px2dp(80),
              borderRadius: 4,
              width: screenWidth,
              height: screenHeight,
            }}>
            <Text style={{backgroundColor: '#fff'}}>自定义内容</Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.slideModal.close()}>
              <Text>内容比较简单，完全由用户自定义</Text>
            </TouchableOpacity>
          </View>
        </SlideModal>
      </View>
    );
  }
}

export default Message;
