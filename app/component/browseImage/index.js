import React from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import Portal from '#/component/portal';
import {Image} from 'react-native';
import {isAndroid} from '#/assets/Assets';
import Toast from '#/component/toast';
import RNFetchBlob from 'react-native-blob-util';
import CameraRoll from '@react-native-community/cameraroll';

// import CameraRoll from "@react-native-community/cameraroll";
class browseImage {
  savePhoto(url) {
    if (isAndroid) {
      this._savePhotoForAndroid(url);
    } else {
      this._savePhotoForIos(url);
    }
  }

  _savePhotoForIos(url) {
    const promise = CameraRoll.save(url, 'photo');
    promise
      .then(function (result) {
        Toast.show('保存成功');
      })
      .catch(function (error) {
        Toast.show('暂不支持的图片格式！\n');
      });
  }

  _savePhotoForAndroid = url => {
    RNFetchBlob.config({fileCache: true, appendExt: 'png'})
      .fetch('GET', url, {})
      .then(res => {
        const localUri = res.path().startsWith('file://')
          ? res.path()
          : `file://${res.path()}`;
        CameraRoll.save(localUri, 'photo')
          .then(_ => {
            // 保存成功
            Toast.show('保存成功');
          })
          .catch(error => {
            // 保存失败
            Toast.show('保存失败');
          });
      })
      .catch(error => {
        // 没有访问外部存储权限
      });
  };
  __PortalKey__: string = '';

  show(listImage, index, isCache = false, backgroundColor = '#010101') {
    if (this.__PortalKey__ === '') {
      this.__PortalKey__ = Portal.createPortal(
        <ImageViewer
          backgroundColor={backgroundColor}
          menuContext={{
            saveToLocal: '保存图片',
            cancel: '取消',
          }}
          imageUrls={listImage}
          index={index || 0}
          enableSwipeDown={true} //允许向下滑动以关闭图像查看器。当向下滑动，将触发onCancel。
          renderImage={props => {
            return <Image {...props} />;
          }}
          //向下滑动回调
          onSwipeDown={() =>
            (this.__PortalKey__ = Portal.removePortal(this.__PortalKey__))
          }
          onClick={cancel => {
            cancel && cancel();
            this.__PortalKey__ = Portal.removePortal(this.__PortalKey__);
          }}
          onSave={url => {
            this.savePhoto(url);
          }}
        />,
        this.dismiss,
      );
    }
  }

  dismiss = (): void => {
    if (this.__PortalKey__.length > 0) {
      this.__PortalKey__ = Portal.removePortal(this.__PortalKey__);
    }
  };
}

const browse = new browseImage();
export default browse;
