import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PickerView from './PickerView';
import BaseDialog from './BaseDialog';
import px2dp from '../../utils/Ratio';
import {Fsize} from '#/assets/Assets';

class YMDatePicker extends BaseDialog {
  static defaultProps = {
    title: '',
    removeSubviews: false,
    itemTextColor: 0x9b9ea3ff,
    itemSelectedColor: 0x373e48ff,
    onPickerCancel: null,
    onPickerConfirm: null,
    unit: ['年', '月'],
    selectedValue: [
      new Date().getFullYear() + '年',
      new Date().getMonth() + 1 + '月',
    ],
    startYear: 1990,
    endYear: new Date().getFullYear(),

    confirmText: '确定',
    confirmTextSize: 15,
    confirmTextColor: '#048DE6',

    cancelText: '取消',
    cancelTextSize: 15,
    cancelTextColor: '#ACB1C0',

    itemHeight: 40,

    HH: true,
    mm: true,
    ss: false,
  };

  constructor(props) {
    super(props);
    this.state = {pickerData: [], selectedIndex: []};
  }

  componentDidMount() {
    this.setState({
      ...this.getDateList(),
    });
  }

  getDateList() {
    let unit = this.props.unit;
    let years = [];
    let months = [];
    let days = [];

    let startYear = this.props.startYear;
    let endYear = this.props.endYear;
    for (let i = 0; i < endYear + 1 - startYear; i++) {
      years.push(i + startYear + unit[0]);
    }

    let selectedYear = years[0];
    if (this.props.selectedValue) {
      selectedYear = this.props.selectedValue[0];
    }
    selectedYear = selectedYear.substr(0, selectedYear.length - unit[0].length);
    for (let i = 1; i < 13; i++) {
      months.push(i + unit[1]);
    }

    let selectedMonth = months[0];
    if (this.props.selectedValue) {
      selectedMonth = this.props.selectedValue[1];
    }
    selectedMonth = selectedMonth.substr(
      0,
      selectedMonth.length - unit[1].length,
    );

    pickerData = [years, months];

    selectedIndex = [
      years.indexOf(selectedYear + unit[0]) == -1
        ? years.length - 1
        : years.indexOf(selectedYear + unit[0]),
      months.indexOf(selectedMonth + unit[1]),
    ];
    this.props.selectedValue[0] = years[selectedIndex[0]];
    this.props.selectedValue[1] = months[selectedIndex[1]];

    let data = {
      pickerData: pickerData,
      selectedIndex: selectedIndex,
    };
    return data;
  }

  _getContentPosition() {
    return {justifyContent: 'flex-end', alignItems: 'center'};
  }

  renderPicker() {
    return this.state.pickerData.map((item, pickerId) => {
      if (item) {
        return (
          <PickerView
            key={'picker' + pickerId}
            itemTextColor={this.props.itemTextColor}
            itemSelectedColor={this.props.itemSelectedColor}
            list={item}
            onPickerSelected={toValue => {
              //是否联动的实现位置
              this.props.selectedValue[pickerId] = toValue;
              this.setState({...this.getDateList()});
            }}
            selectedIndex={this.state.selectedIndex[pickerId]}
            fontSize={this.getSize(14)}
            itemWidth={this.mScreenWidth / this.state.pickerData.length}
            itemHeight={this.props.itemHeight}
          />
        );
      }
    });
  }

  renderContent() {
    return (
      <View
        style={{
          height:
            this.props.itemHeight * 5 + this.getSize(15) + this.getSize(44),
          width: this.mScreenWidth,
        }}>
        <View
          style={{
            width: this.mScreenWidth,
            height: this.props.itemHeight * 5 + this.getSize(15),
            flexDirection: 'row',
            position: 'absolute',
            bottom: 0,
          }}>
          {this.renderPicker()}
        </View>
        <View
          style={{
            width: this.mScreenWidth,
            height: px2dp(100),
            backgroundColor: '#ffffff',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            paddingHorizontal: px2dp(30),
            borderBottomColor: '#D1D9E9',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.dismiss(
                () => this.props.onPickerCancel && this.props.onPickerCancel(),
              );
            }}>
            <Text
              style={{
                fontSize: Fsize.fs_15,
                color: '#ACB1C0',
              }}>
              {this.props.cancelText}
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              fontSize: Fsize.fs_18,
              color: '#373E48',
            }}>
            {this.props.title}
          </Text>

          <TouchableOpacity
            onPress={() => {
              this.dismiss(
                () =>
                  this.props.onPickerConfirm &&
                  this.props.onPickerConfirm(
                    this.props.selectedValue.slice(0, 2),
                  ),
              );
            }}>
            <Text
              style={{
                fontSize: Fsize.fs_15,
                color: '#048DE6',
              }}>
              {this.props.confirmText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default YMDatePicker;
