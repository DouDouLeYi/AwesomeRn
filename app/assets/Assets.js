import {Platform, Dimensions} from 'react-native';

/**
 * 图片资源
 */
const ImageRes = {
  header_back_arrow: require('./images/icon/header_back_arrow.png'),
  login_logo: require('./images/login/login_logo.png'), // 登录时候的logo
  icon_clean: require('./images/icon/icon_clean.png'),
  /** TabBar */
  tabbar_msg_normal: require('./images/tabbar/message_normal.png'),
  tabbar_msg_selected: require('./images/tabbar/messag.png'),

  tabbar_work_normal: require('./images/tabbar/work_normal.png'),
  tabbar_work_selected: require('./images/tabbar/work.png'),

  tabbar_mine_normal: require('./images/tabbar/mine_normal.png'),
  tabbar_mine_selected: require('./images/tabbar/mine.png'),

  more_normal: require('./images/tabbar/more_normal.png'),
  more_selected: require('./images/tabbar/more_select.png'),

  //  新的tabBar图片
  work_table_normal: require('./images/tabbar/work_table_normal.png'),
  work_table_select: require('./images/tabbar/work_table_select.png'),

  receive_message_nomal: require('./images/tabbar/receive_message_nomal.png'),
  receive_message_select: require('./images/tabbar/receive_message_select.png'),

  mine_nomal: require('./images/tabbar/mine_nomal.png'),
  mine_select: require('./images/tabbar/mine_select.png'),

  polymerize_chuneng: require('./polymerize/chuneng.png'),
  polymerize_xuneng: require('./polymerize/xuneng.png'),
  polymerize_eam: require('./polymerize/eam.png'),

  eamEmpty: require('./images/eam/eamEmpty.png'), //设备台账的的没有数据的图标
  eamNoPower: require('./images/eam/eamNoPower.png'), //eam没有权限的图片
  eamClear: require('./images/eam/eamClear.png'), //Eam搜索框 清除搜索内容的图标
  eam_editor: require('./images/eam/icon_edit.png'), //编辑图标
  icon_mail: require('./images/eam/icon_mail.png'),
  eamApps: require('./images/eam/eamApps.png'), //Eam  搜索的时候 应用的图标
  eamWorkTicket: require('./images/eam/eamWorkTicket.png'), //Eam  搜索的时候 应用的图标
  operationTicket: require('./images/eam/operationTicket.png'), //Eam  搜索的时候 操作票的图标
  eamFault: require('./images/eam/eamFault.png'), //Eam  搜索的时候 应用的图标
  eamParts: require('./images/eam/eamParts.png'), //Eam  搜索的时候 部件的图标
  eamStation: require('./images/eam/eamStation.png'), //Eam  搜索的时候 场站的图标
  eamWindmill: require('./images/eam/eamWindmill.png'), //Eam  搜索的时候 风机的图标
  eamMore: require('./images/eam/eamMore.png'), //Eam  搜索页的查看更多图标  eam_icon_down
  eam_icon_up: require('./images/eam/eam_icon_up.png'), //Eam  搜索历史查看更多的向上的图标
  eam_icon_down: require('./images/eam/eam_icon_down.png'), //Eam  搜索历史查看更多的向下的图标
  eamBack: require('./images/eam/eamBack.png'), //Eam 搜索的列表页面的返回按钮
  icon_entry: require('./images/eam/icon_entry.png'), //Eam   故障详情里面 进入详情的icon
  icon_add: require('./images/eam/icon_add.png'), //Eam 上传附件的添加icon
  icon_read: require('./images/eam/eam_read.png'), //Eam 已读的icon
};

/**
 * 颜色资源
 */
