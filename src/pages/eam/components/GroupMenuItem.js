import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import GroupMenuMember from './GroupMenuMember';
import {Fontsize} from '@theme';
import px2dp from '@utils/px2dp';
import {screenWidth} from '#/utils';

const ParentWidth = screenWidth - px2dp(60);
const Height = px2dp(78);
const Width = ParentWidth / 4;

export default class GroupMenuItem extends Component {
  cardRef = React.createRef();
  layout = {};

  componentDidMount() {
    const {onInit} = this.props;
    onInit && onInit(this);
  }

  renderSubTitle() {
    const {isSort = false, readonly = false, index} = this.props;
    if (isSort || (readonly && index === 0)) {
      if (readonly) {
        return (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              const {navigation, menu} = this.props;
              navigation.navigate('eamManage', {menu});
            }}>
            <Text style={styles.subTitle}>（点击添加常用应用）</Text>
          </TouchableOpacity>
        );
      } else {
        return <Text style={styles.subTitle}>（拖动可调整应用位置）</Text>;
      }
    }
    return null;
  }

  render() {
    const {
      groupItem,
      isSort = false,
      menu,
      menuAction,
      index,
      readonly = false,
      navigation,
    } = this.props;
    const {groupName = '', children = []} = groupItem;
    return (
      <View
        onLayout={({nativeEvent = {}}) => {
          const {layout = {}} = nativeEvent;
          this.layout = layout;
        }}
        style={styles.group_view}
        ref={this.cardRef}>
        <View style={styles.group_name_view}>
          <Text
            onPress={() => {
              if (index === 0 && readonly) {
                navigation.navigate('eamManage', {menu});
              }
            }}
            style={styles.group_name}>
            {groupName}
          </Text>
          {this.renderSubTitle()}
        </View>
        {children.map((item, index) => (
          <GroupMenuMember
            item={item}
            readonly={readonly}
            menuAction={menuAction}
            navigation={navigation}
            key={`${item?.menuCode}${index}`}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  group_view: {
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    paddingVertical: px2dp(15),
    marginHorizontal: 15,
    flexDirection: 'row',
    borderRadius: px2dp(8),
    backgroundColor: 'white',
    marginBottom: px2dp(15),
  },
  group_name_view: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  group_name: {
    color: '#1F1F1F',
    fontWeight: '500',
    fontSize: Fontsize.fs_17,
  },
  subTitle: {
    color: '#888E95',
    fontSize: Fontsize.fs_12,
  },
});
