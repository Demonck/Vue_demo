// 商品购买-商品详情-商品评论
<template>
  <div>
    <cmtbox :id="$route.params.id"></cmtbox>
  </div>
</template>

<script>
// 导入评论组件
import cmtbox from "../subcomponents/comment.vue";

export default {
  // 注册评论组件
  components: {
    cmtbox
  }
};
</script>

<style lang="scss" scoped>

</style>
