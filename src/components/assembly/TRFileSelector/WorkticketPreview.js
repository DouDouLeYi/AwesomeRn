import React, {Component} from 'react';
import {
  BackHandler,
  NativeModules,
  Platform,
  Share,
  StyleSheet,
  View,
} from 'react-native';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-blob-util';
import Portal from '#/component/portal';

import {EamNavBarView} from '@components/assembly//TRNavbar';
import {Loading} from '#/component';
import {NAV_STATE} from '@components/assembly/helper';
import {isAndroid} from '#/utils';
import {ErrorButton, InCome} from '#/component/InCome';
import {ImageRes} from '#/assets/Assets';
import {WebView} from 'react-native-webview';

const SHARE_TYPE = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};
const ShareFile = NativeModules.ShareFileModule;
export default class WorkticketPreview extends Component {
  __portalKey__ = '';
  __hasErrorButton__ = true;
  static navigationOptions = () => {
    return {
      header: null,
    };
  };

  constructor(props) {
    super(props);
    const globalProps = props.navigation.getParam('globalProps') || {};
    const otherParam = props.navigation.getParam('otherParam') || {};
    const replaceParam = props.navigation.getParam('replaceParam') || {};
    const localParams = props.navigation.getParam('localParams') || {};
    const {
      url = '',
      type = '',
      title = '',
      type_desc = '',
      WebViewParam = {},
      defaultFileUrl = '',
    } = localParams || {};
    this.state = {
      type_desc,
      title, //titles[otherParam.formKey || '33']
      replaceParam,
      id: globalProps.id || '',
      isFist: true,
      isEmpty: false,
      isError: false,
      isLoading: false,
      filePath: '',
      errorMessage: '',
      otherParam: otherParam,
      cachePdfPath: '',
      fileUrl: url,
      fileType: type,
      WebViewParam,
      defaultFileUrl,
    };
    this.backAction = this.onBackAction.bind(this);
  }

  componentDidMount(): void {
    BackHandler.addEventListener('hardwareBackPress', this.backAction);
    this._onFechData();
  }

  componentWillUnmount(): void {
    BackHandler.removeEventListener('hardwareBackPress', this.backAction);
  }

  onBackAction() {
    return true;
  }

  async _onFechData() {
    let {id, isLoading, otherParam, fileUrl, defaultFileUrl} = this.state;
    if (isLoading) {
      return;
    }
    if (defaultFileUrl) {
      const arr = this.state.title?.split('.') || [];
      this.setState({
        filePath: this.DQImageUrl(defaultFileUrl),
      });
      if (
        !['xlsx', 'doc', 'docx', 'pptx', 'ppt', 'xls', 'pdf'].includes(
          arr[arr.length - 1] ?? '',
        )
      ) {
        this.setState({
          isError: true,
          errorMessage: '暂不支持该文件预览',
          isLoading: false,
        });
      }
    }
  }

  getAction() {
    if (this.state.defaultFileUrl) {
      return [{name: '分享', type: 'share'}];
    }
    return [
      {name: '邮箱', type: 'mail'},
      {name: '分享', type: 'share'},
    ];
  }

  async onNavPress(props, btnL) {
    const {navigation, optionType} = props;
    if (optionType === NAV_STATE.BACK) {
      if (btnL === 'icon-home') {
        navigation && navigation.popToTop();
      } else {
        navigation && navigation.goBack();
      }
    } else if (optionType === NAV_STATE.MAIL) {
    } else if (optionType === NAV_STATE.MORE) {
    }
  }

