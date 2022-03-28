<template>
  <div style="height: 570px">
    <div class="head">
      <h1>全部传感器（显示全部传感器）</h1>
    </div>
    <el-table :data="sensorData" height="500" style="width: 100%">
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
      <el-table-column label="传感器id" prop="sensor_id"></el-table-column>
      <el-table-column label="传感器名称" prop="name"></el-table-column>
      <el-table-column label="放置地点" prop="place"></el-table-column>
      <el-table-column label="传感器状态" prop="status"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="primary" @click="editSensor(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" @click="deleteSensor(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑传感器" :visible.sync="dialogFormVisible">
      <el-form :model="editForm">
        <el-form-item label="传感器id" :label-width="formLabelWidth">
          <el-input v-model="editForm.sensor_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="传感器名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="放置地点" :label-width="formLabelWidth">
          <el-input v-model="editForm.place" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="传感器状态" :label-width="formLabelWidth">
          <el-input v-model="editForm.status" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="complete">完成</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sensorData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      editForm: {
        sensor_id: "",
        name: "",
        status: "",
        place: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    async getSensor() {
      const res = await this.$http.get("sensor/find");
      if (res.status == 200) {
        this.sensorData = res.data;
        // console.log(res);
      }
    },

    //编辑传感器的4个属性
    editSensor(row) {
      this.dialogFormVisible = true;
      // console.log(row);
      this.editForm.sensor_id = row.sensor_id;
      this.editForm.name = row.name;
      this.editForm.status = row.status;
      this.editForm.place = row.place;
      // console.log(this.editForm);
    },
    //删除传感器
    async deleteSensor(row) {
      // eslint-disable-next-line no-console
      console.log(row.sensor_id);
      const res = await this.$http.get("sensor/delete?sensor_id="+row.sensor_id);
      // eslint-disable-next-line no-console
      // console.log(res);
      if (res.status == 200) {
        //更新传感器信息
        this.getSensor();
        this.$message({
          message: "删除成功",
          type: "success",
        });
      }
      // eslint-disable-next-line no-console
      console.log(this.sensorData)
    },
    //完成修改
    async complete() {
      const res = await this.$http.post("sensor/edit", this.editForm);
      if (res.status == 200) {
        //更新传感器信息
        this.getSensor();
        //关闭弹框
        this.dialogFormVisible = false;
        // console.log(res);
        this.$message({
          message: "编辑成功",
          type: "success",
        });
      }
    },
  },
  mounted() {
    this.getSensor();
  },
};
</script>
<style>
.el-form-item label {
  font-weight: 600;
}
.itemS {
  display: block !important;
}
</style>
