import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {WORKDIC} from '#/page/work/WorkPageHelper';
import px2dp from '@utils/px2dp';
import {Fontsize} from '@theme';
import {ImageRes} from '@assets';
import {screenWidth} from '#/utils';

export const MENU_ACTION_TYPE = {
  READ: 'read',
  DEL: 'delete',
  ADD: 'add',
  CHANGE: 'change',
};
export default class GroupMenuMember extends Component {
  constructor(props) {
    super(props);
  }

  renderAction() {
    const {item, readonly = false} = this.props;
    const {menuAction} = this.props;
    const {action = MENU_ACTION_TYPE.READ} = item;
    if (action === MENU_ACTION_TYPE.READ || readonly) return null;
    if (action === MENU_ACTION_TYPE.DEL) {
      return (
        <TouchableOpacity
          style={styles.action_icon}
          onPress={() => {
            menuAction && menuAction(action, item);
          }}>
          <Image
            style={styles.action_icon_image}
            source={ImageRes.eamDelete}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.action_icon}
        onPress={() => {
          menuAction && menuAction(action, item);
        }}>
        <Image
          style={styles.action_icon_image}
          source={ImageRes.eamAdd}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    );
  }

  memberClick() {
    const {item, readonly, navigation} = this.props;
    // eam菜单跳转
    console.log('item', item);
    navigation.navigate(item.key);
  }

  renderContent() {
    const {item} = this.props;
    let temp = WORKDIC[item.menuCode] || {};
    return (
      <View style={styles.member_item}>
        <Image
          style={styles.member_item_icon}
          resizeMode={'contain'}
          source={temp.icon}
        />
        <Text style={styles.member_item_title}>{item.label}</Text>
        {this.renderAction()}
      </View>
    );
  }

  render() {
    const {readonly} = this.props;
    if (!readonly) return this.renderContent();
    return (
      <TouchableOpacity onPress={() => this.memberClick()}>
        {this.renderContent()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  member_item: {
    width: (screenWidth - 60) / 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: px2dp(10),
    position: 'relative',
  },
  member_item_title: {
    fontSize: Fontsize.fs_11,
    marginTop: px2dp(10),
  },
  member_item_image_view: {
    width: px2dp(38),
    height: px2dp(38),
    marginTop: px2dp(8),
    alignItems: 'center',
    borderColor: '#EBEBEB',
    borderWidth: 1,
    borderRadius: px2dp(8),
    justifyContent: 'center',
  },
  member_item_icon: {
    width: px2dp(38),
    height: px2dp(38),
    marginTop: px2dp(6),
  },
  action_icon: {
    top: 0,
    right: px2dp(8),
    position: 'absolute',
    borderRadius: px2dp(10),
    backgroundColor: 'white',
  },
  action_icon_image: {
    width: px2dp(20),
    height: px2dp(20),
  },
});
