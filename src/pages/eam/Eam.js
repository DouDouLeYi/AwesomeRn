import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import px2dp from '@utils/px2dp';
import BaseSearch from '#/component/assembly/TRSearch';
import {NavBarView} from '#/component/Navbar';
import {Colors} from '@theme';
import GroupMenuItem from '@pages/eam/components/GroupMenuItem';

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
    const groupMenus = [
      {
        id: 0,
        sort: 0,
        groupName: '常用应用',
        children: [
          {
            menuCode: 'ChangZhanGuanLiApp',
            groupId: 7,
            sort: 2,
            source: 'APP',
            component: 'ChangZhanGuanLi',
            action: 'delete',
          },
          {
            menuCode: 'LoadSideStopPower',
            groupId: 7,
            sort: 4,
            source: 'APP',
            component: 'LoadSideStopPower',
            action: 'delete',
          },
          {
            menuCode: 'WorkTicketApp',
            groupId: 19,
            sort: 1,
            source: 'APP',
            component: 'WorkTicketApp',
            action: 'delete',
          },
          {
            menuCode: 'CaoZuoPiaoApp',
            groupId: 19,
            sort: 2,
            source: 'APP',
            component: 'CaoZuoPiaoApp',
            action: 'delete',
          },
          {
            menuCode: 'PersonManageApp',
            groupId: 24,
            sort: 1,
            source: 'APP',
            component: 'PersonManageApp',
            action: 'delete',
          },
          {
            menuCode: 'DeliverManageApp',
            groupId: 24,
            sort: 1,
            source: 'APP',
            component: 'DeliverManageApp',
            action: 'delete',
          },
          {
            menuCode: 'WareHouseManagement',
            groupId: 22,
            sort: 3,
            source: 'APP',
            component: 'WareHouseManagement',
            action: 'delete',
          },
          {
            menuCode: 'PutInStorage',
            groupId: 22,
            sort: 4,
            source: 'APP',
            component: 'PutInStorage',
            action: 'delete',
          },
          {
            menuCode: 'SuppliesStock',
            groupId: 22,
            sort: 5,
            source: 'APP',
            component: 'SuppliesStock',
            action: 'delete',
          },
          {
            menuCode: 'OutBoundOrder',
            groupId: 22,
            sort: 10,
            source: 'APP',
            component: 'OutBoundOrder',
            action: 'delete',
          },
          {
            menuCode: 'ToolsAndEquipmentApp',
            groupId: 42,
            sort: 1,
            source: 'APP',
            component: 'ToolsAndEquipmentApp',
            action: 'delete',
          },
        ],
      },
      {
        id: 0,
        sort: 0,
        groupName: 'XXX应用',
        children: [
          {
            menuCode: 'ChangZhanGuanLiApp',
            groupId: 7,
            sort: 2,
            source: 'APP',
            component: 'ChangZhanGuanLi',
            action: 'delete',
          },
        ],
      },
      {
        id: 0,
        sort: 0,
        groupName: '常用应用',
        children: [
          {
            menuCode: 'ChangZhanGuanLiApp',
            groupId: 7,
            sort: 2,
            source: 'APP',
            component: 'ChangZhanGuanLi',
            action: 'delete',
          },
          {
            menuCode: 'LoadSideStopPower',
            groupId: 7,
            sort: 4,
            source: 'APP',
            component: 'LoadSideStopPower',
            action: 'delete',
          },
          {
            menuCode: 'WorkTicketApp',
            groupId: 19,
            sort: 1,
            source: 'APP',
            component: 'WorkTicketApp',
            action: 'delete',
          },
          {
            menuCode: 'CaoZuoPiaoApp',
            groupId: 19,
            sort: 2,
            source: 'APP',
            component: 'CaoZuoPiaoApp',
            action: 'delete',
          },
          {
            menuCode: 'PersonManageApp',
            groupId: 24,
            sort: 1,
            source: 'APP',
            component: 'PersonManageApp',
            action: 'delete',
          },
          {
            menuCode: 'DeliverManageApp',
            groupId: 24,
            sort: 1,
            source: 'APP',
            component: 'DeliverManageApp',
            action: 'delete',
          },
          {
            menuCode: 'WareHouseManagement',
            groupId: 22,
            sort: 3,
            source: 'APP',
            component: 'WareHouseManagement',
            action: 'delete',
          },
          {
            menuCode: 'PutInStorage',
            groupId: 22,
            sort: 4,
            source: 'APP',
            component: 'PutInStorage',
            action: 'delete',
          },
          {
            menuCode: 'SuppliesStock',
            groupId: 22,
            sort: 5,
            source: 'APP',
            component: 'SuppliesStock',
            action: 'delete',
          },
          {
            menuCode: 'OutBoundOrder',
            groupId: 22,
            sort: 10,
            source: 'APP',
            component: 'OutBoundOrder',
            action: 'delete',
          },
          {
            menuCode: 'ToolsAndEquipmentApp',
            groupId: 42,
            sort: 1,
            source: 'APP',
            component: 'ToolsAndEquipmentApp',
            action: 'delete',
          },
        ],
      },
    ];
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
