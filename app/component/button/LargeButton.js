import React, {PureComponent} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import TouchableOpacity from '../TRTouchableOpacity';
import {Colors, Fsize} from '../../assets/Assets';
import {scaleSize} from '../../utils/ScreenUtil';

export default class LargeButton extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
    textStyle: PropTypes.object,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    title: '大按钮',
    onPress: () => {},
    containerStyle: {},
    textStyle: {},
    disabled: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      //状态机变量声明
    };
  }

  render() {
    const {title, onPress, disabled, textStyle, containerStyle} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.touch_normal, containerStyle]}
          activeOpacity={0.8}
          disabled={disabled}
          onPress={onPress}>
          <Text style={[styles.txt_normal, textStyle]}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  touch_normal: {
    // 正常状态
    height: scaleSize(44),
    width: scaleSize(345),
    backgroundColor: Colors.c_theme_bule,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleSize(3),
  },

  touch_press: {
    // 按下
    height: scaleSize(44),
    width: scaleSize(345),
    backgroundColor: '#0D7ECF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleSize(3),
  },

  touch_disabled: {
    // 禁用
    height: scaleSize(44),
    width: scaleSize(345),
    backgroundColor: '#F5F8FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleSize(3),
  },

  txt_normal: {
    fontSize: Fsize.fs_17,
    color: Colors.c_gray_0,
  },

  txt_press: {
    fontSize: Fsize.fs_17,
    color: 'rgba(255,255,255,0.5)',
  },

  txt_disabled: {
    fontSize: Fsize.fs_17,
    color: '#ACB1C1',
  },
});
