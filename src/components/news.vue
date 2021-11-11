<template>
  <div>
    <!-- 主页-->
    <div class="textScroll">
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10"
      >
        <!-- 动态内容 -->
        <div v-show="content">
          <!-- 评论 -->
          <div
            class="arr"
            :data="form"
            v-for="item in form"
            :key="item.user_id"
          >
            <div>
              <div class="headered">
                <!-- 头像 -->
                <div class="imgs">
                  <img :src="item.getuser.user_image" />
                </div>
                <div class="text">
                  <p>
                    {{ item.getuser.user_nickname }}:{{
                      item.getuser.user_sign
                    }}
                  </p>
                  <p class="text_bottom">{{ item.created_at }}</p>
                </div>
              </div>
            </div>
            <div class="texts">{{ item.comment_content }}</div>
            <el-card>
              <!-- :data="info" v-for="item in info" :key="item.id" -->
              <div class="headered">
                <div class="neirong">
                  <img
                    :src="item.getdynamics.getpublisher.user_image"
                    @click="details"
                  />
                </div>
                <div @click="details">
                  <p>
                    {{ item.getdynamics.getpublisher.user_nickname }}:{{
                      item.getdynamics.dynamics_content
                    }}
                  </p>
                </div>
              </div>
            </el-card>
          </div>
        </div>

        <!-- 动态详情 -->
        <div v-show="detail">
          <dynamicState />
        </div>
      </div>
    </div>
    <!-- 返回按钮 -->
    <div v-show="backs">
      <i class="el-icon-back" @click="back"></i>
    </div>
  </div>
</template>

<script>
import dynamicState from "../dynamicState/dynamicDetail.vue";

export default {
  name: "Homepage",
  components: {
    dynamicState,
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      value1: "",
      count: [1, 2, 3],
      data: [],
      busy: false,
      countss: 0,
      jubaodialogVisible: false,
      detail: false,
      content: true,
      backs: false,
      // 评论人
      form: [
        // {
        //   user_id: "1",
        //   comment_content: "和健康和", //评论的内容
        //   created_at: "2021-11-08 17:26:26", // 评论时间
        //   user_nickname: "小花000", //评论人昵称
        //   user_sign: "哈哈哈", //评论人签名
        //   user_image:
        //     "https://gitee.com/adya/images/raw/master/img/lALPDhYBRwiR4kFMbA_108_76.png",
        //   url_name:
        //     "https://gitee.com/adya/images/raw/master/img/lALPDh0cREnccB28_1903_937.png", //动态图片
        //   dynamics_content: "这是我的记录", // 动态内容
        //   user_nicknames: "小花132", //发动态人昵称
        // },
        
      ],
      // 动态概述
      // info: [
      //   {
      //     id: "1",
      //     dynamics_content: "这是我的记录", // 动态内容
      //     user_nicknames: "小花132", //发动态人昵称
      //     url_name:
      //       "https://gitee.com/adya/images/raw/master/img/lALPDh0cREnccB28_1903_937.png", //动态图片
      //   },
      //   {
      //     id: "2",
      //     dynamics_content: "这是我的记录", // 动态内容
      //     user_nickname: "小花", //发动态人昵称
      //     url_name:
      //       "https://gitee.com/adya/images/raw/master/img/lALPDh0cREnccB28_1903_937.png", //动态图片
      //   },
      // ],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      var user_id = "orieufjdsdslsfdm";
      const { data: res } = await this.$http.post(
        "/api/comment/showCommentInfo?userId=" + user_id
      );
      console.log(123);
      console.log("--------------------");
      console.log(res);
      console.log(res.data);
      this.form = res.data;
      console.log(this.form);
    },
    load() {
      this.count += 2;
    },
    loadMore: function () {
      this.busy = true;
      setTimeout(() => {
        for (var i = 0, j = 10; i < j; i++) {
          this.data.push({ name: this.count++ });
        }
        // console.log(this.data);
        this.busy = false;
      }, 1000);
    },
    // 详情
    details() {
      console.log(159);
      this.content = false;
      this.detail = true;
      this.backs = true;
    },
    // 举报弹窗
    jubao() {
      this.jubaodialogVisible = true;
    },
    // 确定提交
    async submit() {
      this.jubaodialogVisible = false;
      const ConfirmResult = await this.$confirm(
        "此操作将提交该举报, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (ConfirmResult !== "confirm") {
        return this.$message.info("已取消提交该举报");
      }
      this.$message.success("提交举报成功！");
    },
    // 返回消息页面
    back() {
      console.log(456);
      this.content = true;
      this.detail = false;
      this.backs = false;
    },
  },
};
</script>

<style scoped>
body,
html {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.header {
  width: 100%;
  height: 2rem;
}
.textScroll {
  display: inline-block;
  position: fixed;
  top: 2rem;
  bottom: 0;
  left: 0;
  margin: auto;
  overflow: scroll;
  right: 0;
  width: 13rem;
  z-index: 1;
  background-color: rgba(240, 249, 255, 0.5);
}
.textScroll::-webkit-scrollbar {
  display: none;
}
P {
  font-size: 0.4rem;
  color: #000;
}

.imgs {
  float: left;
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
}
.imgs img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.el-card {
  width: 12rem;
  margin: 0 auto;
  margin-top: 0.4rem;
}

.neirong {
  width: 2rem;
  height: 2rem;
}
.neirong img {
  width: 100%;
  height: 100%;
}

.text p {
  font-size: 0.25rem;
}
.text_bottom {
  margin-top: 0.8rem;
}
.text {
  width: 8rem;
}
.headered {
  display: flex;
  align-items: center;
}
.imgs {
  float: left;
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
}
.imgs img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.texts {
  font-size: 0.4rem;
  margin-top: 0.4rem;
  margin-left: 0.5rem;
}
.arr {
  margin-top: 0.2rem;
}
</style>