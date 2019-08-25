# 这是一个Vue初始项目

## 开始项目

## [主流开源协议之间有何异同？](https://www.zhihu.com/question/19568896)

## 用(传统方式git命令)命令行把修改过后的代码上传到码云或者github
1. git add ./
2. git commit -m "提交信息"
3. git push

# 主页面
## 制作首页App组件
1. 完成 Header 区域，使用的是 Mint-UI 中的Header组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html
 + 在制作 购物车 小图标的时候，操作会相对多一些：
 + 先把 扩展图标的 css 样式，拷贝到 项目中
 + 拷贝 扩展字体库 ttf 文件，到项目中
 + 为 购物车 小图标 ，添加 如下样式 `mui-icon mui-icon-extra mui-icon-extra-cart`
3. 要在 中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 tabbar 为 router-link
1. 更改tabbar中的a标签为router-link

## 设置路由高亮

1. 设置覆盖默认的路由高亮的类，默认的类叫做 router-link-active

## 点击 tabbar 中的路由链接，展示对应的路由组件
1. 创建各个组件，在router注册组件，配置路由规则

## 制作首页轮播图布局
1. 使用Mint-UI的轮播图mt-swipe组件


## 加载首页轮播图数据
1. 获取数据，使用 vue-resource
2. 使用 vue-resource 的 this.$http.get 获取数据
3. 获取到的数据，要保存到 data 身上
4. 使用 v-for 循环渲染 每个 item 项

## 改造 九宫格 区域的样式
1. 使用MUI的九宫格样式，改造成六宫格
2. 添加router-link

# 新闻页
## 改造 新闻资讯 路由链接
1. 创建新闻组件  
2. 注册新闻路由和匹配规则

## 新闻资讯 页面 制作
1. 绘制界面，使用 MUI 中的 media-list.html
2. 在main.js中全局设置请求的根路径，使用vue-resource时路径不用写根域名
3. 使用 vue-resource 获取数据
4. 渲染真实数据
5. 导入格式化时间的插件，使用全局过滤器，实现时间格式化

## 实现 新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link,同时，在跳转的时候应该提供唯一的Id标识符
2. 在新闻详情页中将 URL 地址中传递过来的 Id值，挂载到 data上，方便以后调用`id: this.$route.params.id`
3. 创建新闻详情的组件页面  NewsInfo.vue
4. 在 路由模块中，将 新闻详情的 路由地址 和 组件页面对应起来

## 实现 新闻详情 的 页面布局 和数据渲染
1. 创建新闻详情页布局，新闻标题主标题-时间点击信息副标题-新闻内容html区-评论子组件区
2. 创建评论组件，在新闻详情页导入评论子组件，注册子组件，通过父组件向子组件传递新闻id值

# 评论组件
## 单独封装一个 comment.vue 评论子组件
1. 先创建一个 单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的 页面中，先手动 导入 comment 组件
  + `import comment from './comment.vue'`
3. 在父组件中，使用 `components` 属性，将刚才导入 comment 组件，注册为自己的 子组件
4. 将注册子组件时候的，注册名称，以 标签形式，在页面中 引用即可

## 获取所有的评论数据显示到页面中
1. 通过api获取评论内容
2. 每当获取新评论数据的时候，不要把历史数据清空覆盖，而是应该以历史数据，拼接上新数据

## 实现点击加载更多评论的功能
1. 为加载更多按钮，绑定点击事件，在事件中，请求 下一页数据
2. 点击加载更多，让 pageIndex++ , 然后重新调用 this.getComments() 方法重新获取最新一页的数据
3. 为了防止 新数据 覆盖老数据的情况，我们在 点击加载更多的时候，每当获取到新数据，应该让 老数据 调用 数组的 unshift 方法，在头部拼接上新数组

## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件，按钮使用mint-ui中的button
3. 校验评论内容是否为空，如果为空，则Toast提示用户 评论内容不能为空
4. 通过 vue-resource 发送一个请求，把评论内容提交给服务器
5. 当发表评论成功后，重新刷新列表，以查看最新的评论
 + 如果调用 getComments 方法重新刷新评论列表的话，由于pageIndex页面增加，可能只能得到 后几页或最后一页的评论，前几页的评论获取不到
 + 换一种思路： 当评论成功后，在客户端，手动拼接出一个 最新的评论对象，然后 调用 数组的 unshift 方法， 把最新的评论，追加到  data 中 comments 的开头；这样，就能 完美实现刷新评论列表的需求；
 + 全局设置 post 时候表单数据格式组织形式，
 6. vue-resource——post请求，
    + 参数1： 请求的URL地址
    + 参数2： 提交给服务器的数据对象 { content: this.msg }
    + 参数3： 定义提交时候，表单中数据的格式  { emulateJSON:true }，已在main中全局设置省略

