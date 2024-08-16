import React from 'react';
import ActionSheetDemo from './ActionSheet';
import {View} from 'react-native';
import TableDemo from './Table';
import CalendarDemo from './Calendar';

const index = () => {
  return (
    <View>
      <ActionSheetDemo />
      <TableDemo />
      <CalendarDemo />
    </View>
  );
};

export default index;
