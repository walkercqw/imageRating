/** 
 * 图片弹窗
 *
 * 参数：
 * @param {string}  url             显示的图片
 * @param {boolean} close           是否显示关闭按钮(不显示时点击任意位置关闭): *true | false
 * @param {string}  closePosition   关闭按钮位置：*right | left
 * @param {string}  closeColor      关闭按钮颜色：#fff
 * @param {array}   closeOffset     关闭按钮的偏移：[12, 6]
 * @param {string}  width           弹窗宽度：'3rem'
*/
export default (options) => {
    let obj = Object.assign({
        url: '',
        close: true,
        closePosition: 'right',
        closeColor: '#fff',
        closeOffset: [12, 6],
        width: '3rem',
        zIndex: 1000,
    }, options);

    //关闭旧弹窗
    var old = document.getElementsByClassName('imageAlert');
    if (old.length > 0) {
        document.body.removeChild(old[0]);
    }

    //创建新弹窗
    let html = document.createElement('section');
    html.className = 'imageAlert tool-layout';
    html.style.zIndex = obj.zIndex;

    let alert = document.createElement('div');
    alert.style.position = 'absolute';
    alert.style.top = '50%';
    alert.style.left = '50%';
    alert.style.transform = 'translate(-50%,-50%)';
    alert.style.width = obj.width;
    alert.style.maxWidth = '500px';
    html.appendChild(alert);

    let close = document.createElement('div');
    close.style.position = 'absolute';
    close.style.top = 0;
    close.style[obj.closePosition] = 0;
    close.style.marginTop = `${obj.closeOffset[1] || 0}px`;
    close.style.width = '.12rem';
    close.style.height = '.12rem';
    close.style[obj.closePosition == 'left' ? 'marginLeft' : 'marginRight'] = `${obj.closeOffset[0] || 0}px`;
    close.style.color = obj.closeColor;
    close.style.fontSize = '.12rem';
    close.onclick = () => {
        document.body.removeChild(html);
    };
    alert.appendChild(close);

    let icon = document.createElement('i');
    icon.className = 'iconfont icon-close';
    close.appendChild(icon);


    let image = document.createElement('img');
    image.style.width = '100%';
    image.src = obj.url;
    alert.appendChild(image);

    document.body.appendChild(html);
}