<template>
    <transition name="fade">
        <div class="pswp component-bigImage retouch-bigImage" tabindex="-1" role="dialog" aria-hidden="true">
            <button class="tool-close" @click="close">
                <i class="iconfont icon-close"></i>
            </button>
            <div class="pswp__bg"></div>
            <div class="pswp__scroll-wrap container_left">
                <div class="pswp__container">
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                </div>
            
                <div class="pswp__ui pswp__ui--hidden">

                    <div class="pswp__top-bar">

                        <!--  Controls are self-explanatory. Order can be changed. -->

                        <div class="pswp__counter"></div>

                    <!--<button class="pswp__button pswp__button--close" title="Close (Esc)"></button><-->

                        <button class="pswp__button pswp__button--share" title="Share"></button>

                        <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

                        <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

                        <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
                        <!-- element will get class pswp__preloader--active when preloader is running -->
                        <div class="pswp__preloader">
                            <div class="pswp__preloader__icn">
                            <div class="pswp__preloader__cut">
                                <div class="pswp__preloader__donut"></div>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                        <div class="pswp__share-tooltip"></div> 
                    </div>

                    <div class="iconLeft" @click="prePicture"  >
                        <i class="iconfont icon-left"></i>
                    </div>

                    <div class="iconRight" @click="nextPicture"  >
                        <i class="iconfont icon-right"></i>
                    </div>

                    <div class="pswp__caption">
                        <div class="pswp__caption__center"></div>
                    </div>

                </div>
            </div>    
        </div>
    </transition>
</template>

