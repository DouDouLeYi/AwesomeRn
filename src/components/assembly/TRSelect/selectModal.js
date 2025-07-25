import React, {Component} from 'react';
import {BorderRadius, Colors, Fontsize, mTheme} from '@theme';
import px2dp from '@utils/px2dp';
import {InCome} from '#/component/InCome';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SearchViewBar from '#/component/SearchViewBar';
import {Fsize, isAndroid} from '#/assets/Assets';
import {ImageRes as DQImageRes} from '@assets';
import {screenH} from '#/utils/ScreenUtil';
import {includesIgnoreType} from '@utils';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import Portal from '#/component/portal';
import Toast from '#/component/toast';

class SelectComponent extends Component {
  static defaultProps = {
    title: '',
    requestUrl: '',
    multiple: false,
    multipleMessage: '请选择到最后一级',
    defaultSelect: '请选择',
    array: [],
  };
  static propTypes = {
    onNavPress: PropTypes.func,
    globalProps: PropTypes.object,
    staticData: PropTypes.object,
    formData: PropTypes.object,
    response: PropTypes.object,
    schema: PropTypes.object,
    taskButtonConfig: PropTypes.object,
    formErrorMsg: PropTypes.object,
    otherOption: PropTypes.object,
    props: PropTypes.object,
    formState: PropTypes.string,
    multipleMessage: PropTypes.string,
    type: PropTypes.string,
    layoutId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.string,
    defaultKeyWord: PropTypes.string,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    separator: PropTypes.string,
    permissionMap: PropTypes.array,
    omitList: PropTypes.array,
    onChangeErrorMsg: PropTypes.func,
    isBottomSpace: PropTypes.bool,
    multiple: PropTypes.bool,
    history: PropTypes.bool,
    showSearch: PropTypes.bool,
    showSelect: PropTypes.bool,
    isLastChecked: PropTypes.bool,
    onChange: PropTypes.func,
    bindOtherLayout: PropTypes.func,
    onClose: PropTypes.func,
    isCancel: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    const {
      id,
      formData = {},
      response = {},
      showDesc = false,
      getItemAll = false,
      dicDataKey,
    } = props;
    const selectObj = props.props || {};
    this._selectKey_ = selectObj.label;
    this._selectKeys_ = selectObj.labels;
    this._selectValue_ = selectObj.value;
    this._selectOtherKey_ = selectObj.otherLabel || '';
    this._selectDicConfig_ = selectObj.selectDicConfig || []; //这个参数用来级联显示
    this._selectConcatParams_ = selectObj.selectConcatParams || [];
    let dicUrl = response.dicUrl || '';
    let otherParams = response.otherParams || {};
    let dicData = response.dicData || [];
    if (dicDataKey) {
      dicData = formData[dicDataKey] || [];
    }
    let selectArray = [];
    if (getItemAll) {
      selectArray = formData[id].map(item => item[this._selectValue_]) || [];
    } else if (showDesc) {
      selectArray = formData[`${id}_desc`] || [];
    } else {
      selectArray = formData[id] || [];
    }
    this.state = {
      pageIsSelect: false,
      dataList: dicUrl.length === 0 ? dicData : [],
      allDataList: dicUrl.length === 0 ? dicData : [], //初始化的时候全部的数据  方便后来转换
      dicUrl: dicUrl,
      otherParams: otherParams,
      isLoading: false,
      errorMessage: '',
      isError: false,
      isEmpty: dicUrl.length === 0 ? dicData.length === 0 : false,
      isChange: false,
      keyWord: '',
      historyArray: [],
      selectArray: selectArray,
      isLocal: response.isLocal || false,
      addName:
        _.isEmpty(formData[id]) && props.isCanAdd
          ? formData?.[`${id}_desc`]?.toString() || ''
          : '',
    };
    this.currentPage = -1;
  }

  async componentDidMount(): void {}

  componentWillUnmount(): void {}

  _renderSearch() {
    return (
      <SearchViewBar
        containerStyle={[styles.search_view, mTheme.from_padding_horizontal]}
        text={'搜索'}
        autoFocus={false}
        onContentChange={text => this._onContentChange(text)}
        searchAction={() => this._clickSearch()}
        onPressClear={() => this._clearSearch()}
        reset={() => {
          this._clearSearch();
        }}
        inputStyle={[styles.search]}
      />
    );
  }

