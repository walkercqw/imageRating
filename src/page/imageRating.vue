<template>
  <div class="imageRating">
    <div class="imageRating-title">
        <div class="imageRating-title-nickname">
            <p>昵称:{{user.nickname}}</p>
        </div>
        <div class="imageRating-title-total">
            <p>当前共打分 {{total}} 张</p>
        </div>
        <a href="#" @click="goOut">退出登录</a>
    </div>
    <div class="imageRating-box">
      <bigimage 
        :dataList="dataList"
        :photo="photo"
        @send="send"
        v-if="open"
        >
      </bigimage>
    </div>
  </div>
</template>
<script>
import { getImageList,sendScore,hasToken } from "../service/getData.js"
import bigimage from "./bigimage.vue"
import tipBox from "../tool/tipBox.js"
export default {
  data() {
    return {
      total:'',
      user:"",
      dataList: [
        {}
      ],
      photo:{},
      get:-1,
      open:false,
      num:1
    };
  },
created(){
    this.user = JSON.parse(localStorage.getItem("user"))
    if(!this.user){
      tipBox("请重新登录")
      this.$router.push({name:"login"})
    }
    this.getImage()
  },
  components:{
      bigimage
  },
  methods:{
    getImage(){
      getImageList(this.num).then(res => {
        if(res.data.status == 200){
          this.total = res.data.data.total
          this.showCount = 0
          this.photo = res.data.data
          if(this.num == 1){
            this.dataList[0].h = this.photo[0].h
            this.dataList[0].w = this.photo[0].w
            this.dataList[0].src = this.photo[0].src
          } else {
            this.dataList[0].h = this.photo[this.num - 1].h
            this.dataList[0].w = this.photo[this.num - 1].w
            this.dataList[0].src = this.photo[this.num - 1].src
          }
          this.open = true 
        } else if(res.data.status == 456){
            alert('任务完成，没有图片啦')
            this.showCount = -1
            return;
        } else {
          tipBox("请求错误，请联系管理员")
        }
      })
    },
    goOut(){
      this.$router.push({name:'login'})
    },
    send(pid,count,isBeforeRetouch,img_number_id){
        sendScore(pid,count,isBeforeRetouch,img_number_id).then(res => {
          this.open = false
          if(res.data.status == 200){
            tipBox(`打分成功，当前分数为${count}`)
            this.num = 1
            this.getImage()
          } else {
            tipBox(`${res.data.msg}`)
            this.num++
            this.getImage()
          } 
        })
    }
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
      position: relative;
      z-index: 999;
      &-total{
        float:left;
        margin:0;
        color: #fff;
        line-height: 16px;
        font-size: 18px;
        margin-left: 50px;
      }
      a{
          color: #fff;
          float: right;
          margin: 15px 300px;
          &:hover{
            color: skyblue;
          }
        }
      &-nickname{
        float:left;
        margin-left: 200px;
        p{
          margin:0;
          line-height: 50px;
          color: #fff;
          font-size: 18px;
        }
      }
    }
    &-box{
        height: 100vh;
        width: 100%;
    }
    
}  

</style>