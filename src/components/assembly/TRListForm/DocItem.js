import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {Browse} from '#component';
import {Fontsize, mTheme} from '@theme';
import px2dp from '@utils/px2dp';
import {ICON_LIST, ImageTypeList} from '@/components/assembly/helper';
import {FORM_STATE} from '../helper';
import {ImageRes} from '@assets';
import {Alert} from '../../../../app/component';

const IMAGE_FORMAT = ['jpg', 'png', 'jpeg'];

class DocItem extends Component {
  static propTypes = {
    des: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    fileId: PropTypes.string,
    value: PropTypes.object,
    formData: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      keywords: '',
    };
  }

  _actionEvents(formData) {
    const {filePath, fileName, file} = formData;
    const newPath = formData.filePath;
    const lowerType = _.toLower(fileName || file); //统一小写类型
    if (IMAGE_FORMAT.some(item => lowerType.lastIndexOf(item) != -1)) {
      //图片展示
      Browse.show([{url: newPath}]);
    } else {
      let isPdf = false;
      if (lowerType.lastIndexOf('pdf') !== -1) {
        isPdf = true;
      }
      this.props.navigation.push('lookDocument', {
        filePath: newPath,
        fileName: fileName || file,
        isPdf,
        isLocal: !formData.id,
      });
    }
  }

  /**
   * 删除图片
   * @param selIndex
   * @returns {Promise<void>}
   * @private
   */
  deleteImage = async () => {
    const {
      dataList,
      formData,
      removeFileIds = [],
      id,
      globalProps = {},
      refreshLocalList,
      onChange,
    } = this.props;
    let removeIds = removeFileIds.length
      ? removeFileIds
      : formData?.removeFileIds || [] || [];
    let removeId = formData.id;
    const alert = await Alert.alert(
      '确认删除?',
      [
        {type: 'cancel', name: '取消'},
        {type: 'ok', name: '确定'},
      ],
      true,
    );
    if (alert.index === 1) {
      const arr = dataList?.filter(m => m.fileName !== formData.fileName);
      if (removeId) {
        removeIds.push(removeId);
      }
      let newFormData = {};
      newFormData[id] = arr;
      newFormData.removeFileIds = removeIds;
      refreshLocalList && refreshLocalList(newFormData);
    }
  };

  render() {
    const {
      refreshLocalList,
      label,
      dataList = [],
      formState = FORM_STATE.READ,
      isList,
      formData,
      isFileSelect,
      isLast = false,
    } = this.props;
    let icon;
    let fileName = formData.fileName || formData.file || '';
    let index = fileName.lastIndexOf('.');
    if (index !== -1) {
      let fileType = fileName.substring(
        fileName.lastIndexOf('.') + 1,
        fileName.length,
      );
      let iconInfo = ICON_LIST[fileType] || ICON_LIST.unknown;
      if (ImageTypeList.includes(fileType.toLowerCase())) {
        iconInfo = ICON_LIST.image;
      }
      icon = iconInfo.icon;
    } else {
      icon = ICON_LIST.unknown.icon;
    }

    return (
      <TouchableOpacity
        key={label}
        style={[
          styles.cell,
          mTheme.bg_White,
          isFileSelect ? styles.file_select : {},
          {paddingHorizontal: isList ? px2dp(20) : 0},
        ]}
        activeOpacity={0.85}
        onPress={() => {
          this._actionEvents(formData);
        }}>
        <Image resizeMode="contain" style={styles.cell_icon} source={icon} />
        <View
          style={[
            mTheme.container,
            mTheme.flex_column_center,
            isLast ? {} : mTheme.borer_bottom,
            isFileSelect ? styles.file_select_view : {},
          ]}>
          <Text
            numberOfLines={isFileSelect ? 2 : 1}
            style={[
              mTheme.list_from_title,
              styles.cell_title,
              isFileSelect ? styles.file_select_title : {},
            ]}>
            {formData.fileName || formData.file || '-'}
          </Text>
          <Text
            style={[
              mTheme.font_from_title,
              mTheme.placeholderStyle,
              styles.cell_content,
              isFileSelect ? styles.cell_content_select : {},
            ]}>
            {formData.createTime ? '上传于' + formData.createTime : ''}
          </Text>
        </View>
        {formState === FORM_STATE.READ ? null : (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.delete}
            onPress={this.deleteImage}>
            <Image
              style={{width: px2dp(14), height: px2dp(14)}}
              source={ImageRes.icon_delete}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  delete: {
    height: '100%',
    width: px2dp(30),
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  file_select: {
    paddingLeft: 0,
    height: px2dp(70),
  },
  cell: {
    height: px2dp(90),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: px2dp(20),
  },
  cell_icon: {height: px2dp(50), width: px2dp(50)},
  file_select_view: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  cell_title: {
    marginLeft: px2dp(10),
    marginRight: px2dp(20),
    marginTop: px2dp(30),
  },
  file_select_title: {
    marginTop: 0,
    display: 'flex',
    fontSize: Fontsize.fs_13,
  },
  cell_content: {marginLeft: px2dp(10), flex: 1},
  cell_content_select: {
    flex: 0,
    marginBottom: px2dp(10),
    fontSize: Fontsize.fs_12,
  },
  cell_arrow: {height: px2dp(8), width: px2dp(8), marginLeft: px2dp(14)},
});

export default DocItem;
