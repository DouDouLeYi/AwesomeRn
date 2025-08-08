//表单的状态
import {ImageRes} from '@assets';

export const FORM_STATE = {
  READ: 'readonly',
  CREATE: 'create',
  EDIT: 'edit',
  MORE: 'more',
};

export const NAV_STATE = {
  BACK: 'back',
  DROPDOWN: 'dropdown',
  EDIT: 'edit',
  EAM_EDIT: 'eam-icon-edit',
  CREATE: 'create',
  SAVE: 'save',
  CANCEL: 'cancel',
  SHEET_PANEL: 'sheetPanel',
  CREAT_SHEET_PANEL: 'creatSheetPanel',
  MAIL: 'mail',
  JUMP: 'jump',
  WARK: 'wark',
  MORE: 'more',
  SHARE: 'share',
  CHECK_OFFLINE: 'check_offline',
  SAVE_FORM_DATA: 'saveFormData',
  DELETE: 'delete',
  ADD_FILE: 'addFile',
  SHAREQRCODE: 'shareQrcode',
};

export const ICON_LIST = {
  doc: {icon: ImageRes.doc_word},
  docx: {icon: ImageRes.doc_word},
  xml: {icon: ImageRes.doc_xml},
  image: {icon: ImageRes.doc_image},
  xls: {icon: ImageRes.doc_xml},
  xlsx: {icon: ImageRes.doc_xml},
  unknown: {icon: ImageRes.doc_unknown},
  pdf: {icon: ImageRes.doc_pdf},
};

export const ImageTypeList = [
  'bmp',
  'jpg',
  'jpeg',
  'png',
  'tif',
  'gif',
  'pcx',
  'tga',
  'exif',
  'fpx',
  'svg',
  'psd',
  'cdr',
  'pcd',
  'dxf',
  'ufo',
  'eps',
  'ai',
  'raw',
  'WMF',
  'webp',
];
