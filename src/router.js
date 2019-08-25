import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
// 新闻页
import NewsList from './components/news/NewsList.vue'
import NewInfo from './components/news/NesListInfo.vue'
// 图片分享页
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
// 商品购买页
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
//商品图文详情
import GoodsDesc from './components/goods/GoodsDesc.vue'
// 商品评论
import GoodsComment from './components/goods/GoodsComment.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [ // 配置路由规则
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/shopcar', component: ShopcarContainer },
    { path: '/search', component: SearchContainer },
    { path: '/home/newslist', component: NewsList },
    { path: '/home/newsinfo/:id', component: NewInfo },
    { path: '/home/photolist', component: PhotoList },
    { path: '/home/photoinfo/:id', component: PhotoInfo },
    { path: '/home/goodslist', component: GoodsList, },
    { path: '/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo' },
    { path: '/home/goodsdesc/:id', component:GoodsDesc, name: 'goodsdesc'  },
    { path: '/home/goodscomment/:id', component: GoodsComment, name: 'goodscomment' }
  ],
  linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
})

// 把路由对象暴露出去
export default router