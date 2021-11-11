<template>
  <div class="login_container">
    <div class="outer">
      <!-- <img src="https://gitee.com/adya/images/raw/master/img/lALPDh0cREnccB28_1903_937.png" alt=""> -->
    </div>
    <div class="login_box">
      <div>
        <!-- https://gitee.com/cml_1_0/img/raw/master/lALPDgQ9zcjpa43MgMyA_128_128.png -->
        <img
          src="https://gitee.com/cml_1_0/img/raw/master/lALPDgQ9zcjpa43MgMyA_128_128.png"
          style="width: 60px; height: 60px; margin-left: 75px"
        />
        <p class="denglu">管理员登录</p>
      </div>
      <el-form class="login_form" :model="form" ref="ruleForm" :rules="rules">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="form.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <i class="icon-password"></i>
          <el-input
            prefix-icon="el-icon-unlock"
            type="password"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btn">
          <el-button
            style="background: #162d4f; border-radius: 15px"
            type="primary"
            @click="login()"
            >确定登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async login() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "/api/admin/login",
          this.form
        );
        console.log(res);
        if (res.code == 100) return this.$message.error("用户名或者密码错误！");
        this.$message.success("登录成功！");
        window.sessionStorage.setItem("token", res.data.token);
        // console.log(res.data.token);
        this.$router.push("/home");
      });
    },
  },
};
</script>

<style>
/* .hearder{
  display: flex;
  justify-content: space-around;
  align-content: center;
} */
.login_container {
  width: 100%;
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  /* width: 450px; */
  min-width: 25rem;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.el-form-item {
  margin-bottom: 30px !important;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.login_box img {
  width: 50px;
  margin-right: 4rem;
  padding-top: 12px;
}

.login_box .title {
  color: rgb(41, 41, 92);
  font-size: 22px;
  font-weight: 700;
  text-align: center;
}

.btn {
  display: flex;
  justify-content: center;
}
.denglu {
  text-align: center;
  margin-top: -40px;
  font-size: 25px;
  color: #162d4e;
}
.queding {
  background: #162d4f;
}
.outer {
  background: url("https://gitee.com/adya/images/raw/master/img/lALPDh0cREnccB28_1903_937.png")
    no-repeat center center;
  background-size: cover;
  /* width: 100%; */
  min-width: 500px;
  height: 100%;
  /* 只需要给背景图加上该属性即可 */
  background-attachment: fixed;
}
</style>