/**
 * 处理原图过大的图片
 * @param {string}  path   图片路径
 * @param {string}  style  图片裁剪参数
 * 
 * style:{
 *  w:宽
 *  h:高
 *  m:  'fill'固定宽高，将延伸出指定w与h的矩形框外的最小图片进行居中裁剪
 *      'lfit'等比缩放，限制在设定在指定w与h的矩形内的最大图片
 *      'mfit'等比缩放，延伸出指定w与h的矩形框外的最小图片
 * }
 * 
 * getImage(url,{w:123,h:123});
 */

const getStyleString = (style) => {
    if (!style) return '';
    let styleStr = '?x-oss-process=image/resize';
    for (let k in style) {
        if (k == 'h' || k == 'w') {
            style[k] = parseInt(style[k]);
        }
        styleStr += `,${k}_${style[k]}`
    }
    return styleStr + '/interlace,1';
}

export default (path, style) => {
    if (typeof style !== 'object') {
        console.log('图片裁剪格式出错:', path, style);
        return;
    }

    if (!path) {
        return 'https://sr.alltuu.com/mstatic/images/default.jpg' + getStyleString(style);
    }

    return path + getStyleString(style);
}