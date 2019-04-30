<template>
<div class="image">
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

    <!-- Background of PhotoSwipe. 
         It's a separate element as animating opacity is faster than rgba(). -->
    <div class="pswp__bg"></div>

    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">

        <!-- Container that holds slides. 
            PhotoSwipe keeps only 3 of them in the DOM to save memory.
            Don't modify these 3 pswp__item elements, data is added later on. -->
        <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
        </div>

        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">

            <div class="pswp__top-bar">

                <!--  Controls are self-explanatory. Order can be changed. -->

                <div class="pswp__counter"></div>

                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

                <button class="pswp__button pswp__button--share" title="Share"></button>

                <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

                <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
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

            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
            </button>

            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
            </button>

            <div class="pswp__caption">
                <div class="pswp__caption__center"></div>
            </div>

        </div>

    </div>
    <div class="imageRating-footer">
      <p>分值可选</p>
      <ul>
        <li v-for="(item,i) in countList" :key="i" 
        @mousedown="getit(i)"
        @mouseup="unget(i)" 
        :class="{'active':i == get}">
          {{item}}
        </li>
      </ul>
    </div>
</div>

</div>
</template>

<script>
let { PhotoSwipe } = require("../plugins/photoswipe/dist/photoswipe.js");
let {
    PhotoSwipeUI_Default
} = require("../plugins/photoswipe/dist/photoswipe-ui-default.js");
import { getImageList,sendScore,hasToken } from "../service/getData.js"
import tipBox from "../tool/tipBox.js"
export default {
    name: "bigImage",
    data() {
        return {
            pswpElement:'',
            options:{},
            gallery:"",
            countList:["badBlur","goodBlur","noBlur"],
            get:-1,
            count:0,
            firstSend:true,

        }
    },
    created(){
    },
    mounted(){
        document.onkeydown = (event) => {
          var e = event || window.event
          if(e.keyCode > 58) {
            this.get = e.keyCode - 96
          } else {
            this.get = e.keyCode - 48
          }
          this.firstSend = true
        }
        document.onkeyup =  (event) => {
          if(this.dataList == ""){
            tipBox('任务完成，已经没有图片啦')
            return;
          }
            var e = event || window.event;
            switch(e.keyCode){
              case 48:
              case 96:
                this.count = 0
                this.get = 0              
                this.send()
                break;
              case 49:
              case 97:
                this.count = 1
                this.get = 1
                this.send()
                break;
              case 50:
              case 98:
                this.count = 2
                this.get = 2
                this.send()
                break;
              // case 51:
              // case 99:
              //   this.count = 3
              //   this.get = 3
              //   this.send()
              //   break;
              // case 52:
              // case 100:
              //   this.count = 4
              //   this.get = 4
              //   this.send()
              //   break;
              // case 53:
              // case 101:
              //   this.count = 5
              //   this.get = 5
              //   this.send()
              //   break;
              // case 54:
              // case 102: 
              //   this.count = 6
              //   this.get = 6
              //   this.send()
              //   break;
              // case 55:
              // case 103: 
              //   this.count = 7
              //   this.get = 7
              //   this.send()
              //   break;
              // case 56:
              // case 104:
              //   this.count = 8
              //   this.get = 8
              //   this.send()
              //   break;
              // case 57:
              // case 105:
              //   this.count = 9
              //   this.get = 9
              //   this.send()
                // break; 
            }
        };
        this.data = this.dataList[0]
        var screenWidth = screen.width;
        this.pswpElement = document.querySelectorAll('.pswp')[0]
        this.options = {
            index:0,
            closeEl:false,
            closeOnScroll:false,
            clickToCloseNonZoomable: false,
            closeOnVerticalDrag:false,
            mouseUsed:false,
            arrowKeys:true,
            //设置过渡时间
            showAnimationDuration:0,
            closeElClasses:[],
            focus:true
        }
        this.gallery = new PhotoSwipe( this.pswpElement, PhotoSwipeUI_Default, this.dataList, this.options);
        this.gallery.init()
    },
    watch:{
        dataList(newValue,oldValue){
            console.log("触发了变化")
            console.log(newValue,oldValue) 
            this.gallery = new PhotoSwipe( this.pswpElement, PhotoSwipeUI_Default, this.dataList, this.options);
            this.gallery.init() 
            // this.updateItems();  
        }
        
    },
    props:["dataList","photo"],
    methods:{
         getit(i){
          this.get = i
        },
        unget(i){
          if(this.dataList == ""){
            tipBox("任务完成，已经没有图片啦")
            return;
          }
          this.count = i
          this.send()
          this.get = -1
        },
        send(){
            this.$emit("send",this.photo[0].pid,this.count,this.photo[0].isBeforeRetouch,this.photo[0].img_number_id)
        },
        updateItems() {
            this.gallery.invalidateCurrItems();
            this.gallery.updateSize(true);
        },
        pushArray(array) {
            array.forEach(function(item) {
                if (item.h / item.w > 2) {
                    let ratio = item.h / item.w;
                    item.w = this.screenSize.w;
                    item.h = item.w * ratio;
                }
                this.dataList[0] = item;
            }, this);
        },
    }
};
</script>

<style lang="less">
@import "../plugins/photoswipe/dist/photoswipe.css";
@import "../plugins/photoswipe/dist/default-skin/default-skin.css";
.imageRating{
    &-footer{
      user-select: none;
      box-sizing: border-box;
      background-color: black;
      height: 10.9vh;
      color:#fff;
      position: fixed;
      width: 100%;
      bottom:0;
      z-index: 9999;
      p{
        text-align: center;
        margin: 0 200px;
      }
      ul{
        list-style: none;
        width: 35%;
        margin: 0 auto;
        display:flex;
        justify-content: space-around;
        margin-top: 20px;
        .active{
            background-color: #1e76e2;
          }
        li{
          width: 100px;
          height: 50px;
          border:1px solid #fff;
          text-align: center;
          line-height: 50px;
          cursor: pointer;
          
        }
      }
    }
}
.pswp{
  height: 90vh;
}
.pswp__img{
  overflow: hidden;
  margin-top:3px;
}
</style>
