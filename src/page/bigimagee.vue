<template>
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
        <li v-for="(item,i) in countList" :key="item" 
        @mousedown="getit(i)"
        @mouseup="unget(i)" 
        :class="{'active':i == get}">
          {{item}}
        </li>
      </ul>
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
            dataList:[],
            get:-1,
            count:0,
            countList:[0,1,2,3,4,5,6,7,8,9],
            pswpElement:'',
            options:{},
            gallery:"",
        }
    },
    created(){
        getImageList(1).then(res => {
          if(res.status == 200){
            this.dataList = res.data.data
            console.log(this.dataList)
            if(this.dataList == ''){
              tipBox("任务完成，已经没有图片啦")
              this.showCount = -1
            }
          } else {
            tipBox("请求错误")
          }
        })
    },
    watch:{
        dataList(newVlaue){
            this.dataList = newVlaue
            this.gallery.init()
        }
    },
    mounted(){
        document.onkeyup = () => {
          this.firstSend = 1
          this.get = -1
        }
        document.onkeydown =  (event) => {
          if(this.isOpenBigImage){
            return;
          } 
          if(this.dataList == ""){
            tipBox('任务完成，已经没有图片啦')
            return;
          }
            var e = event || window.event;
            switch(e.keyCode){
              case 48:
              case 96:
                this.count = 0
                if(this.firstSend++ == 1){
                  this.send()
                }
                this.bigImageIndex = 1
                break;
              case 49:
              case 97:
                this.count = 1
                if(this.firstSend++ == 1){
                  this.send()
                }
                break;
              case 50:
              case 98:
                this.count = 2
                if(this.firstSend++ == 1){
                  this.send()
                }
                break;
              case 51:
              case 99:
                this.count = 3
                if(this.firstSend++ == 1){
                  this.send()
                }
                break;
              case 52:
              case 100:
                this.count = 4
                if(this.firstSend++ == 1){
                  this.send()
                }
                break;
              case 53:
              case 101:
                this.count = 5
                if(this.firstSend++ == 1){
                  this.send()
                }
                break;
              case 54:
              case 102: 
                this.count = 6
                if(this.firstSend++ == 1){
                  this.send()
                }
                break;
              case 55:
              case 103: 
                this.count = 7
                if(this.firstSend++ == 1){
                  this.send()
                }
                break;
              case 56:
              case 104:
                this.count = 8
                if(this.firstSend++ == 1){
                  this.send()
                }
                break;
              case 57:
              case 105:
                this.count = 9
                if(this.firstSend++ == 1){
                  this.send()
                }
                break; 
            }
        }; 
      },
    methods:{
        getit(i){
          this.get = i
          this.count = i
        },
        unget(){
          this.get = -1
          if(this.dataList == ""){
            tipBox("任务完成，已经没有图片啦")
            return;
          }
          this.send()
        },
        send(){
          sendScore(this.dataList[0].id,this.count,this.dataList[0].isBeforeRetouch,this.dataList[0].img_number_id).then(res => {
            getImageList(1).then(res => {
              if(res.data.status == 200) {
                this.dataList = res.data.data
              } else {
                tipBox("图片获取失败")
              }
            })
            if(res.status == 200){
              tipBox(`打分成功，当前分数为${this.count}`)
                this.showCount = 0;
              } 
              this.get = this.count 
          })
        },
        photoStart(){
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
            }
            this.gallery = new PhotoSwipe( this.pswpElement, PhotoSwipeUI_Default, this.dataList, this.options);
            this.gallery.init()
            this.gallery.updateSize(true)
        }
    }
};
</script>

<style lang="less">
@import "../plugins/photoswipe/dist/photoswipe.css";
@import "../plugins/photoswipe/dist/default-skin/default-skin.css";
.imageRating{
    &-footer{
      margin-top:80px;  
      box-sizing: border-box;
      height: 13.9vh;
      color:#fff;
      position:relative;
      top: 753px;
      background-color: #000;
      p{
        text-align: center;
        margin: 0 200px;
      }
      ul{
        list-style: none;
        width: 40%;
        margin: 0 auto;
        display:flex;
        justify-content: space-around;
        margin-top: 20px;
        .active{
            background-color: #1e76e2;
          }
        li{
          width: 50px;
          height: 50px;
          border:1px solid #fff;
          text-align: center;
          line-height: 50px;
          cursor: pointer;
        }
      }
    }
}
.pswp__img{
  padding-bottom:130px;
}
</style>
