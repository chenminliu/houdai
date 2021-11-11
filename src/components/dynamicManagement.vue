<template>
  <div>
    <el-card class="bb">
      <!-- 下拉框查询 -->
      <el-row>
        <el-col :span="18">
          <el-select @change="chaxun" v-model="hh.dlabel_id" placeholder="全部">
            <el-option
              v-for="item in options"
              :key="item.dlabel_id"
              :label="item.label"
              :value="item.dlabel_id"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input
            v-model="ff.user_nickname"
            clearable
            @clear="getList"
            placeholder="根据用户昵称查找"
          >
            <el-button
              @click="chaxun2"
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 主体内容 -->
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10"
      >
        <el-card class="aa">
          <div :model="form" v-for="(item, index) in form" :key="index">
            <div class="avatar_box" style="paddingt-top: 10px">
              <img :src="item.user[0].user_image" />
            </div>
            <div class="avatar_text">
              <p>{{ item.user[0].user_nickname }}</p>
              <div>
                <el-button
                  class="el-icon-delete"
                  @click="deleteDT(item.id)"
                ></el-button>
              </div>
            </div>
            <p>
              {{ item.created_at }}
              <el-tag type="success">{{ item.dlabel_id }}</el-tag>
            </p>
            <div>
              <p>{{ item.dynamics_content }}</p>
            </div>
            <div v-for="(item, index) in form[index].url" :key="index">
              <div class="neirong">
                <img :src="item.url_name" />
              </div>
            </div>
          </div>

          <!-- <el-button
            class="el-icon-delete"
            @click="dialogVisible = true"
          ></el-button> -->
        </el-card>
        <el-dialog title="删除提示" :visible.sync="dialogVisible" width="30%">
          <div class="cc">是否确定删除此动态？</div>
          <span slot="footer" class="dialog-footer">
            <el-button class="dd" @click="quxiao">取 消</el-button>
            <el-button class="ee" type="primary" @click="agreeDelete"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      tag: "",
      form: {},
      options: [
        {
          dlabel_id: "1",
          label: "日常",
        },
        {
          dlabel_id: "2",
          label: "美食",
        },
        {
          dlabel_id: "3",
          label: "旅游",
        },
        {
          dlabel_id: "4",
          label: "情感",
        },
      ],
      // 下拉框
      hh: {
        dlabel_id: "",
      },
      // 输入框查询
      ff: {
        user_nickname: "",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    loadMore: function () {
      this.busy = true;
      setTimeout(() => {
        for (var i = 0, j = 10; i < j; i++) {
          this.data.push({ name: this.count++ });
        }
        console.log(this.data);
        this.busy = false;
      }, 1000);
    },
    // 取消删除动态
    quxiao() {
      this.dialogVisible = false;
      this.$message("取消删除动态！");
    },
    // 删除动态
    deleteDT(id) {
      console.log(id);
      sessionStorage.setItem("id", id);
      this.dialogVisible = true;
    },
    // 动态删除
    async agreeDelete() {
      var id = sessionStorage.getItem("id");
      const token = window.sessionStorage.getItem("token");
      const { data: res } = await this.$http.post(
        `/api/admin/delete_dynamic?token=${token}`,
        { id: id }
      );
      // console.log(res);
      if (res.code == 100) return this.$message.error("删除动态失败！");
      this.$message.success("删除动态成功！");
      this.dialogVisible = false;
      this.getList = res.data;
      this.$message.success("动态删除成功！");
    },
    // 动态管理的动态显示
    async getList() {
      // console.log(this.form);
      const token = window.sessionStorage.getItem("token");
      const { data: res } = await this.$http.get(
        `/api/admin/dynamic_administration?token=${token}`
      );
      // this.form.push(res.data);
      this.form = res.data;
      // console.log(res);
      // console.log(res.data);
      // console.log(this.form);
      for (var i = 0; i < this.form.length; i++) {
        if (res.data[i].dlabel_id == "1") {
          this.form[i].dlabel_id = "日常";
        } else if (res.data[i].dlabel_id == "2") {
          this.form[i].dlabel_id = "美食";
        } else if (res.data[i].dlabel_id == "3") {
          // console.log(123);
          this.form[i].dlabel_id = "旅游";
        } else if (res.data[i].dlabel_id == "4") {
          this.form[i].dlabel_id = "情感";
        }
      }
      // console.log(this.form[0].dlabel_id);
      // console.log(res.data);
      // console.log(res.data[0].user[0].user_nickname);
    },
    // 下拉框查询
    async chaxun() {
      console.log(this.hh.dlabel_id);
      const { data: res } = await this.$http.get(
        `/api/admin/dynamic_administration?dlabel_id=` + this.hh.dlabel_id
      );
      console.log(res.data);
      if (res.code == 100) {
        this.$message.error("查询失败！");
      } else if (res.code == 200) {
        this.$message.success("查询成功！");
        this.form = res.data;
      }

      // console.log(this.form.length);
      // console.log(res.data[0]);
      // for (var dlabel_id = 0; dlabel_id <= this.form.length; dlabel_id++) {
      //   this.form = res.data[dlabel_id];
      // }
      // console.log(res.data[dlabel_id]);
      for (var i = 0; i < this.form.length; i++) {
        if (res.data[i].dlabel_id == "1") {
          this.form[i].dlabel_id = "日常";
        } else if (res.data[i].dlabel_id == "2") {
          this.form[i].dlabel_id = "美食";
        } else if (res.data[i].dlabel_id == "3") {
          this.form[i].dlabel_id = "旅游";
        } else if (res.data[i].dlabel_id == "4") {
          this.form[i].dlabel_id = "情感";
        }
      }
      // console.log();
      // console.log(this.hh.dlabel_id);
      // console.log(res.data[this.hh.dlabel_id]);
      // this.form = res.data
      // this.form.push(res.data[this.dlabel_id]);
    },
    // 输入框查询
    async chaxun2() {
      console.log(this.ff.user_nickname);
      const { data: res } = await this.$http.get(
        `/api/admin/dynamic_administration?user_nickname=` +
          this.ff.user_nickname
      );
      // console.log(res.data);
      if (res.code == 100) {
        this.$message.error("查询失败！");
      } else if (res.code == 200) {
        this.$message.success("查询成功！");
        this.form = res.data;
      }

      for (var i = 0; i < this.form.length; i++) {
        if (res.data[i].dlabel_id == "1") {
          this.form[i].dlabel_id = "日常";
        } else if (res.data[i].dlabel_id == "2") {
          this.form[i].dlabel_id = "美食";
        } else if (res.data[i].dlabel_id == "3") {
          this.form[i].dlabel_id = "旅游";
        } else if (res.data[i].dlabel_id == "4") {
          this.form[i].dlabel_id = "情感";
        }
      }
    },
  },
};
</script>
<style>
.textScroll {
  display: inline-block;
  position: fixed;
  top: 2rem;
  bottom: 0;
  left: 0;
  margin: auto;
  overflow: scroll;
  right: 0;
  width: 13rem;
  /* height: 10rem; */
  /* margin-bottom: 4.7rem; */
  z-index: 1;
  background-color: rgba(240, 249, 255, 0.8);
}
.avatar_box {
  float: left;
  display: flex;
  vertical-align: middle;
  width: 3.3rem;
  height: 3.3rem;
  border-radius: 50%;
  /* background: url("https://gitee.com/adya/images/raw/master/img/消息空图片(1).png")
    no-repeat; */
}
.avatar_box img {
  display: flex;
  vertical-align: middle;
  width: 100%;
  height: 100%;
  /* border-radius: 50%; */
  background-color: #eee;
}
.avatar_text {
  /* float: left; */
  vertical-align: middle;
}
.avatar_text p {
  /* font-size: 1.rem; */
  vertical-align: middle;
}
.aa {
  width: 50rem;
  margin: 0 auto;
  margin-top: 1rem;
  background-color: #d5e4fe;
}
.bb {
  width: 65rem;
  margin: 0 auto;
  margin-top: 1rem;
  background-color: #d5e4fe;
}
.el-icon-delete {
  float: right;
  margin-top: -0.5rem !important;
  border: none !important;
}
.cc {
  font-size: 19px;
  text-align: center;
  margin-top: 40px;
}
.dd {
  /* float: left; */
  height: 1.5rem;
  line-height: 5px !important;
  color: white;
  border: none !important;
  background-color: #b2c3cd !important;
  margin-right: 11.5rem !important;
  margin-top: 25px !important;
}
.ee {
  height: 1.5rem;
  line-height: 5px !important;
  float: right;
  color: white;
  border: none !important;
  background-color: #b2c3cd !important;
  margin-top: 25px !important;
  margin-right: 2.5rem !important;
}
.neirong {
  /* float: left; */
  /* width: 100%; */
  /* height: 400px; */
  /* margin: 0 auto; */
  display: table;
  float: left;
  width: 100%;
  /* text-align: center; */
  line-height: 27px;
  color: blue;
  margin-bottom: 20px;
}
.neirong img {
  /* width: 100%; */
  /* width: 200px; */
  /* height: 200px; */
  margin: auto;
  width: 150px;
  /* height: 150px; */
}
</style>