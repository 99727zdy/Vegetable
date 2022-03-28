<template>
  <div>
    <el-card shadow="always">
      <el-form
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitForm('loginForm')"
            >登录</el-button
          >
          <el-button type="primary" @click="registered('loginForm')"
            >注册</el-button
          >
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog title="请验证" :visible.sync="dialogVisible" width="320">
      <div class="slideV">
        <slide-verify
          :l="45"
          :r="10"
          :w="310"
          :h="155"
          @success="onSuccess"
          @fail="onFail"
          ref="slideblock"
          slider-text="滑动滑块"
        ></slide-verify>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      loginForm: {
        username: "",
        password: "",
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.dialogVisible = true;
        } else {
          this.$message.error("请填写正确的用户名和密码");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    registered() {
      this.$router.push({ path: "/registered" });
    },
    //图片验证成功
    async onSuccess() {
      this.dialogVisible = false;
      // this.submitForm("loginForm");
      const res = await this.$http.post("login", this.loginForm);
      if (res.status == 200) {
        // console.log(res)
        if (res.data == "ok") {
          this.$message({
            message: "登录成功",
            type: "success",
          });
          let username = this.loginForm.username;
          sessionStorage.setItem("username", username);
          this.$router.push({ path: "/home" });
        } else {
          this.$message({
            message: "登录失败（" + res.data + ")",
            type: "warn",
          });
          this.$refs.slideblock.reset();
        }
      } else {
        this.$refs.slideblock.reset();
      }
    },
    //验证失败
    onFail() {
      this.alertMsg("验证失败", "error");
      //失败后的逻辑代码
    },
  },
};
</script>
<style>
body {
  background: #eee;
}
.el-card {
  width: 500px;
  height: 200px;
  padding: 40px 50px 20px 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80%);
}
.slideV {
  width: 310px;
  margin: 20px auto;
}
</style>

 