  _renderAdd() {
    return (
      <View style={styles.add_view}>
        <Pressable onPress={() => this.setState({addName: this.state.keyWord})}>
          <Text style={styles.add_view_btn}>新增</Text>
        </Pressable>
        {this.state.addName ? (
          <Text style={styles.add_view_text}>{this.state.addName}</Text>
        ) : (
          <Text />
        )}
      </View>
    );
  }

  async _onButtonPress(isDone) {
    const {selectArray, isChange, dataList, allDataList, addName} = this.state;
    const {
      onClose,
      type,
      id,
      placeholder = '请选择内容',
      omitList = [],
      omitListWithValue = [],
      getItemAll = false,
      formData = {},
      rules = {},
      otherCheckId = '',
      checkPeriod = false,
      isCanAdd = false,
    } = this.props;
    if (_.some(rules, n => n.type === 'required')) {
      //isMust用来处理当选择框需要的条件没有选择的时候给的提示
      if (isDone && selectArray.length === 0 && !isCanAdd) {
        return Toast.show(placeholder);
      } else if (
        isDone &&
        selectArray.length === 0 &&
        isCanAdd &&
        addName === ''
      ) {
        return Toast.show(placeholder);
      }
    }
    let obj = {};
    let replaceParam = {};
    let resArray = [];
    if (isDone) {
      if (
        (dataList.length == 0 && !isCanAdd) ||
        (isCanAdd && dataList.length === 0 && addName === '')
      ) {
        return;
      }
      omitList.map((frontItem, index) => {
        delete formData[frontItem];
      });
      omitListWithValue.map((frontItem, index) => {
        formData[frontItem.key] = frontItem.value;
      });
      let nameArray =
        allDataList
          .filter(n => includesIgnoreType(selectArray, n[this._selectValue_]))
          .map(n => n[this._selectKey_]) || [];
      let array =
        allDataList.filter(n =>
          includesIgnoreType(selectArray, n[this._selectValue_]),
        ) || [];
      obj[id] = selectArray.filter(item => item !== -1);
      if (getItemAll) {
        obj[id] = [...array];
      }
      obj[`${id}_type`] = type;
      obj[`${id}_desc`] = nameArray;
      if (isCanAdd && addName !== '' && !nameArray.length) {
        obj[id] = [];
        obj[`${id}_desc`] = [addName];
      }
      let selectDicConfig = this._selectDicConfig_ || [];
      let param = array[0] || [];
      resArray = [...array];
    }
    if (checkPeriod) {
      obj[otherCheckId] = this.onCheckPeriod();
    }
    onClose({
      index: isDone ? 1 : 0,
      data: {...obj, ...replaceParam},
      list: resArray,
    });
  }

  onConvertListToObject() {
    const {allDataList = []} = this.state;
    const {props = {}} = this.props;
    const {checkId = '', value = ''} = props;
    return allDataList.reduce((prev, item) => {
      if (prev[checkId]) {
        prev[checkId].push(item[value]);
      } else {
        prev[checkId] = [item[value]];
      }
      return prev;
    }, {});
  }

  onCheckPeriod() {
    let isPeriod = false;
    const {selectArray = []} = this.state;
    const selectArr = new Set(selectArray.filter(item => item !== -1));
    let dataObj = this.onConvertListToObject();
    Object.keys(dataObj).forEach(key => {
      //取每期的数组和选择数组的交集
      const interList = dataObj[key].filter(item => selectArr.has(item));
      if (interList.length === dataObj[key].length) {
        isPeriod = true;
      }
    });
    return isPeriod ? '1' : '0';
  }

  //添加是否全选选项
  insertAllSelect(list) {
    const newList = [...list];
    const {props = {}, isAllSelect = false} = this.props;
    if (!isAllSelect || list.length === 0) return newList;
    const {label = '', value = ''} = props;
    newList.splice(0, 0, {[label]: '全选', [value]: -1});
    return newList;
  }

