<template>
  <div>
    <div class="head">
      <h1>控制模拟传感器节点（随机产生数据）</h1>
    </div>
    <el-select v-model="value" placeholder="请选择传感器id" @change="ChangeId(value)">
      <el-option
        v-for="item in sensorData"
        :key="item.sensor_id"
        :label="item.sensor_id"
        :value="item.sensor_id"
      >
      </el-option>
    </el-select>
    <el-button type="primary" @click="getConSen">随机生成</el-button>
    <el-table
      :data="sensorData"
      style="width: 100%"
      height="500px"
      class="mystyle"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item class="itemS" label="传感器id:">
              <span>{{ props.row.sensor_id }}</span>
            </el-form-item>
            <el-form-item class="itemS" label="传感器名称:">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item class="itemS" label="传感器状态:">
              <span>{{ props.row.status }}</span>
            </el-form-item>
            <el-form-item class="itemS" label="传感器电量:">
              <span>{{ props.row.power }}</span>
            </el-form-item>
            <el-form-item class="itemS" label="放置地点:">
              <span>{{ props.row.place }}</span>
            </el-form-item>
            <el-form-item class="itemS" label="温度:">
              <span>{{ props.row.temperature }} °c</span>
            </el-form-item>
            <el-form-item class="itemS" label="湿度:">
              <span>{{ props.row.humidity }}</span>
            </el-form-item>
            <el-form-item class="itemS" label="光照:">
              <span>{{ props.row.light }}</span>
            </el-form-item>
            <el-form-item class="itemS" label="风速:">
              <span>{{ props.row.wind }}</span>
            </el-form-item>
            <el-form-item class="itemS" label="PH值:">
              <span>{{ props.row.ph }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="传感器id" prop="sensor_id"> </el-table-column>
      <el-table-column label="传感器名称" prop="name"> </el-table-column>
      <el-table-column label="放置地点" prop="place"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sensorData: [],
      sensorForm: {
        sensor_id: "",
        name: "",
        place: "",
      },
      value: "",
    };
  },
  methods: {
    async getSensor() {
      const res = await this.$http.get("sensor/find");
      if (res.status == 200) {
        this.sensorData = res.data;
        // eslint-disable-next-line no-console
        // console.log(this.sensorData);
      }
    },
    async getConSen() {
      const res = await this.$http.get(
        "sensor/control?sensor_id=" + window.sessionStorage.currentID
      );
      // eslint-disable-next-line no-console
      if (res.status == 200) {
        // eslint-disable-next-line no-console
        // console.log(res.data);
        this.getSensor();
        this.$message({
          message: "随机生成成功",
          type: "success",
        });
      }
    },
    ChangeId(id) {
      window.sessionStorage.setItem("currentID", id);
    },
  },
  mounted() {
    this.getSensor();
  },
};
</script>
<style>
.mystyle {
  margin-top: 10px;
}
</style>
