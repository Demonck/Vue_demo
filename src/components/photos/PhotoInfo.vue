<template>
  <div class="photoinfo-container">
    <!-- 图片详情标题 -->
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
      <span>点击：{{ photoinfo.click }}次</span>
    </p>

    <hr />

    <!-- 缩略图区域，使用vue-preview插件 -->
    <div class="preview">
      <vue-preview :slides="list"></vue-preview>
    </div>

    <!-- 图片内容区域html -->
    <div class="content" v-html="photoinfo.content"></div>

    <!-- 放一个现成的 评论子组件 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
// 导入评论组件
import comment from "../subcomponents/comment.vue";

export default {
  data() {
    return {
      id: this.$route.params.id, // 从路由中获取到的图片Id
      photoinfo: {}, // 图片详情
      list: [] // 缩略图的数组
    };
  },
  created() {
    this.getPhotoInfo();
    this.getPreview();
  },
  methods: {
    getPhotoInfo() {
      // 获取图片的详情
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[0];
          Toast("加载图片详情成功！");
        } else {
          Toast("加载图片详情成功！");
        }
      });
    },
    getPreview() {
      //获取缩略图
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          // 循环每个图片数据，补全图片的宽和高
          result.body.message.forEach(item => {
            // 大图的大小
            item.w = 600;
            item.h = 400;
            // 指定缩略图图片
            item.msrc = item.src;
          });
          // 把完整的数据保存到 list 中
          this.list = result.body.message;
          Toast("加载缩略图成功！");
        } else {
          Toast("加载缩略图成功！");
        }
      });
    }
  },
  components: {
    // 注册评论组件
    "comment-box": comment
  }
};
</script>
<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  //   标题
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  //   副标题
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  // 图片详情内容
  .content {
    font-size: 13px;
    line-height: 30px;
  }
  // 缩略图
  .preview {
    /deep/ .my-gallery {
      display: flex;
      flex-wrap: wrap;
      figure {
        width: 30%;
        margin: 5px;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>