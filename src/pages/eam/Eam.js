import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import px2dp from '@utils/px2dp';
import BaseSearch from '#/component/assembly/TRSearch';
import {NavBarView} from '#/component/Navbar';
import {Colors} from '@theme';
import GroupMenuItem from '@pages/eam/components/GroupMenuItem';
import {groupBy, keyBy} from 'lodash';
import {pageList} from '../../../examples/routers';
import {DemoList} from '@nutui/demoList';

class RightButton extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.header_right} onPress={() => {}}>
        <Text style={styles.header_right_text}>管理</Text>
      </TouchableOpacity>
    );
  }
}

class Eam extends Component {
  _renderGroupMenuItem() {
    const groupList = groupBy([...pageList, ...DemoList], 'group');
    const name = keyBy(
      [
        {
          label: 'nutui(京东)',
          key: 'nutui',
        },
        {
          label: '应用',
          key: 'eam',
        },
        {
          label: '通用',
          key: 'general',
        },
        {
          label: '导航',
          key: 'navigation',
        },
        {
          label: '数据录入',
          key: 'dataEntry',
        },

        {
          label: '数据展示',
          key: 'dataDisplay',
        },

        {
          label: '操作反馈',
          key: 'feedback',
        },

        {
          label: '其他',
          key: 'other',
        },

        {
          label: '基础工具',
          key: 'base',
        },

        {
          label: '演示',
          key: 'demo',
        },
      ],
      'key',
    );
    const groupMenus = [
      {
        groupName: '应用',
        children: [
          {
            label: 'demo',
            key: 'stationInfo',
            menuCode: 'ChangZhanGuanLiApp',
          },
        ],
      },
    ];
    Object.keys(groupList).forEach(key => {
      groupMenus.push({
        groupName: name[key].label,
        children: groupList[key].map(item => ({
          ...item,
          menuCode: 'ChangZhanGuanLiApp',
        })),
      });
    });
    return groupMenus.reduce((prev, item, index) => {
      prev.push(
        <GroupMenuItem
          menu={groupMenus}
          navigation={this.props.navigation}
          readonly
          index={index}
          groupItem={item}
          key={`${item?.groupName}${index}`}
        />,
      );
      return prev;
    }, []);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 5, width: 1}} />
        <NavBarView
          rightBtn={<RightButton />}
          navigation={this.props.navigation}
          name={'EAM'}
        />
        <View style={[styles.container]}>
          <BaseSearch
            isCannEdit={false}
            isOnpress={true}
            showScan={true}
            isTextInput={false}
          />
        </View>
        <ScrollView style={{flex: 1}}>{this._renderGroupMenuItem()}</ScrollView>
      </View>
    );
  }
}

export default Eam;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F8FA',
    paddingVertical: px2dp(15),
    paddingHorizontal: 15,
  },
  header_right: {
    top: 0,
    zIndex: 3,
    display: 'flex',
    height: '100%',
    right: px2dp(15),
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_right_text: {
    color: Colors.Orange,
  },
});
