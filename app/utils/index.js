import {Dimensions, Platform} from 'react-native';
import {
  isIPhoneWithMonobrow,
  getStatusBarHeight,
  isIPhoneWithDynamicIsland,
} from './statusBarHeight';
const {width, height} = Dimensions.get('window');

export const screenWidth = width;
export const screenHeight = height;
export const isAndroid = Platform.OS === 'android';
export const isIos = Platform.OS === 'ios';
export const isIphonex = isIPhoneWithMonobrow() || isIPhoneWithDynamicIsland();
export const NavConfig = {
  height: isAndroid ? 50 : isIphonex ? 88 : 64,
  top: isAndroid ? 20 : isIphonex ? 60 : 20,
};

export const statusBarHeight = getStatusBarHeight();

export {default as px2dp} from './Ratio';
