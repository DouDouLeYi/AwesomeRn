import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {isAndroid, NavConfig} from '#/utils';
import {Fontsize} from '#/theme';

const styles = StyleSheet.create({
  flex: {flex: 1},
  nav_bar: {height: NavConfig.top, backgroundColor: '#fff'},
  navbox: {backgroundColor: '#fff', height: NavConfig.height, width: '100%'},
  navMarginTop: {
    marginTop: NavConfig.top,
    borderBottomColor: '#F4F4F4',
    borderBottomWidth: 0,
  },
  middleCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  jc: {justifyContent: 'center'},
  title: {
    fontSize: Fontsize.fs_18,
    fontWeight: '500',
    color: '#000',
    height: 40,
    lineHeight: 40,
  },
  navback: {
    position: 'absolute',
    top: 0,
    left: 4,
    height: NavConfig.height - NavConfig.top,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 40,
  },

  add: {
    width: 24,
    height: 24,
  },
  edit: {
    width: 24,
    height: 24,
  },
  navRight: {
    position: 'absolute',
    top: 0,
    right: 20,
    bottom: 0,
    minWidth: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export class NavBarView extends PureComponent {
  render() {
    const {rightBtn} = this.props;
    return (
      <View style={[styles.navbox]}>
        <View
          style={[
            styles.flex,
            isAndroid ? {} : styles.navMarginTop,
            styles.middleCenter,
          ]}>
          <View style={[styles.middleCenter, styles.flex, styles.jc]}>
            <Text style={styles.title}>{this.props.name}</Text>
          </View>
          {rightBtn ? rightBtn : null}
        </View>
      </View>
    );
  }
}
