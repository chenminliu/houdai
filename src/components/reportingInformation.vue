<template>
  <div>
    <el-card>
      <!-- 下拉框查询 -->
      <el-row>
        <el-col :span="9">
          <el-select v-model="ll.tLabel" placeholder="标签" @change="chaxun1">
            <el-option
              v-for="item in options"
              :key="item.tLabel"
              :label="item.label"
              :value="item.tLabel"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="9">
          <el-date-picker
            @change="chaxun2"
            v-model="jj.time"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-select
            v-model="kk.state"
            placeholder="审批状态"
            @change="chaxun3"
          >
            <el-option
              v-for="item in options1"
              :key="item.state"
              :label="item.label"
              :value="item.state"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <!-- 表单信息 -->
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        class="form"
        style="width: 100%; top: 20px"
        :header-cell-style="{ background: '#D5E4FE', color: '#2A59A0' }"
        border:none
      >
        <el-table-column prop="jb" label="举报人" align="center">
        </el-table-column>
        <el-table-column prop="tlabel_name" label="举报标签" align="center">
        </el-table-column>
        <el-table-column prop="bjb" label="被举报人" align="center">
        </el-table-column>
        <el-table-column prop="created_at" label="举报时间" align="center">
        </el-table-column>
        <el-table-column prop="tip_state" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.tip_state == '1'">待审批</el-tag>
            <el-tag v-if="scope.row.tip_state == '2'">驳回</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="caozuo" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="chakanXQ(scope.row.tid)"
              >查看详情</el-button
            >
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
        :page-sizes="[2]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
      <!-- 举报信息查看详情弹出框 -->
      <el-dialog :visible.sync="dialogVisible" width="30%">
        <div style="margin-left: 10px" :model="userInfo">
          <div v-if="userInfo.length != ''">
            被举报动态
            <div class="imgss">
              <div>
                <img :src="userInfo[0].get_dynamics.getpublisher.user_image" />
              </div>
              <div style="font-size: 10px; margin-left: 15px">
                <p>{{ userInfo[0].informant_name }}</p>
                <p>
                  {{ userInfo[0].created_at }}
                  <el-tag>{{ userInfo[0].tip_state }}</el-tag>
                </p>
                <p>{{ userInfo[0].get_dynamics.dynamics_content }}</p>
                <img :src="userInfo[0].get_dynamics.get_url" />
              </div>
            </div>

            <div>
              <h2 style="margin-left: 10px">
                举报理由
                <el-tag style="float: right">{{
                  userInfo[0].tlabel_id
                }}</el-tag>
              </h2>
              <p
                style="
                  background-color: #f6f6f6;
                  height: 4rem;
                  margin-top: -0.8rem;
                "
                type="textarea"
                :rows="2"
                disabled
              >
                {{ userInfo[0].tip_reason }}
              </p>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-tag style="float: left" @click="bohui">驳回</el-tag>

          <el-button @click="agreeDelete">同意删除</el-button>
        </span>
      </el-dialog>
      <!-- 同意删除提示 -->
      <el-dialog
        title="删除提示"
        :visible.sync="agreeDeleteVisible"
        width="30%"
      >
        <div class="cc">是否确定删除此动态？</div>
        <span slot="footer" class="dialog-footer">
          <el-button class="aaa" @click="agreeDeleteVisible = false"
            >取 消</el-button
          >
          <el-button class="bbb" type="primary" @click="agree">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 2,
      total: 0,
      dialogVisible: false,
      agreeDeleteVisible: false,
      tableData: [],
      userInfo: [],
      options: [
        {
          tLabel: "1",
          label: "色情低俗",
        },
        {
          tLabel: "2",
          label: "政治敏感",
        },
        {
          tLabel: "3",
          label: "违法",
        },
        {
          tLabel: "4",
          label: "广告",
        },
        {
          tLabel: "5",
          label: "病毒木马",
        },
        {
          tLabel: "6",
          label: "侵犯未成年人权益",
        },
      ],
      options1: [
        {
          state: "0",
          label: "全部",
        },
        {
          state: "1",
          label: "待审批",
        },
        {
          state: "2",
          label: "驳回",
        },
      ],
      // tag: "",
      // time: "",
      // state: "",
      // 下拉框1
      ll: {
        tLabel: "",
      },
      // 下拉框2
      jj: { time: "" },
      // 下拉框3
      kk: {
        state: "",
      },
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
    // 驳回按钮
    async bohui() {
      var tid = sessionStorage.getItem("tid");
      const { data: res } = await this.$http.post(`/api/tip/updatefailedTip`, {
        tid: tid,
      });
      // console.log(res);
      if (res.code == 100) return this.$message.error("动态驳回成功！");
      this.$message.success("动态驳回成功！");
      this.listLook = res.data.data;
      this.dialogVisible = false;
    },
    // 同意删除按钮
    async agreeDelete() {
      this.agreeDeleteVisible = true;
    },
    // 确定删除
    async agree() {
      var tid = sessionStorage.getItem("tid");
      const { data: res } = await this.$http.post(`/api/tip/deleteSuccessTip`, {
        tid: tid,
      });
      // console.log(res);
      if (res.code == 100) return this.$message.error("动态删除失败！");
      this.$message.success("动态删除成功！");
      this.agreeDeleteVisible = false;
      this.dialogVisible = false;
      this.listLook = res.data.data;
    },
    // 举报信息展示
    async listLook() {
      const token = window.sessionStorage.getItem("token");
      const { data: res } = await this.$http.post(
        `/api/tip/showTipInformationByMany?token=${token}`
      );
      // console.log(res);
      if (res.code == 100) return this.$message.error("获取举报信息失败！");
      else if (res.code == 200) {
        // this.$message.success("成功获取举报信息！");
        this.tableData = res.data.data;
      }
      console.log(res);
      // console.log(info.tid);
    },
    // 查看详情
    async chakanXQ(info) {
      // console.log(info.tid);
      // console.log(info.jb);
      console.log(info);
      // sessionStorage.setItem("tid", info.tid);
      this.dialogVisible = true;
      var tid = info;
      const { data: res } = await this.$http.post(
        `/api/tip/showTipInformationByDetail`,
        {
          tid: tid,
        }
      );
      this.userInfo.splice(0, 1, res.data[0]);
      console.log(this.userInfo);
      // console.log(this.userInfo.get_dynamics.getpublisher.user_image);
      // 举报标签
      if (res.data[0].tlabel_id == "1") {
        this.userInfo[0].tlabel_id = "色情低俗";
      } else if (res.data[0].tlabel_id == "2") {
        console.log(this.userInfo[0].tlabel_id);
        this.userInfo[0].tlabel_id = "政治敏感";
      } else if (res.data[0].tlabel_id == "3") {
        this.userInfo[0].tlabel_id = "违法";
      } else if (res.data[0].tlabel_id == "4") {
        this.userInfo[0].tlabel_id = "广告";
      } else if (res.data[0].tlabel_id == "5") {
        this.userInfo[0].tlabel_id = "病毒木马";
      } else if (res.data[0].tlabel_id == "6") {
        this.userInfo[0].tlabel_id = "侵犯未成年权益";
      }
      // 动态标签
      if (res.data[0].tip_state == "1") {
        this.userInfo[0].tip_state = "日常";
      } else if (res.data[0].tip_state == "2") {
        // console.log(this.userInfo.tip_state);
        this.userInfo[0].tip_state = "美食";
      } else if (res.data[0].tip_state == "3") {
        console.log(this.userInfo[0].tip_state);
        this.userInfo[0].tip_state = "旅游";
      } else if (res.data[0].tip_state == "4") {
        console.log(this.userInfo[0].tip_state);
        this.userInfo[0].tip_state = "情感";
      }
      console.log(res.data[0].tip_state);
      // console.log(res.data[0].get_url);
    },
    // 下拉框查询1
    async chaxun1() {
      const { data: res } = await this.$http.post(
        `/api/tip/showTipInformationByMany`,
        { tLabel: this.ll.tLabel }
      );
      // console.log(this.ll.tLabel);
      // console.log(res);
      if (res.code == 100) return this.$message.error("查询失败！");
      this.$message.success("查询成功！");
      this.tableData = res.data.data;
      // console.log(res.data);
      // console.log(this.tableData);
    },
    // 下拉框查询2
    async chaxun2() {
      const { data: res } = await this.$http.post(
        `/api/tip/showTipInformationByMany`,
        { time: this.jj.time }
      );
      // console.log(this.jj.time);
      if (res.code == 100) return this.$message.error("查询失败！");
      this.$message.success("查询成功！");
      this.tableData = res.data.data;
    },
    // 下拉框查询3
    async chaxun3() {
      const { data: res } = await this.$http.post(
        `/api/tip/showTipInformationByMany`,
        { state: this.kk.state }
      );
      // console.log(res);
      // console.log(this.kk.state);
      if (res.code == 100) return this.$message.error("查询失败！");
      this.$message.success("查询成功！");
      this.tableData = res.data.data;
    },
  },
};
</script>
<style>
.aaa {
  /* float: left; */
  height: 25px;
  line-height: 5px !important;
  color: white;
  border: none !important;
  background-color: #b2c3cd !important;
  margin-right: 198px !important;
  margin-top: 25px !important;
}
.bbb {
  height: 25px;
  line-height: 5px !important;
  float: right;
  color: white;
  border: none !important;
  background-color: #b2c3cd !important;
  margin-top: 25px !important;
  margin-right: 40px !important;
}
.imgss {
  /* width: 12rem;
  height: 10rem; */
  display: flex;
  /* background-color: pink; */
}
.imgss img {
  margin-top: 15px;
  width: 5.5rem;
}
</style>