<script>
let { PhotoSwipe } = require("../../../plugins/photoswipe/dist/photoswipe.js");
let {
    PhotoSwipeUI_Default
} = require("../../../plugins/photoswipe/dist/photoswipe-ui-default.js");
import { getImageList,sendScore,hasToken } from "../service/getData.js"
import tipBox from "../tool/tipBox.js"
export default {
    name: "bigImage",
    props: {
        data: {
            type: Array,
            default: () => []
        },
        newNextPhotos: {
            type: Array,
            default: () => []
        },
        index: {
            type: Number,
            default: 0
        },
        maxMultiple: {
            type: Number,
            default: 3
        },
        openBottomFont: {
            type: Boolean,
            default: false
        },
        nowSep: {
            type: Object
        },
        nowSelectedColor: {},
        albumID: {},
        it:{},
        isEndLoading:{}
    },
    data() {
        return {
            items: [],
            gallery: null,
            screenSize: {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            },
            isLoadingMore: false,
        };
    },
    computed: {
        downloadURL(){
            if(this.data[this.index].AI == true){
                return this.data[this.index].aiBackupUrl;
            }else{
                return this.data[this.index].originUrl;
            }
        },
        nowTagColorStyle() {
            let color;
            switch (this.nowSelectedColor) {
                case 0:
                    color = "#ffffff";
                    break;
                case 1:
                    color = "#5f74f3";
                    break;
                case 2:
                    color = "#c38cdf";
                    break;
                case 3:
                    color = "#64decb";
                    break;
                case 4:
                    color = "#27c81b";
                    break;
                case 5:
                    color = "#fed558";
                    break;
                case 6:
                    color = "#f09e35";
                    break;
                case 7:
                    color = "#f2080a";
                    break;
            }
            return {
                background: color
            };
        },
        nowProName() {
            let userId = this.data[this.index].userId;
            let realNameObj = this.nowSep.proList.find(ele => {
                return ele.id == userId;
            });
            if (realNameObj) {
                return realNameObj.nick;
            } else {
                return "";
            }
        },
        nowRetouchName() {
            let userId = this.data[this.index].userRetouchId;
            let realNameObj = this.nowSep.retoucherList.find(ele => {
                return ele.id == userId;
            });
            if (realNameObj) {
                return realNameObj.nick;
            } else {
                return "";
            }
        }
    },
    mounted() {
        console.log("=====mounted======");
        var that = this;
        var screenWidth = screen.width;
        this.pushArray(this.data);
        that.gallery = new PhotoSwipe(
            document.querySelectorAll(".pswp")[0],
            PhotoSwipeUI_Default,
            that.items,
            {
                index: 0,
                maxSpreadZoom: that.maxMultiple,
                loop: false,
                arrowEl: true,
                shareEl: false,
                counterEl: false,
                captionEl: false,
                fullscreenEl: false,
                closeOnScroll: false,
                zoomEl: false,
                allowPanToNext: false,
                showAnimationDuration: 0,
                hideAnimationDuration: 0,
                canKeyDownLoop:false
            }
        );
        that.gallery.init();
        that.gallery.goTo(that.index);
        //打开页面
        that.$emit(
            "changeBigImage",
            that.gallery.getCurrentIndex(),
            that.gallery.options.getNumItemsFn()
        );
        //翻页前
        that.gallery.listen("beforeChange", function() {
            that.pauseVideo();
            that.$emit(
                "changeBigImage",
                that.gallery.getCurrentIndex(),
                that.gallery.options.getNumItemsFn()
            );
        });
        //翻页后
        that.gallery.listen("afterChange", function() {});
        //图片加载完成
        that.gallery.listen("imageLoadComplete", function(_index) {
            that.$emit("cacheBigImage", _index);
        });
        //关闭
        that.gallery.listen("close", function() {
            that.$emit("closeBigImage");
        });
        that.gallery.listen("toFrist", function() {
            tipBox("到头了", {
                left: "90px",
                right: "auto",
                top: "auto",
                bottom: "48%"
            });
        });
        that.gallery.listen("toEnd", function() {
            tipBox("到底了", {
                left: "auto",
                right: "390px",
                top: "auto",
                bottom: "48%"
            });
        });
        //长按事件
        let longtapTimeout = null;
        let clickTime = 0;
        document.addEventListener("touchstart", function(e) {
            longtapTimeout = setTimeout(() => {
                that.$emit("longtap");
                longtapTimeout = null;
            }, 1000);
            clickTime = new Date().getTime();
        });
        document.addEventListener("touchend", function(e) {
            longtapTimeout && clearTimeout(longtapTimeout);
            longtapTimeout = null;
            if (new Date().getTime() - clickTime < 300) {
                that.$emit("onClick");
            }
            clickTime = 0;
        });
        document.addEventListener("touchmove", function(e) {
            longtapTimeout && clearTimeout(longtapTimeout);
            longtapTimeout = null;
            clickTime = 0;
        });
        document.addEventListener("keyup", this.keyUpLinstenerFn);
    },
    destroyed() {
        console.log("=======destroy=========");
        document.removeEventListener("keyup", this.keyUpLinstenerFn);
    },
    methods: {
        prePicture() {
            if (this.index == 0) {
                return;
            }
            this.gallery.prev();
        },
        nextPicture() {
            if (this.isEndLoading == true && this.index == this.data.length -1 ) {
                tipBox("到底了", {
                    left: "auto",
                    right: "390px",
                    top: "auto",
                    bottom: "48%"
                });
                return;
            }
            this.gallery.next();
        },
        keyUpLinstenerFn(e){
            var keyCode = e.keyCode || e.which || e.charCode;
            var ctrlKey = e.ctrlKey || e.metaKey;
            if(ctrlKey && keyCode == 90) {
                this.clickAI(this.data[this.index]);
            }
            e.preventDefault();
        },
        clickAI(item){
            if(item.AI == true){
                item.AI = false;
                let imgs = document.getElementsByClassName("pswp__img");
                for (let index = 0; index < imgs.length; index++) {
                    let element = imgs[index];
                    if(element.src == item.aiBigUrl){
                        element.src = item.bigUrl;
                        console.log(element.src,item.bigUrl)
                    }
                }
            }else{
                let image = new Image();
                image.onload = function() {
                    item.AI = true;
                    item.src = item.aiBigUrl;
                    let imgs = document.getElementsByClassName("pswp__img");
                    for (let index = 0; index < imgs.length; index++) {
                        let element = imgs[index];
                        if(element.src == item.bigUrl){
                            element.src = item.aiBigUrl;
                        }
                    }
                };
                image.onerror = function(err) {
                    tipBox("AI正在修图，请稍等");
                };
                image.src = item.aiBigUrl;
            }
        },
        getSizes(size) {
            if (size == 0) {
                return "暂无";
            } else if (size <= 1024 * 1024) {
                return parseFloat(size / 1024).toFixed(2) + "KB";
            } else if (size < 1024 * 1024 * 1024) {
                return parseFloat(size / 1024 / 1024).toFixed(2) + "MB";
            }
        },
        formatDates(str) {
            return formatDate(Number(str), "YYYY年MM月DD日HH小时mm分ss秒");
        },
        close: function() {
            this.gallery.close();
        },
        replaceOriginal: function(_src, _osrc) {
            let _images = document.getElementsByClassName("pswp__img");
            for (let i = _images.length - 1; i >= 0; i--) {
                if (_images[i].src === _src) {
                    _images[i].src = _osrc;
                    break;
                }
            }
        },
        pushArray(array) {
            array.forEach(function(item) {
                if (
                    item.fileName &&
                    item.fileName.replace(/.+\./, "").toLocaleLowerCase() ==
                        "mp4"
                ) {
                    let obj = {
                        w: item.width,
                        h: item.height,
                        urlSmall: item.smallUrl,
                        urlOrg: item.originUrl
                    };
                    let radio = obj.w / obj.h;
                    if (this.screenSize.w < obj.w) {
                        obj.w = this.screenSize.w;
                        obj.h = this.screenSize.w / radio;
                    }
                    if (this.screenSize.h < obj.h) {
                        obj.h = this.screenSize.h;
                        obj.w = this.screenSize.h * radio;
                    }
                    item.html = `<video class="video-hd" poster="${
                        obj.urlSmall
                    }" src="${obj.urlOrg}" style="width:${obj.w}px;height:${
                        obj.h
                    }px;" webkit-playsinline playsinline controls preload="auto"></video>`;
                    delete item.src;
                } else {
                    if (item.h / item.w > 2) {
                        let ratio = item.h / item.w;
                        item.w = this.screenSize.w;
                        item.h = item.w * ratio;
                    }
                }
                this.items.push(item);
            }, this);
        },
        pauseVideo() {
            const that = this;
            let _video = that.gallery.container.querySelectorAll(".video-hd");
            for (let i = 0, len = _video.length; i < len; i++) {
                _video[i].pause();
            }
        },
        clickDisplay() {
            this.$emit(
                "changeDisplay",
                this.index,
                this.data[this.index].display
            );
        },
        clickDownload() {
            this.$emit(
                "changeDownload",
                this.index,
                this.data[this.index].retouchDownload
            );
        },
        clickReplace() {},
        updateItems() {
            this.gallery.invalidateCurrItems();
            this.gallery.updateSize(true);
        },
        selectColor(event) {
            let target = event.target;
            if (target.tagName == "LI") {
                confirmRetouchTag(
                    this.albumID,
                    this.data[this.index].id,
                    parseInt(target.getAttribute("data-tag"))
                ).then(res => {
                    if (res.errorCode == 0) {
                        this.$emit(
                            "changeColor",
                            parseInt(target.getAttribute("data-tag"))
                        );
                    } else {
                        tipBox(res.msg);
                    }
                });
            }
        }
    },
    watch: {
        newNextPhotos: function() {
            if (this.newNextPhotos <= 0) return;
            this.pushArray(this.newNextPhotos);
            this.isLoadingMore = false;
        },
        index(){
            if((this.index >= this.data.length - 5  && this.isEndLoading != true  && !this.isLoadingMore)){
                this.isLoadingMore = true;
                this.$emit("loadMore");
            }
        },
        data: {
            handler(newValue,oldValue) {
                console.log(newValue.length,oldValue.length)
                this.updateItems();
            }
        },
    }
};
</script>

