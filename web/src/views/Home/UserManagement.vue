<template>
  <div style="height:570px">
    <div class="head">
      <h1>全部用户（显示全部用户）</h1>
    </div>
    <el-table :data="usersData" style="width: 100%">
      <el-table-column label="索引" type="index" width="100"></el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="用户权限">
        <template slot-scope="scope">
          {{ scope.row.level != 1 ? "可读" : "可读可写" }}
        </template>
      </el-table-column>
      <!-- < template slot-scope="scope" >{{ scope.$index }} {{ scope.row }}</template> -->
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      usersData: [],
    };
  },
  methods: {
    async getUsers() {
      const res = await this.$http.get("users/findAll");
      if (res.status == 200) {
        this.usersData = res.data;
        // console.log(res);
      }
    },
  },
  mounted() {
    this.getUsers();
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