/**
 * 日期格式化  
 * @param {date}    date        时间对象
 * @param {string}  formatStr   格式化字符串
 * 
 * 格式化字符串
 * YYYY/yyyy/YY/yy 表示年份
 * MM/M 月份
 * W/w 星期
 * dd/DD/d/D 日期
 * hh/HH/h/H 时间
 * mm/m 分钟
 * ss/SS/s/S 秒
 */
export const formatDate = (date = new Date(), formatStr = 'YYYY-MM-DD') => {
    if (typeof date === 'number') date = new Date(date);

    let str = formatStr;
    const Week = ['日', '一', '二', '三', '四', '五', '六'];

    const year = date.getYear() % 100;
    str = str.replace(/yyyy|YYYY/, date.getFullYear());
    str = str.replace(/yy|YY/, year > 9 ? String(year) : String(year).padStart(2, '0'));

    const month = date.getMonth() + 1;
    str = str.replace(/MM/, month > 9 ? String(month) : String(month).padStart(2, '0'));
    str = str.replace(/M/g, month);

    str = str.replace(/w|W/g, Week[date.getDay()]);

    str = str.replace(/dd|DD/, date.getDate() > 9 ? String(date.getDate()) : String(date.getDate()).padStart(2, '0'));
    str = str.replace(/d|D/g, date.getDate());

    str = str.replace(/hh|HH/, date.getHours() > 9 ? String(date.getHours()) : String(date.getHours()).padStart(2, '0'));
    str = str.replace(/h|H/g, date.getHours());

    str = str.replace(/mm/, date.getMinutes() > 9 ? String(date.getMinutes()) : String(date.getMinutes()).padStart(2, '0'));
    str = str.replace(/m/g, date.getMinutes());

    str = str.replace(/ss|SS/, date.getSeconds() > 9 ? String(date.getSeconds()) : String(date.getSeconds()).padStart(2, '0'));
    str = str.replace(/s|S/g, date.getSeconds());

    return str;
}

/**
 * 实例化日期（兼容苹果）
 * @param {dateStr} date  时间字符串
 */
export const getDate = (dateStr) => {
    if (dateStr) {
        const [Y, M, D, h, m, s] = dateStr.replace(/[^0-9]+/g, ',').split(',');
        let date = '';

        if (Y && M && D) date += [Y, M, D].join('/');
        if (h && m && s) date += ' ' + [h, m, s].join(':');
        return new Date(date);
    } else {
        return new Date();
    }
}

/**
 * 距离现在的时间
 * @param {Date().getTime()} timestamp  时间戳
 */
export const toNowDate = (timestamp) => {
    var nowTime = new Date().getTime();
    timestamp = timestamp * 1;
    var differ = (nowTime - timestamp) / 1000;
    if (differ < 60) {
        return '刚刚';
    } else if (differ < 3600) {
        return parseInt(differ / 60) + '分钟前';
    } else if (differ < 86400) {
        return parseInt(differ / 3600) + '小时前';
    } else {
        var _date = new Date(timestamp);
        return _date.getFullYear() + '-' + (_date.getMonth() + 1) + '-' + _date.getDate();
    }
}

/**
 * 距离现在的时间 相差几天
 * 
 */
export const toNowDay = (nowTimeStamp,endTimeStamp) => {
    let nowTime = new Date(nowTimeStamp);
    let endTime = new Date(endTimeStamp);
    let dateSpan = Math.abs(nowTime - endTime);
    
    return Math.ceil(dateSpan / (24 * 3600 * 1000));

}

export const formatSeconds = (value) =>{
    let theTime = parseInt(value);// 秒
    let theTime1 = 0;// 分
    let theTime2 = 0;// 小时
    // alert(theTime);
    if(theTime > 60) {
        theTime1 = parseInt(theTime/60);
        theTime = parseInt(theTime%60);
        // alert(theTime1+"-"+theTime);
        if(theTime1 > 60) {
            theTime2 = parseInt(theTime1/60);
            theTime1 = parseInt(theTime1%60);
        }
    }
    let result = parseInt(theTime);
    if(theTime1 <= 0){
        result = "0:"+result;
    }
    if(theTime1 > 0) {
        result = ""+parseInt(theTime1)+":"+result;
    }
    if(theTime2 > 0) {
        result = ""+parseInt(theTime2)+":"+result;
    }
    return result;
}
