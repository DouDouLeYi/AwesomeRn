import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  DeviceEventEmitter,
} from 'react-native';
import React from 'react';
import {mTheme, Colors, Fontsize} from '../../theme';
import PropTypes from 'prop-types';
import {isAndroid, NavConfig, px2dp, statusBarHeight} from '../../utils';
import toast from '../toast';
import {ImageRes} from '../../assets/Assets';

function checkPermision() {
  return true;
}

export const NAV_STATE = {
  BACK: 'back',
  DROPDOWN: 'dropdown',
  EDIT: 'edit',
  EAM_EDIT: 'eam-icon-edit',
  CREATE: 'create',
  SAVE: 'save',
  CANCEL: 'cancel',
  SHEET_PANEL: 'sheetPanel',
  CREAT_SHEET_PANEL: 'creatSheetPanel',
  MAIL: 'mail',
  JUMP: 'jump',
  WARK: 'wark',
  MORE: 'more',
  SHARE: 'share',
  CHECK_OFFLINE: 'check_offline',
  SAVE_FORM_DATA: 'saveFormData',
  DELETE: 'delete',
  ADD_FILE: 'addFile',
  SHAREQRCODE: 'shareQrcode',
};
// 头部两边按钮的长度
const btnBoxWidth = 90;
/**
 * 返回按钮
 * * @                    544
 * param  {[type]} options.onPress [description]
 * @return {[type]}                 [description]
 */
export const BackImgBtn = () => (
  <Image
    resizeMode="contain"
    style={{height: 18, width: 34}}
    source={require('./ic_back.png')}
  />
);
export const WhiteImgBtn = ({style}) => (
  <Image
    resizeMode="contain"
    style={[{height: 18, width: 34}, style]}
    source={require('./ic_white.png')}
  />
);

/**
 * eam导航
 */
const RightModel = {
  'icon-edit': {
    image: ImageRes.eam_editor,
    image_disable: ImageRes.eam_editor_disable,
  },
  'icon-add': {
    image: ImageRes.eam_add,
    image_disable: ImageRes.eam_add_disable,
  },
  'icon-filter': {image: ImageRes.eam_editor},
  'icon-back': {image: require('./ic_back.png')},
  icon_close: {image: ImageRes.close_black},
  'icon-white': {image: require('./ic_white.png')},
  'nav-home': {image: ImageRes.nav_home},
  'icon-menu_down': {image: ImageRes.menu_down},
  icon_delete: {
    image: ImageRes.eam_delete,
    image_disable: ImageRes.eam_delete,
  },
  'icon-calendar': {image: ImageRes.icon_calendar},
  'icon-home': {image: ImageRes.icon_home},
  'icon-more': {image: ImageRes.icon_more},
  'eam-icon-edit': {image: ImageRes.icon_edit},
  'icon-mail': {image: ImageRes.icon_mail},
  'icon-delete': {image: ImageRes.icon_delete_white},
  'icon-qrCode': {image: ImageRes.qrCode},
};

