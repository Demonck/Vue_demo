// 入口文件
import Vue from 'vue'

// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)
// 1.3 导入自己的 router.js 路由模块
import router from './router.js'

// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)

// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'

// 导入 Mint-UI的全部组件和样式
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

// 导入 App 根组件
import app from './App.vue'

//导入VuePreview缩略图插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 设置api请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

// 导入并注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 创建car数组，进入网站，先从本地存储中，把购物车的数据读出来，放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]');

// 创建store状态管理对象
var store = new Vuex.Store({
  state: {// this.$store.state.***
    //购物车商品的数据，用数组存储起来，在car数组中存储商品的对象 
    //{ id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
    car: car
  },
  mutations: {// this.$store.commit('方法的名称', '按需传递唯一的参数')
    // 添加商品到购物车方法
    addToCar(state, goodsinfo) {
      // 设置一个标识符，来判断是否是第一次添加的商品
      var flag = false;
      // 商品是已经在购物车添加过的
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count);
          flag = true;
          return true;
        }
      })

      // state.car.forEach(item => {
      //   if (item.id == goodsinfo.id) {
      //     item.count += parseInt(goodsinfo.count);
      //     flag = true;
      //     return true;
      //   }
      // });

      // 商品是第一次添加
      if (flag === false) {
        state.car.push(goodsinfo);
      }
      // 当更新car之后，把car数组，存储本地的 localStorage中
      localStorage.setItem('car', JSON.stringify(state.car))

    },
    // 更新购物车商品数量方法
    updateGoodsInfo(state, goodsinfo) {
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count);
          return true;
        }
      })
      // 当更新car之后，把car数组，存储本地的 localStorage中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    // 删除购物车商品
    removeFormCar(state, id) {
      // 根据Id，从store 中的购物车中删除对应的那条商品数据
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true;
        }
      })
      // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    // 更新购物车商品选择状态
    updateGoodsSelected(state, info) {
      state.car.forEach(item => {
        if (item.id == info.id) {
          item.selected = info.selected;
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {// this.$store.getters.***
    // 获取所有商品数量
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    // 获取单个商品数量
    getGoodsCount(state) {
      var o = {};
      state.car.forEach(item => {
        o[item.id] = item.count;
      })
      return o;

    },
    // 获取商品选择情况
    getGoodsSelected(state) {
      var o = {};
      state.car.forEach(item => {
        o[item.id] = item.selected;
      })
      return o;
    },
    // 计算商品数量和总价格
    getGoodsCountAndMoney(state) {
      var o = {
        count: 0, // 勾选的数量
        money: 0 // 勾选的总价
      }
      state.car.forEach(item => {
        if (item.selected ) {
          o.count += item.count;
          o.money += item.price * item.count;
        }
      })
      return o;
    }
  }
})

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router, // 1.4 挂载路由对象到 VM 实例上
  store // 挂载 store 状态管理对象
})