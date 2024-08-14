import React from 'react';
import {View, StyleSheet, Animated, TouchableOpacity} from 'react-native';

import PortalObserver from './PortalObserver';

import {
  PortalProviderProps,
  PortalProps,
  PortalObserverEvent,
  PortalObserverNode,
  PortalObserverType,
} from './PropsType';
import {screenHeight, screenWidth} from '../../utils';
import event from '../../utils/event';

// 传送门提供商
const PortalProvider = (props: PortalProviderProps) => {
  return (
    <View style={providerStyles.container}>
      {props.children}
      <PortalObserver />
    </View>
  );
};

class PortalOpacity extends React.Component {
  static defaultProps = {
    animateTime: 250,
    isBlack: false,
    isTouch: false,
    isCancel: false,
    style: {},
  };
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
    };
  }
  componentDidMount() {
    this.open();
  }
  open() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: this.props.animateTime,
      useNativeDriver: true,
    }).start();
  }
  /* 关闭动画方法 */
  cancel(close) {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: this.props.animateTime,
      useNativeDriver: true,
    }).start(() => {
      if (close) {
        close();
      } else {
        const {onClose} = this.props;
        onClose && onClose();
      }
    });
  }
  render() {
    const {isBlack, style, isCancel, isTouch} = this.props;
    return (
      <Animated.View
        pointerEvents="box-none"
        style={[
          isBlack ? providerStyles.black : {},
          StyleSheet.absoluteFill,
          style,
          {opacity: this.state.opacity},
        ]}>
        {!isTouch ? (
          <TouchableOpacity
            activeOpacity={0}
            style={StyleSheet.absoluteFill}
            onPress={() => {
              if (isCancel) {
                this.cancel();
              }
            }}
          />
        ) : null}
        {this.props.children}
      </Animated.View>
    );
  }
}

class PortalTrans extends React.Component {
  static defaultProps = {
    animateTime: 250,
    isBlack: false,
    isTouch: false,
    isCancel: false,
    style: {},
    blackStyle: {},
  };
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
    };
  }
  componentDidMount() {
    this.open();
  }
  open() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: this.props.animateTime,
      useNativeDriver: true,
    }).start();
  }
  /* 关闭动画方法 */
  cancel(close) {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: this.props.animateTime,
      useNativeDriver: true,
    }).start(() => {
      if (close) {
        close();
      } else {
        const {onClose} = this.props;
        onClose && onClose();
      }
    });
  }
  render() {
    const {isBlack, blackStyle, style, isCancel, isTouch} = this.props;
    return (
      <Animated.View
        pointerEvents="box-none"
        style={[StyleSheet.absoluteFill, style]}>
        <Animated.View
          pointerEvents="box-none"
          style={[
            isBlack ? providerStyles.black : {},
            StyleSheet.absoluteFill,
            blackStyle,
            {opacity: this.state.opacity},
          ]}
        />
        {!isTouch ? (
          <TouchableOpacity
            activeOpacity={0}
            style={StyleSheet.absoluteFill}
            onPress={() => {
              if (isCancel) {
                this.cancel();
              }
            }}
          />
        ) : null}
        <Animated.View
          style={[
            {
              transform: [
                {
                  translateY: this.state.opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [screenHeight, 0],
                  }),
                },
              ],
            },
          ]}>
          {this.props.children}
        </Animated.View>
      </Animated.View>
    );
  }
}

class PortalRightTrans extends React.Component {
  static defaultProps = {
    animateTime: 250,
    isBlack: false,
    isTouch: false,
    isCancel: false,
    style: {},
  };
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
    };
  }
  componentDidMount() {
    this.open();
  }
  open() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: this.props.animateTime,
      useNativeDriver: true,
    }).start();
  }
  /* 关闭动画方法 */
  cancel(close) {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: this.props.animateTime,
      useNativeDriver: true,
    }).start(() => {
      if (close) {
        close();
      } else {
        const {onClose} = this.props;
        onClose && onClose();
      }
    });
  }
  render() {
    const {isBlack, style, isCancel, isTouch} = this.props;
    return (
      <Animated.View
        pointerEvents="box-none"
        style={[StyleSheet.absoluteFill, style]}>
        <Animated.View
          pointerEvents="box-none"
          style={[
            isBlack ? providerStyles.black : {},
            StyleSheet.absoluteFill,
            style,
            {opacity: this.state.opacity},
          ]}
        />
        {!isTouch ? (
          <TouchableOpacity
            activeOpacity={0}
            style={StyleSheet.absoluteFill}
            onPress={() => {
              if (isCancel) {
                this.cancel();
              }
            }}
          />
        ) : null}
        <Animated.View
          style={[
            {
              transform: [
                {
                  translateX: this.state.opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [screenWidth, 0],
                  }),
                },
              ],
            },
          ]}>
          {this.props.children}
        </Animated.View>
      </Animated.View>
    );
  }
}

const providerStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  black: {backgroundColor: '#00000066'},
});

export default class Portal extends React.Component<PortalProps> {
  static Provider = PortalProvider; // 静态化
  static Opacity = PortalOpacity; // 静态化
  static Trans = PortalTrans;
  static RightTrans = PortalRightTrans;
  static createPortal = createPortal; // 新增传送门 api
  static removePortal = removePortal; // 移除传送门 api
  static updatePortal = updatePortal; // 更新传送门 api
  static clearPortal = clearPortal; // 清空全部 UI

  __key__: string = ''; // 唯一值

  componentDidMount() {
    this.__key__ = createPortal(this.props.children);
  }

  componentWillUnmount() {
    this.__key__ = removePortal(this.__key__);
  }

  render(): React.ReactNode {
    return null;
  }
}
// 传送门 api 方法
function createPortal(element: React.ReactNode, dismiss: React.FC): string {
  const key = String(Date.now());
  event.publish(
    'portal',
    getPortalAction('mount', {key, element, dismiss: dismiss}),
  );
  return key;
}

function removePortal(key: string): string {
  try {
    event.publish('portal', getPortalAction('unmount', {key, element: null}));
  } catch (err) {}
  return '';
}

function updatePortal(
  key: string,
  element: React.ReactNode,
  dismiss: React.FC,
): void {
  event.publish(
    'portal',
    getPortalAction('update', {key, element, dismiss: dismiss}),
  );
}

function clearPortal() {
  try {
    event.publish('portal', getPortalAction('clear', {key, element: null}));
  } catch (err) {}
  return '';
}

// 获取传送门活动
function getPortalAction(
  type: PortalObserverType,
  node: PortalObserverNode,
): PortalObserverEvent {
  return {
    type,
    node,
  };
}
