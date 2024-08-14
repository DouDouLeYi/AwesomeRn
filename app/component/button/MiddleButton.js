import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import TouchableOpacity from  '../TRTouchableOpacity';
import PropTypes from 'prop-types';
import {Colors, Fsize} from '../../assets/Assets';

/**
 * @ProjectName:  front-saas-mobile
 * @ClassName:    MiddleButton
 * @Desc:         作用描述:
 * @source:       来源:
 * @Author:       luthink
 * @CreateDate:   2019/9/18 6:31 下午
 * @UpdateUser:   更新者:
 * @UpdateDate:   2019/9/18 6:31 下午
 * @UpdateRemark: 更新内容:
 * @Version:      1.0
 */

export default class MiddleButton extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
    containerStyle: ViewPropTypes.style,
    textStyle: PropTypes.object,

  };

  static defaultProps = {
    title: '中按钮',
    onPress: () => {},
    containerStyle: {},
    textStyle: {},
    disable:false
  };

  constructor(props) {
    super(props);
    this.state = { //状态机变量声明

    };
  }

  render() {
    const {
      title,
      onPress,
      textStyle,
      containerStyle,
      disable
    } = this.props;
    
    return (
      <TouchableOpacity style={[styles.container,containerStyle]}
                   disabled={disable}
                        activeOpacity={0.8}
                        onPress={onPress}>
        <Text style={[styles.txt,textStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  }

}


const styles = StyleSheet.create({

  container: {
    height: 30,
    width: 130,
    backgroundColor: Colors.c_theme_bule,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },

  txt: {
    fontSize: Fsize.fs_15,
    color: Colors.c_gray_0
  }

});

