/* 微信分享 */
import { wechatShare } from '../service/getData'
import verify from '../module/verify'
import {setStore,getStore,removeStore} from '../module/store'

function share(shareObj) {
    let wxConfigErrorCount = 0;

    // 测试
    // let user = JSON.parse(localStorage.userInfo).id;
    // if(user == '4961'){
    //     wechatdebug = true;
    //     window.tipBox(location.href);
    // }

    //安卓手机需要延迟1秒执行，是官方技术说的
    if(verify(navigator.userAgent,'android') && !window.wx){
        setTimeout(function () {
            wxConfig();
        }, 1000);
    }else{
        wxConfig();
    }

    function wxConfig() {
        //修复ios微信分享的关键，必须使用第一次进页面的url
        let url = verify(navigator.userAgent,'android') ? location.href.split('#')[0] : getStore('baseUrl');
        wechatShare(encodeURIComponent(url)).then((res) => {
            if (res.errorCode == 0) {
                window.wx.config({
                    debug: false,
                    appId: res.config.appId,
                    timestamp: res.config.timestamp,
                    nonceStr: res.config.nonceStr,
                    signature: res.config.signature,
                    jsApiList: [
                        //分享
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'onMenuShareQZone',
                        //功能按钮
                        'hideOptionMenu',
                        'showOptionMenu',
                        'hideMenuItems',
                        'showMenuItems',
                        'hideAllNonBaseMenuItem',
                        'showAllNonBaseMenuItem',
                        //卡券
                        // 'addCard',
                        // 'chooseCard',
                        // 'openCard',
                        //支付
                        // 'chooseWXPay',
                        //其他
                        'checkJsApi',   //检测接口是否可用
                        'closeWindow',  //关闭窗口
                        // 'scanQRCode',   //扫描二维码
                    ]
                });
                window.wx.ready(function () {
                    if (typeof WeixinJSBridge == "undefined") {
                        if (document.addEventListener) {
                            document.addEventListener("WeixinJSBridgeReady", share(shareObj));
                        } else if(document.attachEvent){
                            document.attachEvent("WeixinJSBridgeReady", share(shareObj));
                            document.attachEvent("onWeixinJSBridgeReady", share(shareObj));
                        }
                    } else {
                        window.wx.onMenuShareTimeline(shareObj);
                        window.wx.onMenuShareAppMessage(shareObj);
                        window.wx.onMenuShareWeibo(shareObj);
                        window.wx.onMenuShareQZone(shareObj);
                    }
                });
                window.wx.error(function () {
                    wxConfigErrorCount++;
                    if (wxConfigErrorCount < 3) {
                        wxConfig();
                    }
                });
            }
        });
    }
}

export default function wecharShareSet(options) {
    if (!verify(navigator.userAgent,'wechat')) return;
    options = Object.assign({
        title: '',      // 分享标题
        link:  location.href.split('#')[0],  // 分享链接
        imgUrl: '',     // 分享图标
        desc: '',       // 分享描述
        type: '',       // 分享类型,music、video或link，不填默认为link
        dataUrl: '',    // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {// 接口调用成功时执行的回调函数。
            window.tipBox('分享成功');
        },
        cancel: function () {// 用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到。
            window.tipBox('分享失败');
        },
        complete: null, // 接口调用完成时执行的回调函数，无论成功或失败都会执行。
        fail: null,     // 接口调用失败时执行的回调函数。
        trigger: null,  // 监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口。
    }, options);
    share(options);
}