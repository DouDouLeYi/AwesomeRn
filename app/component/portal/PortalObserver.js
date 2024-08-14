'use strict';

import React from 'react';
import {StyleSheet, View} from 'react-native';

import {
  PortalObserverState,
  PortalObserverEvent,
  PortalObserverNode,
} from './PropsType';
import event from '../../utils/event';

export default class PortalObserver extends React.Component<
  {},
  PortalObserverState,
> {
  // 初始化状态
  state: PortalObserverState = {
    nodes: [],
  };
  // 装载驱动
  __mount__ = (node: PortalObserverNode): void => {
    this.setState(state => ({
      nodes: [...state.nodes, node],
    }));
  };
  // 卸载驱动
  __unmount__ = (node: PortalObserverNode): void => {
    this.setState(state => ({
      nodes: state.nodes.filter(n => n.key !== node.key),
    }));
  };
  // 更新驱动
  __update__ = (node: PortalObserverNode): void => {
    this.setState(state => ({
      nodes: state.nodes.map(n => {
        if (n.key === node.key) {
          return node;
        }
        return n;
      }),
    }));
  };
  _clear__ = (node: PortalObserverNode): void => {
    this.state.nodes.forEach((node: PortalObserverNode) => {
      node.dismiss && node.dismiss();
    });
    this.setState({
      nodes: [],
    });
  };
  // 分派驱动
  dispatch = (actions: PortalObserverEvent[]): void => {
    try {
      actions.forEach(action => {
        switch (action.type) {
          case 'mount':
            this.__mount__(action.node);
            break;
          case 'unmount':
            this.__unmount__(action.node);
            break;
          case 'update':
            this.__update__(action.node);
            break;
          case 'clear':
            this._clear__(action.node);
            break;
        }
      });
    } catch (err) {}
  };

  UNSAFE_componentWillMount() {
    event.subscribe('portal', this.dispatch);
  }
  componentWillUnmount() {
    event.unSubscribe('portal', this.dispatch); // 取消订阅传送门
  }

  render(): React.ReactNode {
    return this.state.nodes.map((node, i) => {
      return (
        <View
          key={node.key}
          collapsable={false}
          pointerEvents="box-none"
          style={[StyleSheet.absoluteFill, {zIndex: 1000 + i}]}>
          {node.element}
        </View>
      );
    });
  }
}
