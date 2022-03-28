<template>
  <div>
    <div class="head">
      <h1>控制日志（显示所有操作记录）</h1>
    </div>
    <el-table
      ref="conData"
      :data="conData"
      highlight-current-row
      height="500"
      style="width: 642px; margin: 20px"
      border
    >
      <el-table-column type="index" label="索引" width="120"></el-table-column>
      <el-table-column property="sensor_id" label="传感器id" width="120">
      </el-table-column>
      <el-table-column
        property="control_id"
        align="center"
        label="控制属性"
        width="200"
      >
      </el-table-column>
      <el-table-column
        property="intensity"
        align="center"
        label="强度"
        width="200"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      conData: [],
    };
  },
  methods: {
    async getConData() {
      const res = await this.$http.post("find_control_logs_All");
      if (res.status == 200) {
        this.conData = res.data;
        // console.log(this.conData);
      }
    },
  },
  mounted() {
    this.getConData();
  },
};
</script>