import React, {useState} from 'react';
import Cell from '@nutui/nutui-react-native/components/cell';
import Calendar from '@nutui/nutui-react-native/components/calendar';
import {Button} from '../../../components';

const CalendarDemo = () => {
  const [date, setDate] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [dateWeek, setDateWeek] = useState('');

  const openSwitch = () => {
    setIsVisible(true);
  };

  const closeSwitch = () => {
    setIsVisible(false);
  };

  const setChooseValue = (param: string) => {
    setDate(param[3]);
    setDateWeek(param[4]);
  };
  return (
    <>
      <Cell
        title="选择单个日期"
        desc={date ? `${date} ${dateWeek}` : '请选择'}
        onClick={openSwitch}
      />
      <Button type="primary">主要按钮</Button>
      <Calendar
        visible={isVisible}
        defaultValue={date}
        type="range"
        startDate="2022-01-11"
        endDate="2029-11-30"
        onClose={closeSwitch}
        onChoose={setChooseValue}
      />
    </>
  );
};
export default CalendarDemo;
