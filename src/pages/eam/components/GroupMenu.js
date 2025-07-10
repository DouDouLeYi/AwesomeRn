import React, {Component} from "react";
import {StyleSheet, ScrollView, View, Text, TouchableOpacity, Animated} from "react-native";
import {px2dp} from '@utils';
import {Colors, Fontsize} from "@theme";

export default class GroupMenu extends Component {
  layoutArray = new Map();
  scrollRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      leftAni: new Animated.Value(8),
      widthAni: new Animated.Value(px2dp(40))
    }
    // this.menuItemClick = _.throttle(this.menuItemClick.bind(this), 300);
    this.menuItemClick = this.menuItemClick.bind(this);
  }

  getTabIndex() {
    return this.state.tabIndex;
  }

  menuItemClick(index) {
    if (this.state.tabIndex === index) return;
    const {changeTab} = this.props;
    const layout = this.layoutArray.get(index) || {};
    const {width, x} = layout;
    const {leftAni, widthAni} = this.state;
    Animated.parallel([
      Animated.timing(leftAni, {
        toValue: x + width * 0.15,
        duration: 300
      }),
      Animated.timing(widthAni, {
        toValue: width * 0.7,
        duration: 300
      })
    ]).start(({finished}) => {
      if (finished) {
        const value = x - width - 30 < 5 ? 0 : x - width - 30;
        this.scrollRef?.current?.scrollTo({x: value});
      }
    });
    changeTab && changeTab(index);
    this.setState({tabIndex: index});
  }

  render() {
    const {menus = []} = this.props;
    const {leftAni, widthAni, tabIndex} = this.state;
    if (menus?.length === 0) return null;
    return <View style={styles.group_view}>
      <ScrollView
        horizontal={true}
        ref={this.scrollRef}
        snapToInterval={2}
        snapToAlignment={'center'}
        style={styles.group_scroll}
        alwaysBounceHorizontal={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.group_name}>
        {menus.map((item, index) => <TouchableOpacity
          onLayout={({nativeEvent = {}}) => {
            const {layout = {}} = nativeEvent;
            this.layoutArray.set(index, {...layout});
          }}
          style={{marginRight: index === menus.length - 1 ? 0 : px2dp(15)}}
          onPress={(e) => this.menuItemClick(index)}
          key={`${item.groupName}${item.sort}${index}`}>
          <Text style={[styles.group_name_text, {color: tabIndex === index ? Colors.Orange : Colors.Gray}]}>{item.groupName}</Text>
        </TouchableOpacity>)}
        <Animated.View style={[styles.line, {
          left: leftAni,
          width: widthAni
        }]}/>
      </ScrollView>
    </View>
  }
}

const styles = StyleSheet.create({
  group_view: {
    width: "100%",
    paddingHorizontal: px2dp(15),
    backgroundColor: 'white',
    marginVertical: px2dp(15),
    borderRadius: px2dp(8)
  },
  group_name: {
    alignItems: 'center'
  },
  group_scroll: {
    height: px2dp(50),
    maxHeight: px2dp(50),
    position: 'relative',
    backgroundColor: 'transparent'
  },
  line: {
    bottom: px2dp(2),
    height: px2dp(2),
    position: 'absolute',
    backgroundColor: Colors.Orange
  },
  group_name_text: {
    fontSize: Fontsize.fs_14
  },
});
