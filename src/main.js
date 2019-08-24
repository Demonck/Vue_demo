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

// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router // 1.4 挂载路由对象到 VM 实例上
})