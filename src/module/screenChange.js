/* 监听屏幕变化 */
export default (callback) => {
    if (!callback) return;
    let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    callback(getDirection());
    window.addEventListener('resize', () => {
        callback(getDirection());
    }, false);
}

function getDirection() {
    return window.innerWidth > window.innerHeight ? 'horizontal' : 'vertical'
}