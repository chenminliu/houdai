<template>
  <div class="container">
    <el-container class="home-container">
      <el-header style="background-color: #2a59a0">
        <el-row>
          <el-col :span="8">
            <div class="top">
              <img
                src="https://gitee.com/cml_1_0/img/raw/master/lALPDgQ9zcjpa43MgMyA_128_128.png"
                style="height: 55px; margin-top: -15px; vertical-align: middle"
              />
              <div class="huanying">
                <span>欢迎管理员</span>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="header1"></div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-button
                style="float: right; margin-right: -10px; margin-top: 10px"
                @click="singOut"
                >退出登录</el-button
              >
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            background-color="#40424b"
            :default-active="$route.path"
            router
          >
            <el-menu-item index="/userManagement">
              <i class="el-icon-document"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="/dynamicManagement">
              <i class="el-icon-date"></i>
              <span slot="title">动态管理</span>
            </el-menu-item>
            <el-menu-item index="/reportingInformation">
              <i class="el-icon-news"></i>
              <span slot="title">举报信息</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    async singOut() {
      const { data: res } = await this.$http.post("/api/admin/logout");
      // console.log(res);
      if (res.code == 100) return this.$message.error("退出登录失败！");
      this.$message.success("退出登录成功！");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.container {
  height: 100%;
}

.home-container {
  height: 100%;
}

.el-header {
  height: 100%;
  background-color: #c0ccfa;
}

.header {
  display: flex;
  align-items: center;
  background-color: #c0ccfa;
}

.header img {
  width: 180px;
}

.header span {
  margin-left: 15px;
  line-height: 60px;
  font-size: 24px;
  font-weight: 700;
}

.el-aside {
  background-color: #555555;
}

.el-aside .el-menu {
  border-right: none;
}

.el-menu-item span {
  color: #fff;
  font-size: 18px;
}

.el-main {
  background-color: #eaedf1;
}
.top {
  margin-left: -20px;
  width: 200px;
  height: 60px;
  background-color: #162d4e;
}
.huanying {
  display: inline-block;
  font-size: 25px;
  color: white;
  margin-top: 16px;
}
.sousuo {
  margin-left: 300%;
}
</style>