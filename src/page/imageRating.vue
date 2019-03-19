<template>
  <div class="imageRating">
      <div>
          <BigImage
            v-if="isOpenBigImage"
            :data="dataList"
            :isOpenBigImage="isOpenBigImage"
        />
      </div>
    
  </div>
</template>
<script>
import BigImage from "./bigimage.vue"
import bigImgParse from "../tool/bigImg.js";
export default {
  data() {
    return {
      dataList: [
        {
            src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2097445550,1113719468&fm=200&gp=0.jpg',
            w: 600,
            h: 400
        },
        {
            src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3668554427,3084213941&fm=200&gp=0.jpg',
            w: 600,
            h: 400
        }
      ],
      isOpenBigImage: true,
      bigImgData:[]
    };
  },
  created(){
      this.bigImgData = bigImgParse(this.dataList);
      console.log(this.bigImgData)
  },
  components:{
      BigImage,
      
  }
}
</script>
<style lang="less" scoped>
  .imageRating{
      width: 100vw;
      height: 100vh;
  }
</style>