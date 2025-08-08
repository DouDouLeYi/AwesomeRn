import {Loading} from '#/component';
import WorkTicketPreview from './WorkticketPreview';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-blob-util';
import {Platform} from 'react-native';
// const ShareFile = NativeModules.ShareFileModule;
import {isAndroid} from '#/utils';
import {isTRBool} from '@utils/attribute';

export default class LookDocumentPage extends WorkTicketPreview {
  constructor(props) {
    super(props);
    const {isPdf, filePath, fileName} =
      this.props.navigation.state.params || {};
    this.state.fileType = isPdf ? 'pdf' : '';
    this.state.filePath = filePath;
    this.state.title = fileName ?? '';
  }

  componentDidMount() {
    const {isPdf = false, isLocal = false} =
      this.props.navigation.state.params || {};
    if (isLocal) {
      if (!isPdf) {
        this.__hasErrorButton__ = false;
        this.setState({
          isError: true,
          errorMessage: '暂不支持该文件本地预览',
          isLoading: false,
        });
      }
    } else {
      const arr = this.state.title.split('.');
      if (
        !['xlsx', 'doc', 'docx', 'pptx', 'ppt', 'xls', 'pdf'].includes(
          arr[arr.length - 1] ?? '',
        )
      ) {
        this.__hasErrorButton__ = false;
        this.setState({
          isError: true,
          errorMessage: '暂不支持该文件预览',
          isLoading: false,
        });
      } else {
        if (
          Platform.OS === 'android' &&
          !['pdf'].includes(arr[arr.length - 1] ?? '')
        ) {
          this.setState({
            isError: true,
            errorMessage: '暂不支持该文件预览',
            isLoading: false,
          });
        }
      }
    }
  }

  handleLoadEnd = () => {
    Loading.dismiss();
  };

  handleError = () => {
    Loading.dismiss();
    this.setState({isError: true});
  };

  getFileName() {
    return this.state.title;
  }

  getRightBtn() {
    // const { isLocal } = this.props.navigation.state.params || {};
    // if(isLocal) return {};
    return super.getRightBtn();
  }

  async _onShareFile() {
    const {
      isLocal,
      fileName,
      filePath: path,
    } = this.props.navigation.state.params || {};
    if (isLocal) {
      const cachePath = isAndroid
        ? RNFS.ExternalCachesDirectoryPath
        : RNFS.CachesDirectoryPath;
      const filePath = `${cachePath}/${fileName}`;

      const copyFile = () => {
        RNFS.copyFile(decodeURIComponent(path), filePath)
          .then(() => {
            if (isAndroid) {
              // ShareFile.sharePdfFile(fileName, "*/*");
            } else {
              RNFetchBlob.ios.previewDocument(filePath);
            }
          })
          .catch(() => {});
      };

      RNFS.unlink(filePath)
        .then(() => {
          copyFile();
        })
        .catch(() => {
          copyFile();
        });
    } else {
      await super._onShareFile();
    }
  }

  getAction() {
    const {isLocal} = this.props.navigation.state.params || {};
    if (isLocal) return [{name: '分享', type: 'share'}];
    return super.getAction();
  }

  //重新加载网页
  bindRetry() {
    const {isPdf, isLocal} = this.props.navigation.state.params || {};
    if (isTRBool(isPdf)) {
      if (isLocal) return;
      if (!isPdf) {
        this.webview?.reload();
        this.setState({isError: false});
      }
    } else {
      super.bindRetry();
    }
  }
}