  //搜索后判断是否全选
  checkAll() {
    const {isAllSelect = false} = this.props;
    const {selectArray, dataList} = this.state;
    if (isAllSelect) {
      const selectArr = selectArray.filter(n => n !== -1);
      const dataArr = new Set(
        dataList
          .filter(n => n[this._selectValue_] !== -1)
          .map(n => n[this._selectValue_]),
      );
      const interList = selectArr.filter(n => dataArr.has(n));
      if (interList.length === dataArr.size) {
        interList.splice(0, 0, -1);
        this.setState({selectArray: interList});
      } else {
        this.setState({selectArray: interList});
      }
    }
  }

  //search
  _onContentChange(text) {
    this.setState({
      keyWord: text,
    });
  }

  //search
  _clickSearch() {
    let {dicUrl, keyWord, dataList, isLocal, allDataList, selectArray} =
      this.state;
    this.setState(
      {
        isEmpty: false,
        isError: false,
        currentPage: 1,
        total: 1,
        selectArray: [...selectArray],
      },
      () => {
        if (dicUrl.length > 0 && !isLocal) {
        } else if (isLocal) {
          let array = [];
          allDataList.map(n => {
            let selectKeys = this._selectKeys_ || [];
            selectKeys.map(m => {
              let temp = n[m] || '';
              if (temp.indexOf(keyWord) >= 0) {
                array.push(n);
              }
            });
          });
          this.setState(
            {
              dataList: this.insertAllSelect(array),
              isLoading: false,
              isEmpty: array.length == 0,
            },
            this.checkAll,
          );
        } else {
          let {response} = this.props;
          let dicData = response.dicData || [];
          const array = dicData.filter(
            n => n[this._selectKey_].indexOf(keyWord) >= 0,
          );
          this.setState({
            dataList: this.insertAllSelect(array),
            isLoading: false,
            isEmpty: array.length == 0,
          });
        }
      },
    );
  }

  //清空搜索
  _clearSearch() {
    let {dicUrl} = this.state;
    this.setState(
      {
        keyWord: '',
        isEmpty: false,
        isError: false,
        currentPage: 1,
        total: 1,
        addName: '',
      },
      () => {
        if (dicUrl.length > 0) {
        } else {
          let {response} = this.props;
          let dicData = response.dicData || [];
          const array = [...dicData];
          this.setState({
            dataList: array,
          });
        }
      },
    );
  }

  //选择条目
  _onItemPress(selectVal, selectName, isHas) {
    const {multiple, isCancel, isAllSelect = false, props = {}} = this.props;
    const {selectArray, dataList} = this.state;
    const {value = ''} = props;
    let selectArr = [...selectArray];
    if (isAllSelect) {
      if (selectVal === -1) {
        if (isHas) {
          selectArr = [];
        } else {
          selectArr = dataList.map(item => item[value]);
          selectArr.splice(0, 0, -1);
        }
      } else {
        if (isHas) {
          selectArr = selectArr.filter(
            item => item !== -1 && item !== selectVal,
          );
        } else {
          selectArr.push(selectVal);
          if (selectArr.length === dataList.length - 1) {
            selectArr.splice(0, 0, -1);
          }
        }
      }
    } else {
      if (multiple) {
        if (isHas) {
          selectArr = selectArr.filter(n => n !== selectVal);
        } else {
          selectArr.push(selectVal);
        }
      } else {
        if (isCancel && selectVal === selectArr[0]) {
          selectArr = [];
        } else {
          selectArr = [selectVal];
        }
      }
    }
    this.setState({
      pageIsSelect: true,
      isChange: true,
      selectArray: selectArr,
    });
  }

