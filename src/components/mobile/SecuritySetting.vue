<template>
  <div class="DetailSettingWrapper">
    <div class="DetailSettingTopBar">
      <div class="DetailGoBack" @click.prevent="goBack()">
        <svg t="1657522982030" class="GoBackIcon" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg" p-id="2262" width="200" height="200">
          <path
              d="M624.788992 204.047974 585.205965 164.464026 219.560038 530.185011 585.205965 895.864013 624.788992 856.280986 298.663014 530.16105Z"
              p-id="2263" fill="#18abce"></path>
        </svg>
      </div>
      <div class="DetailSettingTitle">账户安全</div>
    </div>
    <div class="DetailSettingContent">
      <div class="SecuritySettingWrapper">
        <div class="OldPasswordWrapper">
          <div class="PasswordTitle">
            旧密码
          </div>
          <div class="PasswordInputWrapper">
            <input type="password" class="PasswordInput" v-model="oldPassword">
          </div>
        </div>
        <div class="NewPasswordWrapper">
          <div class="PasswordTitle">
            新密码
          </div>
          <div class="PasswordInputWrapper">
            <input type="password" class="PasswordInput" v-model="newPassword">
          </div>
        </div>
        <div class="PasswordTipsWrapper">
          密码长度8-32位，须包含数字、字母、符号至少两种或以上元素
        </div>
        <div class="PasswordConfirmBtnWrapper">
          <button class="PasswordConfirmBtn" @click.prevent="checkAndUpdatePassword()">
            确认
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SecuritySetting",
  data() {
    return {
      oldPassword: "",
      newPassword: ""
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    checkAndUpdatePassword() {
      // 检查密码是否合法
      if (this.oldPassword.length < 8 || this.oldPassword.length > 32) {
        this.$message({
          message: "旧密码长度不正确",
          type: "error"
        });
        return;
      } else if (this.newPassword.length < 8 || this.newPassword.length > 32) {
        this.$message({
          message: "新密码长度不正确",
          type: "error"
        });
        return;
      }

      axios({
        method: "post",
        url: "/api/user/checkPassword",
        data: {
          password: this.oldPassword
        }
      }).then(res => {
        if (res.data.status === 0) {
          this.$message.success("密码更改成功，请牢记新密码");
        } else {
          this.$message({
            message: res.data.msg,
            type: "error"
          });
        }
      }).catch(() => {
        this.$message({
          message: "网络错误，请检查后重试",
          type: "error"
        });
      });
    },
  },
}
</script>

<style scoped>
.DetailSettingWrapper {
  height: 100%;

  padding: 0 0;
  background: #e7ecf8;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.2);
  margin: 4px 6px 10px 6px;
  width: auto;
}

.DetailSettingTopBar {
  height: 60px;
  border-radius: 20px 20px 0 0;

  background: white;
  display: flex;
}

.DetailGoBack {
  flex-shrink: 0;
}

.GoBackIcon {
  width: 35px;
  height: 35px;
  margin: 13px 15px;
  fill: #18abce;
}

.DetailSettingTitle {
  font-weight: bolder;
  font-size: 22px;
  margin-left: calc(50vw - 44px - 35px - 30px - 5px);
  margin-top: calc(30px - 11px - 5px);
}

.DetailSettingContent {
  height: calc(100% - 70px);
  margin: 5px 5px;
}

.SecuritySettingWrapper {
  background: white;
  height: auto;
  border-radius: 20px 20px 20px 20px;
  padding: 1rem 1.5rem 1.5rem 1.5rem;
}

.OldPasswordWrapper {

}

.PasswordTitle {
  font-size: 1rem;
}

.PasswordInputWrapper {
}

.PasswordInput {
  border-radius: 15px;
  border: 1px solid #c4c4c4;
  width: calc(100% - 1rem);
  height: 2rem;
  margin: 0.5rem 0;

  font-size: 1.5rem;
  padding: 0 0.5rem;
}

.NewPasswordWrapper {

}

.PasswordTipsWrapper {
  font-size: 1.0rem;
  color: #9f9d9d;
  margin: 0.2rem 0 1rem 0;
}

.PasswordConfirmBtnWrapper {

}

.PasswordConfirmBtn {
  width: calc(100% - 0.4rem);
  height: 2.2rem;
  border-radius: 10px;
  border: 1px solid #34C471;
  background: #E9FCF1;
  color: #34C471;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  margin-left: 0.2rem;
  transition: all 0.2s ease-in-out;
}

.PasswordConfirmBtn:hover {
  background: #34C471;
  color: #E9FCF1;
}
</style>