import React, {useState} from 'react';
import {Cell} from '../../../components';
import {Calendar} from '../../../components';

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
      <Cell title="选择单个日期" onClick={openSwitch} />
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
