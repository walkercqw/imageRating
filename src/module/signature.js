import md5 from '../module/md5';
import { getCookie } from '../module/cookie'

// 选择签名类型
const signature = (options,version = 'v1',from) => {
	if(version == 'v1'){
        return v1(options);
    }
    if(version == 'v3'){
        return v3(options,from);
    }
}

// 获取token
const getToken = () => {
    return (getCookie('cookieUserInfoV1') && JSON.parse(getCookie('cookieUserInfoV1')).token) || 'null';
}

// rest、rest/v1、rest/v2接口签名算法
const v1 = options => {
    let signatureStr = '',
		signatureMd5 = '',
        token = getToken(),
        timestamp = new Date().getTime(),
        param = options;

    let objKey = Object.keys(param).sort();
    for (let i = 0, len = objKey.length; i < len; i++)
        signatureStr += '/' + param[objKey[i]];

    signatureStr += `/${timestamp}/${token}`;
    // console.log(signatureMd5)
    signatureMd5 = md5(signatureStr);
    return {
        'signature': `${timestamp}/${token}/${signatureMd5}`,
        'obj': {
            'timestamp': timestamp,
            'token': token,
            'signatrue': signatureMd5
        }
    };
}

// rest/v3接口签名算法

const v3 = (options,from) => {
    let signatureStr = '',
        signatureMd5 = '',
        param = {
            from: from,
            version: '0',
            token: getToken(),
            timestamp: new Date().getTime()
        };

    Object.assign(param,options);
    let objKey = Object.keys(param).sort();
    let sortArr = [];
    for (let i = 0, len = objKey.length; i < len; i++)
        signatureStr += '/' + param[objKey[i]];
    signatureMd5 = md5(signatureStr);
    // console.log(signatureStr)
    return {
        'signature': `v${param.from}-${param.timestamp}-${param.token}-${param.version}-${signatureMd5}`,
        'obj': param
    };
}

// 请求路径拼接
export default (url,options={},sign,from = 0) => {
    let signatureType = 'v1';
    if(url.indexOf('rest/v3') >= 0 || url.indexOf('http://biu.') >= 0){
        signatureType = 'v3';
    }
    sign = sign || options;
    let _sign = signature(sign ,signatureType,from);

	for (let i in options) {
		url += '/' + i + options[i];
    }

	return url + '/' + _sign.signature;
}
