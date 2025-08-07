import React, {Component} from 'react';

import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import _, {isEmpty} from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import ImageMarker from 'react-native-image-marker';
import px2dp from '@utils/px2dp';
import {ImageRes} from '@assets';
import {screenWidth} from '#/utils';
import {Browse, ImagePicker, Loading, Toast} from '#/component';
import {FORM_STATE} from '../helper';
import {BorderRadius, Colors, Fontsize, isAndroid, mTheme} from '@theme';
import Fs from '@utils/fs';

export class TRInfoImage extends Component {
  static propTypes = {
    onNavPress: PropTypes.func,
    globalProps: PropTypes.object,
    formData: PropTypes.object,
    schema: PropTypes.object,
    button: PropTypes.object,
    taskButtonConfig: PropTypes.object,
    promptMessage: PropTypes.object,
    contentStyle: PropTypes.object,
    formErrorMsg: PropTypes.object,
    itemStyle: PropTypes.object,
    formState: PropTypes.string,
    searchEditAble: PropTypes.bool,
    maxlengthShow: PropTypes.number,
    isEdit: PropTypes.bool,
    showPromptMessage: PropTypes.bool,
    showRequired: PropTypes.bool,
    display: PropTypes.bool,
    showTitle: PropTypes.bool,
    showBorder: PropTypes.bool,
    showRightTitle: PropTypes.bool,
    isCanEdit: PropTypes.bool,
    needMakeMaker: PropTypes.bool,
    id: PropTypes.string,
    showEditCount: PropTypes.number,
    layoutId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    widthReduce: PropTypes.number,
    maxlengthUpload: PropTypes.number,
    minLength: PropTypes.number,
    intervalNum: PropTypes.number,
    label: PropTypes.string,
    defaultKeyWord: PropTypes.string,
    holderText: PropTypes.string,
    toPage: PropTypes.string,
    title: PropTypes.string,
    childText: PropTypes.string,
    value: PropTypes.string,
    permissionMap: PropTypes.array,
    isMust: PropTypes.array,
    rules: PropTypes.array,
    onChange: PropTypes.func,
    markerType: PropTypes.string,
    onChangeErrorMsg: PropTypes.func,
    bindOtherLayout: PropTypes.func,
    hideImageArray: PropTypes.bool, //当前UI是否展示图片
    imageArray: PropTypes.array, //只传入图片数组，formData不可传值
    filesContainer: PropTypes.object,
    bottomStyle: PropTypes.object,
    labelStyle: PropTypes.object,
  };

  constructor(props) {
    super(props);
    let widthReduce = props.widthReduce || 60;
    this.state = {
      imageWidth: Math.floor((screenWidth - px2dp(widthReduce)) / 4),
      address: '-',
    };
  }

  async componentDidMount(): void {}

  componentWillUnmount() {
    this.locationMsg && this.locationMsg.remove();
  }

  _bindDetailBtn(toPage, type) {
    this.navigate(toPage, {
      props: {
        ...this.props,
        jumpType: type,
        makeMaker: async (item, address) => this.makeMaker(item, address),
      },
    });
  }

  _renderError(message, color = '#ff4d4f', show = false) {
    const {formErrorMsg = {}, id} = this.props;
    if (formErrorMsg[id] || show) {
      return (
        <View style={[styles.content, mTheme.flex_row, styles.error]}>
          <Text style={{color: color}}>{message || ''}</Text>
        </View>
      );
    }
    return null;
  }

  getImageUrl(isAdd, n = {}) {
    return isAdd ? n : {uri: n.id ? this.DQImageUrl(n.filePath) : n.filePath};
  }