class NavButton extends React.PureComponent {
  static propTypes = {
    isLeft: PropTypes.bool,
    isWhite: PropTypes.bool,
    btnC: PropTypes.string,
    btnL: PropTypes.string,
    optionType: PropTypes.string,
    btnR: PropTypes.string,
    onNavPress: PropTypes.func,
    button: PropTypes.object,
    permissionMap: PropTypes.array,
    offLine: PropTypes.bool,
    btnLCheck: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      dropDownKey: '',
      btnLCheck: false,
    };
  }

  componentDidMount() {
    //新增离线数据刷新右上角(right)add状态 offLine是否离线状态 btnLCheck add是否有权限
    const {btnLCheck = false, offLine = false} = this.props;
    if (offLine) {
      this.setState({btnLCheck});
    }
    this.updateNavBar = DeviceEventEmitter.addListener('updateNavBar', data => {
      this.setState({btnLCheck: data.isCreate});
    });
  }

  componentWillUnmount() {
    this.updateNavBar && this.updateNavBar.remove();
  }

  render() {
    let {
      isLeft,
      btnC = '',
      btnL = '',
      btnR = '',
      button = {},
      optionType = '',
      permissionMap = [],
      isWhite = false,
      onNavPress,
      offLine = false,
    } = this.props;
    //导致icon-home配置不会生效
    //解决eam返回按钮太小，影响体验。所以重置返回首页按钮，只保留返回按钮
    btnL = btnL == 'icon-home' ? 'icon-back' : btnL;
    if (btnL === 'icon-home') {
      return (
        <View style={[styles.left, styles.buttonbox, styles.home_back_box]}>
          <View style={[styles.home_back]}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                mTheme.container,
                styles.middleCenter,
                {
                  justifyContent: 'center',
                  height: px2dp(55),
                },
              ]}
              onPress={() => {
                onNavPress(this.props);
              }}>
              <Image
                resizeMode="contain"
                style={[styles.navBackLeft]}
                source={RightModel['icon-back'].image}
              />
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                mTheme.container,
                styles.middleCenter,
                {
                  justifyContent: 'center',
                  height: px2dp(55),
                  paddingLeft: px2dp(3),
                  paddingRight: px2dp(5),
                },
              ]}
              onPress={() => {
                onNavPress(this.props, btnL);
              }}>
              <Image
                resizeMode="contain"
                style={[styles.navBackHome]}
                source={RightModel['icon-home'].image}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    const {dropDownKey, btnLCheck} = this.state;
    const leftImg = RightModel[btnL];
    const rightImg = RightModel[btnR];
    let btnStr = btnC;
    let textColor = '#1F1F1F';
    if (dropDownKey.length > 0 && optionType === NAV_STATE.DROPDOWN) {
      btnStr = dropDownKey;
    }
    if (isWhite) {
      textColor = '#FFFFFF';
    } else if (optionType === NAV_STATE.DROPDOWN) {
      textColor = '#1F1F1F';
    } else if (optionType === NAV_STATE.CANCEL) {
      textColor = '#888E95';
    } else if (
      optionType === NAV_STATE.SAVE ||
      optionType === NAV_STATE.EDIT ||
      optionType === NAV_STATE.SAVE_FORM_DATA
    ) {
      textColor = '#FF9821';
    } else if (optionType === NAV_STATE.CHECK_OFFLINE) {
      textColor = '#1E7CE8';
    }
    let isCheckAdd = checkPermision(button, permissionMap);
    //新增离线数据刷新右上角(right)add状态 offLine是否离线状态 btnLCheck add是否有权限
    if (rightImg && offLine) {
      isCheckAdd = btnLCheck || this.props?.btnLCheck;
    }
    if (btnL === NAV_STATE.EAM_EDIT) {
      return (
        <View style={[styles.right, styles.buttonbox, styles.home_back_box]}>
          <View style={[styles.edit]}>
            <TouchableOpacity
              activeOpacity={1}
              style={[
                mTheme.container,
                styles.middleCenter,
                {justifyContent: 'center'},
              ]}
              onPress={() => {
                onNavPress(this.props, btnL);
              }}>
              {leftImg ? (
                <Image
                  resizeMode="contain"
                  style={[styles.navBack]}
                  source={leftImg.image}
                />
              ) : null}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={1}
              style={[
                mTheme.container,
                styles.middleCenter,
                {
                  justifyContent: 'center',
                  paddingLeft: px2dp(3),
                  paddingRight: px2dp(5),
                },
              ]}
              onPress={() => {
                onNavPress(this.props);
              }}>
              {rightImg ? (
                <Image
                  resizeMode="contain"
                  style={styles.navBack}
                  source={
                    checkPermision(button, permissionMap)
                      ? rightImg.image
                      : rightImg.image_disable
                  }
                />
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => {
          if (!checkPermision(button, permissionMap)) {
            toast.info(button.menuMsg);
            return;
          }
          onNavPress(this.props);
        }}
        activeOpacity={0.85}
        style={[
          isLeft ? styles.left : styles.right,
          mTheme.flex_row,
          mTheme.flex_row_center,
          styles.buttonbox,
        ]}>
        {leftImg ? (
          <Image
            resizeMode="contain"
            style={[styles.navBack]}
            source={leftImg.image}
          />
        ) : null}
        {btnC.length > 0 ? (
          <Text
            style={[
              {
                fontSize: px2dp(34),
                color: textColor,
                textAlign: isLeft ? 'left' : 'right',
              },
              isWhite ? mTheme.text_white : {},
              checkPermision(button, permissionMap) ? {} : {color: '#888E95'},
            ]}>
            {btnStr}
          </Text>
        ) : (
          <View style={{flex: 1}} />
        )}
        {rightImg ? (
          <Image
            resizeMode="contain"
            style={styles.navBack}
            source={isCheckAdd ? rightImg.image : rightImg.image_disable}
          />
        ) : null}
      </TouchableOpacity>
    );
  }
}

