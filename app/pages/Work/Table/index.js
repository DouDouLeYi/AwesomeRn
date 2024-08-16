import React, {useState} from 'react';
import {Text} from 'react-native';
import Table from '@nutui/nutui-react-native/components/table';

const TableDemo = () => {
  const [columns1, setColumns1] = useState([
    {
      title: '姓名',
      key: 'name',
    },
    {
      title: '性别',
      key: 'sex',
      render: record => {
        return (
          <Text style={{color: record.sex === '女' ? 'blue' : 'green'}}>
            {record.sex}
          </Text>
        );
      },
    },
    {
      title: '学历',
      key: 'record',
    },
  ]);

  const [data1, setData1] = useState([
    {
      name: 'Tom',
      sex: '男',
      record: '小学',
    },
    {
      name: 'Lucy',
      sex: '女',
      record: '本科',
    },
    {
      name: 'Jack',
      sex: '男',
      record: '高中',
    },
  ]);

  return <Table columns={columns1} data={data1} />;
};
export default TableDemo;