  // isAdd判断是否是增加图片
  _renderImage(n, index, isAdd = false, isLast = false) {
    const {
      id,
      label,
      value,
      intervalNum = 0,
      maxlengthShow = 4,
      button = {},
      itemStyle = {},
      isCanEdit = false,
      isEdit = false,
      showTitle = true,
      showRightTitle = true,
      isMust = [],
      formData = {},
      maxlengthUpload = 20,
      // eslint-disable-next-line react/prop-types
      imageArray = [],
    } = this.props;
    const {imageWidth, address} = this.state;
    const arr = formData[id] || imageArray;
    const imgFile = this.getImageUrl(isAdd, n);
    return (
      <TouchableOpacity
        key={`${n.id || ''}${index}`}
        activeOpacity={0.85}
        style={[
          styles.imgbox,
          itemStyle,
          isLast ? {} : styles.mr,
          {width: imageWidth, height: imageWidth},
        ]}
        onPress={() => {
          let message = '';
          _.forEach(isMust, item => {
            if (_.isEmpty(formData[item.key])) {
              message = item.message;
              return false;
            }
          });
          if (message) {
            Toast.show(message);
            return;
          }
          if (isAdd) {
            this._selectedPartsClick(arr, maxlengthUpload, address);
          } else {
            let tempArr = arr.map(item => {
              let lt = this.getImageUrl(false, item);
              return {url: lt.uri};
            });
            Browse.show(tempArr, index);
          }
        }}>
        <Image
          style={[{width: imageWidth, height: imageWidth}]}
          source={imgFile}
          resizeMode={'cover'}
        />
        {isLast && arr.length > maxlengthShow && showTitle ? (
          <View
            style={[
              styles.mark,
              mTheme.flex_row,
              mTheme.flex_row_center,
              mTheme.flex_column_center,
            ]}>
            <Text style={styles.mark_text}>
              {'+' + (arr.length - maxlengthShow)}
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  }

  // async makeDefectMarker(item = {}, text) {
  //   return  await onGetMarkerPath({ path:path, name:name, scale:scale, text })
  // }

  async makeMaker(item, newAddress) {
    const {markerType = '', formData = {}} = this.props;
    const {address} = this.state;
    const {width, height, path = ''} = item;
    let scale = height < width ? height / 375 : width / 375;
    if (path.length === 0) {
      return path;
    }
    const addr =
      newAddress && newAddress != '-' && newAddress != ''
        ? newAddress
        : address;
    if (markerType == 'defect') {
      // ' \u2022 缺　陷：' + (formData.defect_num || " -") + '\n' +
      let text =
        ' \u2022 拍摄人：' +
        name +
        '\n' +
        ' \u2022 设　备：' +
        (formData?.asset_num_desc || ' -') +
        '\n' +
        ' \u2022 场　站：' +
        (formData?.farm_num_desc || ' -') +
        '\n' +
        ' \u2022 时　间：' +
        moment().format('YYYY-MM-DD HH:mm:ss') +
        '\n' +
        ' \u2022 地　点：' +
        addr;

      return await onGetMarkerPath({path: path, scale: scale, text, item});
      // return await this.makeDefectMarker(item, text);
    } else if (markerType == 'other') {
      let text =
        ' \u2022 拍摄人：' +
        name +
        '\n' +
        ' \u2022 时　间：' +
        moment().format('YYYY-MM-DD HH:mm:ss') +
        '\n' +
        ' \u2022 地　点：' +
        addr;

      return await onGetMarkerPath({path: path, scale: scale, text, item});
      // return await this.makeDefectMarker(item, text);
    } else {
      let text =
        ' \u2022 拍摄人：' +
        name +
        '\n' +
        ' \u2022 时　间：' +
        moment().format('YYYY-MM-DD HH:mm:ss') +
        '\n' +
        ' \u2022 地　点：' +
        addr;

      return await onGetMarkerPath({path: path, scale: scale, text, item});
      // return item.path;
    }
  }

  /**
   *
   * 选择图片
   * @private
   */
  _selectedPartsClick = async (arr = [], MAXIMAGE = 4, newAddress) => {
    const {
      onChange,
      formData = {},
      id,
      formErrorMsg,
      minLength = 0,
    } = this.props;
    const {address} = this.state;
    let photos = await ImagePicker.open(
      this._onCheckImageNumber.bind(this),
      MAXIMAGE - arr.length,
      null,
      true,
    );
    let list = [];
    this.setState({photos: JSON.stringify(photos)});
    Loading.show();
    let index = 0;
    while (index < photos.length) {
      const item = photos[index];
      const fileName = item.filename || Date.now() + '';
      const newItem = await this.makeMaker(item, newAddress || address);
      list.push({filePath: newItem, fileName});
      index++;
    }
    Loading.dismiss();
    let tempImages = formData[id] || [];
    let errorMsg = {...formErrorMsg};
    errorMsg[id] = photos.length >= minLength ? '' : errorMsg[id];
    formData[id] = tempImages.concat(list);
    onChange(formData, errorMsg);
  };

  _onCheckImageNumber() {
    const {id, formData = {}, maxlengthUpload = 4} = this.props;
    let listImage = formData[id] || [];
    if (listImage.length < maxlengthUpload) {
      this.lessNumber = maxlengthUpload - listImage.length;
      return true;
    }
    Toast.show('最多可以添加' + maxlengthUpload + '张');
    return false;
  }

  _onRenderStatus() {
    const {showStatusObj, formData} = this.props;
    if (!isEmpty(showStatusObj)) {
      const {valueKey, colorObj} = showStatusObj;
      const currentObj = colorObj[formData[valueKey]] ?? false;
      return (
        currentObj && (
          <View style={[styles.statusWrap, {backgroundColor: currentObj.bg}]}>
            <Text style={[styles.textIn, {color: currentObj.color}]}>
              {currentObj.text}
            </Text>
          </View>
        )
      );
    }
  }

  render() {
    //isEdit 用来判断是否是编辑状态 用来显示右上角的删除按钮，
    //maxlengthShow  最多显示的图片的数量 超过的不显示 在最后显示的一张上显示剩余没展示的数量
    //maxlengthUpload 允许上传的最多的数量 超过就不展示上传的按钮
    //isCanEdit 代表允许编辑 会展示上传的按钮
    //showEditCount 表示多少数量展示编辑的按钮
    const {
      id,
      formData = {},
      display,
      label,
      intervalNum = 0,
      maxlengthShow = 4,
      maxlengthUpload = 20,
      button = {},
      isCanEdit = false,
      showEditCount = 1,
      showBorder = false,
      showTitle = true,
      showRightTitle = true,
      holderText = '',
      childText = '',
      contentStyle = {},
      toPage = 'enclosure',
      formState = FORM_STATE.READ,
      rules = [],
      showRequired = false,
      formErrorMsg = {},
      promptMessage = {},
      showPromptMessage = false,
      // eslint-disable-next-line react/prop-types
      imageArray = [],
      hideImageArray,
      filesContainer,
      bottomStyle,
      labelStyle,
    } = this.props;
    let arr = formData[id] || imageArray;
    const isRead = formState === FORM_STATE.READ;
    if (!display) {
      //不可见
      return <View />;
    }
    const isRequired = !isRead
      ? rules.filter(n => n.type == 'required').length > 0
      : false;
    return (
      <View
        style={[
          styles.container,
          {marginTop: px2dp(intervalNum), flexDirection: 'row'},
          filesContainer,
        ]}>
        {isRequired || (showRequired && formState === FORM_STATE.EDIT) ? (
          <Text style={[styles.required, {marginTop: px2dp(10)}]}>*</Text>
        ) : null}
        <View style={[mTheme.flex_column_center, {flex: 1}]}>
          <View
            style={[
              styles.header,
              mTheme.flex_row,
              styles.title_dx,
              bottomStyle,
              {justifyContent: 'space-between', flex: 1},
            ]}>
            {showTitle ? (
              <Text
                style={[
                  mTheme.font_from_title,
                  isRead ? (labelStyle ? labelStyle : styles.title_style) : {},
                  {marginLeft: hideImageArray ? px2dp(10) : 0},
                ]}>
                {label}
              </Text>
            ) : (
              <Text
                style={[
                  mTheme.font_from_title,
                  {lineHeight: px2dp(20)},
                  styles.title_style,
                ]}>
                {holderText || ''}
              </Text>
            )}
            {/* 下面是展示第一行右面的编辑或者查看按钮的 */}
            {this._onRenderStatus()}
          </View>
          {childText.length > 0 && (
            <Text
              style={[
                {fontSize: Fontsize.fs_13, marginBottom: px2dp(8)},
                styles.title_style,
              ]}>
              {childText || '-'}
            </Text>
          )}
          {!hideImageArray && (
            <View style={[mTheme.container, mTheme.flex_row, contentStyle]}>
              {arr.map((n, index) => {
                const isLast = maxlengthShow - 1 === index;
                return (
                  index < maxlengthShow &&
                  this._renderImage(n, index, false, isLast)
                );
              })}
              {isCanEdit &&
                arr.length < showEditCount &&
                arr.length < maxlengthUpload &&
                this._renderImage(ImageRes.icon_add, 0, true)}
            </View>
          )}
          {/* 下面是提示信息 */}
          {showPromptMessage &&
            this._renderError(
              promptMessage.message || '',
              promptMessage.color || '',
              showPromptMessage,
            )}
          {/* 下面是错误提示信息 */}
          {!_.isEmpty(formErrorMsg[id]) && this._renderError(formErrorMsg[id])}
          {showBorder && <View style={styles.borer_bottom} />}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {paddingHorizontal: px2dp(20)},
  imgbox: {
    backgroundColor: '#F5F8FA',
    overflow: 'hidden',
    borderRadius: BorderRadius,
  },
  mr: {marginRight: px2dp(10)},
  header: {minHeight: px2dp(25), marginTop: px2dp(5), flex: 1},
  mark: {
    backgroundColor: '#00000066',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  mark_text: {fontSize: Fontsize.fs_20, color: Colors.White},
  arrow_button: {minHeight: px2dp(20)},
  required: {
    color: '#EC5A5C',
    fontSize: Fontsize.fs_14,
    lineHeight: px2dp(24),
    marginRight: 8,
    marginLeft: -15,
  },
  arrow_button_content: {
    borderWidth: px2dp(0.5),
    borderStyle: 'solid',
    borderColor: Colors.Orange,
    borderRadius: px2dp(2),
    paddingHorizontal: px2dp(32),
    paddingVertical: px2dp(1),
  },
  title_dx: {
    justifyContent: 'space-between',
    paddingTop: px2dp(6),
    marginBottom: px2dp(8),
    alignItems: 'center',
  },
  arrow_button_text: {color: '#FF9821', fontSize: Fontsize.fs_13},
  content: {paddingVertical: px2dp(6)},
  error: {fontSize: Fontsize.fs_13, marginBottom: px2dp(10)},
  title_style: {color: '#888E95'},
  borer_bottom: {
    marginTop: px2dp(10),
    backgroundColor: '#E5E5E5',
    height: px2dp(0.5),
  },
  statusWrap: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: px2dp(8),
    height: px2dp(24),
    borderRadius: 3,
  },
  textIn: {
    fontSize: 12,
    fontWeight: '400',
  },
});

export default TRInfoImage;

export const onGetMarkerPath = async ({
  scale,
  path,
  text,
  item = {},
  isNoCompress = false,
}) => {
  let textPath = await ImageMarker.markText({
    src: path,
    text: text,
    position: 'bottomLeft',
    color: '#ffffff',
    fontSize: scale * px2dp(isAndroid ? 5 : 11),
    scale: 1,
    textBackgroundStyle: {
      paddingX: px2dp(10),
      paddingY: px2dp(10),
    },
    quality: 80,
  });
  let bottomRightPath = await ImageMarker.markImage({
    src: Platform.OS === 'android' ? 'file://' + textPath : textPath,
    markerSrc: ImageRes.marker_icon,
    position: 'bottomRight',
    scale: 1,
    markerScale: isAndroid ? scale / 20 : scale / 3,
    quality: 80,
  });
  const newUri =
    Platform.OS === 'android' ? 'file://' + bottomRightPath : bottomRightPath;
  if (isNoCompress) {
    return newUri;
  }
  const compressPath = await Fs.compress({...item, path: newUri});
  return compressPath.uri;
  // return Platform.OS === 'android' ? 'file://' + bottomRightPath : bottomRightPath;
};