<style lang="less">
@import "../../../plugins/photoswipe/dist/photoswipe.css";
@import "../../../plugins/photoswipe/dist/default-skin/default-skin.css";
.retouch-bigImage {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    .pswp__item img {
        pointer-events: auto;
    }

    .video-hd {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .component-bigImage-bottomFont {
        position: fixed;
        bottom: 1.696rem;
        color: white;
        font-size: 0.488rem;
        text-align: center;
        width: 100%;
        text-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
    }
    .component-bigImage-bottomNav {
        position: fixed;
        bottom: 0.8rem;
        text-align: center;
        width: 100%;
        display: block;
        li {
            background: #fff;
            border-radius: 50%;
            cursor: none;
            height: 8px;
            margin: 2px 4px;
            opacity: 0.3;
            position: relative;
            width: 8px;
            display: inline-block;
        }
    }
    .component-bigImage-bottomNav .current {
        opacity: 1;
    }
    @media screen and (min-width: 1024px) {
        .component-bigImage-bottomFont {
            font-size: 0.2rem;
            bottom: 0.37rem;
        }
        .component-bigImage-bottomNav {
            display: none;
        }
    }
    .container_left {
        position: absolute;
        right: 320px;
        width: auto;
    }
    .container_right {
        width: 320px;
        right: 0;
        overflow-y: auto;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        background: #1a1a1a;
        &-container {
            color: white;
            font-size: 14px;
            &-scroll {
                position: absolute;
                width: 100%;
                left: 0;
                right: 0;
                top: 0;
                bottom: 50px;
                overflow: auto;
                &-header {
                    height: 80px;
                    & > div {
                        margin-top: 20px;
                        margin-left: 20px;
                    }
                    & > img {
                        width: 60px;
                        height: 60px;
                        border: 1px solid rgba(255, 255, 255, 0.8);
                        top: 50%;
                        border-radius: 50%;
                        margin-left: 10px;
                    }
                    & > span {
                        margin-left: 20px;
                        max-width: 90px;
                        display: inline-block;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
                &-exifInfo {
                    font-size: 15px;
                    font-weight: bold;
                    & > p {
                        margin: 18px;
                    }
                    & > ul {
                        // border-bottom: 1px solid black;
                    }
                    & > ul li {
                        font-size: 12px;
                        color: #9da4a6;
                        font-weight: lighter;
                        display: flex;
                        align-items: center;
                        margin: 18px;
                        span:nth-child(1) {
                            width: 35%;
                            align-self: flex-start;
                        }
                        span:nth-child(2) {
                            width: 65%;
                        }
                    }
                }
                &-retouchInfo {
                    font-size: 15px;
                    font-weight: bold;
                    & > p {
                        margin: 18px;
                    }
                    & > ul {
                        border-bottom: 1px solid black;
                    }
                    & > ul li {
                        font-size: 12px;
                        color: white;
                        font-weight: lighter;
                        display: flex;
                        align-items: center;
                        margin: 18px;
                        margin-top: 30px;
                        span:nth-child(1) {
                            flex-grow: 1;
                            align-self: flex-start;
                        }
                        span:nth-child(2) {
                            flex-grow: 3;
                            max-width: 70%;
                        }
                    }
                    &-tagContainer {
                        flex-grow: 3;
                        max-width: 70%;
                        position: relative;
                        &-tag {
                            position: relative;
                            width: 100px;
                            height: 15px;
                            display: block;
                            cursor: pointer;
                            background: #fff;
                        }

                        &-tagItem {
                            width: 160px;
                            font-size: 14px;
                            cursor: pointer;
                            user-select: none;
                            position: absolute;
                            z-index: 1;
                            padding-top: 10px;
                            margin-left: -30px;
                            display: none;
                            ul {
                                li {
                                    display: inline-block;
                                    width: 28px;
                                    height: 28px;
                                    margin: 2.5px;
                                    border: 1px solid #2580e977;
                                }
                                li:nth-child(9) {
                                    width: 100%;
                                    display: block;
                                    text-align: center;
                                    border: 0;
                                }
                            }
                        }
                    }
                    &-tagContainer:hover {
                        .container_right-container-scroll-retouchInfo-tagContainer-tagItem {
                            display: inline-block;
                            & > ul {
                                text-align: center;
                            }
                        }
                    }
                }
            }
            &-btn {
                width: 100%;
                height: 50px;
                font-size: 0;
                box-sizing: border-box;
                user-select: none;
                display: flex;
                position: absolute;
                bottom: 0;
                span {
                    display: inline-block;
                    padding: 0;
                    height: 50px;
                    line-height: 50px;
                    color: #fff;
                    background: #464553;
                    border: 0;
                    border-left: 1px solid #202026;
                    border-radius: 0;
                    font-weight: bold;
                    text-align: center;
                    font-size: 14px;
                    outline: 0;
                    transition: all 0.3s;
                    cursor: pointer;
                    flex-grow: 1;
                    min-width: 80px;
                }
                span:nth-child(1) {
                    border-left: 0;
                }
                a {
                    display: inline-block;
                    padding: 0;
                    height: 50px;
                    line-height: 50px;
                    color: #fff;
                    background: #464553;
                    border: 0;
                    border-left: 1px solid #202026;
                    border-radius: 0;
                    font-weight: bold;
                    text-align: center;
                    font-size: 14px;
                    outline: 0;
                    transition: all 0.3s;
                    text-decoration: none;
                    cursor: pointer;
                    flex-grow: 1;
                    min-width: 80px;
                }
                span:hover {
                    background: #202026;
                }
                a:hover {
                    background: #202026;
                }
            }
        }

        .blue {
            background-color: #0099e5 !important;
        }
        .green {
            background-color: #7bc93b !important;
        }
        .red {
            background-color: #d85151 !important;
        }
        .coolGreen{
            background-color: #2de0dd !important;
        }
    }
    .iconLeft {
        display: inline-block;
        font-size: 60px;
        position: absolute;
        z-index: 100;
        top: 50%;
        margin-top: -50px;
        width: 70px;
        height: 100px;
        text-align: center;
        cursor: pointer;
        i {
            color: white;
            line-height: 100px;
        }
    }
    .iconRight {
        display: inline-block;
        font-size: 60px;
        position: absolute;
        z-index: 100;
        top: 50%;
        margin-top: -50px;
        width: 70px;
        height: 100px;
        right: 0;
        text-align: center;
        cursor: pointer;
        i {
            color: white;
            line-height: 100px;
        }
    }
}
</style>
