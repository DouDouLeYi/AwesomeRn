import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import PickerView from './PickerView';
import BaseDialog from './BaseDialog';
import px2dp from '../../utils/Ratio';
import {Fsize} from '#/assets/Assets';
import {day, hour, minnute, month, second} from './DateHelper';

class DatePicker extends BaseDialog {

    static defaultProps = {
        removeSubviews: false,
        itemTextColor: 0x9b9ea3ff,
        itemSelectedColor: 0x373e48ff,
        onPickerCancel: null,
        onPickerConfirm: null,
        unit: ['年', '月', '日'],
        selectedValue: [new Date().getFullYear() + '年', new Date().getMonth() + 1 + '月', new Date().getDate() + '日'],
        startYear: 1990,
        endYear: 2050,

        confirmText: '确定',
        confirmTextSize: 15,
        confirmTextColor: '#048DE6',

        cancelText: '取消',
        cancelTextSize: 15,
        cancelTextColor: '#ACB1C0',

        itemHeight: 40,

        title: '',
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
            ...this.getDateList()
        })
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
        months = month;
        let selectedMonth = months[0];
        if (this.props.selectedValue) {
            selectedMonth = this.props.selectedValue[1];
        }
        selectedMonth = selectedMonth.substr(0, selectedMonth.length - unit[1].length);

        //判断是否是闰年
        if (selectedMonth == 2 && ((selectedYear % 4 == 0 && selectedYear % 100 != 0) || selectedYear % 400 == 0)) {
            days = day[12];
        } else {
            days = day[selectedMonth - 1]
        }
        let selectedDay = days[0];
        if (this.props.selectedValue) {
            selectedDay = this.props.selectedValue[2];
        }
        selectedDay = selectedDay.substr(0, selectedDay.length - unit[2].length);

        pickerData = [years, months, days];

        selectedIndex = [
            years.indexOf(selectedYear + unit[0]) == -1 ? years.length - 1 : years.indexOf(selectedYear + unit[0]),
            months.indexOf(selectedMonth + unit[1]),
            days.indexOf(selectedDay + unit[2]) == -1 ? days.length - 1 : days.indexOf(selectedDay + unit[2])];
        this.props.selectedValue[0] = years[selectedIndex[0]];
        this.props.selectedValue[1] = months[selectedIndex[1]];
        this.props.selectedValue[2] = days[selectedIndex[2]];
        if (this.props.HH) {
            pickerData.push(hour);
            if (this.props.selectedValue) {
                selectedIndex.push((this.props.selectedValue[3] ? parseInt(this.props.selectedValue[3]) : new Date().getHours()));
            } else {
                selectedIndex.push((new Date().getHours()));
            }
            this.props.selectedValue[3] = (selectedIndex[3]) + '时';
            if (this.props.mm) {
                pickerData.push(minnute);
                if (this.props.selectedValue) {
                    selectedIndex.push((this.props.selectedValue[4] ? parseInt(this.props.selectedValue[4]) : new Date().getMinutes()) - 0);
                } else {
                    selectedIndex.push((new Date().getMinutes() - 0));
                }
                this.props.selectedValue[4] = (selectedIndex[4] + 0) + '分';
                if (this.props.ss) {
                    pickerData.push(second);
                    if (this.props.selectedValue) {
                        selectedIndex.push((this.props.selectedValue[5] ? parseInt(this.props.selectedValue[5]) : 1));
                    } else {
                        selectedIndex.push(1);
                    }
                    this.props.selectedValue[5] = (selectedIndex[5]) + '秒';
                }
            }
        }


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
                return <PickerView
                    key={'picker' + pickerId}
                    itemTextColor={this.props.itemTextColor}
                    itemSelectedColor={this.props.itemSelectedColor}
                    list={item}
                    onPickerSelected={(toValue) => {
                        //是否联动的实现位置
                        this.props.selectedValue[pickerId] = toValue;
                        this.setState({...this.getDateList()});
                    }}
                    selectedIndex={this.state.selectedIndex[pickerId]}
                    fontSize={this.getSize(15)}
                    itemWidth={this.mScreenWidth / this.state.pickerData.length}
                    itemHeight={this.props.itemHeight}/>;
            }
        });
    }

    renderContent() {
        const {ensureStyle = {color: '#1E7CE8'}} = this.props;
        return <View style={{
            height: this.props.itemHeight * 5 + this.getSize(15) + this.getSize(44),
            width: this.mScreenWidth,
        }}>
            <View style={{
                width: this.mScreenWidth,
                height: this.props.itemHeight * 5 + this.getSize(15),
                flexDirection: 'row',
                position: 'absolute',
                bottom: 0,
            }}>
                {this.renderPicker()}
            </View>
            <View style={{
                width: this.mScreenWidth,
                height: px2dp(100),
                backgroundColor: '#ffffff',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'absolute',
                borderTopRightRadius: px2dp(8),
                borderTopLeftRadius: px2dp(8),
                top: 0,
                paddingHorizontal: px2dp(30),
                borderBottomColor: '#D1D9E9',
                borderBottomWidth: StyleSheet.hairlineWidth
            }}>
                <TouchableOpacity
                    onPress={() => {
                        this.dismiss(() => this.props.onPickerCancel && this.props.onPickerCancel(this.props.selectedValue));
                    }}>
                    <Text style={{
                        fontSize: Fsize.fs_16,
                        color: '#888E95',
                    }}>{this.props.cancelText}</Text>
                </TouchableOpacity>

                <Text style={{
                    fontSize: Fsize.fs_16,
                    color: '#1F1F1F',
                }}>{this.props.title || ''}</Text>

                <TouchableOpacity
                    onPress={() => {
                        this.dismiss(() => this.props.onPickerConfirm && this.props.onPickerConfirm(this.props.selectedValue));
                    }}>
                    <Text style={[{
                        fontSize: Fsize.fs_16
                    }, ensureStyle]}>{this.props.confirmText}</Text>
                </TouchableOpacity>
            </View>
        </View>;
    }
}

export default DatePicker;
