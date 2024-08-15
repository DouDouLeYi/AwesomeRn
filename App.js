/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import AppContainer from './app/routers/AppContainer';
import Portal from './app/component/portal';
import {Topview} from 'beeshell';

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
