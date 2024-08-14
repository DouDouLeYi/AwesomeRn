import React from 'react';

// 传送门组件属性类型
export interface PortalProps {
  children: React.ReactNode;
}

// 传送门提供商组件属性类型
export interface PortalProviderProps {
  children?: React.ReactNode;
}

// 传送门观察者组件状态类型
export interface PortalObserverState {
  nodes: PortalObserverNode[];
}

// 传送门观察者事件类型
export type PortalObserverEvent = {
  type: PortalObserverType,
  node: PortalObserverNode,
  dismiss?: React.FC,
};

// 传送门观察者分类类型
export type PortalObserverType = 'mount' | 'unmount' | 'update';

// 传送门观察者节点类型
export type PortalObserverNode = {
  dismiss?: React.FC,
  key: string, // 唯一值
  element: React.ReactNode, // 元素节点
};
