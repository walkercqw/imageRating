export default (options) => {
    if (typeof (options) != 'object') {
        options = {
            con: options
        };
    }
    closeAlert();
    let opts = Object.assign({
        tit: '温馨提示', //标题
        con: '', //内容
        btn: ['确定'], //按钮（最多2个按钮）
        width: '5rem', //弹窗宽度
        height: 'auto', //弹窗高度
        tClose: true, //触发确定事件后是否关闭弹窗
        fClose: true, //触发取消事件后是否关闭弹窗
        tEven: null, //确定事件函数
        fEven: null, //取消事件函数
        showClose:false //是否显示关闭按钮        
    }, options);

    //背景
    let layout = document.createElement('section');
    layout.className = 'alter-layout tool-layout';
    document.body.appendChild(layout);

    //弹窗
    let alert = document.createElement('div');
    alert.style.position = 'absolute';
    alert.style.top = '50%';
    alert.style.left = '50%';
    alert.style.zIndex = '9000';
    alert.style.width = opts.width;
    alert.style.paddingTop = '0.12rem';
    alert.style.paddingBottom = '0.12rem';
    alert.style.paddingLeft = '.4rem';
    alert.style.paddingRight = '.4rem';
    alert.style.backgroundColor = '#fff';
    alert.style.transform = 'translate(-50%, -50%)';
    alert.style.boxSizing = 'border-box';
    layout.appendChild(alert);

    let headerContainer = document.createElement('div');
    headerContainer.style.borderBottom = '1px solid #dee3e7 ';   
    headerContainer.style.fontSize = '0';
    headerContainer.style.cursor = 'pointer';    
    headerContainer.style.position = 'relative';        
    alert.appendChild(headerContainer);

    //标题
    let title = document.createElement('h3');
    title.innerHTML = opts.tit;
    title.style.marginTop = '0';
    title.style.marginBottom = '0';
    title.style.fontSize = '.20rem';
    title.style.fontWeight = 'normal';
    title.style.lineHeight = '.14rem';
    title.style.padding = '.1rem';
    title.style.paddingLeft = '0rem';
    title.style.color = '#000';
    title.style.display = 'inline-block';    
    headerContainer.appendChild(title);

    if(opts.showClose){
        let closeButton = document.createElement('div');
        closeButton.innerHTML = '×';
        closeButton.style.marginTop = '0';
        closeButton.style.marginBottom = '0';
        closeButton.style.fontSize = '.3rem';
        closeButton.style.fontWeight = 'normal';
        closeButton.style.lineHeight = '.3rem';
        closeButton.style.color = '#000';
        closeButton.style.display = 'inline-block';
        closeButton.style.float ='right';
        closeButton.onclick = () => {
            closeAlert();
        }            
        headerContainer.appendChild(closeButton);
    }
    //内容
    let content = document.createElement('div');
    content.innerHTML = opts.con;
    content.style.fontSize = '.14rem';
    content.style.lineHeight = '.26rem';
    content.style.color = '#76797b';
    content.style.wordWrap = 'break-word';
    content.style.wordBreak = 'break-all';
    alert.appendChild(content);

    if (opts.btn.length) {
        //按钮组
        let buttons = document.createElement('div');
        buttons.style.marginTop = '.40rem';
        buttons.style.marginBottom = '.12rem';
        buttons.style.paddingTop = '0';
        buttons.style.paddingBottom = '0';
        buttons.style.paddingLeft = '.04rem';
        buttons.style.paddingRight = '.04rem';
        buttons.style.fontSize = '0';
        buttons.style.height = '.32rem';
        alert.appendChild(buttons);

        //按钮
        const MULTIPLE_BUTTON = opts.btn.length > 1;    //是否有多个按钮
        opts.btn.forEach((value, index) => {
            let button = document.createElement('button');
            button.innerHTML = value;
            button.style.padding = '.08rem';
            button.style.display = 'inline-block';
            button.style.backgroundColor = '#fff';
            button.style.fontSize = '.14rem';
            button.style.lineHeight = '.12rem';
            button.style.minWidth = '.9rem';
            button.style.textIndent = '.2em';
            button.style.letterSpacing = '.2em';
            button.style.borderWidth = '0px';

            if (index) {
                //取消按钮
                button.style.color = '#ffffff';
                button.style.background = '#bebebe';
                button.onclick = () => {
                    opts.fEven && opts.fEven();
                    opts.fClose && closeAlert();
                }
            } else {
                //确定按钮
                button.style.color = '#ffffff';
                button.style.background = '#0099e5';                
                button.onclick = () => {
                    opts.tEven && opts.tEven();
                    opts.tClose && closeAlert();
                }
            }

            if (MULTIPLE_BUTTON) {
                button.style.float = index ? 'right' : 'left';
            } else {
                buttons.style.textAlign = 'center';
            }
            buttons.appendChild(button);
        });
    }
}

function closeAlert() {
    let alertLayout = document.getElementsByClassName('alter-layout tool-layout');
    if (alertLayout.length) {
        for (let i = alertLayout.length - 1; i >= 0; i--) {
            document.body.removeChild(alertLayout[i]);
        }
    }
}
