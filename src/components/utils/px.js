import {PixelRatio, StyleSheet} from 'react-native';

import cst from './const';

// 适配屏幕的方法
export default function(size: number): number {
  const computed = cst.screenWidth / (750 / size);
  if (computed >= 1) {
    // 避免出现循环小数
    return Math.ceil(computed);
  }
  return StyleSheet.hairlineWidth;
}
