<template>
  <div class="imageRating">
    <div class="imageRating-title">
        <div class="imageRating-title-nickname">
            <p>昵称:{{user.nickname}}</p>
            <p class="imageRating-title-info">已打分{{total}}张</p>
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
import { getImageList, sendScore, hasToken } from '../service/getData.js'
import bigimage from './bigimage.vue'
import tipBox from '../tool/tipBox.js'
export default {
  data () {
    return {
      user: '',
      dataList: [
        {}
      ],
      photo: {},
      countList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      get: -1,
      open: false,
      total: 0
    }
  },
  created () {
    this.user = JSON.parse(localStorage.getItem('user'))
    if (!this.user) {
      tipBox('请重新登录')
      this.$router.push({name: 'login'})
    }

    getImageList(1).then(res => {
      if (res.status == 200) {
        this.showCount = 0
        this.photo = res.data.data
        this.dataList[0].h = this.photo[0].h
        this.dataList[0].w = this.photo[0].w
        this.dataList[0].src = this.photo[0].src
        this.total = res.data.data.total
        this.open = true
        if (this.dataList == '') {
          tipBox('已经任务完成，已经没有图片啦')
          this.showCount = -1
        }
      } else {
        tipBox('请求错误')
      }
    })
  },
  components: {
    bigimage
  },
  methods: {
    goOut () {
      this.$router.push({name: 'login'})
    },
    send (pid, count, isBeforeRetouch, img_number_id) {
      sendScore(pid, count, isBeforeRetouch, img_number_id).then(res => {
        this.open = false
        if (res.status == 200) {
          tipBox(`打分成功，当前分数为${count}`)
          getImageList(1).then(res => {
            if (res.status == 200) {
              this.photo = res.data.data
              this.dataList[0].h = this.photo[0].h
              this.dataList[0].w = this.photo[0].w
              this.dataList[0].src = this.photo[0].src
              this.total = res.data.data.total
              this.open = true
            } else {
              tipBox('请求错误')
            }
          })
        } else {
          tipBox('打分失败')
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
      a{
          color: #fff;
          float: right;
          margin: -30px 300px;
          &:hover{
            color: skyblue;
          }
        }

      &-nickname{
        margin-left: 200px;
        p{
          margin:0;
          line-height: 50px;
          color: #fff;
          font-size: 18px;
        }
      }
      &-info {
        position: absolute;
        left: 500px;
        top: 5px;
      }
    }
    &-box{
        height: 100vh;
        width: 100%;
    }

}

</style>
