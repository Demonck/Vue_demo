// 商品购买-商品详情-商品图文介绍
<template>
  <div class="goodsdesc-container">
    <!-- 商品标题 -->
    <h3>{{ info.title }}</h3>

    <hr />
    <!-- 商品介绍html -->
    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {} // 图文数据
    };
  },
  created() {
    this.getGoodsDesc();
  },
  methods: {
    // 获取图文数据
    getGoodsDesc() {
      this.$http
        .get("api/goods/getdesc/" + this.$route.params.id)
        .then(result => {
          if (result.body.status === 0) {
            this.info = result.body.message[0];
          }
        });
    }
  }
};
</script>

<style lang="scss">
.goodsdesc-container {
  padding: 4px;
  // 标题
  h3 {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
  // 商品介绍
  .content {
    img {
      width: 100%;
    }
  }
}
</style>
