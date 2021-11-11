<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="6">
          <!-- 搜索查询 -->
          <!-- @clear="listLook" -->
          <el-input
            v-model="search1"
            clearable

            placeholder="根据姓名查找"
            class="sousuo"
          >
            <el-button
              @click="chazhaoName(nameSelect)"
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表单信息 -->
      <el-table
        :data="
          FData1.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%; top: 20px"
        :header-cell-style="{ background: '#D5E4FE', color: '#2A59A0' }"
        border:none
      >
        <el-table-column prop="user_id" label="ID" align="center">
        </el-table-column>
        <el-table-column prop="user_name" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="user_nickname" label="昵称" align="center">
        </el-table-column>
        <el-table-column prop="user_phone" label="电话" align="center">
        </el-table-column>
        <el-table-column prop="user_state1" label="操作" align="center">
          <template slot-scope="scope">
            <!-- <el-switch
              v-model="form.switch"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
            <span v-if="scope.row.user_state1 == 0">
              <div style="color: red"></div>
            </span>
            <span v-if="scope.row.user_state1 == 1">
              <div style="color: green"></div>
            </span> -->
            <el-switch
              v-model="scope.row.user_state1"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
              :change="anniu(scope.row.user_state1, scope.row.user_id)"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <span>123</span>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      value: true,
      // 页面用户信息
      tableData: [],
      // 根据姓名查找
      form: { searchVal: "" },
      value1: true,
      search1: "",
    };
  },
  created() {
    this.listLook();
  },
  methods: {
    // 监听  pagesize 改变的事件
    handleSizeChange(val) {
      this.pageSize = val;
    },
    // // 监听 页码值 改变的事件
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 用户展示
    async listLook() {
      const token = window.sessionStorage.getItem("token");
      const { data: res } = await this.$http.get(
        `/api/admin/user_administration?token=${token}`
      );
      this.tableData = res.data.data;
      // console.log(res);
      // console.log(res.data.data[0].user_state1);
      // console.log(res.data.data[1].user_state1);
    },
    // 更改状态
    async anniu(state, id) {
      // console.log(state, id);
      let user_state = state;
      let user_id = id;
      const token = window.sessionStorage.getItem("token");
      const { data: res } = await this.$http.post(
        "/api/admin/disable?user_id=" +
          user_id +
          "&&user_state1=" +
          user_state +
          "&&token=" +
          token
      );
      // console.log(token);
      if (res.code == 100) {
        this.$massage.error("更改失败 ");
      }
      // this.$massage.success("更新状态成功")
    },
    // 根据姓名查找
    async chazhaoName(nameSelect) {
      console.log(this.form.nameSelect);
      const token = window.sessionStorage.getItem("token");
      const { data: res } = await this.$http.get(
        `/api/admin/user_administration?token=${token}`,
        { user_name: this.nameSelect }
      );
      console.log(res);
      // this.tableData = res.data.data;
    },
  },
  computed: {
    FData1: function () {
      var search1 = this.search1;
      if (search1) {
        return this.tableData.filter(function (dataNews) {
          return Object.keys(dataNews).some(function (key) {
            return String(dataNews[key]).toLowerCase().indexOf(search1) > -1;
          });
        });
      }
      return this.tableData;
    },
  },
};
</script>

<style>
.header1 {
  font-size: 30px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  text-align: center;
  /* margin-left: 50%; */
  margin-top: 1px;
  /* color: #ffffff; */
}
</style>