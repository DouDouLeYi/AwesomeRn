import {Platform, Dimensions} from 'react-native';

/**
 * 图片资源
 */
const ImageRes = {
  polymerize_chuneng: require('./polymerize/chuneng.png'),
  polymerize_xuneng: require('./polymerize/xuneng.png'),
  polymerize_eam: require('./polymerize/eam.png'),
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
  arrow_down: require('./images/message/arrow_down.png'),
  arrow_up: require('./images/message/arrow_up.png'),

  scan_code: require('./images/work/scan_code.png'),

  /** Icon */
  icon_search: require('./images/icon/icon_search.png'),
  icon_arrow_right: require('./images/icon/icon_arrow_right.png'),
  icon_blue_arrow_right: require('./images/icon/icon_blue_arrow_right.png'),
  dialog_take_order: require('./images/icon/dialog_take_order.png'),
  icon_grade: require('./images/icon/icon_grade.png'),
  icon_selected: require('./images/icon/icon_selected.png'),
  icon_unSelected: require('./images/icon/icon_unSelected.png'),
  icon_clean: require('./images/icon/icon_clean.png'),
  icon_eye_show: require('./images/icon/icon_eye_show.png'),
  icon_eye_hide: require('./images/icon/icon_eye_hide.png'),
  blue_arrow_up: require('./images/icon/blue_arrow_up.png'),
  gray_arrow_down: require('./images/icon/gray_arrow_down.png'),
  icon_menu: require('./images/icon/icon_menu.png'),
  header_back_arrow: require('./images/icon/header_back_arrow.png'),
  icon_warn: require('./images/icon/icon_warn.png'),
  icon_step_ind_h: require('./images/icon/icon_step_ind_h.png'),
  icon_step_ind_n: require('./images/icon/icon_step_ind_n.png'),
  icon_step_ind_ed: require('./images/icon/icon_step_ind_ed.png'),
  blue_arrow_check: require('./images/icon/blue_arrow_check.png'),
  blue_arrow_down: require('./images/icon/blue_arrow_down.png'),
  icon_add: require('./images/icon/icon_add.png'),
  icon_select_pic: require('./images/icon/icon_select_pic.png'),
  icon_clean_image: require('./images/icon/icon_clean_image.png'),
  icon_subtraction: require('./images/icon/icon_subtraction.png'),
  icon_ganxie_xiaolian: require('./images/icon/icon_ganxie_xiaolian.png'),
  icon_gongxi_xiaolian: require('./images/icon/icon_gongxi_xiaolian.png'),
  no_network: require('./images/icon/no_network.png'),
  orange_no_network: require('./images/icon/orange_no_network.png'),
  icon_no_defect: require('./images/icon/icon_no_defect.png'),
  icon_history: require('./images/icon/icon_history.png'),
  icon_arrow_up: require('./images/icon/icon_arrow_up.png'),
  icon_arrow_down: require('./images/icon/icon_arrow_down.png'),

  icon_filter: require('./images/icon/icon_filter.png'),
  icon_filter_blue: require('./images/icon/icon_filter_blue.png'),
  icon_line_down_arrow: require('./images/icon/icon_line_down_arrow.png'),
  icon_sanjiao_arrow: require('./images/icon/icon_sanjiao_arrow.png'),

  feedback_question_n: require('./images/icon/feedback_question_n.png'),
  feedback_question_h: require('./images/icon/feedback_question_h.png'),
  feedback_opinion_h: require('./images/icon/feedback_opinion_h.png'),
  feedback_opinion_n: require('./images/icon/feedback_opinion_n.png'),

  icon_noDataPower: require('./images/icon/noDataPower.png'), //没有数据权限的图标

  /** Login */
  login_bg: require('./images/login/login_bg.png'),
  login_pwd_selected: require('./images/login/login_pwd_selected.png'),
  login_pwd_normal: require('./images/login/login_pwd_normal.png'),
  login_logo: require('./images/login/login_logo.png'), // 登录时候的logo

  /** work */
  icon_commission: require('./images/work/icon_commission.png'),
  plan_icon: require('./images/work/plan_icon.png'),
  order_receiving: require('./images/work/order_receiving.png'),
  partner: require('./images/work/partner.png'),
  fault_handling: require('./images/work/fault_handling.png'),
  recondition: require('./images/work/recondition.png'),
  other_work_plan: require('./images/work/other_work_plan.png'),
  job_history: require('./images/work/job_history.png'),
  appeal: require('./images/work/appeal.png'),
  order_distribute: require('./images/work/order_distribute.png'),
  evaluate: require('./images/work/evaluate.png'),
  noOrder: require('./images/work/noOrder.png'),
  non_planed_order: require('./images/work/non_planed_order.png'),
  networkAnomaly: require('./images/work/networkAnomaly.png'),
  workStatus: require('./images/work/workStatus.png'), // 工作状态的图标
  personInfo: require('./images/work/personInfo.png'), //  个人信息的图标

  noData: require('./images/work/noData.png'), //
  noticeRead: require('./images/work/noticeRead.png'), // 通讯中断的消息已读图标
  noticeUnRead: require('./images/work/noticeUnRead.png'), // 通讯中断的消息未读图标
  noPowers: require('./images/work/noPowers.png'), // 没有权限的图标

  /** message */

  icon_fixed: require('./images/message/icon_fixed.png'),
  icon_plan_other: require('./images/message/icon_plan_other.png'),
  icon_appeal: require('./images/message/icon_appeal.png'),
  icon_work_history: require('./images/message/icon_work_history.png'),
  icon_settle: require('./images/message/icon_settle.png'),
  icon_manage_people: require('./images/message/icon_manage_people.png'),
  icon_evaluate: require('./images/message/icon_evaluate.png'),
  icon_income: require('./images/message/icon_income.png'), // 工作页面收入的Icon
  icon_integral: require('./images/message/icon_integral.png'), // 工作页面积分的Icon
  windman_apply: require('./images/message/windman_apply.png'),
  windman_upgrade: require('./images/message/windman_upgrade.png'),
  no_windman: require('./images/message/no_windman.png'),
  icon_message: require('./images/message/icon_message.png'),
  icon_robot: require('./images/message/robot.png'),
  notice_comloss: require('./images/message/notice_comloss.png'),
  notice_unplan: require('./images/message/notice_unplan.png'),
  notice_plan: require('./images/message/notice_plan.png'),
  notice_other: require('./images/message/notice_other.png'),
  notice_important: require('./images/message/notice_important.png'),
  notice_update: require('./images/message/notice_update.png'),
  notice_error: require('./images/message/notice_error.png'),
  message_quote_dark: require('./images/message/message_quote_dark.png'),
  message_quote_light: require('./images/message/message_quote_light.png'),
  notice_pin_icon: require('./images/message/notice_pink_icon.png'),
  icon_notice: require('./images/message/message_notice_icon.png'),
  icon_security: require('../../src/assets/images/icon_security.png'), // 收件箱-安全告警
  defect_icon: require('./images/message/defect_icon.png'),
  // 智能助手页面发送消息按钮的两张图片 和更多的按钮图片
  icon_plane: require('./images/robot/plane.png'),
  icon_noPlane: require('./images/robot/noPlane.png'),
  robot_more: require('./images/robot/robot_more.png'),
  robot_msg_back: require('./images/robot/robot_msg_back.png'),

  /** plan */

  tower_gray: require('./images/plan/tower_gray.png'),
  tower_blue: require('./images/plan/tower_blue.png'),
  hub_gray: require('./images/plan/hub_gray.png'),
  hub_blue: require('./images/plan/hub_blue.png'),
  engine_gray: require('./images/plan/engine_gray.png'),
  engine_blue: require('./images/plan/engine_blue.png'),
  plan_check: require('./images/plan/plan_check.png'),
  tip_close: require('./images/plan/tip_close.png'),
  icon_camera: require('./images/plan/icon_camera.png'),
  icon_defect: require('./images/plan/icon_defect.png'),

  /** mine */
  mine_setting: require('./images/mine/mineSetting.png'),
  mine_feedback: require('./images/mine/mine_feedback.png'),
  mine_working: require('./images/mine/working.png'),
  mine_selectIcon: require('./images/mine/selectIcon.png'),
  mine_income: require('./images/mine/income.png'), // 我的  --- 收入图片
  mine_integral: require('./images/mine/integral.png'), // 我的  --- 积分图片

  mine_about: require('./images/mine/about.png'), // 我的  --- 积分图片
  mine_opinion: require('./images/mine/opinion.png'), // 我的  --- 积分图片
  mine_setup: require('./images/mine/setup.png'), // 我的  --- 积分图片
  mine_share: require('./images/mine/share.png'), // 我的  --- 积分图片
  mine_close: require('./images/mine/mineClose.png'), // 编辑资料里面的 关闭按钮

  /** splash  */
  splash_screen: require('./images/splash/splash_screen.png'),

  /** setting  */
  app_update_bg: require('./images/setting/app_update_bg.png'),

  /** gif */
  loading_text: require('./images/gif/loading_text.gif'),
  loading_circle: require('./images/gif/loading_circle.gif'),
  loading: require('./images/gif/loading.gif'),

  /**备件*/

  // 左上角的返回图片 （好像不通用，得改）
  leftc: require('./images/message/leftc.png'),

  // 搜索备件里面的清除图片
  search_clean: require('./images/message/search_clean.png'),

  //更换备件里面的编辑图片
  cs_edit: require('./images/message/cs_edit.png'),

  //更换配件增加图片
  cs_addPic: require('./images/message/cs_addPic.png'),

  //更换配件删除图标
  cs_delPic: require('./images/message/cs_delPic.png'),

  //默认头像图片
  head: require('./images/mine/default_Head.png'),

  //关于我们里面的logo图片
  logoAboutUs: require('./images/mine/aboutUs.png'),

  //关于我们里面的logo图片
  logoAboutUsNew: require('./images/mine/aboutUsNew.png'),

  //消息页面没有消息时候的图片
  noMessage: require('./images/message/noMessage.png'),

  //个人信息的资质页面当没有资质图片的时候的默认图片
  noPicture: require('./images/mine/noPicture.png'),

  //一键分享的图片
  share: require('./images/mine/share1.png'),

  //评价里面的黄色星星
  yellowStar: require('./images/evaluated/yellowStar.png'),

  //评价里面的灰色星星
  grayStar: require('./images/evaluated/grayStar.png'),

  //评价里面的白色星星
  whiteStar: require('./images/evaluated/whiteStar.png'),
  sortdown: require('./images/work/arrow-sortdown.png'),
  arrowdown: require('./images/work/arrowdown.png'),
  shi_menu: require('./images/work/menu.png'),
  shishiempty: require('./images/work/shishiempty.png'),

  /* 申诉  */
  appeal_adopt: require('./images/appeal/adopt.png'), // 申诉里面的通过图片
  appeal_refuse: require('./images/appeal/refuse.png'), // 申诉里面的拒绝图片
  appeal_success: require('./images/appeal/appealSuccess.png'), // 申诉里面的成功图片
  appeal_failed: require('./images/appeal/appealFailed.png'), // 申诉里面的失败图片
  appeal_DoubleArrow: require('./images/appeal/doubleArrow.png'), // 申诉里面的双箭头

  icon_temp_close: require('./images/icon_temp_close.png'),

  icon_gray_down_jt: require('./images/work/grayDownJt.png'), // 灰色向下的箭头
  icon_gray_up_jt: require('./images/work/grayUpJT.png'), // 灰色向上的箭头
  blackarrow: require('./images/work/blackarrow.png'), // 灰色向上的箭头
  search_icon: require('./images/work/search_icon.png'),

  // 以下为实时页面的图标
  triangle_up: require('./images/icon/triangle_up.png'), // 实时页面的下拉三角

  time_change_right: require('./images/icon/time_change_right.png'), // 时间切换右面的按钮
  time_change_right_disable: require('./images/icon/time_change_right_disable.png'), // 时间切换右面禁用的按钮

  time_change_left: require('./images/icon/time_change_left.png'), // 时间切换左面的按钮
  // time_change_left_disable:require('./images/icon/time_change_left_disable.png'),  // 时间切换左面禁用的按钮

  sort_up: require('./images/icon/sort_up.png'), // 正序排序的图标
  sort_down: require('./images/icon/sort_down.png'), // 倒序排序的图标
  sort_normal: require('./images/icon/sort_normal.png'), // 倒序排序的图标

  tree_show: require('./images/icon/tree_show.png'), // 树展开的图标
  tree_display: require('./images/icon/tree_display.png'), // 树收起的图标

  detail_show: require('./images/icon/detail_show.png'), // 详情展开的图标
  detail_display: require('./images/icon/detail_display.png'), // 详情收起的图标
  detail_right: require('./images/icon/detail_right.png'), // 详情收起的图标

  arrow_disable: require('./images/icon/arrow_disable.png'), // 资产概览的禁用图片
  arrow_next: require('./images/icon/arrow_next.png'), // 资产概览下一级图片
  empty_icon: require('./images/icon/empty_icon.png'), // 搜索页面清空的图标
  inbox_empty: require('./images/icon/inbox_empty.png'), // 搜索页面清空的图标

  power_run: require('./images/icon/power_run.png'), // 发电运行
  power_noplan: require('./images/icon/power_noplan.png'), // 非计划停机
  power_plan: require('./images/icon/power_plan.png'), // 计划停机
  power_comloss: require('./images/icon/power_comloss.png'), //通讯中断
  power_stop: require('./images/icon/power_stop.png'), // 限电停机
  power_wait: require('./images/icon/power_wait.png'), // 待机状态

  power_guangfu_run: require('./images/icon/power_guangfu_run.png'), // 发电运行
  power_guangfu_noplan: require('./images/icon/power_guangfu_noplan.png'), // 非计划停机
  power_guangfu_plan: require('./images/icon/power_guangfu_plan.png'), // 计划停机
  power_guangfu_comloss: require('./images/icon/power_comloss.png'), //通讯中断
  power_guangfu_stop: require('./images/icon/power_guangfu_stop.png'), // 限电停机
  power_guangfu_wait: require('./images/icon/power_guangfu_wait.png'), // 待机状态

  //eam箭头
  eam_arrow: require('./images/message/rightc.png'), //
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
