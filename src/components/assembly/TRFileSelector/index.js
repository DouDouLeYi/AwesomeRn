import React from 'react';
import {isTRArray} from '@utils/attribute';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {px2dp} from '../../../utils';
import {FORM_STATE} from '../helper';
import {Colors, Fontsize, mTheme} from '@theme';
import DocItem from '../TRListForm/DocItem';
import {ImageRes} from '@assets';
import {screenWidth} from '#/utils';
import Fs from '@utils/fs';
import {Toast} from '#/component';
import moment from 'moment';

const imageWidth = Math.floor((screenWidth - px2dp(60)) / 4);

function TRFileSelector(props) {
  const {
    id,
    label,
    rules,
    button = {},
    formState,
    style = {},
    formData,
    isBorder,
    intervalNum,
    onChange,
    formErrorMsg,
    navigation,
    globalProps,
    listId = 'dataList',
    maxlengthUpload = 4,
    showAll = false,
    readonly,
    layoutId,
    limitDoc = false, // 限制 pdf doc xlx
    limitType = [],
    compState,
  } = props;

  // useEffect(() => {
  //   // 流程中数据置空
  //   if(!readonly &&[218].includes(Number(layoutId))) {
  //     onChange({...formData, [id]: null})
  //   }
  // }, [])

  const renderRequired = () => {
    const isEdit = formState !== FORM_STATE.READ;
    const isRequired = isEdit
      ? rules?.filter(n => n.type === 'required').length > 0
      : false;
    if (!isRequired) return null;
    return <Text style={styles.required}>*</Text>;
  };

  const refreshList = (list, item, isAdd = false, newFormData) => {
    const errorMsg = {...formErrorMsg};
    if (isAdd) {
      let tempImages = formData[id] || [];
      if (tempImages?.length > maxlengthUpload)
        return Toast.show(`最多可以添加${maxlengthUpload}个附件`);
      // formData[id] = tempImages.concat([item]);
      formData[id] = list;
      onChange({...formData, ...newFormData}, errorMsg);
    } else {
      //不是添加就是删除,可在这里添加删除id
      delete newFormData.dataList;
      formData[id] = list || [];
      onChange({...formData, ...newFormData}, errorMsg);
    }
  };

  const renderButton = () => {};

  const renderLabel = () => {
    const value = formData?.[id] || [];
    const files = isTRArray(value) ? value : [value];
    return (
      <View
        style={[
          mTheme.flex_row,
          mTheme.flex_row_center,
          {flex: 1, minHeight: px2dp(25)},
        ]}>
        {renderRequired()}
        <Text
          style={[
            mTheme.container,
            mTheme.font_from_title,
            formState === FORM_STATE.READ ? styles.title_style : {},
          ]}>
          {label}
          {files?.length > 0 ? `(${files.length})` : ''}
        </Text>
        {renderButton()}
      </View>
    );
  };

  const selectFile = async () => {
    let tempImages = formData[id] || [];
    if (tempImages?.length > maxlengthUpload)
      return Toast.show(`最多可以添加${maxlengthUpload}个附件`);
    const {filePath, fileType} = await Fs.selectFile({
      title: label,
      limitDoc,
      limitType,
    });
    const errorMsg = {...formErrorMsg};
    const [fileName] = filePath?.split?.('/')?.slice?.(-1) || [''];
    const createTime = moment().format('YYYY-MM-DD HH:mm');
    const file = {
      fileName: decodeURIComponent(fileName),
      fileType,
      filePath,
      createTime,
    };
    formData[id] = tempImages.concat([file]);
    errorMsg[id] = formData[id]?.length > 0 ? '' : errorMsg[id];
    onChange(formData, errorMsg);
  };

  const refreshLocalList = newFormData => {
    const {formData, onChange} = props;
    const errorMsg = {...formErrorMsg};
    errorMsg[id] = formData[id]?.length > 0 ? '' : errorMsg[id];
    onChange && onChange({...formData, ...newFormData});
  };

  const renderDoc = files => {
    if (showAll) {
      return files?.map(item => {
        return (
          <DocItem
            {...props}
            isLast={true}
            formState={compState || FORM_STATE.READ}
            isFileSelect
            formData={item}
            label={label}
            refreshLocalList={refreshLocalList}
          />
        );
      });
    }
    const [file] = files || [{}];
    return (
      <DocItem
        {...props}
        isLast={true}
        formState={FORM_STATE.READ}
        isFileSelect
        formData={file}
        label={label}
      />
    );
  };

  const renderPlusButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={selectFile}
        style={styles.add_button}>
        <Image style={styles.add} source={ImageRes.add} resizeMode={'cover'} />
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    const files = formData?.[id] || [];
    if (!files?.length) {
      if (props?.compState === FORM_STATE.READ) return <Text>-</Text>;
      return renderPlusButton();
    }
    return renderDoc(files);
  };

  const renderBorder = () => {
    if (!isBorder) return null;
    return <View style={[mTheme.borer_bottom, {marginTop: px2dp(8)}]} />;
  };

  const renderError = () => {
    const error = formErrorMsg?.[id] || '';
    if (!error?.length) return null;
    return (
      <View style={[mTheme.flex_row, styles.error]}>
        <Text style={{color: '#ff4d4f'}}>{error}</Text>
      </View>
    );
  };

  return (
    <View
      style={[
        style,
        styles.header,
        mTheme.flex_column,
        mTheme.from_padding_horizontal,
        {marginTop: px2dp(intervalNum)},
      ]}>
      {renderLabel()}
      {renderContent()}
      {renderError()}
      {renderBorder()}
    </View>
  );
}

export default TRFileSelector;

const styles = StyleSheet.create({
  error: {fontSize: Fontsize.fs_13, marginTop: px2dp(8)},
  header: {minHeight: px2dp(25), marginTop: px2dp(5), paddingTop: px2dp(6)},
  title_style: {color: '#888E95'},
  add_button: {
    width: imageWidth,
    height: imageWidth,
    marginTop: px2dp(3),
  },
  add: {
    width: imageWidth,
    height: imageWidth,
  },
  required: {
    color: '#EC5A5C',
    fontSize: Fontsize.fs_14,
    lineHeight: px2dp(24),
    marginRight: 8,
    marginLeft: -15,
  },
  button: {
    textAlign: 'center',
    fontSize: Fontsize.fs_13,
    color: Colors.Orange,
    paddingHorizontal: px2dp(32),
    lineHeight: px2dp(20),
    borderRadius: px2dp(3),
    marginLeft: px2dp(10),
    borderColor: Colors.Orange,
    borderWidth: px2dp(0.5),
    borderStyle: 'solid',
  },
});
