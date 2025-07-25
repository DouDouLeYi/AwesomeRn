// 基础组件
import ButtonDemo from './button/demo';
import CellDemo from './cell/demo';
import IconDemo from './icon/demo';
import ImageDemo from './image/demo';
import OverLayDemo from './overlay/demo';
import PopupDemo from './popup/demo';
// 导航组件
import ElevatorDemo from './elevator/demo';
import FixedNavDemo from './fixednav/demo';
import IndicatorDemo from './indicator/demo';
import NavBarDemo from './navbar/demo';
import PaginationDemo from './pagination/demo';
import SideNavBarDemo from './sidenavbar/demo';
import TabbarDemo from './tabbar/demo';
// 布局组件
import DividerDemo from './divider/demo';
import GridDemo from './grid/demo';
import LayoutDemo from './row/demo';
// 操作反馈组件
import ActionSheetDemo from './actionsheet/demo';
import BackTopDemo from './backtop/demo';
import DragDemo from './drag/demo';
import SwipeDemo from './swipe/demo';
import SwitchDemo from './switch/demo';
import ToastDemo from './toast/demo';
// 展示组件
import AvatarDemo from './avatar/demo';
import CountDownDemo from './countdown/demo';
import EllipsisDemo from './ellipsis/demo';
import NoticeBarDemo from './noticebar/demo';
// import ProgressDemo from './progress/demo'
// import SkeletonDemo from './skeleton/demo';
import StepsDemo from './steps/demo';
import SwiperDemo from './swiper/demo';
import TableDemo from './table/demo';
// import TagDemo from './tag/demo';
import TrendArrowDemo from './trendarrow/demo';
import VirtuallistDemo from './virtuallist/demo';

//录入组件
import CalendarDemo from './calendar/demo';
import CheckboxDemo from './checkbox/demo';
import InputDemo from './input/demo';
import InputNumberDemo from './inputnumber/demo';
import RadioDemo from './radio/demo';
import RateDemo from './rate/demo';
import SearchBarDemo from './searchbar/demo';
import TextAreaDemo from './textarea/demo';
//特色组件
import BadgeDemo from './badge/demo';
import CollapseDemo from './collapse/demo';
import EmptyDemo from './empty/demo';
import PriceDemo from './price/demo';
import TimeSelectDemo from './timeselect/demo';
// 特色组件
import CardDemo from './card/demo';

