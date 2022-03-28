<template>
  <div>
    <div class="head">
      <h1>控制传感器强度（控制传感器属性值的强度）</h1>
    </div>
    <el-form ref="form" :model="conForm" label-width="80px">
      <el-form-item label="传感器ID">
        <el-input v-model="conForm.sensor_id"></el-input>
      </el-form-item>
      <el-form-item label="修改属性">
        <el-select v-model="conForm.control_id" placeholder="请选择活动区域">
          <el-option label="温度" value="0"></el-option>
          <el-option label="湿度" value="1"></el-option>
          <el-option label="光照" value="2"></el-option>
          <el-option label="PH" value="3"></el-option>
          <el-option label="风速" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="强度">
        <el-input v-model="conForm.intensity"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="setCon">立即修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      conForm: {
        sensor_id: "",
        control_id: "",
        intensity: "",
      },
    };
  },
  methods: {
    async setCon() {
      const res = await this.$http.post("control", this.conForm);
      if (res.status == 200) {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.conForm = {
          sensor_id: "",
          control_id: "",
          intensity: "",
        };
      }
    },
  },
};
</script>