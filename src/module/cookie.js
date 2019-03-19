/*
 * 操作cookie或与cookie相关操作
 *
 * 参数:
 * name:cookie 名
 * value:cookie 值
 * Days:cookie 生命周期（天）
 */
import {cookieDomain} from '../config/env'

//写入cookie
export function setCookie(name, value, Days) {
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 86400000);//24 * 60 * 60 * 1000
    if(typeof value == 'object') value = JSON.stringify(value);
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString() + ";path=/;domain=" + cookieDomain;
}
///删除cookie
export function removeCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1000);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/;domain=" + cookieDomain;
}
//读取cookie
export function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    try {
        arr = arr == null || arr == '' ? undefined : decodeURIComponent(arr[2]);
    } catch (error) {
        arr = arr == null || arr == '' ? undefined : unescape(arr[2]);
    }
    return arr;
}
//清除所有cookie
export function removeAllCookie() {
    removeCookie('cookieIsSevePwd');
    removeCookie('cookieUserName');
    removeCookie('cookiePassword');
    removeCookie('cookieId');
	removeCookie('cookieNike');
	removeCookie('cookieEmail');
	removeCookie('cookieAddress');
	removeCookie('cookieTel');
	removeCookie('cookieLastIp');
	removeCookie('cookieMsgNum');
	removeCookie('cookieGrpId');
	removeCookie('cookieIsPro');
	removeCookie('cookiePgId');
	removeCookie('cookiePgSub');
	removeCookie('cookiePgEquip');
	removeCookie('cookiePgType');
	removeCookie('cookiePgSex');
	removeCookie('cookiePgStudio');
	removeCookie('cookiePgCity');
	removeCookie('cookiePgRank');
	removeCookie('cookiePgTel');
	removeCookie('cookiePgFirstLogin');
	removeCookie('cookiePgState');
	removeCookie('cookiePgStar');
	removeCookie('cookieNeedBind');
	removeCookie('cookieRemindBind');
	removeCookie('cookieFlashPassGoodsId');
	removeCookie('cookieFlashPassCount');
	removeCookie('cookieBindWechat');
	removeCookie('cookieBindWechatGZ');
	removeCookie('cookieBindWeibo');
	removeCookie('cookieAddressee');
    removeCookie('cookieAddressCode');
    removeCookie('cookieUserInfoV1');
    removeCookie('JSESSIONID');
}