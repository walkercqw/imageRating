//跳转到m端
function mobile_device_detect(url) {
  var thisOS = navigator.platform;
  var os = new Array("iPhone", "iPod", "iPad", "android", "Nokia", "SymbianOS", "Symbian", "Windows Phone", "Phone", "Linux armv71", "MAUI", "UNTRUSTED/1.0", "Windows CE", "BlackBerry", "IEMobile");
  for (var i = 0; i < os.length; i++) { //alert(thisOS.match(os[i]));return;
    if (thisOS.match(os[i])) {
      window.location = url;
    }
  }

  //因为相当部分的手机系统不知道信息,这里是做临时性特殊辨认
  if (navigator.platform.indexOf('iPad') != -1) {
    window.location = url;
  }

  // 做这一部分是因为Android手机的内核也是Linux
  // 但是navigator.platform显示信息不尽相同情况繁多,因此从浏览器下手，即用navigator.appVersion信息做判断
  var check = navigator.appVersion;

  if (check.match(/linux/i)) {
    //X11是UC浏览器的平台 ，如果有其他特殊浏览器也可以附加上条件
    if (check.match(/mobile/i)) {
      window.location = url;
    }
  }

  //类in_array函数
  Array.prototype.in_array = function (e) {
    for (i = 0; i < this.length; i++) {
      if (this[i] == e)
        return true;
    }
    return false;
  }
  return false;
}

function isMobile() {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    return true;
  } else if (isiOS) {
    return true;
  }
  var ua = window
    .navigator
    .userAgent
    .toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return false;
  }
  return false;
}

//计算字符串长度(英文占1个字符，中文汉字占2个字符)
function strlen(str) {
  var len = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    //单字节加1   
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      len++;
    } else {
      len += 2;
    }
  }
  return len;
}

function strMaxL(str,MaskLen) {
    var len = 0;
    var localMaxLen = 0;
    for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      //单字节加1   
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        len++;
      } else {
        len += 2;
      }
      ++ localMaxLen;
      if(len >= (MaskLen - 1)){
        return localMaxLen;
      }
    }
  }
//进入全屏
function full_screen() {
    var docElm = document.documentElement;
    //W3C
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    }
    //FireFox
    else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    }
    //Chrome等
    else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    }
    //IE11
    else if (docElm.msRequestFullscreen) {
        document.body.msRequestFullscreen();
    }
}
function out_full_screen() {
    var docElm = document;
    //W3C
    if (docElm.exitFullscreen) {
        docElm.exitFullscreen();
    }
    //FireFox
    else if (docElm.mozCancelFullScreen) {
        docElm.mozCancelFullScreen();
    }
    //Chrome等
    else if (docElm.webkitCancelFullScreen) {
        docElm.webkitCancelFullScreen();
    }
    //IE11
    else if (docElm.msExitFullscreen) {
        document.msExitFullscreen();
    }
}
export {
  mobile_device_detect,
  isMobile,
  strlen,
  full_screen,
  out_full_screen,
  strMaxL
}
