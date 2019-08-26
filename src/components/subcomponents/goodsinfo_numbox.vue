// 数字组件
<template>

  <div class="mui-numbox" data-numbox-min='1'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <!-- 在数量输入框中绑定一个改变事件触发countChanged方法，数字子组件调用商品详情父组件的getcount传递数量值 -->
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox" />
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
      // 每当 文本框的数据被修改的时候，立即把 最新的数据，通过事件调用，传递给父组件
      // console.log(this.$refs.numbox.value);
      this.$emit("getcount", parseInt(this.$refs.numbox.value));
      console.log(this.max);
    }
  },
  props: ["max"],
  watch: {
    // watch属性监听
    max: function(newVal, oldVal) {
      // 使用mui的 JS API 设置 numbox 的最大值
      mui(".mui-numbox")
        .numbox()
        .setOption("max", newVal);

    }
  }
};
</script>

<style lang="scss" scoped>

</style>
