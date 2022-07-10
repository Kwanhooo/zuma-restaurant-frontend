<template>

  <div id="left">
    <div class="user">
      <div class="categoryTitle" align="center">📃 账号信息</div>
      <hr style="width:80%;top:0%">
      <div style="background: white;border-radius: 30px;margin: 20px 20px 10px 20px;height: 60%">
        <br><br>
        <table class="userMsgForm" style="margin-left: 100px;">
          <tr>
            <td>id:</td>
            <td>{{ user.id }}</td>
          </tr>
          <tr>
            <td>用户名:</td>
            <td>{{ user.userId }}</td>
          </tr>
          <tr>
            <td>电话:</td>
            <td>{{ user.phone }}</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="changePhone">
      <div class="categoryTitle" align="center">💾 修改电话</div>
      <hr style="width:80%">
      <div style="background: white;border-radius: 30px;margin: 20px 20px 10px 20px;height: 60%">
        <br>
        <input class="phoneText" type="text" v-model="newPhone">
        <br><br>
        <button class="changePhoneBtm" @click.prevent="changePhone()">确定修改</button>
      </div>
    </div>
  </div>

  <div id="right">
    <div class="today">
      <div class="todayTitle">
        <div style="height: 20px;"></div>
        <span>📅 今日</span>
      </div>
      <hr style="width:90%">
      <div id="todayDisplay" style="background: white;border-radius: 30px;margin: 20px 20px 10px 20px;height: 60%">
        <br>
        <div id="dayDisplay" style="margin-top: 30px;color: #007BFF;font-weight: bold">
          <span style="font-size: 35px;">{{ day }}</span>
        </div>
        <div id="dateDisplay" style="margin-top: 15px;">
          <span style="font-size: 25px;font-family: 'Cascadia Code',ui-sans-serif;">{{ date }}</span>
        </div>
        <div id="timeDisplay" style="margin-top: 10px;">
          <span style="font-size: 25px;font-family: 'Cascadia Code',ui-sans-serif;">{{ time }}</span>
        </div>
      </div>
    </div>

    <div class="other">
      <div class="categoryTitle" align="center">📎 其他操作</div>
      <hr style="width:80%">
      <div style="background: white;border-radius: 30px;margin: 20px 20px 10px 20px;height: 60%">
        <br>
        <button class="otherBtm" @click.prevent="changePassword()">修改密码</button>
        <el-dialog title="修改密码" v-model="sendVal" width="35%" style="font-size: 30px; font-weight: bold">
          <div id="modifyPassword">
            <br/>
            <div style="background: white;border-radius: 30px;margin: 20px 20px 10px 20px;height: 60%">
              <br>
              <table style="margin-left: 135px">
                <tr>
                  <td>
                    <p style="font-size: 30px">旧密码：</p>
                  </td>
                  <td>
                    <input id="oldPasswordText" type="text" v-model="oldPassword" style="width: 250px; height: 50px; font-size: 30px">
                  </td>
                  <td>
                    <p v-if="passwordNotTrue" style="color: red; font-size: 30px">密码错误</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="font-size: 30px">新密码：</p>
                  </td>
                  <td>
                    <input id="newPasswordText" type="text" v-model="newPassword" style="width: 250px; height: 50px; font-size: 30px">
                  </td>
                </tr>
              </table>
              <br>
              <button class="continueButton" @click.prevent="modifyPassword()">确定修改</button>
              <br><br><br><br><br>
            </div>
          </div>
        </el-dialog>
        <br><br>
        <button class="otherBtm" @click.prevent="logout()">注销</button>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "user",
  data() {
    return {
      user: {id: 0, userId: "", phone: ""},
      sendVal: false,
      passwordNotTrue :false,
      oldPassword: "",
      newPassword: "",
      newPhone: "",
      day: "",
      date: "",
      time: "",
    }
  },
  methods: {
    changePhone() {
      axios({
        method: 'PUT',
        url: '/back/modifyPhone',
        params: {
          userId: this.user.userId,
          newPhone: this.newPhone
        }
      })
          .then((res) => {
            alert("修改成功")
            this.user.phone = this.newPhone
            console.log(res.data)
          })
          .catch(err => {
            //打印响应数据(错误信息)
            console.log(err);
          });
    },

    changePassword() {
      this.sendVal = true;
      this.passwordNotTrue = false;
    },

    modifyPassword() {
      var modifyPassword = {
        userId : this.user.userId,
        oldPassword : this.oldPassword,
        newPasswrod : this.newPassword
      }
      axios({
        method: 'POST',
        url: '/back/modifyPassword',
        data: modifyPassword
      })
          .then(res => {
            if(res.data.status === 0){
              this.oldPassword = "";
              this.newPassword = "";
              alert("修改成功")
              this.sendVal = false;
            }
            else {
              this.passwordNotTrue = true;
            }
          })
          .catch(err => {
            //打印响应数据(错误信息)
            console.log(err);
          });
    },

    logout() {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('role');
      window.location.href= '/auth';
    }
  },
  created() {
    axios({
      method: 'GET',
      url: '/back/viewUser/'+sessionStorage.getItem("userId")
    })
        .then((res) => {
          this.user.id = res.data.data.id
          this.user.userId = res.data.data.userid
          this.user.phone = res.data.data.phone
          this.newPhone = this.user.phone
        })
        .catch(err => {
          //打印响应数据(错误信息)
          console.log(err);
        });

    // 获取系统时间
    this.day = new Date().getDay();
    // 将day转换为中文
    switch (this.day) {
      case 0:
        this.day = "周日";
        break;
      case 1:
        this.day = "周一";
        break;
      case 2:
        this.day = "周二";
        break;
      case 3:
        this.day = "周三";
        break;
      case 4:
        this.day = "周四";
        break;
      case 5:
        this.day = "周五";
        break;
      case 6:
        this.day = "周六";
        break;
    }

    // 获得日月年
    let date = new Date();
    this.date = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
    // 每隔一秒获取系统时间
    setInterval(() => {
      this.time = new Date().toLocaleTimeString();
    }, 1000);
  },
}
</script>

