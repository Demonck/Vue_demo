## vue_demo 项目记录

### 初始化项目配置
+ `npm init -y` 使用默认初始化
+ `npm init`    自定义初始化
+ `npm i` 安装包(根据package.json)
+ npm命令
    + npm install xxx 安装模块如不指定版本号，默认会安装最新的版本，安装但不写入package.json
    + npm install xxx 0.0.1 安装指定版本的模块
    + npm install --save xxx 安装并把模块的版本信息保存到dependencies（生产环境依赖）中，即你的package.json文件的dependencies字段中
    + npm install --global xxx 全局安装
    + npm install --save-dev xxx  安装并把模块版本信息保存到devDependencies（开发环境依赖）中，即你的package.json文件的devDependencies字段中
    + npm install --save-optional xxx  安装并把模块安装到optionalDependencies（可选环境依赖）中，即你的package.json文件的optionalDependencies字段中
    + npm install --save-exact xxx  精确的安装指定版本的模块，dependencies字段里每个模块版本号前面的^会取消掉

+ npm 常用命令
    + --save相当于-s，--global相当于-g，--save-dev相当于-d，--save-optional相当于-o，--save-exact相当于-e。
需要注意的是，我们在安装第三方包的时候通常会用到-s、-g、-d后缀，其他的很少用到。
    + npm i XX -S 写入dependencies 开发环境
    + npm i XX -D 写入devDependencies 生产环境
    + npm i XX -g 全局安装
+ dependencies 开发环境 devDependencies 生产环境 区别
    + devDependencies 节点下的模块是我们在开发时需要用的，比如项目中使用的 gulp ，压缩css、js的模块。这些模块在我们的项目部署后是不需要的，所以我们可以使用 -save-dev(-D) 的形式安装。
    + 像 express 这些模块是项目运行必备的，应该安装在 dependencies 节点下，所以我们应该使用 -save(-S)的形式安装。


### 升级最新npm包
https://www.jianshu.com/p/a33702a4b096
+ 使用npm-check
    + npm-check是用来检查npm依赖包是否有更新，错误以及不在使用的，我们也可以使用npm-check进行包的更新。
    + 安装`npm install -g npm-check`
    + 检查npm包的状态(全局)`npm-check -u -g`
    + 检查npm包的状态(局部)`npm-check -u`
    + 通过上下键可以移动光标，使用空格键可以选择需要处理的包，回车直接进行处理。
### 制作初始模板配置项目，上传github
+ 使用的是win7虚拟机
```
git init
git config --global user.name "Demonck"
git config --global user.email "953432964@qq.com"
```
+ 生成秘钥

```
ssh-keygen -t rsa -C "953432964@qq.com"
```
+ 在github配置秘钥
C:\Users\Dickesin\.ssh
+ 把代码存储到.git仓储中
```
git add ./
git commit -m "这是对这次添加的东西的说明"
```

+ 把项目推送到github上
```
git push git@github.com:Demonck/Vue_demo_template.git master
git@github.com:Demonck/Vue_demo.git
```


## 开始项目

## [主流开源协议之间有何异同？](https://www.zhihu.com/question/19568896)

## 用(传统方式git命令)命令行把修改过后的代码上传到码云或者github
1. git add ./
2. git commit -m "提交信息"
3. git push


---

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

---

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

---

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

---

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



---

# 商品页
## 创建商品列表组件
1. 创建商品列表组件，并注册路由

## 绘制 商品列表 页面基本结构并美化
1. 写出大致的html布局，
2. 添加外围div的样式，实现多行两列的布局结构


## 尝试在手机上 去进行项目的预览和测试
1. 要保证自己的手机可以正常运行；
2. 要保证手机和开发项目的电脑处于同一个 WIFI环境中，也就是说手机可以访问到电脑的 IP地址
3. 打开自己的项目中 package.json 文件，在 dev 脚本中，添加一个 --host 指令，把当前 电脑的 WIFI IP地址， 设置为 --host 的指令值；
 + 如何查看自己电脑所处 WIFI 的IP呢，在 cmd 终端中运行 `ipconfig` ， 查看无线网的 ip 地址
4. 注意：如果电脑有启动防火墙，防火墙可能会阻止手机端的访问，所以如果手机无法连接，要先关闭防火墙。

## 获取商品列表的数据，实现数据渲染
1. 获取数据，数据拼接
2. 添加加载更多按钮


