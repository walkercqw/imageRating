<template>
  <div class="imageRating">
    <div class="imageRating-title">
      <div class="imageRating-title-nickname">
        <!-- <p>昵称:{{user.nickname}}</p> -->
      </div>
    </div>
    <div v-for="(item,i) in dataList" :key="i" class="imageRating-imagebox" v-show="i == showCount">
      <img :src="item.src" alt="" @click="openBigImage(i)">
    </div>
    <div class="imageRating-footer">
      <p>分值可选</p>
      <ul>
        <li v-for="(item,i) in countList" :key="item" @mousedown="getit(i)" @click="send" :class="{'active':i == get}">
          {{item}}
        </li>
      </ul>
    </div>
    <big-image 
        v-if="isOpenBigImage"
        :isOpenBigImage="isOpenBigImage"
        :data="dataList"
        @closeBigImage="closeBigImage" 
        :index="bigImageIndex"
        :openBottomFont="false"
        :isEndLoading='true'
        
        >
    </big-image>
  </div>
</template>
<script>
import bigImage from "./bigimage.vue"
import bigImgParse from "../tool/bigImg.js"
import tipBox from "../tool/tipBox.js"
export default {
  data() {
    return {
      countList:[0,1,2,3,4,5,6,7,8,9],
      oneShow:true,
      twoShow:false,
      get:-1,
      count:0,
      firstSend:1,
      dataList: [
        {
            src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2097445550,1113719468&fm=200&gp=0.jpg',
            msrc:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2097445550,1113719468&fm=200&gp=0.jpg',
            w: 1200,
            h: 900
        },
        {
            src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3668554427,3084213941&fm=200&gp=0.jpg',
            w: 600,
            h: 400
        }
      ],
      imageList:[
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2097445550,1113719468&fm=200&gp=0.jpg",
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3668554427,3084213941&fm=200&gp=0.jpg"
      ],
      showCount:0,
      user:'',
      isOpenBigImage: false,
      bigImgData:[],
      bigImageIndex:0
    };
  },
  created(){
    // this.user = JSON.parse(localStorage.getItem("user"))
    // console.log(this.user)
    // if(!this.user){
    //   tipBox("请重新登录")
    //   this.$router.push({name:"login"})
    // }
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
    toggleBottomImg(index){
            this.bigIndex = index;
        },
    openBigImage(i){
      this.isOpenBigImage = true
      this.bigImageIndex = i
    },
    closeBigImage() {
      this.isOpenBigImage = false;
    },
    getit(i){
      this.get = i
      this.count = i
    },
    send(){
      if(this.showCount == this.imageList.length - 1){
        this.showCount = 0;
      } else {
        this.showCount++
      }
      this.get = this.count
      this.oneShow = !this.oneShow
      this.twoShow = !this.twoShow
      tipBox(`评论成功，当前分数为${this.count}`)
    }
  },
  components:{
    bigImage
  }
  
}
</script>
<style lang="less" scoped>
  .imageRating{
    box-sizing: border-box;
    overflow: hidden;
    background-color: #000;
    &-title{
      height: 5vh;
      background-color: rgba(0,0,0,.5);
      margin-bottom: 10px;
      &-nickname{
        margin-left: 200px;
        p{
          margin:0;
          line-height: 50px;
          color: #fff;
          font-size: 18px;
        }
      }
    }
    &-imagebox{
      box-sizing: border-box;
      height: 80vh;
      width: 100vw;
      position:relative;
      img{
        margin: auto;
        position:absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%)
      }
    }
    &-footer{
      box-sizing: border-box;
      height: 13.9vh;
      color:#fff;
      p{
        margin: 0 200px;
      }
      ul{
        list-style: none;
        width: 60%;
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
</style>