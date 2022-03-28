<template>
  <div>
    <div class="head">
      <h1>报警日志（显示所有报警日志）</h1>
    </div>
    <el-table
      ref="singleTable"
      :data="warnData"
      highlight-current-row
      height="500"
      style="width: 900px; margin: 20px"
      border
    >
      <el-table-column type="index" label="索引" width="120"></el-table-column>
      <el-table-column property="id" label="传感器id" width="120">
      </el-table-column>
      <el-table-column
        property="name"
        align="center"
        label="报警属性名称"
        width="200"
      >
      </el-table-column>
      <el-table-column
        property="num"
        align="center"
        label="报警属性的值"
        width="200"
      >
      </el-table-column>
      <el-table-column property="warnMsg" label="报警信息"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      warnData: [],
    };
  },
  methods: {
    async getWarnData() {
      const res = await this.$http.get("warn");
      if (res.status == 200) {
        this.warnData = res.data;
        // console.log(this.warnData);
      }
    },
  },
  mounted() {
    this.getWarnData();
  },
};
</script>
<style>
</style>