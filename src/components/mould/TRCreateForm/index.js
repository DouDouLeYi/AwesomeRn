import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {EamNavBarView} from '#/component/TRNavbar';
import {BorderRadius, Gap, mTheme} from '#/theme';
import px2dp from '@utils/px2dp';
import {Colors, Fontsize} from '@theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {forEach} from 'lodash';
import TRInput from '@/components/assembly/TRInput';

const FORM_FILIATION = {
  input: TRInput,
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
        label: '编号',
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
