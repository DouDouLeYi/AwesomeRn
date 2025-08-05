import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

const iPhone6AndAbove = height / width > 1.775 ? true : false;
const isAndroid = Platform.OS === 'android';

const Fsize = {
  fs_30: isAndroid ? 30 : iPhone6AndAbove ? 31 : 30,
  fs_24: isAndroid ? 24 : iPhone6AndAbove ? 25 : 24,
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
};

export default {
  screenWidth: width,
  screenHeight: height,
  Fsize: Fsize,
  isAndroid: isAndroid,
  isIos: Platform.OS === 'ios',
};