export const DemoList = [
  {
    title: 'Button',
    description: '按钮',
    demo: ButtonDemo,
    type: 'Basic',
  },
  {
    title: 'Cell',
    description: '单元格',
    demo: CellDemo,
    type: 'Basic',
  },
  {
    title: 'Icon',
    description: '图标',
    demo: IconDemo,
    type: 'Basic',
  },
  {
    title: 'Image',
    description: '图片',
    demo: ImageDemo,
    type: 'Basic',
  },
  {
    title: 'Overlay',
    description: '遮罩层',
    demo: OverLayDemo,
    type: 'Basic',
  },
  {
    title: 'Divider',
    description: '分割线',
    demo: DividerDemo,
    type: 'Layout',
  },
  {
    title: 'Grid',
    description: '宫格',
    demo: GridDemo,
    type: 'Layout',
  },
  {
    title: 'Layout',
    description: '布局',
    demo: LayoutDemo,
    type: 'Layout',
  },
  {
    title: 'Elevator',
    description: '电梯楼层',
    demo: ElevatorDemo,
    type: 'Nav',
  },
  {
    title: 'FixedNav',
    description: '悬浮导航',
    demo: FixedNavDemo,
    type: 'Nav',
  },
  {
    title: 'Indicator',
    description: '指示器',
    demo: IndicatorDemo,
    type: 'Nav',
  },
  {
    title: 'NavBar',
    description: '导航栏',
    demo: NavBarDemo,
    type: 'Nav',
  },
  {
    title: 'SideNavBar',
    description: '侧边栏导航',
    demo: SideNavBarDemo,
    type: 'Nav',
  },
  {
    title: 'Tabbar',
    description: '标签栏',
    demo: TabbarDemo,
    type: 'Nav',
  },
  {
    title: 'ActionSheet',
    description: '动作面板',
    demo: ActionSheetDemo,
    type: 'Feedback',
  },
  {
    title: 'BackTop',
    description: '回到顶部',
    demo: BackTopDemo,
    type: 'Feedback',
  },
  {
    title: 'Drag',
    description: '拖拽',
    demo: DragDemo,
    type: 'Feedback',
  },
  // {
  //   title: 'Notify',
  //   description: '消息通知',
  //   demo: NotifyDemo,
  //   type: 'Feedback',
  // },
  {
    title: 'Swipe',
    description: '滑动手势',
    demo: SwipeDemo,
    type: 'Feedback',
  },
  {
    title: 'Switch',
    description: '开关',
    demo: SwitchDemo,
    type: 'Feedback',
  },
  {
    title: 'Toast',
    description: '吐司',
    demo: ToastDemo,
    type: 'Feedback',
  },
  {
    title: 'Avatar',
    description: '头像',
    demo: AvatarDemo,
    type: 'Exhibition',
  },
  {
    title: 'Badge',
    description: '徽标',
    demo: BadgeDemo,
    type: 'Exhibition',
  },
  {
    title: 'Collapse',
    description: '折叠面板',
    demo: CollapseDemo,
    type: 'Exhibition',
  },
  {
    title: 'CountDown',
    description: '倒计时',
    demo: CountDownDemo,
    type: 'Exhibition',
  },
  {
    title: 'Empty',
    description: '空状态',
    demo: EmptyDemo,
    type: 'Exhibition',
  },
  {
    title: 'Price',
    description: '价格',
    demo: PriceDemo,
    type: 'Exhibition',
  },
  {
    title: 'Card',
    description: '商品卡片',
    demo: CardDemo,
    type: 'Business',
  },
  {
    title: 'Popup',
    description: '弹出层',
    demo: PopupDemo,
    type: 'Basic',
  },
  {
    title: 'Pagination',
    description: '分页',
    demo: PaginationDemo,
    type: 'Nav',
  },
  {
    title: 'Calendar',
    description: '日历',
    demo: CalendarDemo,
    type: 'Dentry',
  },
  {
    title: 'Checkbox',
    description: '复选按钮',
    demo: CheckboxDemo,
    type: 'Dentry',
  },
  {
    title: 'SearchBar',
    description: '搜索栏',
    demo: SearchBarDemo,
    type: 'Dentry',
  },
  {
    title: 'Input',
    description: '输入框',
    demo: InputDemo,
    type: 'Dentry',
  },
  {
    title: 'TextArea',
    description: '文本域',
    demo: TextAreaDemo,
    type: 'Dentry',
  },
  {
    title: 'InputNumber',
    description: '数字输入框',
    demo: InputNumberDemo,
    type: 'Dentry',
  },
  {
    title: 'Radio',
    description: '单选按钮',
    demo: RadioDemo,
    type: 'Dentry',
  },
  {
    title: 'Rate',
    description: '评分',
    demo: RateDemo,
    type: 'Dentry',
  },
  {
    title: 'Steps',
    description: '步骤条',
    demo: StepsDemo,
    type: 'Exhibition',
  },
  {
    title: 'TimeSelect',
    description: '配送时间',
    demo: TimeSelectDemo,
    type: 'Business',
  },
  {
    title: 'Ellipsis',
    description: '文本省略',
    demo: EllipsisDemo,
    type: 'Exhibition',
  },
  {
    title: 'NoticeBar',
    description: '公告栏',
    demo: NoticeBarDemo,
    type: 'Exhibition',
  },
  {
    title: 'Virtuallist',
    description: '虚拟列表',
    demo: VirtuallistDemo,
    type: 'Exhibition',
  },
  // {
  //   title: 'Progress',
  //   description: '进度条',
  //   demo: ProgressDemo,
  //   type: 'Exhibition',
  // },
  // {
  //   title: 'Skeleton',
  //   description: '骨架屏',
  //   demo: SkeletonDemo,
  //   type: 'Exhibition',
  // },
  {
    title: 'Swiper',
    description: '轮播',
    demo: SwiperDemo,
    type: 'Exhibition',
  },
  {
    title: 'Table',
    description: '表格',
    demo: TableDemo,
    type: 'Exhibition',
  },
  // {
  //   title: 'Tag',
  //   description: '标签',
  //   demo: TagDemo,
  //   type: 'Exhibition',
  // },
  {
    title: 'TrendArrow',
    description: '趋势箭头',
    demo: TrendArrowDemo,
    type: 'Exhibition',
  },
].map((item, index) => ({
  ...item,
  group: 'nutui',
  screen: item.demo,
  label: item.description,
  key: item.title + 'nutui',
}));
