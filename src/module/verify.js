/* 正则验证
 * 用法:verify(str,'type')
 * 参数:
 *  str:需要验证的字符串，浏览器环境判断时传入 navigator.userAgent
 *  type:验证的类型为 rule 中的字段
 * 返回值:[true|false]
 */
export default (str, type) => {
    var rule = {
        notEmpty: /^[\s\S]+$/g,                                             //不为空
        email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,   //邮箱
        tel: /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)/,               //电话号码（座机）
        phone: /^(^(13\d|14[57]|15[^4,\D]|17[35678]|18\d|19[89])\d{8}|170[0569]\d{7})$/, //手机号码
        password: /^[a-zA-Z0-9\@\!\#\$\%\^\&\*\.\~\?]{6,16}$/,          //密码
        chinese: /^[\u4e00-\u9fa5],{0,}$/,                              //中文
        qq: /^\d{5,11}$/,                                               //qq号
        IDCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,             //身份证
        date: /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/,                      //日期
        sub: /^[a-zA-Z0-9]{4,}$/,                                       //摄影师个性域名
        slb: /^slb\d*$/,                                                //域名不为slb开头
        money: /^(\d+)(\.\d{1,2})?$/,                                   //金钱
        yzm: /^\d{6}$/,                                                 //6位数字验证码
        upnumber: /^[0-9]*[1-9][0-9]*$/,                                //正整数
        tags: /<[^>]*>[\s\S]*?<\/[^>]*>|<\/?[\s\S]*\/?>/,               //HTML标签
        url: /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*$/, //网址

        albumTitle: /^.{1,30}$/g,      //相册标题
        albumSep: /^.{1,8}$/g,         //相册分类名
        albumpwd: /^[a-zA-Z0-9]{4,8}$/,	//图库访问/上传密码

        //运行环境判断
        mobile: /AppleWebKit.*(Mobile|MQQBrowser)+/,    //移动端
        ios: /\(i[^;]+;( U;)? CPU.+Mac OS X/,           //ios
        iphone: /.*iPhone.*/,                           //iPhone
        android: /(.*Linux+.*Android+.*)|(.*Android+.*Linux+.*)/,//Android
        wechat: /.*(MicroMessenger|micromessenger)+.*/, //微信
        weibo: /.*Weibo.*/,                             //微博
        ie: /.*Trident.*/,                              //IE内核
        opera: /.*Presto.*/,                            //opera内核
        webKit: /.*AppleWebKit.*/,                      //苹果、谷歌内核
    }
    return rule[type].test(str.trim());
}