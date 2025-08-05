import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import SignatureCapture from 'react-native-signature-capture';
import {px2dp} from '@utils';
import {screenH, screenW} from '#/utils/ScreenUtil';
import {Colors, Fontsize} from '@theme';
import {Alert, Toast} from '#/component';
import {isAndroid} from '#/assets/Assets';
import RNFS from 'react-native-fs';
import Portal from '#/component/portal';

class SignatureModal extends Component {
  signatureRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      hasDraw: false,
      top: 0,
      signatureStyle: {},
    };
  }

  componentDidMount(): void {
    if (!isAndroid) {
      Orientation.lockToLandscapeLeft();
    } else {
      Orientation.lockToLandscape();
      this.getSignatureCaptureStyle();
    }
  }

  componentWillUnmount(): void {
    if (isAndroid) {
      Orientation.unlockAllOrientations();
    }
    Orientation.lockToPortrait();
  }

  async onCancelPress() {
    const alert = await Alert.alert(
      '退出将不保存填写内容，是否确认退出？',
      [
        {type: 'cancel', name: '取消'},
        {
          type: 'ok',
          name: '确定',
        },
      ],
      true,
    );
    if (alert.index === 1) {
      Orientation.lockToPortrait();
      this.props.onClose({index: 0});
    }
  }

  onDragEvent() {
    this.setState({hasDraw: true});
  }

  async _onSaveEvent(image) {
    const {hasDraw} = this.state;
    if (!hasDraw && isAndroid) {
      Toast.show('请完成签字后提交');
      return;
    }
    let name = new Date().getTime();
    let uri = image.pathName;
    if (isAndroid) {
      uri = 'file:///' + uri;
    }
    let fileTemp = {uri: uri, type: 'multipart/form-data', name: name + '.png'};
    if (!isAndroid) {
      const tempPath = RNFS.TemporaryDirectoryPath;
      const tempFilePath = `${tempPath}${name + '.png'}`;
      await RNFS.moveFile(uri, tempFilePath);
      fileTemp.uri = tempFilePath;
    }
    const {onClose} = this.props;
    onClose({index: 1, data: fileTemp});
  }

  async onEnsurePress() {
    const {hasDraw} = this.state;
    if (!hasDraw && !isAndroid) {
      Toast.show('请完成签字后提交');
      return;
    }
    this.signatureRef.current && this.signatureRef.current.saveImage();
  }

  onClear() {
    this.setState({
      hasDraw: false,
    });
    this.signatureRef.current && this.signatureRef.current.resetImage();
  }

  getSignatureCaptureStyle() {
    Orientation.getOrientation(orientation => {
      if (['LANDSCAPE-LEFT', 'LANDSCAPE-RIGHT'].includes(orientation)) {
        this.setState({
          mode: 'landscape',
          signatureStyle: {width: screenH, height: screenW},
        });
      } else {
        this.setState({
          mode: 'portrait',
          signatureStyle: {width: screenW, height: screenH},
        });
      }
    });
  }

  render(): React.ReactNode {
    const {signatureStyle, top, mode} = this.state;
    return (
      <View style={styles.container}>
        <View style={[styles.rightNav, {marginTop: isAndroid ? top : 0}]}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.button, {marginLeft: px2dp(10)}]}
            onPress={this.onCancelPress.bind(this)}>
            <Text style={[styles.title, {color: Colors.placeholderTextColor}]}>
              取消
            </Text>
          </TouchableOpacity>
          <Text style={[styles.flex, styles.title]}>签名</Text>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.button, {marginRight: px2dp(10)}]}
            onPress={this.onEnsurePress.bind(this)}>
            <Text style={[styles.title]}>确定</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.content]}>
          <Text style={[styles.label]}>
            请在框内书写
            <Text style={{color: Colors.Orange}}>{name || '-'}</Text>
            签字
          </Text>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.button_clear]}
            onPress={this.onClear.bind(this)}>
            <Text style={[styles.title_clear]}>清除</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signature_box}>
          {!isAndroid || signatureStyle?.width ? (
            <SignatureCapture
              style={[styles.capture, signatureStyle]}
              saveImageFileInExtStorage={true}
              onSaveEvent={this._onSaveEvent.bind(this)}
              onDragEvent={this.onDragEvent.bind(this)}
              showNativeButtons={false}
              showTitleLabel={false}
              viewMode={mode}
              ref={this.signatureRef}
            />
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  rightNav: {
    height: px2dp(50),
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: px2dp(0.5),
    borderBottomColor: Colors.borderColor,
  },
  flex: {
    flex: 1,
    textAlign: 'center',
  },
  title: {
    height: px2dp(50),
    lineHeight: px2dp(50),
    color: Colors.Orange,
    fontSize: Fontsize.fs_15,
  },
  title_clear: {color: Colors.placeholderTextColor, fontSize: Fontsize.fs_15},
  button: {
    height: px2dp(50),
    lineHeight: px2dp(50),
    width: px2dp(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_clear: {
    height: px2dp(40),
    justifyContent: 'center',
    width: px2dp(50),
    alignItems: 'flex-end',
  },
  right_button: {right: px2dp(20), alignItems: 'flex-end'},
  left_button: {left: px2dp(20)},
  content: {
    height: px2dp(40),
    marginHorizontal: px2dp(20),
    marginVertical: px2dp(5),
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {fontSize: Fontsize.fs_16, flex: 1},
  signature_box: {
    overflow: 'hidden',
    flex: 1,
    borderWidth: px2dp(0.5),
    borderRadius: px2dp(5),
    marginHorizontal: px2dp(20),
    marginBottom: px2dp(20),
    borderColor: Colors.borderColor,
  },
  capture: {width: screenH, height: screenW - px2dp(110)},
});

class SignModal {
  __key__: string = '';
  show = param => {
    return new Promise((resolve, reject) => {
      if (this.__key__ === '') {
        this.__key__ = Portal.createPortal(
          <Portal.Trans
            isCancel
            ref={c => {
              this._portal = c;
            }}
            onClose={event => {
              this.__key__ = Portal.removePortal(this.__key__);
              resolve(event || {});
            }}
            isBlack={false}
            style={{}}>
            <View style={{height: screenH}}>
              <SignatureModal
                {...param}
                onClose={obj => {
                  this._portal && this._portal.cancel();
                  resolve(obj);
                }}
              />
            </View>
          </Portal.Trans>,
        );
      } else {
        reject({});
      }
    });
  };
  dismiss = (): void => {
    if (this.__key__.length > 0) {
      this.__key__ = Portal.removePortal(this.__key__);
    }
  };
}

const signModal = new SignModal();
export default signModal;
