// 商品详情
<template>
  <div class="goodsinfo-container">
    <!-- 加入购物车小球 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

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
          <!-- 添加父->子组件传值的方法getcount, 子->父组件传值的属性max-->
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
      goodsinfo: {}, // 获取到的商品的信息
      ballFlag: false, // 控制小球的隐藏和显示的标识符
      selectedCount: 1 // 保存用户选中的商品数量， 默认为1个
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
          // 把数据放入数组
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
    },
    // 添加到购物车
    addToShopCar() {
      this.ballFlag = !this.ballFlag;
      // 创建一个加入购物车的商品的信息的对象
      // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
      var goodsinfo = {
        id: this.id,
        count: this.selectedCount,
        price: this.goodsinfo.sell_price,
        selected: true
      };
      // 调用vuex的store中的添加商品方法
      this.$store.commit("addToCar",goodsinfo);
      
    },
    // 小球动画
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;
      // 获取小球的 在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取 购物车徽标 在页面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();
      // 计算坐标
      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;
      // 使用es6语法添加参数
      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    // 加入购物车-父-->子组件 传值
    getSelectedCount(count) {
      // 当子组件把 选中的数量传递给父组件的时候，把选中的值保存到 data-selectedCount
      this.selectedCount = count;
      console.log("父组件拿到的数量值为： " + this.selectedCount);
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
  // 购物车小球
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 391px;
    left: 146px;
  }
}
</style>