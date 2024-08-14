import {Dimensions, Platform, StyleSheet} from 'react-native';
import {px2dp} from '../utils';
export const isAndroid = Platform.OS === 'android' ? true : false;
const {width, height} = Dimensions.get('window');
const iPhone6AndAbove = height / width > 1.775 ? true : false;

/** 颜色资源 **/
export const Colors = {
  White: '#FFF',
  bg: '#FFF',
  BgGrey: '#f5f5f5',
  Grey: '#F5F8FA',
  transparent: 'transparent',
  Blue: '#2F80ED',
  Black: '#000000',
  Orange: '#FF9821',
  borderColor: '#E5E5E5',
  textColor: '#1F1F1F',
  placeholderTextColor: '#888E95',
  margin20: px2dp(20),
  Red: '#FF0000',
};

/** 距离 **/
export const Gap = {
  gap20: px2dp(20),
  gap10: px2dp(10),
};

export const BorderRadius = 4;

/**
 * 字体大小 s
 * @type {{}}
 */
export const Fontsize = {
  fs_35: isAndroid ? 35 : iPhone6AndAbove ? 36 : 35,
  fs_30: isAndroid ? 30 : iPhone6AndAbove ? 31 : 30,
  fs_24: isAndroid ? 24 : iPhone6AndAbove ? 25 : 24,
  fs_26: isAndroid ? 26 : iPhone6AndAbove ? 26 : 25,
  fs_22: isAndroid ? 22 : iPhone6AndAbove ? 23 : 22,
  fs_20: isAndroid ? 20 : iPhone6AndAbove ? 21 : 20,
  fs_18: isAndroid ? 18 : iPhone6AndAbove ? 19 : 18,
  fs_17: isAndroid ? 17 : iPhone6AndAbove ? 18 : 17,
  fs_16: isAndroid ? 16 : iPhone6AndAbove ? 17 : 16,
  fs_15: isAndroid ? 15 : iPhone6AndAbove ? 16 : 15,
  fs_14: isAndroid ? 14 : iPhone6AndAbove ? 15 : 14,
  fs_13: isAndroid ? 13 : iPhone6AndAbove ? 14 : 13,
  fs_12: isAndroid ? 12 : iPhone6AndAbove ? 13 : 12,
  fs_11: isAndroid ? 11 : iPhone6AndAbove ? 12 : 11,
  fs_10: isAndroid ? 10 : iPhone6AndAbove ? 11 : 10,
  fs_9: isAndroid ? 9 : iPhone6AndAbove ? 10 : 9,
  fs_8: isAndroid ? 8 : iPhone6AndAbove ? 9 : 8,
};

export const mTheme = StyleSheet.create({
  container: {flex: 1}, //flex 1,
  bg_White: {backgroundColor: Colors.bg},
  bg_Transparent: {backgroundColor: Colors.transparent},
  bg_Grey: {backgroundColor: Colors.Grey},
  bg_Red: {backgroundColor: Colors.Red},
  flex_row: {display: 'flex', flexDirection: 'row'},
  flex_column: {display: 'flex', flexDirection: 'column'},
  flex_row_center: {alignItems: 'center'},
  flex_column_center: {justifyContent: 'center'},
  font_14: {fontSize: Fontsize.fs_14},
  text_white: {color: Colors.White},
  rotate180: {transform: [{rotate: '180deg'}]},
  rotate90: {transform: [{rotate: '90deg'}]},
  rotate_90: {transform: [{rotate: '270deg'}]},
  borer: {
    borderColor: Colors.borderColor,
    borderStyle: 'solid',
    borderWidth: px2dp(0.5),
  },
  borer_bottom: {
    borderBottomColor: Colors.borderColor,
    borderStyle: 'solid',
    borderBottomWidth: px2dp(0.5),
  },
  /**表单卡片样式*/
  card_from: {
    backgroundColor: Colors.bg,
    overflow: 'hidden',
  },
  borderRadius: {borderRadius: px2dp(BorderRadius)},
  card_from_margin: {marginHorizontal: Gap.gap20},
  font_title: {
    fontSize: Fontsize.fs_15,
    lineHeight: px2dp(22),
    color: Colors.textColor,
    fontWeight: '500',
  },
  from_padding_horizontal: {paddingHorizontal: px2dp(20)},
  from_padding_vertical: {paddingVertical: px2dp(10)},
  placeholderStyle: {color: Colors.placeholderTextColor},
  font_from_title: {
    fontSize: Fontsize.fs_13,
    lineHeight: px2dp(18),
    color: Colors.textColor,
  },
  list_from_title: {
    fontSize: Fontsize.fs_16,
    paddingVertical: px2dp(4),
    color: Colors.textColor,
  },
  spaceHeight: {height: px2dp(20), width: 1},
});