export class EamNavBarView extends React.PureComponent {
  static propTypes = {
    isLeft: PropTypes.bool,
    isTransparent: PropTypes.bool,
    isWhite: PropTypes.bool,
    btnC: PropTypes.string,
    btnL: PropTypes.string,
    optionType: PropTypes.string,
    btnR: PropTypes.string,
    label: PropTypes.string,
    title: PropTypes.string,
    onNavPress: PropTypes.func,
    button: PropTypes.object,
    onChangeErrorMsg: PropTypes.func,
    formData: PropTypes.object,
    globalProps: PropTypes.object,
    permissionMap: PropTypes.array,
    schema: PropTypes.object,
    leftBtn: PropTypes.object,
    rightBtn: PropTypes.object,
    allRules: PropTypes.object,
    bottomLine: PropTypes.object,
    offLine: PropTypes.bool,
  };

  render() {
    const {
      title,
      permissionMap = [],
      formData = {},
      globalProps = {},
      leftBtn,
      navigation,
      rightBtn,
      onNavPress = () => {},
      label,
      isWhite = false,
      isTransparent = false,
      allRules,
      onChangeErrorMsg,
      schema,
      bottomLine,
      offLine = false,
    } = this.props;
    return (
      <View style={[styles.navbox, styles.navMarginTop]}>
        <View style={{height: statusBarHeight}} />
        <View style={[styles.middleCenter, styles.flex]}>
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              isTransparent || isWhite ? mTheme.text_white : {},
            ]}>
            {title || label}
          </Text>
          {leftBtn ? (
            <NavButton
              navigation={navigation}
              onChangeErrorMsg={onChangeErrorMsg}
              allRules={allRules}
              permissionMap={permissionMap}
              schema={schema}
              onNavPress={onNavPress}
              formData={formData}
              isLeft
              offLine={offLine}
              {...leftBtn}
            />
          ) : null}
          {rightBtn ? (
            rightBtn.btnText ? (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.rightTextContainer}
                onPress={() => onNavPress(this.props)}>
                <Text style={{fontSize: Fontsize.fs_14}}>
                  {rightBtn.btnText}
                </Text>
              </TouchableOpacity>
            ) : (
              <NavButton
                navigation={navigation}
                onChangeErrorMsg={onChangeErrorMsg}
                allRules={allRules}
                permissionMap={permissionMap}
                globalProps={globalProps}
                schema={schema}
                onNavPress={onNavPress}
                formData={formData}
                button={rightBtn}
                offLine={offLine}
                {...rightBtn}
              />
            )
          ) : null}
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  navbox: {
    backgroundColor: '#fff',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  middleCenter: {flexDirection: 'row', alignItems: 'center'},
  flex: {marginTop: 10, paddingHorizontal: px2dp(5)},
  title: {
    fontSize: px2dp(34),
    // marginHorizontal: px2dp(screenW * 0.4),
    marginHorizontal: btnBoxWidth + px2dp(30),
    color: '#1F1F1F',
    textAlign: 'center',
    flex: 1,
  },
  buttonbox: {
    minWidth: btnBoxWidth,
    position: 'absolute',
    top: isAndroid ? 0 : 0,
    marginTop: 5,
    zIndex: 2,
    bottom: 0,
  },
  left: {left: px2dp(30)},
  navBack: {minHeight: 18, minWidth: 10, maxHeight: 24, maxWidth: 24},
  navBackLeft: {height: px2dp(34), width: px2dp(22)},
  navBackHome: {height: px2dp(44), width: px2dp(44)},
  right: {right: px2dp(30), justifyContent: 'flex-end'},
  line: {backgroundColor: '#E5E5E5', height: px2dp(40), width: px2dp(0.5)},
  home_back_box: {flexDirection: 'row', alignItems: 'center'},
  home_back: {
    flex: 1,
    flexDirection: 'row',
    height: px2dp(65),
    width: px2dp(130),
    alignItems: 'center',
    borderColor: '#E5E5E5',
    borderWidth: px2dp(0.5),
    borderRadius: px2dp(30),
  },
  edit: {
    flex: 1,
    flexDirection: 'row',
    height: px2dp(55),
    width: px2dp(130),
    alignItems: 'center',
  },
  rightTextContainer: {
    marginTop: px2dp(20),
    justifyContent: 'center',
    alignItems: 'center',
    height: px2dp(60),
    width: px2dp(90),
  },
});
