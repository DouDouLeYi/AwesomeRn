import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import {Colors, ImageRes} from '../assets/Assets';
import Badge from '../../app/component/Badge';
import {StyleSheet, Image, Text, View} from 'react-native';
import px2dp from '../utils/Ratio';
import polymerizeDrawer from '../pages/polymerizeDrawer/index';
import toast from '../component/toast';
import Govern from '../pages/Govern/govern';
import {statusBarHeight} from '../utils';
import EventBus from 'react-native-event-bus';
import event from '../utils/event';

const TabBarItem = ({focused, normal, selected}) => (
  <Image
    style={styles.image}
    source={focused ? selected : normal}
    resizeMode={'contain'}
  />
);

const comp = () => {
  return (
    <View style={{flex: 1}}>
      <Text>nnnn</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: px2dp(45),
    height: px2dp(60),
  },
});

const TabNavRouter = createBottomTabNavigator(
  {
    message: {
      screen: comp,
      navigationOptions: ({screenProps}) => {
        const {isMoreClick, onChangeMoreClick} = screenProps;
        return {
          tabBarLabel: ({tintColor}) => (
            <Text
              style={{
                color: isMoreClick ? Colors.c_gray_3 : tintColor,
                textAlign: 'center',
              }}>
              {'收件箱'}
            </Text>
          ),
          tabBarOnPress: e => {
            onChangeMoreClick(false);
            polymerizeDrawer.dismiss();
            e.defaultHandler();
          },
          tabBarIcon: ({focused}) => (
            <Badge
              dot={false}
              count={screenProps.messageCount}
              color={'#F43C24'}
              offsetY={8}
              offsetX={-5}>
              <TabBarItem
                focused={isMoreClick ? false : focused}
                normal={ImageRes.receive_message_nomal}
                selected={ImageRes.receive_message_select}
              />
            </Badge>
          ),
        };
      },
    },

    work: {
      screen: comp,
      navigationOptions: ({screenProps}) => {
        const {isMoreClick, onChangeMoreClick} = screenProps;
        return {
          tabBarLabel: ({tintColor}) => (
            <Text
              style={{
                color: isMoreClick ? Colors.c_gray_3 : tintColor,
                textAlign: 'center',
              }}>
              {'工作台'}
            </Text>
          ),
          tabBarOnPress: e => {
            onChangeMoreClick(false);
            polymerizeDrawer.dismiss();
            e.defaultHandler();
          },
          tabBarIcon: ({focused}) => (
            <Badge
              dot={false}
              count={screenProps.count}
              color={'#F43C24'}
              offsetY={8}
              offsetX={-5}>
              <TabBarItem
                focused={isMoreClick ? false : focused}
                normal={ImageRes.work_table_normal}
                selected={ImageRes.work_table_select}
              />
            </Badge>
          ),
        };
      },
    },

    mine: {
      screen: comp,
      navigationOptions: ({screenProps}) => {
        const {isMoreClick, onChangeMoreClick} = screenProps;
        return {
          tabBarLabel: ({tintColor}) => (
            <Text
              style={{
                color: isMoreClick ? Colors.c_gray_3 : tintColor,
                textAlign: 'center',
              }}>
              {'我的'}
            </Text>
          ),
          tabBarOnPress: e => {
            onChangeMoreClick(false);
            polymerizeDrawer.dismiss();
            e.defaultHandler();
          },
          tabBarIcon: ({focused}) => (
            <TabBarItem
              focused={isMoreClick ? false : focused}
              normal={ImageRes.mine_nomal}
              selected={ImageRes.mine_select}
            />
          ),
        };
      },
    },
    more: {
      screen: Govern,
      navigationOptions: ({navigation, screenProps}) => {
        const {hasMore = true, isMoreClick, onChangeMoreClick} = screenProps;
        let obj = {};
        /* if (!hasMore) {
          obj.tabBarButtonComponent = () => null;
        } */
        return {
          tabBarLabel: ({tintColor}) => (
            <Text
              style={{
                color: isMoreClick ? Colors.c_theme_bule : tintColor,
                textAlign: 'center',
              }}>
              {'更多'}
            </Text>
          ),
          tabBarOnLongPress: async e => {},
          tabBarOnPress: async e => {
            onChangeMoreClick(true);
            let res = await polymerizeDrawer.show();
            if (res?.index === 1) {
              // toast.show('消息', 'center');
              event.publish('onClickMore', {
                code: res?.item?.code,
              });
              e.defaultHandler();
            }
            onChangeMoreClick(false);
          },
          ...obj,
          tabBarIcon: ({focused}) => (
            <TabBarItem
              focused={isMoreClick ? hasMore : focused}
              normal={ImageRes.more_normal}
              selected={ImageRes.more_selected}
            />
          ),
        };
      },
    },
  },
  {
    animationEnabled: true, // 是否在更改标签时显示动画
    swipeEnabled: true, // 是否允许在标签之间进行滑动
    lazy: false,
    initialRouteName: 'work',

    indicatorStyle: {
      // 标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
      height: 0,
    },
    showIcon: true,
    showLabel: true,

    tabBarOptions: {
      style: {
        height: 50, // 设置tabBar的高度为60
        marginBottom: 30,
      },
      activeTintColor: Colors.c_theme_bule,
      inactiveTintColor: Colors.c_gray_3,
    },
    style: {
      backgroundColor: Colors.White,
    },

    labelStyle: {
      fontSize: 13,
      marginTop: -5,
      marginBottom: 5,
    },

    iconStyle: {
      marginBottom: 7,
    },
  },
);

TabNavRouter.navigationOptions = ({navigation}) => {
  const component = TabNavRouter.router.getComponentForState(navigation.state);
  if (typeof component.navigationOptions === 'function') {
    return component.navigationOptions({navigation});
  }
  return component.navigationOptions;
};

export default TabNavRouter;
