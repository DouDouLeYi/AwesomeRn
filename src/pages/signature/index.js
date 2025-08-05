import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import SignatureCapture from 'react-native-signature-capture';
import {px2dp} from '@utils';
import {screenW, screenH} from '#/utils/ScreenUtil';
import {mTheme, Colors, Fontsize} from '@theme';
import {HttpCode} from '#/configs/Contacts';
import DQHttp from '#/http/DQHttpRequest';
import {Loading, Toast, Alert} from '#/component';
import {isAndroid} from '#/assets/Assets';
import RNFS from 'react-native-fs';

export default class Signature extends Component {
  signatureRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      hasDraw: false,
    };
  }

  componentDidMount() {
    if (!isAndroid) {
      Orientation.lockToLandscapeLeft();
    }
  }

  componentWillUnmount() {
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
      this.goBack();
    }
  }

  onDragEvent() {
    this.setState({hasDraw: true});
  }

  async _onSaveEvent(image) {
    let optionType = this.props.navigation.getParam('optionType') || {};
    let formData = this.props.navigation.getParam('formData') || {};
    let localeSave = this.props.navigation.getParam('localeSave') || null;
    let onSaveImg = this.props.navigation.getParam('onSaveImg') || null;
    let success = false;
    const {hasDraw} = this.state;
    if (!hasDraw && isAndroid) {
      Toast.show('请完成签字后提交');
      return;
    }
    let formDatas = new FormData();
    let name = new Date().getTime();
    let uri = image.pathName;
    if (isAndroid) {
      uri = 'file:///' + uri;
    }

    let fileTemp = {uri: uri, type: 'multipart/form-data', name: name + '.png'};
    if (localeSave) {
      const fileObj = {
        filePath: fileTemp.uri,
        fileName: fileTemp.name,
        fileType: fileTemp.type,
        base64: image.encoded,
      };
      // ios 生成文件路径增加时间戳
      if (!isAndroid) {
        const tempPath = RNFS.TemporaryDirectoryPath;
        const tempFilePath = `${tempPath}${name + '.png'}`;
        await RNFS.moveFile(fileObj.filePath, tempFilePath);
        fileObj.filePath = tempFilePath;
        await onSaveImg(fileObj);
        await Orientation.lockToPortrait();
        this.goBack();
      } else {
        onSaveImg(fileObj);
        Orientation.lockToPortrait();
        return this.goBack();
      }
    }
    formDatas.append('file', fileTemp);
    formDatas.append('workTicketId', formData.workTicketId);
    formDatas.append('name', formData.name);
    formDatas.append('id', formData.id);
    formDatas.append('type', optionType);
    Loading.showCircle('提交中...');
    DQHttp.upload(
      '/stored-energy-fault/work/ticket/person/class/edit',
      formDatas,
      (response, isSucceed) => {
        success = response.statusCode === HttpCode.SUCCESS && isSucceed;
        Loading.dismiss();
        if (success) {
          let onFetchData = this.props.navigation.getParam('onFetchData');
          this.goBack();
          onFetchData && onFetchData();
          Toast.show('保存成功!');
        } else {
          Toast.show(response.message || '提交失败,请稍后重试!');
        }
      },
    );
    return success;
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

  render() {
    let formData = this.props.navigation.getParam('formData') || {};
    return (
      <View style={styles.container}>
        <View style={styles.rightNav}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={this.onCancelPress.bind(this)}>
            <Text style={[styles.title, {color: Colors.placeholderTextColor}]}>
              取消
            </Text>
          </TouchableOpacity>
          <Text style={[styles.flex, styles.title]}>签名</Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={this.onEnsurePress.bind(this)}>
            <Text style={[styles.title]}>确定</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.content]}>
          <Text style={[styles.label]}>
            请在框内书写
            <Text style={{color: Colors.Orange}}>{formData.name || '-'}</Text>
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
          <SignatureCapture
            style={[styles.capture]}
            saveImageFileInExtStorage={isAndroid}
            onSaveEvent={this._onSaveEvent.bind(this)}
            onDragEvent={this.onDragEvent.bind(this)}
            backgroundColor="#FEFEFE"
            showNativeButtons={false}
            showTitleLabel={false}
            viewMode={'landscape'}
            ref={this.signatureRef}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  rightNav: {
    marginHorizontal: px2dp(60),
    height: px2dp(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
  button_clear: {
    height: px2dp(40),
    justifyContent: 'center',
    width: px2dp(50),
    alignItems: 'flex-end',
  },
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
  capture: {flex: 1, width: screenH},
});
