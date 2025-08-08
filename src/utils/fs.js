import ImageResizer from 'react-native-image-resizer';
import {screenH, screenW} from '#/utils/ScreenUtil';
import {PixelRatio} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

export default class Fs {
  static selectFile({title = '选择文件', limitDoc, limitType}) {
    let limitTypes = limitType?.length
      ? limitType
      : [DocumentPicker.types.allFiles];
    if (limitDoc) {
      limitTypes = [
        DocumentPicker.types.doc,
        DocumentPicker.types.docx,
        DocumentPicker.types.pdf,
        DocumentPicker.types.xls,
        DocumentPicker.types.xlsx,
      ];
    }
    return new Promise(async resolve => {
      try {
        const res = await DocumentPicker.pick({
          type: limitTypes,
          copyTo: 'cachesDirectory',
        });
        resolve({
          filePath: res.fileCopyUri,
          fileSize: res.size,
          fileType: res.type,
        });
      } catch (err) {}
    });
  }

  static async compress(file = {}) {
    return new Promise(async resolve => {
      try {
        const fileSize = file.size || 0;
        const originSize = 300 * PixelRatio.get();
        const size = Number((fileSize / 1024).toFixed(4));
        // resolve({...file, uri: file.path || ""});
        // return;
        if (size < originSize) {
          resolve({...file, uri: file.path || ''});
          return;
        }
        const width = file.width || screenW;
        const height = file.height || screenH;
        const path = file.path || '';
        let quality = (originSize / size).toFixed(4) * 100;
        let scaleWidth = width > screenW ? (width / 2) * 0.6 : width * 0.6;
        let scaleHeight = width > screenW ? (height / 2) * 0.6 : width * 0.6;
        let doubleQuality = quality >= 40 ? quality : quality * 2;
        quality = width > screenW ? doubleQuality : quality;
        const result = await ImageResizer.createResizedImage(
          path,
          scaleWidth,
          scaleHeight,
          'JPEG',
          quality,
          0,
        );
        resolve({...result, isChange: true});
      } catch (e) {
        resolve({...file, uri: file.path || ''});
      }
    });
  }
}