  _onRenderItem({item, index}) {
    const {selectArray, allDataList = []} = this.state;
    const {multiple = false, isAllSelect = false} = this.props;
    const selectVal = item[this._selectValue_] || '';
    let selectName = item[this._selectKey_] || '';
    let selectConcatParams = this._selectConcatParams_ || [];
    selectConcatParams.map((item1, index) => {
      return (selectName = selectName + '-' + item[item1]);
    });
    let isHas = false;
    if (
      isAllSelect &&
      selectVal === -1 &&
      selectArray.length === allDataList.length
    ) {
      isHas = true;
    } else {
      isHas = includesIgnoreType(selectArray, selectVal);
    }
    const otherLabel = item[this._selectOtherKey_] || '';
    return (
      <TouchableOpacity
        key={`dx${index}`}
        style={[styles.cell, mTheme.from_padding_horizontal]}
        onPress={this._onItemPress.bind(this, selectVal, selectName, isHas)}
        activeOpacity={0.9}>
        <View
          key={`dx${index}`}
          style={[mTheme.flex_row, mTheme.flex_row_center]}
          onPress={this._onItemPress.bind(this, selectVal, selectName, isHas)}>
          {multiple ? (
            <Image
              resizeMode={'contain'}
              style={styles.multCheckImg}
              source={
                isHas ? DQImageRes.eam_vector : DQImageRes.eam_vectorfalse
              }
            />
          ) : null}
          <Text
            style={[
              mTheme.font_from_title,
              mTheme.container,
              {fontSize: Fontsize.fs_15},
              isHas ? {color: '#FF9821'} : {},
            ]}>
            {selectName}
          </Text>
          {!multiple && isHas ? (
            <Image
              resizeMode={'contain'}
              style={styles.checkImg}
              source={DQImageRes.orange_arrow_check}
            />
          ) : (
            <View style={styles.checkImg} />
          )}
        </View>
        <Text
          style={{
            fontSize: Fsize.fs_10,
            color: '#888E95',
            lineHeight: px2dp(14),
          }}>
          {otherLabel}
        </Text>
      </TouchableOpacity>
    );
  }

  _onEndReached() {
    const {currentPage, size, total} = this.state;
    if (currentPage * size + 1 <= total) {
    }
  }

  _getListSearchResults(item) {
    let selectId = item[this._selectValue_];
    const {multiple = false} = this.props;
    const {selectArray} = this.state;
    this.setState(
      {
        isChange: true,
        selectArray: multiple ? [...selectArray, selectId] : [selectId],
      },
      () => {
        this._onButtonPress(true);
      },
    );
  }

