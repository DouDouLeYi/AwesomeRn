import {
  DeviceEventEmitter,
  NativeEventEmitter,
  EventEmitter,
} from 'react-native';

class Event {
  __key__: string[] = []; // 唯一值
  __emitter__: EventEmitter = DeviceEventEmitter || new NativeEventEmitter(); // 事件触发器
  __listener__: Map = new Map();
  //注册
  __register__ = (key: string, fn: (...args: any[]) => any): void => {
    this.__key__.push(key);
    const listener = this.__emitter__.addListener(key, fn);
    this.__listener__.set(key, listener);
  };
  //注销
  __deregister__ = (key: string, fn: (...args: any[]) => any): void => {
    this.__key__ = this.__key__.filter(item => item !== key);
    // this.__emitter__.removeListener(key, fn);
    const listener = this.__listener__.get(key);
    listener.remove();
  };
  //判断是否存在
  __exist__ = (key: string): boolean => {
    const index = this.__key__.findIndex(item => item === key);
    return index > -1;
  };
  //发布
  publish(key: string, ...datas: any[]): void {
    if (this.__exist__(key)) {
      this.__emitter__.emit(key, datas);
    }
  }
  //订阅
  subscribe(key: string, fn: (...args: any[]) => any): void {
    if (!this.__exist__(key)) {
      this.__register__(key, fn);
    }
  }
  //取消订阅
  unSubscribe(key: string, fn: (...args: any[]) => any): void {
    if (this.__exist__(key)) {
      this.__deregister__(key, fn);
    }
  }
}
const event = new Event();
export default event;
