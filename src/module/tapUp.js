/* 标记往上渐隐动画（类似游戏加血）
 *
 * 参数：
 *  dom: @Zepto                 在dom上显示
 * 	text: @string: ''           往上跳的字符，如：+1 | -1 | 加一
 *  offset: @array: [0,0]       位置偏移量(针对图形左上角位置的偏移)
 *  duration: @int: 1000        动画执行时间（毫秒）
 *  delay: @int: 0              动画延迟时间（毫秒）
 *  before: @function: null     动画执行前的回调函数
 *  complete: @function: null   动画完成后的回调函数
 *
*/
export default (options) => {
    let obj = Object.assign({
        text: '',
        offset: [0, 0],
        duration: 1000,
        delay: 0,
        before: null,
        complete: null
    }, options);

    let html = document.createElement('div');
    html.className = 'tapUp';
    html.style.position = 'absolute';
    html.style.top = obj.offset[1] + 'px';
    html.style.left = obj.offset[0] + 'px';
    html.style.zIndex = 100;
    html.style.fontSize = 10 + 'px';
    html.style.color = '#ffffff';
    html.style.animationName = 'TapUpAnimation';
    html.style.animationDuration = obj.duration + 'ms';
    html.style.animationDelay = obj.delay + 'ms';
    html.style.animationFillMode = 'forwards';
    html.style.opacity = '1 !important';
    html.innerHTML = obj.text;

    document.body.appendChild(html);
    setTimeout(function () {
        document.body.removeChild(html);
    }, obj.duration);
}