  render() {
    const {
      title,
      props = {},
      showSearch = false,
      history = false,
      isCanAdd = false,
    } = this.props;
    const {dataList, isLoading, errorMessage, isEmpty, isError} = this.state;
    let {minHeight = 400} = props;
    return (
      <View
        style={[
          styles.main,
          mTheme.bg_White,
          showSearch ? styles.searchMain : {},
          history ? styles.historyMain : {},
          {minHeight: minHeight},
        ]}>
        <View
          style={[
            styles.header,
            mTheme.flex_row,
            mTheme.flex_row_center,
            showSearch ? {} : mTheme.borer_bottom,
            mTheme.from_padding_horizontal,
            {zIndex: 2},
          ]}>
          <TouchableOpacity
            style={[styles.arrow_button, mTheme.flex_column_center]}
            activeOpacity={0.9}
            onPress={this._onButtonPress.bind(this, false)}>
            <Text
              style={[
                mTheme.font_from_title,
                {
                  color: Colors.placeholderTextColor,
                  fontSize: Fontsize.fs_16,
                },
              ]}>
              {'取消'}
            </Text>
          </TouchableOpacity>
          <Text style={[mTheme.container, styles.title]}>{`${title}`}</Text>
          <TouchableOpacity
            style={[
              styles.arrow_button,
              mTheme.flex_column_center,
              {alignItems: 'flex-end'},
            ]}
            activeOpacity={0.9}
            onPress={this._onButtonPress.bind(this, true)}>
            <Text
              style={[
                mTheme.font_from_title,
                {
                  color: Colors.Orange,
                  fontSize: Fontsize.fs_16,
                },
              ]}>
              {'确定'}
            </Text>
          </TouchableOpacity>
        </View>
        {showSearch ? this._renderSearch() : null}
        {showSearch ? <View style={[mTheme.borer_bottom]} /> : null}
        {isCanAdd ? this._renderAdd() : null}
        {isCanAdd ? <View style={[mTheme.borer_bottom]} /> : null}
        {history ? <View style={[mTheme.borer_bottom]} /> : null}
        {isLoading || isEmpty || isError ? (
          <InCome
            isLoading={isLoading}
            isEmpty={isEmpty}
            emptyText={'暂无数据'}
            emptyImage={DQImageRes.empty_icon}
            emptyImageStyle={{width: 213, height: 144}}
            style={{marginTop: '-4%'}}
            isError={isError}
            errorText={errorMessage}
          />
        ) : (
          <FlatList
            data={dataList}
            style={[
              mTheme.container,
              {backgroundColor: 'transparent', marginTop: px2dp(6)},
            ]}
            removeClippedSubviews={false}
            onEndReachedThreshold={0.3}
            renderItem={this._onRenderItem.bind(this)}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this._onEndReached.bind(this)}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchMain: {
    height: (screenH * 3) / 4,
  },
  historyMain: {height: screenH * 0.9},
  main: {
    minHeight: px2dp(400),
    maxHeight: screenH * 0.9,
    borderTopLeftRadius: px2dp(BorderRadius),
    borderTopRightRadius: px2dp(BorderRadius),
    overflow: 'hidden',
    paddingBottom: px2dp(isAndroid ? 40 : 30),
  },
  header: {minHeight: px2dp(50)},
  arrow_button: {height: px2dp(46), minWidth: px2dp(36)},
  title: {
    textAlign: 'center',
    fontSize: Fontsize.fs_16,
    color: Colors.textColor,
    marginVertical: px2dp(15),
  },
  cell: {justifyContent: 'center', marginVertical: px2dp(13)},
  checkImg: {height: px2dp(10), width: px2dp(12)},
  multCheckImg: {height: px2dp(18), width: px2dp(18), marginRight: px2dp(10)},
  search_view: {},
  search: {
    width: px2dp(345),
    height: px2dp(40),
    borderRadius: px2dp(20),
    backgroundColor: '#F5F8FA',
  },
  divider_line: {
    width: px2dp(375),
    height: 1,
    backgroundColor: '#E6E6E6',
  },
  select_view: {},
  select_arrow: {
    marginHorizontal: px2dp(7),
    width: px2dp(6),
    height: px2dp(9),
  },
  select_item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  select_wrap: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: px2dp(5),
    paddingRight: px2dp(5),
    borderColor: '#e5e5e5',
    borderWidth: px2dp(0.5),
    height: px2dp(24),
    borderRadius: px2dp(5),
  },
  select_text: {
    textAlign: 'center',
    lineHeight: px2dp(24),
    fontSize: Fontsize.fs_12,
  },
  select_color_default: {color: '#888E95'},
  select_color_parent: {color: Colors.Orange},
  select_color_current: {color: '#1F1F1F'},
  y_line: {
    backgroundColor: '#888E95',
    width: 1,
    marginLeft: px2dp(10),
    height: px2dp(10),
  },
  list_next: {
    fontSize: Fontsize.fs_12,
    marginHorizontal: px2dp(10),
    textAlign: 'left',
    color: Colors.Orange,
  },
  arrow_right: {
    width: px2dp(6),
    height: px2dp(9),
  },
  add_view: {
    display: 'flex',
    alignItems: 'center',
    height: px2dp(60),
    paddingHorizontal: px2dp(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  add_view_btn: {
    fontWeight: '500',
    fontSize: Fontsize.fs_16,
    color: '#1F1F1F',
  },
  add_view_text: {
    color: '#1F1F1F',
    overflow: 'hidden',
    paddingVertical: px2dp(10),
    paddingHorizontal: px2dp(16),
    fontSize: Fontsize.fs_12,
    backgroundColor: '#F5F5F5',
    borderRadius: px2dp(20),
  },
});

export const getSelectArray = value => {
  if (isTRString(value)) {
    return [value];
  }
  return value;
};

class SelectModal {
  __key__: string = '';
  show = param => {
    return new Promise((resolve, reject) => {
      if (this.__key__ === '') {
        this.__key__ = Portal.createPortal(
          <Portal.Trans
            isCancel
            ref={c => {
              this._portal = c;
            }}
            onClose={event => {
              this.__key__ = Portal.removePortal(this.__key__);
              resolve(event || {});
            }}
            isBlack
            style={{}}>
            <View style={{height: screenH}}>
              <TouchableOpacity
                activeOpacity={0}
                style={{flex: 1}}
                onPress={() => {
                  this._portal && this._portal.cancel();
                  resolve({index: 0});
                }}
              />
              <SelectComponent
                {...param}
                onClose={obj => {
                  this._portal && this._portal.cancel();
                  resolve(obj);
                }}
              />
            </View>
          </Portal.Trans>,
        );
      } else {
        reject({});
      }
    });
  };
  dismiss = (): void => {
    if (this.__key__.length > 0) {
      this.__key__ = Portal.removePortal(this.__key__);
    }
  };
}

const selectModal = new SelectModal();
export default selectModal;
