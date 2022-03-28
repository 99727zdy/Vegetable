<template>
  <div>
    <el-container>
      <el-header>
        <el-button
          type="info"
          icon="el-icon-switch-button"
          circle
          class="button"
          @click="exit"
        ></el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-row>
            <el-col :span="24">
              <el-menu
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                router
              >
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-coordinate"></i>
                    <span>传感器</span>
                  </template>
                  <el-menu-item index="/sensorList">全部传感器</el-menu-item>
                  <el-menu-item index="/addSensor">添加传感器</el-menu-item>
                  <el-menu-item index="/controlSensor"
                    >控制传感器强度</el-menu-item
                  >
                  <el-menu-item index="/simSensor">模拟传感器</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                  <template slot="title">
                    <i class="el-icon-tickets"></i>
                    <span>日志</span>
                  </template>
                  <el-menu-item index="/warnLogs">报警日志</el-menu-item>
                  <el-menu-item index="/controlLogs">控制日志</el-menu-item>
                </el-submenu>
                <el-menu-item index="/VisualSensor">
                  <i class="el-icon-data-line"></i>
                  <span>可视化</span>
                </el-menu-item>
                <el-menu-item index="/UserManagement">
                  <i class="el-icon-user"></i>
                  <span>用户管理</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main> <router-view /> </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    exit() {
      this.$router.push({ path: "/login" });
      this.$message({
        message: "退出成功",
        type: "success",
      });
      sessionStorage.clear();
    },
  },
};
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #2c333d;
}
.el-aside {
  background-color: #545c64;
  height: calc(100vh - 60px);
}
.button {
  position: absolute;
  right: 30px;
  top: 10px;
}
</style>
