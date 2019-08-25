// 商品详情
<template>
  <div class="goodsinfo-container">
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">￥{{ goodsinfo.sell_price }}</span>
          </p>
          <p>
            购买数量：
            <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <!-- 底部按钮区 -->
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
// 导入轮播图组件
import swiper from "../subcomponents/swiper.vue";
// 导入 数字选择框 组件
import numbox from "../subcomponents/goodsinfo_numbox.vue";

export default {
  data() {
    return {
      id: this.$route.params.id, // 将路由参数对象中的 id 挂载到 data , 方便后期调用
      lunbotu: [], // 轮播图的数据
      goodsinfo: {} // 获取到的商品的信息
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    //获取轮播图数据
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          // 先循环轮播图数组的每一项，为 item 添加 img 属性，因为 轮播图 组件中，只认识 item.img， 不认识 item.src
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotu = result.body.message;
        }
      });
    },
    // 获取商品的信息
    getGoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        }
      });
    },
    // 点击使用编程式导航跳转到 图文介绍页面
    goDesc(id) {
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    // 点击跳转到 评论页面
    goComment(id) {
      this.$router.push({ name: "goodscomment", params: { id } });
    }
  },
  //轮播图组件
  components: {
    swiper,
    numbox
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
  // 价格区
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  // 底部按钮区
  .mui-card-footer {
    display: block;
    margin-bottom: 35px;
    button {
      margin: 15px 0;
    }
  }
}
</style>