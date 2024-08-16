import React from 'react';
import ActionSheetDemo from './ActionSheet';
import {StyleSheet, View} from 'react-native';
import TableDemo from './Table';
import CalendarDemo from './Calendar';

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