<style scoped>
#left {
  float: left;
  position: relative;
  margin-left: 3%;
  top: 5%;
  width: 45%;
  height: 90%;
}

#right {
  float: left;
  position: relative;
  margin-left: 4%;
  top: 5%;
  width: 45%;
  height: 90%;
}

.user {
  position: relative;
  float: top;
  width: 100%;
  height: 45%;
  left: 0%;
  top: 0%;

  background: #c8f7dc;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
}

.changePhone {
  position: relative;
  float: top;
  width: 100%;
  height: 45%;
  left: 0%;
  top: 5%;
  text-align: center;
  background: #dbf6fd;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
}

.today {
  position: relative;
  float: top;
  width: 100%;
  height: 45%;
  right: 0%;
  top: 0%;

  text-align: center;
  background: #fee4cb;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
}

.other {
  position: relative;
  float: top;
  width: 100%;
  right: 0%;
  top: 5%;
  height: 45%;
  text-align: center;
  background: #ffd7ed;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
}

.userMsgForm {
  position: relative;
  font-size: 25px;
  float: bottom;
  align-content: center;
  left: 10%;
  bottom: 0%;
  height: 60%;
  width: 80%;
}

.phoneText {
  position: relative;
  float: top;
  font-size: 25px;
  left: 2%;
  top: 5%;
  width: 60%;
  height: 30%;
}

.changePhoneBtm {
  position: relative;
  float: top;
  text-align: center;
  left: 2%;
  top: 8%;
  width: 40%;
  height: 30%;
  border: 3px;
  border-radius: 30px;
  transition-duration: 0.4s;
  background-color: #F1FBFE;
  color: #1383B6;
}

.changePhoneBtm:hover {
  background-color: #1383B6;
  color: #F1FBFE;
}

.otherBtm {
  position: relative;
  float: top;
  text-align: center;
  left: 2%;
  top: 5%;
  width: 60%;
  height: 30%;
  border: 3px;
  border-radius: 30px;
  transition-duration: 0.4s;
  background-color: #F6F5FE;
  color: hotpink;
}

.otherBtm:hover {
  background-color: hotpink;
  color: #F6F5FE;
}

.todayTitle {
  margin-top: 20px;
  /*margin-left: 20px;*/
  /*color: #007BFF;*/
  font-size: 40px;
  font-weight: bold;
}

#modifyPassword {
  text-align: center;
  background: #e9e7fd;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
}

.continueButton {
  text-align: center;
  left: 12%;
  width: 265px;
  height: 50px;
  border: 3px;
  border-radius: 30px;
  transition-duration: 0.4s;
  background-color: #F6F5FE;
  color: #4F3FF0;
}

.continueButton:hover {
  background-color: #4F3FF0;
  color: #F6F5FE;
}

</style>