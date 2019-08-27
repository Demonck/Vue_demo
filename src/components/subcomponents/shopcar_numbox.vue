// 购物车数字组件
<template>
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      :value="initcount"
      @change="countChanged"
      ref="numbox"
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
// 导入mui js
import mui from "../../lib/mui/js/mui.min.js";

export default {
  mounted() {
    // 初始化数字选择框组件
    mui(".mui-numbox").numbox();
  },
  methods: {
    // 商品数量改变事件
     countChanged() {
      // 每当数量值改变，则立即把最新的数量同步到 购物车的  store 中，覆盖之前的数量值
      this.$store.commit("updateGoodsInfo", {
        id: this.goodsid,
        count: this.$refs.numbox.value
      });
    }
  },
  // 父组件传递的值：initcount-购物车商品数量，goodsid-商品id
  props: ["initcount","goodsid"]
};
</script>

<style lang="scss" scoped>
</style>
