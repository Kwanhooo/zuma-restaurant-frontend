<template>
  {{username}}
  <el-header>
  <div class="header" style="text-align:center">
  <input type="text" id="username" class="fadeIn second" name="register" placeholder="🧊  用户名"
         v-model="username" style="width:200px;margin-top:20px">
    <el-button round @click="viewOneUser()" >🔍</el-button>
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
          prop="userId"
          label="用户名"
          width="150">
      </el-table-column>
      <el-table-column
          prop="password"
          label="密码"
          width="120">
      </el-table-column>
      <el-table-column
          prop="charactor"
          label="职位"
          width="120">
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
      <p>用户名：{{modifyUserId}}</p>
      <p>密码：<el-input v-model="modifyPassword" :placeholder="modifyPassword" style="width:200px"/></p>
      <p>职位：<el-input v-model="modifyCharactor" :placeholder="modifyCharactor" style="width:200px"/></p>
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
      <p>用户名：<el-input v-model="addUserId"  style="width:200px"/></p>
      <p>密  码：<el-input v-model="addPassword" style="width:200px"/></p>
      <p>职  位：<el-input v-model="addCharactor" style="width:200px"/></p>
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
      dialogVisibleModify:false,
      dialogVisibleAdd:false,
      username:"",
      modifyUserId:"",
      modifyPassword:"",
      modifyCharactor:"",
      addUserId:"",
      addPassword:"",
      addCharactor:"",
      tableData: [
        {
          userId:10001,
          password:12345,
          charactor:"厨师",
        }
      ]
    }
  },
  methods: {
    showModifyDialog(row) {
      this.dialogVisibleModify = true;
      this.modifyUserId=row.userId;
      this.modifyPassword=row.password;
      this.modifyCharactor=row.charactor;
      this.dialogTableVisible=true;
      // dialog.show();
    },
    modifyUser() {
      this.dialogVisible = false;
      axios({
        method: "post",
        url: "/front/modifyUser",
        data: {
          userId: this.modifyUserId,
          password: this.modifyPassword,
          charactor: this.modifyCharactor,
        },
      })
        .then((res)=>{
          if(res.data.code===0){
            this.dialogVisibleModify = false;
            this.$alert('成功更新!', '更新用户', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
              }
            });
          }else {
            this.$alert(res.data.msg, '更新用户', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
              }
            });
          }
        })
    },

    deleteUser(row) {
      axios({
        method: "post",
        url: "/front/viewUser/deleteUser",
        data: {
          userId: row.userId
        },
      })
        .then((res)=>{
          if(res.data.code===0){
            this.$alert('成功删除!', '删除用户', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
              }
            });
          }else {
            this.$alert(res.data.msg, '删除用户', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
              }
            });
          }
        })
    },

    viewOneUser() {
      axios({
        method: "POST",
        url: "/front/viewOneUser",
        data: {
          userId: this.username,
        },
      })
        .then((res)=>{
          if(res.data.status===0){
            this.tableData=res.data;
          }
          else{
            this.$alert(res.data.msg, '查找用户', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
              }
            });
          }
        })
    },

    addOneUser() {
      this.dialogVisible = false;
      axios({
        method: "post",
        url: "/front/addUser",
        data: {
          userId: this.addUserId,
          password: this.addPassword,
          charactor: this.addCharactor,
        },
      })
          .then((res)=>{
            if(res.data.code===0){
              this.dialogVisibleAdd = false;
              this.$alert('成功添加!', '添加用户', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$message({
                    type: 'info',
                    message: `action: ${ action }`
                  });
                }
              });
            }else {
              this.$alert(res.data.msg, '添加用户', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$message({
                    type: 'info',
                    message: `action: ${ action }`
                  });
                }
              });
            }
          })
    }
  },
  created() {
    axios({
      method: 'POST',
      url: '/front/viewUser'
    })
    .then((res)=>{
      if(res.data.code===0){
        this.tableData=res.data
      }else {
        this.$alert(res.data.msg, '查询用户', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
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