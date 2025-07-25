import React from 'react';
import ActionSheetDemo from './ActionSheet';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TableDemo from './Table';
import CalendarDemo from './Calendar';
import Toast from '#/component/toast';

const Block = () => {
  return <View style={styles.block} />;
};
const index = () => {
  return (
    <View style={styles.wrap}>
      <ActionSheetDemo />
      <Block />
      <TableDemo />
      <Block />
      <CalendarDemo />
      <Block />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          Toast.show('我是一个提示');
        }}
        style={{
          height: 50,
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
        }}>
        <Text>点击Toast</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  block: {
    height: StyleSheet.hairlineWidth,
    marginBottom: 18,
  },
});

export default index;
