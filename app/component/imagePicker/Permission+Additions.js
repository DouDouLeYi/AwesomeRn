

import {request,check, PERMISSIONS, RESULTS,openSettings} from 'react-native-permissions';
import { cst } from '@components/utils';
import Alert from '../alert/index';
import _ from 'lodash';

async function dQPermission(that,permissionType,success,fail){
	let permissionT = '';
    	let title = '';
		if (permissionType == "CAMERA") {
            permissionT = cst.isAndroid ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA;
            title = '相机';
        } else if (permissionType == "PHOTO") {
            permissionT = cst.isAndroid ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE : PERMISSIONS.IOS.PHOTO_LIBRARY;
            title = '相册';
        }
	try{
        if (_.isEmpty(permissionT)) {
            return;
        }
		 let result =  await check(permissionT);
		 if (result==RESULTS.DENIED) {//去授权
		 	 let permission = await request(permissionT);
		 	 if (permission==RESULTS.BLOCKED) {//拒绝
		 	 	showAlert(title)
		 	 }else{
		 	 	success&&success(result);
		 	 }
		 }else if (result==RESULTS.GRANTED) {//已授权
            success&&success(result);
         }else if (result==RESULTS.UNAVAILABLE) {//无法使用
        	Alert.alertMessage(title+"无法使用",此功能无法使用,[{type: 'ok',name: '确定'}],true);
         }else{
         	showAlert(title)
         }
	}catch(error){
		showAlert(title)
		fail&&fail();
	}
}

async function showAlert(title) {
	const alert = await Alert.alertMessage(title+"无法使用",("应用没有使用"+title+"的权限,请前往 设置 手动为应用开启"+title+"权限"),[{type: 'cancel',name: '一会再说'},{type: 'ok',name: '去开启'}],true);
      if (alert.index===1) {
        openSettings();
      }
}

class DQPermission{
	static Permission = dQPermission;
	static CAMERA = "CAMERA";
	static PHOTO = "PHOTO";
}

export default DQPermission;