# 图片分享页
## 改造 图片分享按钮 为路由的链接并显示对应的组件页面
1. 改变六宫格按钮图片列表链接
2. 创建图片列表组件
3. 导入组件，注册图片列表路由

## 绘制 图片列表 组件页面结构并美化样式
 1. 制作 顶部的滑动条
 2. 制作 底部的图片列表

### 制作顶部滑动条的坑：
 1. 需要借助于 MUI 中的 tab-top-webview-main.html 
 2. 需要把 slider 区域的 mui-fullscreen 类去掉
 3. 滑动条无法正常触发滑动，通过检查官方文档，发现这是JS组件，需要被初始化一下：
  + 导入 mui.js 
  + 调用官方提供的 方式 初始化：
  ```
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  ```
 4. 在初始化 滑动条 的时候，导入的 mui.js ，但是，控制台报错： `Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode`
  + 经过合理的推测，觉得可能是 mui.js 中用到了 'caller', 'callee', and 'arguments' 东西，但是webpack 打包好的 bundle.js 中，默认是启用严格模式的，所以，这两者冲突了；
  + 解决方案： 
    + 1. 把 mui.js 中的 非严格 模式的代码改掉；但是不现实； 
    + 2. 把 webpack 打包时候的严格模式禁用掉；
  + 最终，选择了 plan B  移除严格模式： 使用这个插件 babel-plugin-transform-remove-strict-mode
  + 滑动的时候报警告：`Unable to preventDefault inside passive event listener due to target being treated as passive. See https://www.chromestatus.com/features/5093566007214080`  
    + 解决方法，可以加上`* { touch-action: none; } `这句样式去掉。
    + 原因：（是chrome为了提高页面的滑动流畅度而新折腾出来的一个东西） http://www.cnblogs.com/pearl07/p/6589114.html https://developer.mozilla.org/zh-CN/docs/Web/CSS/touch-action
 5. 刚进入 图片分享页面的时候， 滑动条无法正常工作， 经过我们认真的分析，发现如果要初始化 滑动条，必须要等 DOM 元素加载完毕，所以，我们把 初始化 滑动条 的代码，搬到了 mounted 生命周期函数中；
 6. 当 滑动条 调试OK后，发现， tabbar 无法正常工作了，这时候，我们需要把 每个 tabbar 按钮的 样式中  `mui-tab-item`更改。 更改`.mui-tab-item`类名，解决因为导入mui.js 导致冲突，使tabbar 点击无法切换的问题
 7. 通过api获取所有分类信息，并渲染分类列表；

### 制作图片列表区域
1. 图片列表需要使用懒加载技术，我们可以使用 Mint-UI 提供的现成的组件 `lazy-load`
2. 根据`lazy-load`的使用文档使用
    + http://mint-ui.github.io/docs/#/zh-cn2/lazyload
3. 渲染图片列表数据

### 实现了 图片列表的 懒加载改造和 样式美化
1. 为了实现懒加载的全部效果，导入全部的Mint-UI的组件和样式包
2. 添加图片列表的样式
3. 在app.vue中添加样式`.mint-header`，设置顶部标题条的z轴距离，使图片列表滑动时不会遮挡顶部标题


## 实现了 点击图片 跳转到 图片详情页面
1. 在改造 li 成 router-link 的时候，需要使用 tag 属性指定要渲染li标签
2. 创建图片详情页的组件，注册路由

## 实现 详情页面的布局和美化，同时获取数据渲染页面
1. 图片详情页的布局和样式
2. 通过api获取图片详情页的数据，渲染页面
3. 导入评论组件

## 实现 图片详情中 缩略图的功能
1. 使用 插件 vue-preview 这个缩略图插件
2. 获取到所有的图片列表，然后使用 v-for 指令渲染数据
3. 最新版vue-preview 新的用法，slides为数据对象数组

```
<vue-preview :slides="list"></vue-preview>
```

4. 注意： 每个 图片数据对象中，必须有 w 和 h 属性，这是大图的大小，添加小图属性msrc
5. 如果要改变小图的样式，设置缩略图CSS样式，必须使用 /deep/
6. 具体用法参考：https://blog.csdn.net/an501920078/article/details/92393289  
7. css关于 /deep/ 的解释和用法： https://juejin.im/post/5a6c89b151882573351a8b74
例如：
```
/deep/ .my-gallery {
     样式
    }
```