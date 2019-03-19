/* 
 * Tip提示框
 */
let tipTimeOut = null;

export default (text, postion = {}) => {
  clearTimeout(tipTimeOut);
  let tip = document.getElementsByClassName("tip");

  if (tip.length) {
    for (let i = tip.length - 1; i >= 0; i--) {
      document.body.removeChild(tip[i]);
    }
  }

  tip = document.createElement("div");
  tip.innerHTML = text;
  tip.className = "tip";

  //set style
  tip.style.position = "fixed";
  tip.style.left = "50%";
  tip.style.bottom = "80px";
  tip.style.zIndex = "9000";
  tip.style.paddingTop = "8px";
  tip.style.paddingBottom = "8px";
  tip.style.paddingLeft = "12px";
  tip.style.paddingRight = "12px";
  tip.style.maxWidth = "60%";
  tip.style.lineHeight = "18px";
  tip.style.fontSize = "12px";
  tip.style.borderRadius = "4px";
  tip.style.transform = "translate(-50%, -80px)";
  tip.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  tip.style.color = "#ffffff";
  tip.style.animationName = "tipAnimation";
  tip.style.animationDuration = "4s";
  tip.style.animationFillMode = "both";
  tip.style.wordWrap = "break-word";
  tip.style.wordBreak = "break-all";

  let { left, bottom, right, top } = postion;
  if (left && bottom && right && top) {
    tip.style.left = left;
    tip.style.bottom = bottom;
    tip.style.right = right;
    tip.style.top = top;
  }

  document.body.appendChild(tip);

  tipTimeOut = setTimeout(function() {
    document.body.removeChild(tip);
  }, 1000);
};
