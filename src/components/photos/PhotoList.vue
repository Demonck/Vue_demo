<template >
  <div id="slider" class="mui-slider">
    <!-- 顶部滑动条区域 -->
    <div
      id="sliderSegmentedControl"
      class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
    >
      <div class="mui-scroll">
        <a
          :class="['mui-control-item', item.id == 0 ?'mui-active':'']"
          v-for="item in cates"
          :key="item.id"
        >{{ item.title }}</a>
      </div>
    </div>
    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link :to="'/home/photoinfo/'+ item.id" v-for="item in list" :key="item.id" tag="li">
        <img v-lazy="item.img_url" />
        <!-- 图片文字介绍区 -->
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
// 导入 mui 的js文件
import mui from "../../lib/mui/js/mui.min.js";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      cates: [], //图片分类数据数组
      list: [] //图片列表数据数组
    };
  },
  created() {
    this.getAllCategory();
    // 默认进入页面，就主动请求 所有图片列表的数据
    this.getPhotoListByCateId(0);
  },
  mounted() {
    // 把mui滚动条设置放在生命周期最后面，解决刚进入 图片分享页面的时候， 滑动条无法正常工作
    // 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数
    // 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的
    // 初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllCategory() {
      // 获取所有的图片分类
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          // 手动拼接出一个包含-全部，最完整的分类列表
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
          Toast("加载图片分类成功！");
        } else {
          Toast("加载图片分类失败！");
        }
      });
    },
    getPhotoListByCateId(cateId) {
      // 根据 分类Id，获取图片列表
      this.$http.get("api/getimages/" + cateId).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
          Toast("加载图片列表成功！");
        } else {
          Toast("加载图片列表失败！");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
//去除谷歌浏览器滑动的时候报警告
* {
  touch-action: none;
}
// 图片列表样式
.photo-list {
  // 去除lsit样式，设置边距
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  // 图片底
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    // 图片
    img {
      width: 100%;
      vertical-align: middle;
    }
    // 懒加载组件的样式
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    // 图片介绍，白色，左对齐，透明度阴影，最大高度，字体大小
    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>