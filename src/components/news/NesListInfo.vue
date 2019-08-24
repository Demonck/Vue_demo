// 新闻详情页组件
<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{ newsinfo.title }}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{ newsinfo.add_time | dateFormat }}</span>
      <span>点击：{{ newsinfo.click }}次</span>
    </p>
    <hr />
    <!-- 内容区域，html -->
    <div class="content" v-html="newsinfo.content"></div>
    <!-- 评论子组件区域,父组件向子组件传值id -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
// 1. 导入 评论子组件
import comment from "../subcomponents/comment.vue";

export default {
  data() {
    return {
      id: this.$route.params.id, // 将 URL 地址中传递过来的 Id值，挂载到 data上，方便以后调用
      newsinfo: {} // 新闻对象
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      // 获取新闻详情
      this.$http.get("api/getnew/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.newsinfo = result.body.message[0];
          Toast("获取新闻成功！");
        } else {
          Toast("获取新闻失败！");
        }
      });
    }
  },
  components: {
    // 用来注册子组件的节点
    "comment-box": comment
  }
};
</script>

<style lang="scss">
.newsinfo-container {
  // 内容整体边距
  padding: 0 15px;
  // 主标题
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  // 副标题
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  // 新闻内容html-img合理布局显示
  .content {
    img {
      width: 100%;
    }
  }
}
</style>
