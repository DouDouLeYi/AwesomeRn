import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {cst, px} from '@components/utils';
import {ImageRes} from '#/assets/Assets';
import {LoadingViewProps} from './PropsType';
import px2dp from '../../utils/Ratio';
import Portal from '#/component/portal';

const {Fsize} = cst;

class LoadingView extends React.Component<LoadingViewProps> {
  constructor(props) {
    super(props);
    this.state = {
      message: props.message || '',
    };
  }

  updateProcess(process) {
    this.setState({
      message: process,
    });
  }

  render(): React.ReactNode {
    const {message = ''} = this.state;
    return (
      <View style={styles.flex}>
        <Image
          resizeMode={'contain'}
          style={{width: px2dp(120), height: px2dp(120)}}
          source={ImageRes.loading}
        />
        {message.length > 0 && (
          <Text style={{color: '#1E7CE8', fontSize: Fsize.fs_10}}>
            {message}
          </Text>
        )}
      </View>
    );
  }
}

class LoadingCircleViewX extends React.Component<LoadingViewProps> {
  constructor(props) {
    super(props);
    this.state = {
      bviewX: 0,
    };
  }

  _onLayout = event => {
    const {
      nativeEvent: {
        layout: {height, width},
      },
    } = event;
    this.setState({
      bviewX: parseInt(Math.max(110, Math.max(width, height) + 55)),
    });
  };

  render(): React.ReactNode {
    const {bviewX} = this.state;
    const {message} = this.props;
    return (
      <View style={styles.flex_Circle}>
        <ImageBackground
          source={require('./shadow_bg.png')}
          style={[
            styles.circle,
            bviewX > 0 ? {width: bviewX, height: bviewX} : {},
          ]}>
          <Image
            resizeMode={'contain'}
            style={{width: px(90), height: px(90)}}
            source={ImageRes.loading}
          />
          {message && message.length > 0 ? (
            <Text
              onLayout={this._onLayout}
              style={{
                color: '#888E9500',
                height: 1,
                fontSize: Fsize.fs_12,
              }}>
              {message}
            </Text>
          ) : null}
        </ImageBackground>
      </View>
    );
  }
}

class LoadingCircleView extends React.Component<LoadingViewProps> {
  constructor(props) {
    super(props);
    this.state = {
      bviewX: 0,
    };
  }

  _onLayout = event => {
    const {
      nativeEvent: {
        layout: {height, width},
      },
    } = event;
    this.setState({
      bviewX: parseInt(Math.max(110, Math.max(width, height) + 55)),
    });
  };

  render(): React.ReactNode {
    const {bviewX} = this.state;
    const {message} = this.props;
    return (
      <View style={styles.flex_Circle}>
        <View
          source={require('./shadow_bg.png')}
          style={[
            styles.circle,
            bviewX > 0 ? {width: bviewX, height: bviewX} : {},
          ]}>
          <Image
            resizeMode={'contain'}
            style={{width: px(90), height: px(90)}}
            source={ImageRes.loading}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff55',
  },
  flex_Circle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// alert api 方法
class Loading {
  __key__: string = '';

  show = (message): void => {
    if (this.__key__ === '') {
      this.__key__ = Portal.createPortal(
        <Portal.Opacity
          animateTime={120}
          ref={ref => (this.loading = ref)}
          onClose={() => {
            this.__key__ = Portal.removePortal(this.__key__);
          }}>
          <LoadingView
            ref={ref => (this.loadingView = ref)}
            message={message}
          />
        </Portal.Opacity>,
      );
    }
  };

  updateProcess = (processMessage = ''): void => {
    if (this.__key__) {
      this.loadingView?.updateProcess(processMessage);
    }
  };

  showCircleX = (message): void => {
    if (this.__key__ === '') {
      this.__key__ = Portal.createPortal(
        <Portal.Opacity
          animateTime={120}
          ref={ref => (this.loading = ref)}
          onClose={() => {
            this.__key__ = Portal.removePortal(this.__key__);
          }}>
          <LoadingCircleViewX message={message} />
        </Portal.Opacity>,
      );
    }
  };
  dismiss = (): void => {
    if (this.__key__.length > 0) {
      this.__key__ = Portal.removePortal(this.__key__);
    }
  };
  showCircle = (message): void => {
    if (this.__key__ === '') {
      this.__key__ = Portal.createPortal(
        <Portal.Opacity
          animateTime={120}
          ref={ref => (this.loading = ref)}
          onClose={() => {
            this.__key__ = Portal.removePortal(this.__key__);
          }}>
          <LoadingCircleView message={message} />
        </Portal.Opacity>,
      );
    }
  };
}

const loading = new Loading();
export default loading;
