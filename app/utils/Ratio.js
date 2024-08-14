'use strict';

import {Dimensions, StyleSheet} from 'react-native';

const deviceW = Dimensions.get('window').width;

// UI 默认给图是 750
const uiWidthPx = 750;

export default function px2dp(uiElementPx) {
  const transferNumb = (uiElementPx * deviceW) / uiWidthPx;

  if (transferNumb >= 1) {
    // 避免出现循环小数
    return Math.ceil(transferNumb);
  }
  return StyleSheet.hairlineWidth;
}
