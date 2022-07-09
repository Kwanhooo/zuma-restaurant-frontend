<template>
  <div class="container">
    <div class="name"><h1>{{ rider.name }}</h1></div>
    <div class="id">🔢骑手编号:{{ rider.userId }}</div>
    <div class="phone">📞电话:{{ rider.phone }}</div>
    <div class="orderNumber">🚴您已完成的订单数:<b>{{ rider.orderNumber }}</b>单</div>
    <div class="help">
      <el-button type="text">👨联系客服</el-button>
    </div>
    <div class="button">
      <el-button type="primary" @click="DialogVisible=true" round>🔑修改密码</el-button>
      <el-button type="danger" round>☠退出登录</el-button>
    </div>
  </div>

  <el-dialog
      v-model="DialogVisible"
      title="Tips"
      width="80%"
  >
    <span>请输入原密码:
      <el-input placeholder="请输入原密码" v-model="oldPassword" show-password style="margin-bottom: 2em;"></el-input>
      请输入新密码:
      <el-input placeholder="请输入新密码" v-model="newPassword" show-password></el-input>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="completeDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="modifyPassword()"
        >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from "axios";

export default {
  name: "MyInformation",
  data() {
    return {
      DialogVisible: false,
      oldPassword: "",
      newPassword: "",
      rider: {
        userId: sessionStorage.getItem("userId"),
        name: "王二狗",
        paswword: "12345",
        phone: "114514114514",
        orderNumber: "666",
      }
    }
  },
  methods: {
    modifyPassword() {
      JSON.stringify()
      axios({
        method: 'POST',
        url: '/rider/modifyPassword',
        dataType: 'json',
        data: {
          userId: this.rider.userId,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        }.then((res) => {
          if (res.data.code === 0) {
            this.DialogVisible = false;
          }
        })
      })
    }
  },
  created() {
    JSON.stringify()
    axios({
      method: 'POST',
      url: '/rider/show'
    })
  }
}
</script>

<style scoped>
.container {
  text-align: left;
  overflow: auto;
  height: 32em;
}

.name {
  font-size: 1.5em;
  margin-bottom: 1em;
}

.id {
  font-size: 1.5em;
  margin-bottom: 1em;

}

.phone {
  font-size: 1.5em;
  margin-bottom: 1em;
}

.orderNumber {
  font-size: 1.5em;
  margin-bottom: 1em;
}

.button {
  margin-top: 9em;
  text-align: center;
}

.help {
  margin-top: 2em;
  text-align: center;
}
</style>