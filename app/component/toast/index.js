/**
 * @format
 */

import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {ToastProps, ToastIcon, ToastMessage, ToastPosition} from './PropsType';
import {px2dp} from '../../utils';
import {Fsize} from '../../assets/Assets';
import Portal from '../portal';

// 吐司
class ToastView extends React.PureComponent<ToastProps> {
  // 消息
  renderMessage(): React.ReactNode {
    if (Array.isArray(this.props.message)) {
      return (
        this.props.message.map <
        React.ReactNode >
        ((msg, i) => {
          return (
            <Text key={i} style={styles.msg}>
              {msg}
            </Text>
          );
        })
      );
    }

    return <Text style={styles.msg}>{this.props.message}</Text>;
  }

  render(): React.ReactNode {
    var tostStyle = styles.center;
    if (this.props.position == 'top') {
      tostStyle = styles.top;
    } else if (this.props.position == 'bottom') {
      tostStyle = styles.bottom;
    }
    return (
      <View pointerEvents="none" style={[styles.container, tostStyle]}>
        <View style={styles.wrap}>{this.renderMessage()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: px2dp(30),
  },
  center: {justifyContent: 'center'},
  top: {paddingTop: '30%'},
  bottom: {justifyContent: 'flex-end', paddingBottom: '10%'},
  wrap: {
    alignItems: 'center',
    paddingHorizontal: px2dp(20),
    paddingVertical: px2dp(10),
    borderRadius: px2dp(10),
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  msg: {
    color: 'white',
    fontSize: Fsize.fs_15,
    lineHeight: px2dp(38),
    textAlign: 'center',
  },
});

// 吐司 api 方法
class Toast {
  __key__: string = '';
  __type__: string = 'bottom'; //top bottom
  toast = (icon: ToastIcon, message: ToastMessage, isTouch: Boolean): void => {
    if (!message || message.length == 0) {
      return;
    }
    if (this.__key__ === '') {
      this.__key__ = Portal.createPortal(
        <Portal.Opacity
          isTouch={isTouch}
          ref={ref => (this.tost = ref)}
          onClose={() => {
            this.__key__ = Portal.removePortal(this.__key__);
          }}>
          <ToastView icon={icon} position={this.__type__} message={message} />
        </Portal.Opacity>,
      );
      this.timer = setTimeout(() => {
        this.tost && this.tost.cancel();
      }, 2000);
    } else {
      this.timer && clearTimeout(this.timer);
      Portal.updatePortal(
        this.__key__,
        <Portal.Opacity
          isTouch={isTouch}
          ref={ref => (this.tost = ref)}
          onClose={() => {
            this.__key__ = Portal.removePortal(this.__key__);
          }}>
          <ToastView icon={icon} position={this.__type__} message={message} />
        </Portal.Opacity>,
      );
      this.timer = setTimeout(() => {
        this.tost && this.tost.cancel();
      }, 2000);
    }
  };
  initType = (position: ToastPosition): void => {
    this.__type__ = position;
  };
  show = (
    message: ToastMessage,
    position = 'bottom',
    isTouch: Boolean,
  ): void => {
    this.initType(position);
    this.toast('success', message, isTouch == undefined ? true : isTouch);
  };
  success = (message: ToastMessage): void => {
    this.toast('success', message);
  };

  error = (message: ToastMessage): void => {
    this.toast('error', message);
  };

  warning = (message: ToastMessage): void => {
    this.toast('warning', message);
  };

  info = (message: ToastMessage): void => {
    this.toast('info', message);
  };
  dismiss = (): void => {
    if (this.__key__.length > 0) {
      this.__key__ = Portal.removePortal(this.__key__);
    }
  };
}

const toast = new Toast();
export default toast;
