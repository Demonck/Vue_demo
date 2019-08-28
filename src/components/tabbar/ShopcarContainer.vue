// 购物车组件
<template>
  <div class="shopcar-container">
    <!-- 购物车商品列表 -->
    <div class="goods-list">
      <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
              v-model="$store.getters.getGoodsSelected[item.id]"
              @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"
            ></mt-switch>
            <img :src="item.thumb_path" />
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <!-- 添加点击事件（阻止默认事件），添加删除方法（item.id删vuex-car,i删goodslist） -->
                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 商品价格结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>
              <span class="red">
                 已勾选商品 {{$store.getters.getGoodsCountAndMoney.count}}
                件，总价: ￥{{$store.getters.getGoodsCountAndMoney.money}}
                <span class="red"></span>
              </span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入购物车数字组件
import numbox from "../subcomponents/shopcar_numbox.vue";

export default {
  data() {
    return {
      goodslist: [] // 购物车中所有商品的数据
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    // 获取商品列表
    getGoodsList() {
      // 创建一个存放购物车商品id的数组
      var idArr = [];
      // 通过循环vuex购物车商品数据拼接id数组的内容
      this.$store.state.car.forEach(item => {
        idArr.push(item.id);
      });

      //如果购物车不为空，才获取数据
      if (idArr.length > 0) {
        // 获取数据
        this.$http
          .get("api/goods/getshopcarlist/" + idArr.join(","))
          .then(result => {
            if (result.body.status === 0) {
              this.goodslist = result.body.message;
            }
          });
      }
    },
    // 删除购物车商品
    remove(id, index) {
      // 点击删除，把商品从 store 中根据 传递的 Id 删除，同时，把 当前组件中的 goodslist 中，对应要删除的那个商品，使用 index 来删除
      this.goodslist.splice(index, 1);
      this.$store.commit("removeFormCar", id);
    },
    // 购物车商品选择状态
    selectedChanged(id, val) {
      // 每当点击开关，把最新的状态，同步到 store 中
      //console.log(val)
      this.$store.commit("updateGoodsSelected", { id, selected: val });
    }
  },
  components: {
    numbox
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  // 购物车商品区
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .peice {
        color: red;
        font-weight: bold;
      }
    }
  }
  // 结算区
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>
