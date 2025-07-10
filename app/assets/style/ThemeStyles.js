import {StyleSheet} from 'react-native';
import {Colors, Fsize, isIphonex} from '../Assets';
import {scaleSize, screenW, screenH} from '#/utils/ScreenUtil';
import px2dp from '../../utils/Ratio';

const ThemeStyles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: Colors.c_desc,
  },

  center_c: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  center_rr: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },

  center_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  center_sb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  center_sa: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  nav_title: {
    fontSize: 18,
  },

  nav_detail: {
    fontSize: 15,
  },

  // 分割线
  sep_line_details: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.c_gray_2,
    marginHorizontal: 15,
    marginTop: 15,
  },

  // 分割线
  sep_line_orderdetails_g0: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.c_gray_2,
    marginHorizontal: 0,
    marginTop: 15,
  },
  sep_line: {
    backgroundColor: Colors.c_gray_2,
    height: StyleSheet.hairlineWidth,
  },

  cell_margin: {
    marginTop: 10,
  },

  dialog_title: {
    fontSize: Fsize.fs_18,
    color: Colors.c_gray_5,
  },

  dialog_body: {
    fontSize: Fsize.fs_14,
    color: Colors.c_gray_4,
  },

  dialog_confirm: {
    fontSize: Fsize.fs_15,
    color: Colors.c_theme_bule,
  },

  dialog_cancel: {
    fontSize: Fsize.fs_15,
    color: Colors.c_gray_4,
  },

  bottomBtnContain: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 76,
    backgroundColor: '#fff',
    paddingLeft: 8,
    paddingRight: 8,
    left: 0,
    bottom: 0,
    width: screenW,
  },

  bottomBtn: {
    flex: 1,
    height: 44,
    paddingHorizontal: 15,
    backgroundColor: Colors.c_theme_bule,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.c_gray_2,
  },

  bottom_view: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 76,
    bottom: 56,
    left: 0,
    backgroundColor: '#fff',
    width: screenW,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.c_gray_2,
  },

  header_right_image: {
    width: scaleSize(36),
    height: scaleSize(28),
    marginRight: 10,
  },

  popover: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingHorizontal: 15,
    shadowColor: '#777',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  popover1: {
    paddingVertical: px2dp(14),
    paddingHorizontal: px2dp(22),
    borderRadius: px2dp(4),
    borderWidth: 0,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  popover2: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 12,
    paddingRight: 12,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },

  popover_in: {
    width: px2dp(356),
    top: px2dp(isIphonex ? 124 : 78),
    marginRight: px2dp(28),
  },
  popover_in1: {
    top: px2dp(isIphonex ? 139 : 78),
    marginRight: px2dp(30),
  },

  popover_in_real_time: {
    width: px2dp(224),
    top: px2dp(isIphonex ? 124 : 78),
    marginRight: px2dp(28),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: px2dp(40),
  },

  arrow_img: {
    width: px2dp(24),
    height: px2dp(24),
    resizeMode: 'cover',
  },

  sticky_content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.c_gray_1,
    borderRadius: px2dp(24),
    paddingHorizontal: px2dp(30),
    paddingVertical: px2dp(10),
  },

  sticky_text: {
    fontSize: Fsize.fs_13,
    color: Colors.c_gray_5,
  },

  sticky_img: {
    width: px2dp(18),
    height: px2dp(21),
    marginLeft: px2dp(5),
  },

  item_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: px2dp(140),
  },

  item_order_name: {
    fontSize: Fsize.fs_15,
    color: Colors.c_gray_5,
  },

  item_time: {
    fontSize: Fsize.fs_11,
    color: Colors.c_gray_3,
    marginTop: px2dp(10),
  },

  item_rec: {
    fontSize: Fsize.fs_11,
    color: Colors.c_gray_3,
    marginTop: px2dp(10),
    textAlign: 'right',
  },

  qishu: {
    width: px2dp(64),
    height: px2dp(28),
    fontSize: Fsize.fs_11,
    borderRadius: px2dp(5),
    textAlign: 'center',
    marginTop: px2dp(5),
  },

  one_text: {
    color: Colors.c_sub_0,
    backgroundColor: 'rgba(229, 243, 252, 1)',
  },

  two_text: {
    color: Colors.c_sub_8,
    backgroundColor: 'rgba(40, 178, 139, 0.1)',
  },

  three_text: {
    color: Colors.c_sub_4,
    backgroundColor: 'rgba(249, 172, 43, 0.1)',
  },

  sanjiao_arrow: {
    width: px2dp(16),
    height: px2dp(10),
    marginLeft: px2dp(15),
    resizeMode: 'cover',
  },

  dropDown: {
    width: screenW,
    height: screenH * 0.5,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.c_line,
    borderStyle: 'solid',
  },

  reloadbutton: {
    height: 28,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    borderWidth: 1,
    borderColor: Colors.c_gray_2,
    borderStyle: 'solid',
    borderRadius: 3,
  },

  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 44,
  },
  footerText: {
    fontSize: 14,
    color: '#555555',
  },

  error: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '25%',
  },

  errortext: {
    marginTop: px2dp(50),
    fontSize: Fsize.fs_12,
    color: Colors.c_gray_3,
  },

  date_view: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: px2dp(180),
    height: px2dp(48),
    alignItems: 'center',
    backgroundColor: Colors.c_gray_1,
    borderRadius: px2dp(24),
  },

  cancel_text: {
    fontSize: Fsize.fs_15,
    color: Colors.c_gray_3,
  },

  confirm_text: {
    fontSize: Fsize.fs_14,
    color: Colors.c_theme_bule,
  },

  list_item: {},

  icon_delete: {
    width: px2dp(44),
    height: px2dp(44),
  },
});
export default ThemeStyles;
