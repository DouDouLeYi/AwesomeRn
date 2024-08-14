import {Dimensions} from 'react-native';

export const screenW = Dimensions.get('window').width; //  设备的宽度
export const screenH = Dimensions.get('window').height; // 设备的高度
// 像素密度
export const DEFAULT_DENSITY = 2;
const defaultWidth = 375;
const defaultHeight = 667;
const w2 = defaultWidth / DEFAULT_DENSITY;
// px转换成dp
const h2 = defaultHeight / DEFAULT_DENSITY;

// 缩放比例
const _scaleWidth = screenW / defaultWidth;
const _scaleHeight = screenH / defaultHeight;

export function scaleSize(size) {
  return size * _scaleWidth;
}