## 商品详情页，使用vue-router中编程式导航
1. 创建商品详情页组件，注册路由
2. 制作跳转商品详情页，使用vue中的编程式导航 https://router.vuejs.org/zh/guide/essentials/navigation.html
3. 通过点击事件触发router.push方法跳转页面
4.  在网页中，有两种跳转方式
    + 方式1： 使用 a 标签 的形式叫做 标签跳转
    + 方式2： 使用 window.location.href 的形式，叫做 编程式导航
5. 使用JS的形式进行路由导航
    + 注意： 一定要区分 this.$route 和 this.$router 这两个对象，
    + 其中： this.$route 是路由【参数对象】，所有路由中的参数， params, query 都属于它
    + 其中： this.$router 是一个路由【导航对象】，用它 可以方便的 使用 JS 代码，实现路由的 前进、后退、 跳转到新的 URL 地址

## 商品详情页布局-使用轮播图
1. 使用MUI的 card.html 卡片布局`mui-card`
2. 把首页轮播图单独出来做成组件，在首页和商品详情页使用
    + 添加属性来按要求添加样式
3. 注册使用轮播图组件，获取商品详情页的轮播图数据，渲染数据

## 绘制商品购买区域的样式
1. 添加商品购买区域样式
2. 使用MUI的数字组件 numbox.html 
3. 把数字组件做成单独的组件模块
4. 导入数字组件

## 渲染商品详情页面的数据
1. 获取数据，渲染对应数据

## 使用编程式导航实现图文介绍和商品评论
1. 在图文介绍和视频评论添加点击事件，使用编程式导航跳转

## 实现商品详情中的图文介绍和评论
1. 创建图文介绍和商品评论的组件
2. 导入组件，注册路由规则
3. 实现图片介绍和视频评论组件的内容

---


# 实现购物车添加商品小球动画效果
## 实现基本的加入购物车小球
1. 使用ccs3绘制小球，为小球添加半场动画
2. 设置cubic-bezier控制变化 https://cubic-bezier.com/#.17,1.13,.88,.62
3. 关于cubic-bezier https://www.jianshu.com/p/99084dd0abf2
4. 在加入购物车上添加点击事件

## 完美实现小球动画适配不同页面大小和页面滚动问题
小球动画优化思路：
 1. 先分析导致 动画 不准确的原因：把 小球 最终位移到的位置，已经局限在了某一分辨率下的滚动条未滚动的情况下；
2. 只要分辨率和 测试的时候不一样，或者滚动条有一定的滚动距离之后， 问题就出现了；
3. 因此，经过分析，得到结论： 不能把位置的横纵坐标直接写死了而是应该 根据不同情况，动态计算这个坐标值；
4. 经过分析，得出解题思路： 先得到购物车徽标的横纵 坐标再得到小球的横纵坐标，然后让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
5. 使用 domObject.getBoundingClientRect() 获取小球的位置
6. 为购物车徽标添加id，通过操作dom元素，可以得到位置
7. es6语法-模板对象 `${}` 拼接字符串和变量



## 每当商品数量numbox的值改变立即，把值给购物车要加入的值
分析：如何实现加入购物车时候，拿到选择的数量 
1. 经过分析发现： 按钮属于 goodsinfo 页面， 数字 属于 numberbox 组件
2. 由于涉及到了父子组件的嵌套了，所以，无法直接在 goodsinfo 页面中获取到 选中的商品数量值
3. 怎么解决这个问题：涉及到了 子组件向父组件传值了（事件调用机制） 
4. 事件调用的本质： 父向子传递方法，子调用这个方法， 同时把 数据当作参数 传递给这个方法 


## 使用JS的API设置numbox的最大值max
1. 基本思路：通过父组件向子组件传值(商品数量)，子组件得到商品数量的值赋值给numbox中的max
2. 但是，由于商品数量的请求是异步的操作，所以在页面渲染的时候，会出现传递商品数量的值的时候，请求的数据还没有完成，导致传递的值为undefined，max为undefined，所以无效果
3. 解决思路：我们不知道什么时候能够拿到 max 值，但是，总归有一刻，会得到一个真正的 max 值
4. 因此使用使用 watch 属性监听，来 监听 父组件传递过来的 max 值，不管 watch 会被触发几次，但是，最后一次，肯定是一个 合法的 max 数值
5. 不使用标签的属性来设置最大值，通过js的api来操作最大值


---

