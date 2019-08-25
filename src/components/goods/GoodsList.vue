// 商品列表
<template>
  <div class="goods-list">
    <!-- 商品信息 -->
    <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url" alt />
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="new">￥{{ item.market_price }}</span>
          <span class="old">￥{{ item.sell_price }}</span>
        </p>
        <p class="sell">
          <span>正在热卖中！</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>
    <!-- 加载更多 -->
    <div class="moreButton">
      <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    // data 是往自己组件内部，挂载一些私有数据的
    return {
      pageindex: 1, //页数
      goodslist: [] // 存放商品列表的数组
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      // 获取商品列表
      this.$http
        .get("api/getgoods?pageindex=" + this.pageindex)
        .then(result => {
          if (result.body.status === 0) {
            // 拼接数据
            this.goodslist = this.goodslist.concat(result.body.message);
            Toast("加载商品列表成功！");
          } else {
            Toast("加载商品列表失败！");
          }
        });
    },
    //加载更多
    getMore() {
      this.pageindex++;
      this.getGoodsList();
    },
    //商品详情页跳转
    goDetail(id) {
      // 1. 最简单的
      // this.$router.push("/home/goodsinfo/" + id);
      // 2. 传递对象
      // this.$router.push({ path: "/home/goodsinfo/" + id });
      // 3. 传递命名的路由
      this.$router.push({ name: "goodsinfo", params: { id } });
    }
  }
};
</script>

<style lang="scss" scoped>
// 最外围div：flex弹性布局-wrap拆列-space-between行之间留白
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
  //内层div：一半宽度（保证一行两列）-border白边-box-shadow阴影-margin左右边距(实现中间留白)
  //-flex弹性布局-flex-direction垂直显示（实现不同图片高度不同的留白问题）
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    // 商品信息
    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      // 价格
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        // text-decoration下划线
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
  //   加载更多按钮
  .moreButton {
    width: 100%;
    margin-bottom: 50px;
  }
}
</style>