import _ from 'lodash';

export {default as px2dp} from './px2dp';

export function showDefaultValue(value, placeholder) {
  if (value == '0') {
    return '0';
  } else if (!value) {
    return placeholder || '-';
  } else {
    return value;
  }
}

export const isTRArray = function (attr) {
  return Object.prototype.toString.call(attr) === '[object Array]';
};

export function listToString(list = '', separator = '/') {
  if (isTRArray(list)) {
    return list.join(separator) || '';
  } else {
    return list;
  }
}

export function includesIgnoreType(array = [], value = '', isArea = false) {
  let has = false;
  _.forEach(array, item => {
    if (item == value) {
      has = true;
    }
  });
  return has;
}

export function objectOmit(
  obj = {},
  array = ['keyWord', 'size', 'total', 'currentPage', 'type'],
) {
  return _.omit(obj, array);
}