  //分享文件
  async _onShareFile() {
    const {filePath, cachePdfPath, fileType} = this.state;
    if (fileType === 'html') {
      try {
        const result = await Share.share({
          message: Platform.OS === 'android' ? filePath : '',
          url: Platform.OS === 'ios' ? filePath : '',
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {}
      return;
    }
    if (cachePdfPath) {
      await RNFS.unlink(cachePdfPath);
    }
    const pdfNickname = this.getFileName(true);
    const cachePath = isAndroid
      ? RNFS.ExternalCachesDirectoryPath
      : RNFS.CachesDirectoryPath;
    const downloadDest = `${cachePath}/${pdfNickname}`;
    const options = {fromUrl: filePath, toFile: downloadDest, background: true};
    Loading.showCircle('');
    console.log(options);
    const ret = RNFS.downloadFile(options);
    ret.promise
      .then(res => {
        Loading.dismiss();
        if (res.statusCode === 200) {
          this.setState({cachePdfPath: downloadDest});
          if (isAndroid) {
            const pdfName = downloadDest.split('cache/')[1];
            ShareFile.sharePdfFile(pdfName, SHARE_TYPE[fileType] ?? '*/*');
          } else {
            RNFetchBlob.ios.previewDocument(downloadDest);
          }
        }
      })
      .catch(e => {
        Loading.dismiss();
      });
  }

  /**
   * 取消
   * @private
   */
  _onPortalClose() {
    this._portal &&
      this._portal.cancel(() => {
        this.__portalKey__ = Portal.removePortal(this.__portalKey__);
      });
  }

  bindRetry() {
    this._onFechData();
  }

  getFileName(isType = false) {
    if (this.state.defaultFileUrl) {
      return Date.now() + this.state.title;
    }
    const {replaceParam, type_desc, fileType} = this.state;
    const {
      farm_num_desc = '',
      work_ticket_type_desc = '',
      work_ticket_num = '',
      operation_ticket_num,
    } = replaceParam;
    return `${farm_num_desc}-${work_ticket_type_desc || type_desc}-${
      work_ticket_num || operation_ticket_num
    }${isType ? '.' + fileType : ''}`;
  }

  onMessage = () => {};

  handleError = () => {
    Loading.dismiss();
    this.setState({isError: true});
  };

  handleLoad = () => {};

  handleLoadStart = () => {};

  getRightBtn() {
    return {optionType: 'more', btnR: 'icon-more'};
  }

  render() {
    let {
      filePath,
      isLoading,
      isError,
      isEmpty,
      errorMessage,
      title,
      fileType,
      WebViewParam,
    } = this.state;
    return (
      <View style={[styles.container]}>
        <EamNavBarView
          navigation={this.props.navigation}
          onNavPress={this.onNavPress.bind(this)}
          title={title + '预览'}
          leftBtn={{optionType: 'back', btnL: 'icon-home'}}
          // rightBtn={{optionType: 'mail', btnR: 'icon-mail'}}
          rightBtn={this.getRightBtn()}
        />
        {isLoading || isError || isEmpty ? (
          <InCome
            isLoading={isLoading}
            isEmpty={isEmpty}
            isError={isError}
            emptyText={'暂无数据'}
            emptyImage={ImageRes.noOrder}
            errorButton={() =>
              this.__hasErrorButton__ ? (
                <ErrorButton retryCallBack={this.bindRetry.bind(this)} />
              ) : null
            }
            errorText={errorMessage}
          />
        ) : (
          <WebView
            ref={webview => (this.webview = webview)}
            source={{
              uri: isAndroid
                ? fileType === 'html'
                  ? filePath
                  : `https://view.officeapps.live.com/op/embed.aspx?src=${filePath}`
                : filePath,
            }}
            // source={{ uri: `https://view.officeapps.live.com/op/embed.aspx?src=${filePath}` }}
            removeClippedSubviews={false}
            onMessage={this.onMessage}
            allowFileAccess
            allowUniversalAccessFromFileURLs
            mixedContentMode="compatibility"
            onLoadStart={this.handleLoadStart} //当 WebView刚开始加载时调用的函数
            onLoad={this.handleLoad} //当 WebView加载成功后执行的函数
            onLoadEnd={this.handleLoadEnd} //函数，当加载结束调用，不管是成功还是失败。
            onError={this.handleError} //当 WebView加载失败时调用的函数
            {...WebViewParam}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1},
});