const Colors = {
  Red: '#FF0000',
  White: '#FFFFFF',
  Cyan: '#00FFFF',
  Blue: '#0000FF',
  DarkBlue: '#0000A0',
  LightSkyBlue: '#87CEFA',
  LightBlue: '#ADD8E6',
  Purple: '#800080',
  Yellow: '#FFFF00',
  Lime: '#00FF00',
  Magenta: '#FF00FF',
  Silver: '#C0C0C0',
  Gray: '#808080',
  Black: '#000000',
  Orange: '#FFA500',
  Brown: '#A52A2A',
  Maroon: '#800000',
  Green: '#008000',
  Olive: '#808000',
  Trans: 'rgba(0,0,0,0)',

  selectColor: '#ffae00',
  normalColor: '#999999',

  c_ttitle: '#333333', // 标题文字
  c_desc: '#666666', // 副标题文字
  c_ann: '#999999', // 注释文字
  c_assist: '#cccccc', // 辅助性文字
  c_line: '#E5E5E5', // 辅助线

  assist_a: '#2b93ff',
  assist_b: '#ff973a',
  assist_c: '#56d176',
  assist_d: '#ff8080',
  assist_e: '#efeff4',

  // 背景色
  c_bg: '#F5F8FA',

  // 主题色
  c_theme_bule: '#048DE6',
  c_theme_green: '#28B28B',
  c_theme_orange: '#FF9821',

  // 灰度
  c_gray_0: '#FFFFFF',
  c_gray_1: '#F5F8FA',
  c_gray_2: '#D1D9E9',
  c_gray_3: '#ACB1C1',
  c_gray_4: '#888E95',
  c_gray_5: '#373E48',

  // 辅助色
  c_sub_0: '#56ABF3',
  c_sub_1: '#205F9F',
  c_sub_2: '#EB5A4B',
  c_sub_3: '#F38E38',
  c_sub_4: '#F9AC2B',
  c_sub_5: '#50BAB8',
  c_sub_6: '#8883BC',
  c_sub_7: '#F43C24',
  c_sub_8: '#28B28B',
  c_sub_9: '#7C86A6',
  pick_bg: [255, 255, 255, 1],
  pick_bg1: [249, 249, 249, 1],
  pickerToolBarBg: [136, 142, 149, 1],

  overlay: 'rgba(3,21,31,0.4)',
};

/**
 * 文本资源
 */
const Strings = {
  /** TabBar title */
  home: '发现',
  classroom: '讲堂',
  learn: '学习',
  mine: '我的',
};

/**
 * 尺寸资源
 */
const Dimens = {
  tab_icon: 24,
  TITLE_OFFSET: Platform.OS === 'ios' ? 70 : 50,
  br_3: 3,
  height_55: 55,
};

/**
 * 间隔尺寸
 */
const Gaps = {
  Gap_40: 40,
  Gap_30: 30,
  Gap_20: 20,
  Gap_15: 15,
  Gap_12: 12,
  Gap_10: 10,
  Gap_5: 5,
};

const isAndroid = Platform.OS === 'android' ? true : false;
const {width, height} = Dimensions.get('window');
const isIphonex = !isAndroid ? (height >= 812 ? true : false) : false;
const NavConfig = {
  height: isAndroid ? 50 : isIphonex ? 88 : 64,
  top: isAndroid ? 0 : isIphonex ? 34 : 20,
};

const iPhone6AndAbove = height / width > 1.775 ? true : false;
/**
 * 字体大小 s
 * @type {{}}
 */
const Fsize = {
  fs_35: isAndroid ? 35 : iPhone6AndAbove ? 36 : 35,
  fs_30: isAndroid ? 30 : iPhone6AndAbove ? 31 : 30,
  fs_24: isAndroid ? 24 : iPhone6AndAbove ? 25 : 24,
  fs_26: isAndroid ? 26 : iPhone6AndAbove ? 26 : 25,
  fs_22: isAndroid ? 22 : iPhone6AndAbove ? 23 : 22,
  fs_20: isAndroid ? 20 : iPhone6AndAbove ? 21 : 20,
  fs_18: isAndroid ? 18 : iPhone6AndAbove ? 19 : 18,
  fs_17: isAndroid ? 17 : iPhone6AndAbove ? 18 : 17,
  fs_16: isAndroid ? 16 : iPhone6AndAbove ? 17 : 16,
  fs_15: isAndroid ? 15 : iPhone6AndAbove ? 16 : 15,
  fs_14: isAndroid ? 14 : iPhone6AndAbove ? 15 : 14,
  fs_13: isAndroid ? 13 : iPhone6AndAbove ? 14 : 13,
  fs_12: isAndroid ? 12 : iPhone6AndAbove ? 13 : 12,
  fs_11: isAndroid ? 11 : iPhone6AndAbove ? 12 : 11,
  fs_10: isAndroid ? 10 : iPhone6AndAbove ? 11 : 10,
};

export {
  ImageRes,
  Colors,
  Strings,
  Dimens,
  Gaps,
  Fsize,
  NavConfig,
  isIphonex,
  isAndroid,
};
