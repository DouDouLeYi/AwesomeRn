import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BaseComponent from '../BaseComponent';
import px2dp from '@utils/px2dp';
import {FORM_STATE} from '../helper';
import {isEqual} from 'lodash';
import {screenW} from '#/utils/ScreenUtil';
import {screenWidth} from '#/utils';
import {ImageRes as AImageRes} from '#/assets/Assets';
import {Alert, Toast} from '#/component';
import signModal from '@pages/signature/signModal';

class TRSignatureView extends BaseComponent {
  constructor(props) {
    super(props);
    let widthReduce = props.widthReduce || 60;
    this.state = {
      imageWidth: Math.floor(screenWidth - px2dp(widthReduce)),
      signList: [
        {
          filePath: null,
          fileName: null,
          fileType: null,
        },
      ],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEqual(nextProps.formData?.[nextProps.id], prevState?.signList)) {
      return {
        signList: nextProps?.formData?.[nextProps.id] || [
          {
            filePath: null,
            fileName: null,
            fileType: null,
          },
        ],
      };
    }
    return prevState;
  }

  componentDidMount() {
    this._initSignList();
  }

  _initSignList() {
    const {formData = {}, id} = this.props;
    const {signList} = this.state;
    let _signList = signList;
    if (formData[id]) {
      _signList = formData[id];
    }
    this.setState({
      signList: _signList,
    });
  }

  _getImageUrl(n = {}) {
    const file = Array.isArray(n) ? n[0] : n;
    if (file.fileId) {
      return {uri: this.DQImageUrl(file.filePath)};
    } else {
      return {
        uri: file.filePath || '',
      };
    }
  }

  _handleAddList() {
    const {formData = {}, id, onChange} = this.props;
    const {signList} = this.state;
    const _data = signList || [];
    _data.push({
      filePath: null,
      fileName: null,
      fileType: null,
    });
    this.setState({
      signList: _data,
    });
    onChange({...formData, [id]: _data});
  }

  _conRemoveFileIds(formData, fileObj) {
    if (fileObj.id) {
      formData.removeFileIds = formData.removeFileIds ?? [];
      const hasFileId = formData.removeFileIds.includes(fileObj.id);
      if (!hasFileId) {
        formData.removeFileIds.push(fileObj.id);
      }
    }
  }

  async _onLongPress(fileObj, index) {
    const {formData = {}, id, onChange} = this.props;
    const {signList} = this.state;
    const data = signList || [];
    if (data.length === 1) {
      return Toast.show('不可删除最后一条');
    }
    const alert = await Alert.alert(
      '是否删除此签名？',
      [
        {type: 'cancel', name: '取消'},
        {type: 'ok', name: '确定'},
      ],
      true,
    );
    if (alert.index === 1) {
      const _data = data.filter((_, i) => i !== index);
      this._conRemoveFileIds(formData, fileObj);
      this.setState({
        signList: _data,
      });
      onChange({...formData, [id]: _data});
    }
  }

  _renderContent() {
    const {imageWidth, signList} = this.state;
    const {
      multiple = false,
      formData = {},
      id,
      onChange,
      formatMsg,
      formState,
      formErrorMsg,
      renderState,
    } = this.props;
    let errObj = {...formErrorMsg};
    const addCom = (
      <View style={styles.img_box}>
        <TouchableOpacity
          onPress={() => {
            this._handleAddList();
          }}>
          <Image source={AImageRes.icon_add} style={styles.img_add} />
        </TouchableOpacity>
      </View>
    );

    return (
      <View>
        {multiple ? addCom : ''}
        {signList?.map((item, ind) => (
          <TouchableOpacity
            style={[
              {
                marginBottom: px2dp(8),
              },
              styles.wrap,
            ]}
            onLongPress={() => {
              this._onLongPress(item, ind);
            }}
            onPress={async () => {
              if (
                formState === FORM_STATE.READ ||
                renderState === FORM_STATE.READ
              ) {
                return;
              }
              let signDiscern = await signModal.show();
              if (signDiscern.index && signDiscern.index == 1) {
                const fileTemp = {
                  filePath: signDiscern?.data?.uri,
                  fileName: signDiscern?.data.name,
                  fileType: signDiscern?.data.type,
                };
                errObj[id] = fileTemp ? '' : formatMsg;
                const _data = signList;
                _data[ind] = fileTemp;
                this._conRemoveFileIds(formData, item);
                this.setState({signList: _data});
                onChange({...formData, [id]: _data}, errObj);
              }
            }}>
            {item.filePath ? (
              <Image
                style={[{width: imageWidth, height: px2dp(78)}]}
                source={this._getImageUrl(item)}
                resizeMode={'contain'}
              />
            ) : (
              <View style={[styles.nullBox]} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderColor: '#d7d7d5',
    borderRadius: px2dp(4),
  },
  avatar: {width: screenW - px2dp(60), height: px2dp(78)},
  nullBox: {
    width: screenW - px2dp(60),
    height: px2dp(78),
    backgroundColor: '#d7d7d5',
  },
  img_box: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: px2dp(8),
  },
  img_add: {
    width: px2dp(24),
    height: px2dp(24),
    resizeMode: 'cover',
  },
});

export default TRSignatureView;
