(function() {
    let TOUCHSTART, TOUCHMOVE, TOUCHEND;
    if(typeof(window.ontouchstart) != 'undefined') {
        TOUCHSTART = 'touchstart';
        TOUCHEND = 'touchend';
        TOUCHMOVE = 'touchmove';

    } else if(typeof(window.onmspointerdown) != 'undefined') {
        TOUCHSTART = 'MSPointerDown';
        TOUCHEND = 'MSPointerUp';
        TOUCHMOVE = 'MSPointerMove';
    } else {
        TOUCHSTART = 'mousedown';
        TOUCHEND = 'mouseup';
        TOUCHMOVE = 'mousemove';
    }

    function tap(doc) {
        let touchTimeout = null;
        document.addEventListener(TOUCHSTART, function(e) {
            touchTimeout = setTimeout(()=>{
                e.target.dispatchEvent(new CustomEvent('longtap', {
                    'detail': e
                }));
                touchTimeout = null;
            },1000);
        });
        document.addEventListener(TOUCHEND, function(e) {
            touchTimeout && clearTimeout(touchTimeout);
            touchTimeout = null;
        });
        document.addEventListener(TOUCHMOVE, function(e) {
            touchTimeout && clearTimeout(touchTimeout);
            touchTimeout = null;
        });
    }tap();
})();