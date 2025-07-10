'use strict';

import {Dimensions, StyleSheet} from 'react-native';

const deviceW = Dimensions.get('window').width;

// UI 默认给图是 750
const uiWidthPx750 = 750;

const uiWidthPx640 = 640;

export default function px2dp(uiElementPx, isPX750 = true) {
  const transferNumb =
    (uiElementPx * 2 * deviceW) / (isPX750 ? uiWidthPx750 : uiWidthPx640);
  if (transferNumb >= 1) {
    // 避免出现循环小数
    return Math.ceil(transferNumb);
  }
  return StyleSheet.hairlineWidth;
}
