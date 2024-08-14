import React from 'react';
import {Image, I18nManager, Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {Colors, Dimens, ImageRes} from '../assets/Assets';
import LoginPage from '../pages/LoginPage';
// import TabNavRouter from './TabNavRouter';
import {scaleSize} from '../utils/ScreenUtil';
import {StackViewStyleInterpolator} from 'react-navigation-stack';
import SplashPage from '../pages/splash/SplashPage';
import TabNavRouter from './TabNavRouter';
import Govern from '../pages/Govern/govern';

const stackNavConfig = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Colors.White,
      elevation: 0,
      borderBottomWidth: 0,
    },

    headerTitleStyle: {
      // 如果我们想自定义fontFamily，fontWeight等Text为标题样式属性，我们可以用它来做到这一点。
      flex: 1,
      alignSelf: 'center',
      textAlign: 'center',
      color: '#333333',
      fontSize: 18,
    },

    headerTitleContainerStyle: {
      left: Dimens.TITLE_OFFSET,
      right: Dimens.TITLE_OFFSET,
    },

    headerBackImage: (
      <Image
        style={Platform.select({
          ios: {
            backgroundColor: 'transparent',
            height: scaleSize(25),
            width: scaleSize(40),
            marginLeft: 15,
            resizeMode: 'contain',
            transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
          },
          default: {
            height: scaleSize(25),
            width: scaleSize(40),
            resizeMode: 'contain',
            backgroundColor: 'transparent',
            transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
          },
        })}
        source={ImageRes.header_back_arrow}
      />
    ),
  },

  initialRouteName: 'splash',
  mode: 'card',
  headerMode: 'screen',
  headerBackTitleVisible: false,
  transitionConfig: () => ({
    screenInterpolator: StackViewStyleInterpolator.forHorizontal,
  }),
};

const StackNavRouter = createStackNavigator(
  {
    splash: {
      screen: SplashPage,
      navigationOptions: {
        header: null,
      },
    },
    login: {
      screen: LoginPage,
      navigationOptions: {
        header: null,
      },
    },
    main: {
      screen: TabNavRouter,
      navigationOptions: {},
    },
    eam: {
      screen: Govern,
      navigationOptions: {},
    },
  },
  stackNavConfig,
);

export default StackNavRouter;
