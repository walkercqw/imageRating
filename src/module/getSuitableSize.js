/**
 * 返回适合的大小
 * @param {number}  originalWidth   原始宽
 * @param {number}  originalHeight  原始高
 * @param {number}  targetWidth     目标宽
 * @param {number}  targetHeight    目标高
 */
export default (originalWidth,originalHeight,targetWidth,targetHeight) => {
    targetWidth = !targetWidth && Math.max(window.outerWidth,window.innerWidth, 375);
    targetHeight = !targetHeight && Math.max(window.outerHeight,window.innerHeight, 292);
    let originalScale = originalWidth / originalHeight;
    let targetScale = targetWidth / targetHeight;
    
    //横图
    if(originalScale >= targetScale){
        return {
            width: targetWidth * 2,
            height: parseInt(targetWidth / originalScale * 2)
        };
    }

    //竖图
    if(originalScale < targetScale) {
        return {
            width: parseInt(targetHeight * originalScale * 2),
            height: targetHeight * 2
        };
    }
}