<template>
    <transition name="fade">
        <div class="pswp component-bigImage" tabindex="-1" role="dialog" aria-hidden="true">
            <button class="tool-close" @click="close" v-show="!isFullScreen">
                <i class="iconfont icon-close"></i>
            </button>
            <div class="pswp__bg"></div>
            <div class="pswp__scroll-wrap" ref="BigImageContainer" :class="{'container_left':openSideBar,'container_bottom':showCaption && !isFullScreen}">
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
                    
                    <div class="iconLeft" @click="prePicture"  v-if="!isFullScreen && !isMobileFlag">
                        <i class="iconfont icon-left"></i>
                    </div>

                    <div class="iconRight" @click="nextPicture"  v-if="!isFullScreen && !isMobileFlag" >
                        <i class="iconfont icon-right"></i>
                    </div>

                    <div class="pswp__caption">
                        <div class="pswp__caption__center"></div>
                    </div>

                 </div>

            </div>
            <div class="pswp__nav container_right" v-if="openSideBar">
                <div class="pswp__nav container_right-container">
                    <div class="pswp__nav container_right-container-scroll">
                        <div class="pswp__nav container_right-container-scroll-header">
                            <div v-if="nowProName!=''">
                                <span>摄影师</span>
                                <span>{{nowProName}}</span>
                              </div>
                            <div v-if="nowRetouchName!=''">
                                <span>修图师</span>
                                <span>{{nowRetouchName}}</span>
                            </div>
                        </div>
                        <div class="pswp__nav container_right-container-scroll-exifInfo">
                             <p>EXIF信息</p>
                             <ul>
                                <li>
                                    <span>品牌</span>
                                    <span>{{data[index].exif.brand||"暂无"}}</span>
                                </li>
                                <li>
                                    <span>型号</span>
                                    <span>{{data[index].exif.model||"暂无"}}</span>
                                </li>
                                <li>
                                    <span>焦距</span>
                                    <span>{{data[index].exif.focal||"暂无"}}</span>
                                </li>
                                <li>
                                    <span>光圈</span>
                                    <span>{{data[index].exif.fnumber||"暂无"}}</span>
                                </li>
                                <li>
                                    <span>快门速度</span>
                                    <span>{{data[index].exif.shutterSpeed||"暂无"}}</span>
                                </li>
                                <li>
                                    <span>ISO</span>
                                    <span>{{data[index].exif.iso||"暂无"}}</span>
                                </li>
                                <li>
                                    <span>曝光补偿</span>
                                    <span>{{data[index].exif.exposure||"暂无"}}</span>
                                </li>
                                <li>
                                    <span>拍摄时间</span>
                                    <span>{{formatDates(data[index].exif.uploadTime)||"暂无"}}</span>
                                </li>
                                <li>
                                    <span>镜头</span>
                                    <span>{{data[index].exif.lens||"暂无"}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="pswp__nav container_right-container-scroll-retouchInfo">
                            <ul>
                               
                                <li>
                                    <span>原文件名</span>
                                    <span>{{data[index].fileName}}</span>
                                </li>
                                <li>
                                    <span>喔图编号</span>
                                    <span>{{`${data[index].id}.jpg`}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="pswp__nav container_right-container-btn">
                        <span 
                            class="auditing-imageBox-btn-display" 
                            @click="clickDisplayButton" 
                            :class="{blue:data[index].display}">
                            显示
                        </span>
                    </div>
                </div>
            </div>  
            <div class="component-bigImage-loading"></div>
            <p class="component-bigImage-bottomFont" v-if="openBottomFont">{{data[index].name}}</p>
            <ul class="component-bigImage-bottomNav" v-if="openBottomFont">
                <template v-for="(item,n) in data">
                    <li :class="{current: n == index}"></li>
                </template>
            </ul>
            <div class="component-bigImage-bottomTool" v-if="showCaption && !isFullScreen">
                <span @click="openFullScreen">全屏</span>
                <span class="component-bigImage-bottomTool-download">
                    <span>下载照片</span>
                    <ul class="component-bigImage-bottomTool-download-select">
                        <li v-if="data[index].watermarkUrl.length > 0">
                            <label>修后有水印照片</label>
                            <div><a :href="data[index].watermarkUrl" >下载</a></div>
                        </li>
                        <li v-if="data[index].originUrl.length > 0">
                            <label>修后无水印照片</label>
                            <div><a :href="data[index].originUrl" >下载</a></div>
                        </li>
                    </ul>
                </span>
                <span class="component-bigImage-bottomTool-info">
                    <span>照片信息</span>
                    <ul class="component-bigImage-bottomTool-info-select">
                        <li>
                            <label>文件大小</label>
                            <div>{{getSizes(data[index].size)}}</div>
                        </li>
                        <li>
                            <label>拍摄时间</label>
                            <div>{{formatDates(data[index].exif.shootTime)||"暂无"}}</div>
                        </li>
                        <li>
                            <label>文件编号</label>
                            <div>{{data[index].fileName||"暂无"}}</div>
                        </li>
                        <li>
                            <label>喔图ID</label>
                            <div>{{data[index].id||"暂无"}}</div>
                        </li>
                    </ul>
                </span>
                <!-- <span class="component-bigImage-bottomTool-time">
                    <span>播放间隔</span>
                    <ul class="component-bigImage-bottomTool-time-select">
                        <li @click="changeTimeDuration(15000)" :class="{active:timeDuration == 15000}">15秒</li>
                        <li @click="changeTimeDuration(10000)" :class="{active:timeDuration == 10000}">10秒</li>
                        <li @click="changeTimeDuration(5000)" :class="{active:timeDuration == 5000}">5秒</li>
                        <li @click="changeTimeDuration(2000)" :class="{active:timeDuration == 2000}">2秒</li>
                    </ul>
                </span>
                <span @click="randomDisplay">随机播放</span>
                <span @click="autoDisplay" id="autoDisplay">顺序播放</span> -->
            </div>
            <div class="pswp__caption component-bigImage-bottomImg" v-if="showCaption && !isFullScreen">
                <div class="component-bigImage-bottomImg-container" ref="bottomUl" >
                    <li 
                        v-for="(item,n) in data"
                        :key="item.id" 
                        :class="{'borderBlue': n == index}" 
                        class="component-bigImage-bottomImg-container-li" 
                        @click="toggleBottomImg(item,n)">
                        <img :src="item.smallUrl">
                    </li>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
let { PhotoSwipe } = require("../plugins/photoswipe/dist/photoswipe.js");
let {
    PhotoSwipeUI_Default
} = require("../plugins/photoswipe/dist/photoswipe-ui-default.js");
import { formatDate } from "../module/date";
import { isMobile } from "../module/util.js";
import "../plugins/animation.js";
import { setTimeout } from 'timers';
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
        newBeforePhotos: {
            type: Array,
            default: () => []
        },
        index: {
            type: Number,
            default: 0
        },
        nowSep: {
            type: Object
        },
        maxMultiple: {
            type: Number,
            default: 3
        },
        openBottomFont: {
            type: Boolean,
            default: false
        },
        openSideBar: {
            type: Boolean,
            default: false
        },
        isOpenBigImage: {
            type: Boolean,
            default: false
        },
        isEndLoading: {
            type: Boolean,
            default: false
        },
        showCaption:{
            type:Boolean,
            default:false,
        },
        // 是否可以通过“上一页” 按钮进行 列表循环
        isCanLoop: {
            type: Boolean,
            default: false
        }

    },
    data() {
        return {
            items: [],
            gallery: null,
            isLoadingMore: false,
            isMobileFlag: false,
            screenSize: {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            },
            isFullScreen:false,
            timeDuration:2000,
            randomPlay:false,
            aDTimer:null,
        };
    },
    created() {
        if (isMobile()) {
            this.isMobileFlag = true;
        }
    },
    mounted() {
        console.log("=====mounted======");
        var that = this;
        this.pushArray(this.data);
        that.gallery = new PhotoSwipe(
            document.querySelectorAll(".pswp")[0],
            PhotoSwipeUI_Default,
            that.items,
            {
                index: 0,
                maxSpreadZoom: that.maxMultiple,
                loop: false,
                arrowEl: false,
                arrowKeys: false,
                shareEl: false,
                counterEl: false,
                captionEl: false,
                fullscreenEl: false,
                zoomEl: false,
                showAnimationDuration: 0,
                hideAnimationDuration: 0,
                canKeyDownLoop:true
                // modal:false
            }
        );
        that.gallery.init();
        that.gallery.goTo(that.index);
        that.showCaption && that.moverBottomImg( that.index);
        //打开页面
        that.$emit(
            "changeBigImage",
            that.gallery.getCurrentIndex(),
            that.gallery.options.getNumItemsFn(),
            console.log("打开页面了")
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
        that.gallery.listen("afterChange", function() {
            that.showCaption && that.moverBottomImg(that.index);
        });
        //图片加载完成
        that.gallery.listen("imageLoadComplete", function(_index) {
            that.$emit("cacheBigImage", _index);
        });
        //关闭
        that.gallery.listen("close", function() {
            that.$emit("closeBigImage");
        });
        document.addEventListener(this.gallery.ui.getFullscreenAPI().eventK, ()=> {
            if(this.gallery.ui.getFullscreenAPI().isFullscreen()){
                this.isFullScreen = true;
            }else{
                this.isFullScreen = false;
                this.randomPlay = false;
                this.aDTimer && clearInterval(this.aDTimer);
                this.aDTimer = null;
                setTimeout(() => {
                    that.showCaption && that.moverBottomImg(that.index);
                }, 100);
            }
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
        this.screenSize.w = this.$refs.BigImageContainer.offsetWidth;
        this.screenSize.h = this.$refs.BigImageContainer.offsetHeight;
    },
    beforeDestroy() {
        this.aDTimer && clearInterval(this.aDTimer);
    },
    destroyed() {
        console.log("=======destroy=========");
        document.removeEventListener("keyup", this.keyUpLinstenerFn);
    },
    computed: {
        nowProName() {
            let userId = this.data[this.index].userId;
            let realNameObj = this.nowSep.proList.find(ele => {
                return ele.usrId == userId;
            });
            if (realNameObj) {
                return realNameObj.name;
            } else {
                return "";
            }
        },
        nowRetouchName() {
            let userId = this.data[this.index].retouchUserId;
            let realNameObj = this.nowSep.proList.find(ele => {
                return ele.usrId == userId;
            });
            if (realNameObj) {
                return realNameObj.name;
            } else {
                return "";
            }
        }
    },
    methods: {
        changeTimeDuration(time){
            this.timeDuration = time;
            // this.aDTimer && clearInterval(this.aDTimer);
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
            let returnDate = "";
            if(str){
                return formatDate(Number(str), "YYYY年MM月DD日HH小时mm分ss秒");
            }else{
                return "暂无";
            }
        },
        randomDisplay(){
            this.randomPlay == true;
            this.autoDisplay();
        },
        autoDisplay(){
            this.gallery.ui.getFullscreenAPI().enter();
            if(!this.aDTimer){
                this.aDTimer = setInterval(() => {
                    if(this.randomPlay == true){
                        this.gallery.goTo(parseInt(Math.random()*this.data.length));
                    }else{
                        this.gallery.next();
                    }
                }, this.timeDuration);
            }
        },
        openFullScreen(){
            this.gallery.ui.getFullscreenAPI().enter();
        },
        toggleBottomImg(item,nIndex){
            const that = this;
            // if (nIndex == this.data.length - 1) {
            //     if (this.isEndLoading == true) {
            //         tipBox("到底了", {
            //             left: "auto",
            //             right: "390px",
            //             top: "auto",
            //             bottom: "48%"
            //         });
            //     }
            //     if (!this.isLoadingMore) {
            //         this.isLoadingMore = true;
            //         this.$emit("loadMore");
            //         return;
            //     }
            // }
            that.$emit(
                "changeBigImage",
                nIndex,
                that.gallery.options.getNumItemsFn()
            );
            this.gallery.goTo(nIndex);
            console.log("toggleBottomImg", nIndex)
            this.moverBottomImg(nIndex);
            this.$emit('toggleBottomImg', nIndex);
        },
        moverBottomImg(index){
            if(index < this.data.length - 1){
                let bottomUl = this.$refs.bottomUl;
                if(bottomUl){
                    let bottomUlItem = bottomUl.childNodes[index];
                    let targeLeft = bottomUlItem.offsetLeft - bottomUl.clientWidth / 2 + bottomUlItem.clientWidth / 2;
                    //滚动
                    Math.animation(bottomUl.scrollLeft, targeLeft, 300, 'Cubic.easeOut', function(value) {
                        bottomUl.scrollLeft = value;
                    });
                }
            }
        },
        close: function() {
            this.gallery.close();
        },
        clickDisplayButton() {
            this.$emit(
                "changeDisplay",
                this.data[this.index].id,
                this.data[this.index].display,
                this.index
            );
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
        pauseVideo() {
            const that = this;
            let _video = that.gallery.container.querySelectorAll(".video-hd");
            for (let i = 0, len = _video.length; i < len; i++) {
                _video[i].pause();
            }
        },
        updateItems() {
            this.gallery.invalidateCurrItems();
            this.gallery.updateSize(true);
        },
        prePicture() {
            if (this.index == 0) {
                this.$emit("addNewPhoto");
                if(this.isCanLoop) {
                    this.gallery.prev();
                }
                return;
            }
            this.gallery.prev();
        },
        nextPicture() {
            // if (this.index == this.data.length - 1) {
            //     if (this.isEndLoading == true) {
            //         tipBox("到底了", {
            //             left: "auto",
            //             right: "390px",
            //             top: "auto",
            //             bottom: "48%"
            //         });
            //     }
            //     if (!this.isLoadingMore) {
            //         this.isLoadingMore = true;
            //         this.$emit("loadMore");
            //     }
            //     return;
            // }
            this.gallery.next();
        },
        keyUpLinstenerFn(e) {
            if (e.keyCode == 37 && this.isOpenBigImage) {
                this.prePicture();
            }
            //right
            if (e.keyCode == 39 && this.isOpenBigImage) {
                this.nextPicture();
            }
        },
        pushArray(array) {
            array.forEach(function(item) {
                if (
                    item.type == 1 
                    ||
                    (
                        item.fileName&&
                        item.fileName.replace(/.+\./,"").toLocaleLowerCase() =='mp4'
                    )
                ) {
                    console.log('into')
                    let obj ={
                        w: item.width,
                        h: item.height,
                        urlSmall:item.urlSmall,
                        urlOrg:item.urlOrg,
                    }
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
                }
                else if( item.type == 2){
                    let ratio = item.h / item.w;
                    item.w = this.screenSize.w;
                    item.h = item.w * ratio;
                } 
                else{
                    if(item.h / item.w > 2){
                        let ratio = item.h / item.w;
                        item.w = this.screenSize.w;
                        item.h = item.w * ratio;
                    }
                }
                this.items.push(item);
            }, this);
        },
        unshift(array) {
            let newArray = [];
            array.forEach(function(item) {
                if (item.fileName.replace(/.+\./,"") =='mp4') {
                    let obj ={
                        w: item.width,
                        h: item.height,
                        urlSmall:item.urlSmall,
                        urlOrg:item.urlOrg,
                    }
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
                }
                newArray.push(item);
            }, this);
            this.items.unshift(...newArray);
        }
    },
    watch: {
        newNextPhotos: function() {
            if (this.newNextPhotos <= 0) return;
            this.pushArray(this.newNextPhotos);
            this.isLoadingMore = false;
        },
        newBeforePhotos: function() {
            if (this.newBeforePhotos <= 0) return;
            this.unshift(this.newBeforePhotos);
        },
        data: {
            handler() {
                this.updateItems();
            },
            deep: true
        },
        index(){
            if((this.index == this.data.length - 1 )){
                if (this.isEndLoading == true && !(this.aDTimer)) {
                    tipBox("到底了", {
                        left: "auto",
                        right: "390px",
                        top: "auto",
                        bottom: "48%"
                    });
                }
                if (!this.isLoadingMore) {
                    this.isLoadingMore = true;
                    this.$emit("loadMore");
                }
                return;
            }
        }
        // index(){
        //     if((this.index == this.data.length - 1 )&& (this.aDTimer)){
        //         if (this.isEndLoading == true) {
        //             tipBox("到底了", {
        //                 left: "auto",
        //                 right: "390px",
        //                 top: "auto",
        //                 bottom: "48%"
        //             });
        //         }
        //         if (!this.isLoadingMore) {
        //             this.isLoadingMore = true;
        //             this.$emit("loadMore");
        //         }
        //         return;
        //     }
        // },
    }
};
</script>

<style lang="less">
@import "../plugins/photoswipe/dist/photoswipe.css";
@import "../plugins/photoswipe/dist/default-skin/default-skin.css";

.component-bigImage {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    .pswp__item img {
        pointer-events: auto;
    }
    .tool-close {
        width: 50px;
        height: 50px;
    }
    .video-hd {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
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
    .component-bigImage-bottomTool{
        position: absolute;
        left: 50%;
        transform: translate(-50%,0);
        bottom: 80px;
        width: 282px;
        height: 40px;
        line-height: 40px;
        display: block;
        background:#1a1a1a;
        user-select: none;
        &>span{
            margin-left: 34px;
            font-size: 14px;
            color: white;
            display: inline-block;
            cursor: pointer;
        }
    &-download{
        position:relative;
        &-select{
            display: none;
            width: 222px;
            position: absolute;
            right: 0;
            bottom: 40px;
            left: -76px;
            margin: 0;
            background-color: #1a1a1a;
            box-sizing: border-box;
            &>li{
                    position: relative;
                    padding: 0 10px 0 20px;
                    margin: 0;
                    display: block;
                    border: 0 !important;
                    height: 34px;
                    line-height: 34px;
                    font-size: 12px;
                    cursor: pointer;
                    border-radius: 4px;
                    box-sizing: border-box;
                    &>label{
                        width: 134px;
                        font-size: 12px;
                        display: inline-block;
                        vertical-align: middle;
                        box-sizing: border-box;
                    }
                    &>div{
                        width: 50px;
                        text-align: right;
                        box-sizing: border-box;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        display: inline-block;
                        font-size: 12px;
                        display: inline-block;
                        vertical-align: middle;
                    }
                }
            }
        }
        &-info{
            position:relative;
            &-select{
                display: none;
                width: 304px;
                position: absolute;
                right: 0;
                bottom: 40px;
                left: -112px;
                margin: 0;
                background-color: #1a1a1a;
                box-sizing: border-box;
                &>li{
                    position: relative;
                    padding: 0 10px 0 20px;
                    margin: 0;
                    display: block;
                    border: 0 !important;
                    height: 34px;
                    line-height: 34px;
                    font-size: 12px;
                    cursor: pointer;
                    border-radius: 4px;
                    box-sizing: border-box;
                    &>label{
                        width: 84px;
                        font-size: 12px;
                        display: inline-block;
                        vertical-align: middle;
                        box-sizing: border-box;
                    }
                    &>div{
                        width: 180px;
                        text-align: right;
                        box-sizing: border-box;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        display: inline-block;
                        font-size: 12px;
                        display: inline-block;
                        vertical-align: middle;
                    }
                }
            }
        }
        &-time{
            position:relative;
            &-select{
                display: none;
                position: absolute;
                right: 0;
                bottom: 40px;
                left: 0;
                margin: 0;
                background-color: #1a1a1a;
                &>li{
                    position: relative;
                    margin: 0;
                    display: block;
                    border: 0 !important;
                    height: 30px;
                    line-height: 30px;
                    font-size: 14px;
                    cursor: pointer;
                    text-align: center;
                }
                & .active{
                    color: #2998ff;
                }
            }
        }
        &-time:hover{
            .component-bigImage-bottomTool-time-select{
                display: block;
            }
        }
        &-info:hover{
            .component-bigImage-bottomTool-info-select{
                display: block;
            }
        }
        &-download:hover{
            .component-bigImage-bottomTool-download-select{
                display: block;
            }
        }
    }
    .component-bigImage-bottomImg{
        height: 80px;
        &-container{
            position: absolute;
            overflow: hidden;
            white-space: nowrap;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 80%;
            user-select: none;
            &-li{
                display: inline-block;
                position: relative;
                height: 74px;
                width: 74px;
                margin-right: 6px;
                cursor: pointer;
                &>img{
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    margin: auto;
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            .borderBlue{
                border: 1px solid #2998ff;
            }
        }
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
    .container_bottom {
        bottom: 120px;
        height: auto;
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
                    border-bottom: 1px solid black;
                    div {
                        margin-top: 20px;
                    }
                    span {
                        font-size: 14px;
                        margin-left: 20px;
                        max-width: 90px;
                        color: rgba(204, 204, 204, 1);
                        display: inline-block;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
                &-exifInfo {
                    font-size: 15px;
                    font-weight: bold;
                    > p {
                        margin: 18px;
                    }
                    > ul {
                        border-bottom: 1px solid black;
                    }
                    > ul li {
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
                    > p {
                        margin: 18px;
                    }
                    > ul li {
                        font-size: 12px;
                        color: #9da4a6;
                        font-weight: lighter;
                        display: flex;
                        align-items: center;
                        margin: 18px;
                        span:nth-child(1) {
                            flex-grow: 1;
                            align-self: flex-start;
                        }
                        span:nth-child(2) {
                            flex-grow: 3;
                            max-width: 70%;
                            word-wrap: break-word;
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
                            background: white;
                            position: relative;
                            z-index: 1;
                            padding-top: 10px;
                            margin-left: -30px;
                            visibility: hidden;
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
                            visibility: visible;
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
                }
                // span:hover {
                //     background: #202026;
                // }
                // a:hover {
                //     background: #202026;
                // }
            }
        }

        .blue {
            background-color: #0099e5;
        }
        .green {
            background-color: #7bc93b;
        }
        .red {
            background-color: #d85151;
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
