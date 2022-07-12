<template>
  <el-header>
    <div class="header" style="text-align:center">
      <input type="text" id="username" class="fadeIn second" name="register" placeholder="🧊  用户名"
             v-model="username" style="width:200px;margin-top:20px">
      <el-button round @click="viewOneUser()">🔍</el-button>
      <el-button round @click="dialogVisibleAdd=true">➕</el-button>
    </div>

  </el-header>
  <el-main>
    <el-table
        :data="tableData"
        style="width: 100%"
        height="600">
      <el-table-column
          fixed
          prop="userid"
          label="用户名"
          width="350">
      </el-table-column>
      <el-table-column
          prop="password"
          label="密码"
          width="320">
      </el-table-column>
      <el-table-column
          prop="charactor"
          label="职位"
          width="320">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template #default="scope">
          <el-button type="text" @click.prevent="showModifyDialog(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template #default="scope">
          <el-button type="text" @click.prevent="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </el-main>
  <el-dialog
      title="提示"
      v-model="dialogVisibleModify"
      width="30%">
    <span>
      <p>用户名：{{ modifyUserId }}</p>
      <p>密码：<el-input v-model="modifyPassword" :placeholder="modifyPassword" style="width:200px"/></p>
      <p>职位：<el-input v-model="modifyCharactor" :placeholder="modifyCharactor" style="width:200px"/></p>
      <p>电话：<el-input v-model="modifyPhone" :placeholder="modifyPhone" style="width:200px"/></p>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisibleModify = false">取消</el-button>
        <el-button type="primary" @click="modifyUser()">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog
      title="添加用户"
      v-model="dialogVisibleAdd"
      width="30%">
    <span>
      <p>用户名：<el-input v-model="addUserId" style="width:200px"/></p>
      <p>密  码：<el-input v-model="addPassword" style="width:200px"/></p>
      <p>职  位：<el-input v-model="addCharactor" style="width:200px"/></p>
       <p>电 话：<el-input v-model="addPhone" style="width:200px"/></p>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addOneUser()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from "axios";

// var dialog = document.querySelector('dialog');

export default {
  name: "ViewUser",
  data() {
    return {
      dialogVisibleModify: false,
      dialogVisibleAdd: false,
      username: "",
      modifyUserId: "",
      modifyPassword: "",
      modifyCharactor: "",
      modifyPhone: "",
      addUserId: "",
      addPassword: "",
      addCharactor: "",
      addPhone: "",
      tableData: [
        {
          userid: "10001",
          password: "123456",
          charactor: "厨师",
        }
      ]
    }
  },
  methods: {
    showModifyDialog(row) {
      this.dialogVisibleModify = true;
      this.modifyUserId = row.userid;
      this.modifyPassword = row.password;
      this.modifyCharactor = row.charactor;
      this.dialogTableVisible = true;
      // dialog.show();
    },
    modifyUser() {
      console.log(this.modifyUserId);
      JSON.stringify()
      axios({
        method: "post",
        url: "/front/modifyUser",
        dataType: "json",
        data: {
          userid: this.modifyUserId,
          password: this.modifyPassword,
          charactor: this.modifyCharactor,
          phone: this.modifyPhone,
        }
      })
          .then((res) => {
            if (res.data.status === 0) {
              this.dialogVisibleModify = false;
              let id = this.modifyUserId;
              let password = this.modifyPassword;
              let charactor = this.modifyCharactor;
              this.tableData.forEach(function (item, index, arr) {
                if (item.userid === id) {
                  arr[index].password = password;
                  arr[index].charactor = charactor;
                }
              })

            } else {
              console.log(res.data.msg);
            }
          })

    },

    deleteUser(row) {

      axios({
        method: "post",
        url: "/front/deleteUser?userId=" + row.userid,

      })
          .then((res) => {
            console.log(res.data);
            if (res.data.status === 0) {
              this.tableData.forEach(function (item, index, arr) {
                    console.log('item: '+item.userid+'row: '+row.userid);
                if (item.userid === row.userid) {
                  arr.splice(index, 1);
                }
              })
            } else {
              console.log(res.data.msg);
            }
          })
    },

    viewOneUser() {
      axios({
        method: "POST",
        url: "/front/viewOneUser?userId=" + this.username,

      })
          .then((res) => {
            console.log(res.data);
            if (res.data.status === 0) {
            //  this.tableData = res.data.data;
              this.tableData=[];
              let user = {
                userid: res.data.data.userid,
                password: res.data.data.password,
                charactor: res.data.data.charactor,
              }
              this.tableData.push(user);
            } else {
              this.$alert(res.data.msg, '查找用户', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$message({
                    type: 'info',
                    message: `action: ${action}`
                  });
                }
              });
            }
          })
    },

    addOneUser() {
      this.dialogVisible = false;
      JSON.stringify()
      axios({
        method: "post",
        url: "/front/addUser",
        dataType: "json",
        data: {
          userid: this.addUserId,
          password: this.addPassword,
          charactor: this.addCharactor,
          phone: this.addPhone,
        },
      })
          .then((res) => {
            if (res.data.status === 0) {
              this.dialogVisibleAdd = false;
              let user = {
                userid: this.addUserId,
                password: this.addPassword,
                charactor: this.addCharactor,
              }
              this.tableData.push(user);
            } else {
              console.log(res.data.msg);
            }
          })
    }
  },
  created() {
    axios({
      method: 'POST',
      url: '/front/viewUser'
    })
        .then((res) => {
          if (res.data.status === 0) {
            this.tableData = res.data.data
          } else {
            console.log(res.data.msg);
          }
        })
  }
}
</script>

<style scoped>
input[type=text] {
  background-color: #f6f6f6;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

</style>