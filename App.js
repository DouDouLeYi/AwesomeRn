/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {LogBox, StyleSheet, useColorScheme} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import AppContainer from './app/routers/AppContainer';
import Portal from './app/component/portal'; // byself
import {Topview} from '@beeshell/components/Topview'; // 美团方案
import {ConfigProvider} from '@/nutui'; // 京东方案

LogBox.ignoreLogs([
  'currentlyFocusedField',
  'EventEmitter',
  'useNativeDriver',
  'componentWillReceiveProps',
  'componentWillMount',
]);

function App(props) {
  const isDarkMode = useColorScheme() === 'dark';
  const [isMoreClick, setIsMoreClick] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const onChangeMoreClick = isMore => {
    setIsMoreClick(isMore);
  };

  return (
    <Portal.Provider>
      <ConfigProvider>
        <AppContainer
          screenProps={{
            ...props,
            isMoreClick,
            count: 9,
            messageCount: 10,
            onChangeMoreClick: onChangeMoreClick,
          }}
        />
        <Topview />
      </ConfigProvider>
    </Portal.Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
