<template>
  <div>
    <div class="head">
      <h1>添加传感器（新增传感器）</h1>
    </div>
    <el-form ref="sensorForm" :model="sensorForm" label-width="100px">
      <el-form-item label="传感器id">
        <el-input v-model="sensorForm.sensor_id"></el-input>
      </el-form-item>
      <el-form-item label="传感器名称">
        <el-input v-model="sensorForm.name"></el-input>
      </el-form-item>
      <el-form-item label="传感器地点">
        <el-input v-model="sensorForm.place"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addForm">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sensorForm: {
        sensor_id: "",
        name: "",
        place: "",
      },
    };
  },
  methods: {
    async addForm() {
      const res = await this.$http.post("sensor/new", this.sensorForm);
      if (res.status == 200) {
        // console.log(res);
        this.$message({
          message: res.data,
          type: "success",
        });
      }
    },
  },
};
</script>