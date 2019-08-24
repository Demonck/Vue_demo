// 评论组件
<template>
  <div class="cmt-container">
    <!-- 评论发表区 -->
    <h3>发表评论</h3>
    <hr />
    <!-- 评论输入 -->
    <textarea placeholder="请输入要发表的评论（最多120字）" maxlength="120" v-model="msg"></textarea>
    <!-- 发表按钮 -->
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <!-- 评论显示区 -->
    <div class="cmt-list">
      <!-- 渲染评论 -->
      <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
        <!-- 评论者信息显示 -->
        <div
          class="cmt-title"
        >第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}</div>
        <!-- 评论内容 -->
        <div class="cmt-body">{{ item.content === 'undefined' ? '此用户很懒': item.content }}</div>
      </div>
    </div>
    <!-- 加载更多按钮 -->
    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageIndex: 1, // 默认展示第一页数据
      comments: [], // 所有的评论数据
      msg: "" //发表评论的内容
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      // 获取评论
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
          if (result.body.status === 0) {
            // this.comments = result.body.message;
            // 每当获取新评论数据的时候，不要把历史数据清空覆盖，而是应该以历史数据，拼接上新数据
            this.comments = this.comments.concat(result.body.message);
            Toast("获取评论成功！");
          } else {
            Toast("获取评论失败！");
          }
        });
    },
    getMore() {
      // 加载更多
      this.pageIndex++;
      this.getComments();
      Toast("更多评论加载成功！");
    },
    postComment() {
      // 校验发表评论的内容是否为空
      if (this.msg.trim().length === 0) {
        Toast("评论内容不能为空！");
      } else {
        // 发表评论
        // 参数1： 请求的URL地址
        // 参数2： 提交给服务器的数据对象 { content: this.msg }
        // 参数3： 定义提交时候，表单中数据的格式  { emulateJSON:true }，已在main中全局设置
        this.$http
          .post("api/postcomment/" + this.id, {
            //评论内容
            content: this.msg.trim()
          })
          .then(function(result) {
            if (result.body.status === 0) {
              Toast("发表评论成功！");
              // 拼接出一个评论对象
              var cmt = {
                user_name: "匿名用户",
                add_time: Date.now(),
                content: this.msg.trim()
              };
              this.comments.unshift(cmt);//在评论列表数据头部添加发表的评论的对象
              this.msg = "";
            }
          });
      }
    }
  },
  props: ["id"] //新闻详情页父组件向评论子组件传递的id值
};
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
