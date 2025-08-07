import React, {Component} from 'react';

import ImagePicker from 'react-native-image-crop-picker';
import DQPermission from './Permission+Additions';
import {cst} from '@components/utils';
import PropTypes from 'prop-types';
import Fs from '@utils/fs';
import Portal from '#/component/portal';
import {Actionsheet} from '@beeshell/components/Actionsheet';

const IMAGE_WIDTH_SIZE = cst.screenWidth;
const IMAGE_HEIGHT_SIZE = cst.screenWidth;

class ImagePickerComponent extends Component {
  static defaultProps = {
    type: '',
    onClose: () => {},
    lessNumber: 3,
    isMarker: false,
  };
  static propTypes = {
    checkFnc: PropTypes.func,
    onClose: PropTypes.func,
    type: PropTypes.string,
    lessNumber: PropTypes.number,
    isMarker: PropTypes.bool,
  };

  componentDidMount() {
    if (this.props.type == DQPermission.CAMERA) {
      this._openCamera();
    } else if (this.props.type == DQPermission.PHOTO) {
      this._openPicker();
    } else {
      this.ActionSheet && this.ActionSheet.open();
    }
  }

  bindActionSheetClickForOldParts = async index => {
    let permission = '';
    if (index == 0) {
      permission = DQPermission.CAMERA;
    } else if (index == 1) {
      permission = DQPermission.PHOTO;
    }
    DQPermission.Permission(this, permission, () => {
      if (index == 0) {
        this._openCamera();
      } else if (index == 1) {
        this._openPicker();
      } else {
        this.props.onClose();
      }
    });
  };

  async compressPicture(array) {
    let i = 0;
    let arr = [];
    while (i < array.length) {
      const res = await Fs.compress(array[i]);
      arr.push({...res, path: res.uri});
      i++;
    }
    return arr;
  }

  _openCamera() {
    if (this.props.checkFnc !== undefined && !this.props.checkFnc()) {
      return;
    }
    ImagePicker.openCamera({
      loadingLabelText: '',
      width: IMAGE_WIDTH_SIZE,
      height: IMAGE_HEIGHT_SIZE,
      cropping: false,
      cropperChooseText: '确定',
      cropperCancelText: '取消',
      compressImageQuality: 0.4,
    }).then(photos => {
      if (this.props.isMarker) {
        this.props.onClose([photos]);
      } else {
        this.props.onClose(this.compressPicture([photos]));
      }
    });
  }

  _openPicker() {
    if (this.props.checkFnc !== undefined && !this.props.checkFnc()) {
      return;
    }
    ImagePicker.openPicker({
      loadingLabelText: '',
      width: IMAGE_WIDTH_SIZE,
      height: IMAGE_HEIGHT_SIZE,
      cropperChooseText: '确定',
      cropperCancelText: '取消',
      multiple: true,
      cropping: true,
      mediaType: 'photo',
      maxFiles: this.props.lessNumber,
      compressImageQuality: 0.4,
      includeExif: true,
    }).then(photos => {
      if (this.props.isMarker) {
        this.props.onClose(photos);
      } else {
        this.props.onClose(this.compressPicture(photos));
      }
    });
  }

  render() {
    return (
      <Actionsheet
        ref={c => {
          this.ActionSheet = c;
        }}
        header={null}
        data={[
          {label: '拍摄图片', value: '0'},
          {label: '图库中选择', value: '1'},
        ]}
        cancelable={true}
        onPressConfirm={item => {
          console.log(item);
          this.bindActionSheetClickForOldParts(item.value);
        }}
        onPressCancel={() => {
          console.log('cancel');
        }}
      />
    );
  }
}

class imagePicker {
  __PortalKey__: string = '';
  __show__ = (type, checkFnc, lessNumber, callBack, isMarker): Promise => {
    if (this.__PortalKey__ !== '') {
      this.__PortalKey__ = Portal.removePortal(this.__PortalKey__);
    }
    return new Promise((resolve, reject) => {
      if (this.__PortalKey__ === '') {
        this.__PortalKey__ = Portal.createPortal(
          <ImagePickerComponent
            checkFnc={checkFnc}
            lessNumber={lessNumber}
            type={type}
            isMarker={isMarker}
            onClose={photos => {
              this.__PortalKey__ = Portal.removePortal(this.__PortalKey__);
              callBack && callBack();
              resolve(photos || []);
            }}
          />,
          this.dismiss,
        );
      }
    });
  };
  dismiss = () => {
    this.__PortalKey__ = Portal.removePortal(this.__PortalKey__);
  };
  open = (checkFnc, lessNumber, callBack, isMarker = false): Promise => {
    return this.__show__('', checkFnc, lessNumber, callBack, isMarker);
  };
  openCamera = (checkFnc, lessNumber, callBack): Promise => {
    return this.__show__(DQPermission.CAMERA, checkFnc, lessNumber, callBack);
  };
  openPhoto = (checkFnc, lessNumber, callBack): Promise => {
    return this.__show__(DQPermission.PHOTO, checkFnc, lessNumber, callBack);
  };
}

const picker = new imagePicker();
export default picker;