# 实现购物车效果
## [vuex ](https://vuex.vuejs.org/zh/guide/)
1. 概念：
vuex 是 Vue 配套的 公共数据管理工具，它可以把一些共享的数据，保存到 vuex 中，方便 整个程序中的任何组件直接获取或修改我们的公共数据；
2. 使用安装：`npm install vuex --save`
3. 具体使用参考开发文档



## 启用vuex并设计购物车数据存储方式
1. 安装配置vuex，创建Store实例对象
2. 在state中设计一个购物车的商品对象

## 实现点击加入购物车功能
1. 在商品详情页的加入购物车的事件上添加拼接出一个，要保存到 store 中购物车car 数组里的 商品信息对象
2. 在main.js中的store对象中mutations添加点击加入购物车，把商品信息，保存到 store 中的 car 上的方法操作store的state的car数据
3. 如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
4. 如果没有，则直接把 商品数据，push 到 car 中即可
5. 创业一个标识符，假设 在购物车中，没有找到对应的商品，通过标识符来判断,执行不同操作
6. 在加入购物车的事件调用store方法 `this.$store.commit()` 

## 实现徽标数值的自动更新
1. 通过store对象中的getters（相当于计算属性，也相当于过滤器） 
2. 在getters中定义一个方法，计算购物车car 数组 中的每个对象的count值
3. 在主框架页面app.vue中，购物车徽标标签中调用getters的方法，得到购物车商品数量

## 实现购物车商品的本地持久存储
1. 创建car数组，进入网站，先从本地存储中，把购物车的数据读出来，放到 store 中
2. 当更新car之后，把car数组，存储本地的 localStorage中

## 绘制购物车页面中商品列表的布局
1.  使用mui car卡片组件制作基本布局
2.  是MintUI的Switch组件 http://mint-ui.github.io/docs/#/zh-cn2/switch 制作选择按钮
3.  制作购物车商品详情的布局

## 获取购物车中所有商品列表并加载显示
1. 通过api获取购物车的商品信息
2. 创建一个存放购物车商品id的数组，通过forEach遍历vuex中的car中的id添加到数组中
3. 对如果购物车商品为空进行判断，不需要请求数据
4. 得到数据，通过v-for循环渲染商品列表区域


## 在循环购物车列表时候初始化数量值
1. 创建一个空对象，然后循环购物车中商品的数据，把当前循环这条商品的 Id， 作为对象 的属性名，count值作为对象的属性值
2. 当把所有的商品循环一遍，就会得到一个对象，例如： { 88: 2, 89: 1, 90: 4 }
3. 在vuex-getter中定义一个getGoodsCount获取数量的方法
4. 在购物车页面调用getGoodsCount方法获取创建的对象中的id对应的count值
5. 通过在数字标签上绑定一个方法，向数字组件传值（父->子组件传值）,改变数字输入框的值

## 实现购物车商品数量改变同步到store中
1. 为购物车数字组件中的input标签添加readonly属性
2. 在vuex中定义一个updateGoodsInfo方法，修改购物车中商品的数量值
3. 给购物车数字组件传递一个商品id值
4. 定义一个countChanged方法，通过id值调用vuex-updateGoodsInfo方法修改商品数量

## 实现购物车中商品的删除
1. 在删除标签上添加点击事件，
2. 在v-for 循环中添加一个循环值 i
3. 通过i删除goodslist数组中的数据
4. 通过item.id来删除vuex-car的数据
5. remove方法的两个参数item.id , i

## 绘制结算区域样式


## 把store中选中的状态同步到页面上
1. 在vuex-getters中定义一个 getGoodsSelected方法，循环car数据创建一个对象{id：selected}
2. 在购物车页面的mt-switch标签绑定一个数据

## 同步商品的勾选状态到store中保存
1. 使用mt-switch标签中的change事件，调用一个方法
2. 每当点击开关，把最新的状态，同步到 store 中
3. 在vuex-mutations中定义一个改变选择的属性值方法
4. 在购物车页面使用vuex-mutations中定义的方法

## 实现勾选数量和总价的自动计算
1. 在vuex-getters中定义一个计算数量和计算价格的方法
2. 实现计算功能和实时更新

## 实现返回按钮的功能
1. 使用Mint-UI中的返回(Header)
2. 在返回按钮上绑定一个事件
3. 使用watch来监听url地址是否为主页，使用v-show隐藏返回按钮
4. 由于在页面刚加载的时候，没有路由的改变，所以无法实现返回按钮的隐藏
5. 所以在生命周期的created中添加判断方法


