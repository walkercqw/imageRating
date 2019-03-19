import verify from '../module/verify'
import errorCode from './errorCode'
import printError from './printError'
import fetch from 'node-fetch';
import {nowDomain} from '../config/env'
//不提示的错误码
const NOT_PROMPT_ERROR_CODE = [0, 1206, 1350, 1519, 1701, 2705, 3605];

export default (url, data, type, method) => {
    let _request = request(url, data, type, method);

    _request.then((res) => {
        //需要重新登录
        if (res && NOT_PROMPT_ERROR_CODE.indexOf(res.errorCode) < 0) {
            if (res.errorCode == 2 || res.errorCode == 5 || res.errorCode == 1008) {
                res.errorCode == 2 && tipBox('请登录后操作');
                res.errorCode == 5 && tipBox('登录超时，请重新登录');
                res.errorCode == 1008 && tipBox('登录信息已过期，请重新登录');
                removeAllCookie();
                location.href = `https://www.${nowDomain}.com/v/login?url=https://www.${nowDomain}.com/v`;
            } 
            else if(res.errorCode == 1222){
                tipBox('摄影师域名不存在');
                location.href = `https://www.${nowDomain}.com/`;
            }
            else {
                tipBox(res.msg || errorCodes[res.errorCode] || '未知错误，错误码:' + res.errorCode);
            }
        }
    }).catch((error) => {
        tipBox('请求错误，请联系客服<br/>电话：0571-87711285');
    });
    return _request;
}

async function request(url = '', data = {}, type = 'GET', method = 'fetch') {
    // console.log(url,data,type,method)
    let timestamps = new Date().getTime();
    type = type.toUpperCase();

    //数据拼接字符串
    let dataStr = '';

    Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&';
    })

    dataStr = dataStr ? dataStr.substr(0, dataStr.lastIndexOf('&')) : '';

    if (type == 'GET' && dataStr !== '') {
        url = url + '?' + dataStr;
    }

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    };

    let requestConfig = {
        credentials: 'true',
        method: type,
        headers: headers,
        mode: "CORS",
    }

    if (type == 'POST') {
        requestConfig.body = dataStr;
    }
        const response = await fetch(url, requestConfig);
        const responseJson = await response.json();

        responseJson.errorCode ?printError('请求成功,数据错误',{type,url,data,'return':responseJson})  : printError('请求成功',{type,url,data,'return':responseJson},'success');
        responseJson.request = {
            timestamps
        };
        return responseJson
    
}
