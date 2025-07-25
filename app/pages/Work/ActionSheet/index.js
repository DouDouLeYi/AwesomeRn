import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {ActionSheet, Cell} from '@/nutui';

const ActionSheetDemo = () => {
  const [val1, setVal1] = useState('');
  const [isVisible1, setIsVisible1] = useState(false);
  const menuItemsOne = [
    {
      name: '选项一',
    },
    {
      name: '选项二',
    },
    {
      name: '选项三',
      disable: true,
    },
  ];
  const chooseItem = itemParams => {
    console.log(itemParams.name, 'itemParams');
    setVal1(itemParams.name);
    setIsVisible1(false);
  };

  return (
    <>
      <Cell isLink onClick={() => setIsVisible1(!isVisible1)}>
        <View>
          <Text>基础用法 ActionSheet</Text>
        </View>
        <Text>{val1}</Text>
      </Cell>

      <ActionSheet
        title={'标题'}
        cancelTxt="取消"
        visible={isVisible1}
        menuItems={menuItemsOne}
        onChoose={chooseItem}
        onCancel={() => setIsVisible1(false)}
      />
    </>
  );
};
export default ActionSheetDemo;
