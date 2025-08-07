import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {EamNavBarView} from '@/components/assembly/TRNavbar';
import {BorderRadius, Gap, mTheme} from '#/theme';
import px2dp from '@utils/px2dp';
import {Colors, Fontsize} from '@theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {forEach} from 'lodash';
import TRInput from '@/components/assembly/TRInput';
import TRSelect from '@components/assembly/TRSelect';
import TRDateSelect from '@components/assembly/TRDateSelect';
import TRSignatureView from '@components/assembly/TRSignatureView';
import TRInfoImage from '@components/assembly/TRInfoImage';

const FORM_FILIATION = {
  input: TRInput,
  select: TRSelect,
  date: TRDateSelect,
  signature: TRSignatureView,
  infoImageForm: TRInfoImage,
};
export default class TRCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      formErrorMsg: {},
    };
  }

  onNavPress = props => {
    this.props.navigation.goBack();
  };

  changeFormData = (newFormData, errObj) => {
    console.log(newFormData, errObj);
    this.setState({
      formData: newFormData,
      formErrorMsg: errObj,
    });
  };

  _onRenderSchema = () => {
    let list = [];
    const listColumn = [
      {
        type: 'input',
        label: '编号',
        multiple: false,
        showSearch: true,
        formState: 'edit',
        maxTagCount: 2,
        id: 'number',
        showEdit: true,
        showNew: true,
        span: 24,
        isBorder: true,
      },
      {
        type: 'input',
        label: '编号x',
        multiple: false,
        showSearch: true,
        formState: 'edit',
        maxTagCount: 2,
        id: 'numbssser',
        showEdit: true,
        showNew: true,
        span: 24,
        isBorder: true,
      },
      {
        span: 24,
        display: true,
        showNew: true,
        showEdit: true,
        type: 'select',
        label: '故障分类',
        title: '故障分类',
        id: 'fault_type',
        props: {
          label: 'label',
          value: 'value',
          labels: [],
        },
        showSearch: true,
        response: {
          isLocal: true,
          dicData: [
            {
              label: '设备故障',
              value: 'asset_fault',
            },
            {
              label: '客户受累',
              value: 'customer_involved',
            },
            {
              label: '电网受累',
              value: 'electric_involved',
            },
            {
              label: '环境受累',
              value: 'environment_involved',
            },
          ],
          dicQueryConfig: [],
          otherParams: {},
        },
        rules: [
          {
            type: 'required',
            message: '选择故障分类',
          },
        ],
        bindIds: [],
        isBorder: true,
        placeholder: '请选择故障分类',
      },
      {
        type: 'date',
        label: '年月日',
        span: 24,
        display: true,
        isTime: true,
        isBorder: true,
        format: 'yyyy-MM-DD',
        id: 'azrq',
        showEdit: true,
        showNew: true,
      },
      {
        type: 'date',
        label: '年月日时分秒',
        span: 24,
        display: true,
        isTime: true,
        isBorder: true,
        format: 'yyyy-MM-DD HH:mm:ss',
        id: 'YYY',
        showEdit: true,
        showNew: true,
      },
      {
        type: 'date',
        label: '年月',
        span: 24,
        display: true,
        isTime: true,
        isBorder: true,
        format: 'yyyy-MM',
        id: 'YYYD',
        showEdit: true,
        showNew: true,
      },
      {
        type: 'signature',
        label: '签字',
        isList: true,
        span: 24,
        tagType: 'form',
        display: true,
        id: 'sign_single',
        formState: 'edit',
        multiple: false,
        showEdit: true,
        showNew: false,
        rules: [
          {
            type: 'required',
            message: '还有签名未签署',
          },
        ],
        otherTimes: [],
        bindIds: [],
      },
      {
        type: 'signature',
        label: '多个签字',
        isList: true,
        span: 24,
        tagType: 'form',
        display: true,
        id: 'sign_many',
        formState: 'edit',
        multiple: true,
        showEdit: true,
        showNew: false,
        rules: [
          {
            type: 'required',
            message: '还有签名未签署',
          },
        ],
        otherTimes: [],
        bindIds: [],
      },
      {
        type: 'infoImageForm',
        label: '上传图片',
        span: 24,
        tagType: 'form',
        display: true,
        id: 'in_detail_files',
        showEdit: true,
        showNew: false,
        isCanEdit: true,
        buttonText: '编辑',
        rules: [],
        bindIds: [],
      },
    ];
    const {formData} = this.state;
    forEach(listColumn, (n, index) => {
      const ItemComponent = FORM_FILIATION[n.type] || FORM_FILIATION.info;
      if (ItemComponent) {
        list.push(
          <ItemComponent
            formErrorMsg={this.state.formErrorMsg}
            {...this.props}
            formState={'edit'}
            key={`${n.id || ''}${n.type || ''}${index}index`}
            formData={formData}
            onChange={this.changeFormData}
            {...n}
          />,
        );
      }
    });
    return list;
  };

  render() {
    const {
      notShowTemporarily = false, //用来判断是否有暂存按钮
      notShowSave = false,
    } = this.props;
    return (
      <View style={styles.container}>
        <EamNavBarView
          onNavPress={this.onNavPress}
          navigation={this.props.navigation}
          title={'表单'}
          rightBtn={{
            optionType: 'delete',
            btnR: 'icon_delete',
            menuCode: 'DeleteFaultDetailApp',
          }}
          leftBtn={{
            btnL: 'icon-home',
            optionType: 'back',
          }}
        />
        <KeyboardAwareScrollView
          ref={this.scrollRef}
          scrollEventThrottle={6}
          scrollIndicatorInsets={{right: 1}}
          onMomentumScrollBegin={({nativeEvent: {contentOffset}}) => {}}
          extraHeight={px2dp(100 + 40)}
          style={[mTheme.container, mTheme.bg_Transparent]}>
          {this._onRenderSchema()}
        </KeyboardAwareScrollView>
        <View style={[mTheme.flex_row, styles.button_box]}>
          {!notShowTemporarily &&
            this._renderButton('TEMPORARILY', '暂存', {}, Colors.Orange, true)}
          {!notShowTemporarily && (
            <View
              style={{
                width: Gap.gap20,
              }}
            />
          )}
          {!notShowSave &&
            this._renderButton(
              'SAVE',
              '提交',
              Colors.Orange,
              Colors.White,
              true,
            )}
        </View>
        <View style={[mTheme.spaceHeight, {height: px2dp(30)}]} />
      </View>
    );
  }

  _renderButton(type, title, backgroundColor, textCol, isSubmit) {
    return (
      <TouchableOpacity
        style={[
          mTheme.container,
          mTheme.flex_row_center,
          mTheme.flex_column_center,
          mTheme.borer,
          styles.button,
          {backgroundColor: backgroundColor},
        ]}
        activeOpacity={0.9}
        onPress={() => {
          this.setState({
            formErrorMsg: {
              number: '测试错误',
            },
          });
        }}>
        <Text style={[styles.button_text, {color: textCol}]}>{title}</Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  button_box: {
    height: px2dp(46),
    paddingHorizontal: Gap.gap20,
    paddingTop: Gap.gap10,
  },
  button: {borderRadius: BorderRadius, borderColor: Colors.Orange},
  button_text: {color: Colors.White, fontSize: Fontsize.fs_14},
});
