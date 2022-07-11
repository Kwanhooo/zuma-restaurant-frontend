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
      <div class="DetailSettingTitle">用户名设定</div>
    </div>
    <div class="DetailSettingContent">
      <div class="UserNameSettingWrapper">
        <div class="UserNameSettingTitle">
          用户名：
        </div>
        <div class="UserNameSettingInputWrapper">
          <input type="text" class="UserNameSettingInput" v-model="userName" placeholder="请输入用户名...">
        </div>
        <div class="UserNameSettingTipsWrapper">
          <div class="UserNameSettingTips">
            以英文字母或汉字开头，限6-18个字符，不能包含“#”等特殊字符。
          </div>
        </div>
        <div class="UserNameSettingBtnWrapper">
          <button class="UserNameSettingBtn" @click.prevent="checkAndUpdateUsername()">
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
  name: "UserNameSetting",
  data() {
    return {
      userName: "暴龙哥"
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getUserName() {
      axios.get("/customer/getUserId").then(res => {
        this.userName = res.data.userid;
      }).catch(() => {
        this.$message.error('网络错误，请稍后再试');
      });
    },
    checkAndUpdateUsername() {
      // 正则检查 - 以英文字母或汉字开头，限6-18个字符，不能包含特殊字符。
      let reg = /^[a-zA-Z\u4e00-\u9fa5]{1}[a-zA-Z0-9\u4e00-\u9fa5]{5,17}$/;
      // 合法
      if (reg.test(this.userName)) {
        // 更新用户名
        axios.post("/customer/updateUserName", {
          userName: this.userName
        }).then(res => {
          if (res.data.status === 0) {// 返回OK
            this.$message({
              message: "用户名修改成功！",
              type: "success"
            });
          } else {// 返回错误
            this.$message({
              message: "修改失败，换一个吧！",
              type: "error"
            });
          }
        }).catch(() => {// axios异常
          this.$message({
            message: "修改失败，请检查网络！",
            type: "error"
          });
        });
      } else {// 不合法
        this.$message({
          message: "用户名格式不正确",
          type: "error"
        });
      }
    },
  },
  created() {
    this.getUserName();
  }
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
  margin-left: calc(50vw - 44px - 35px - 30px - 5px - 11px);
  margin-top: calc(30px - 11px - 5px);
}

.DetailSettingContent {
  height: calc(100% - 70px);
  margin: 5px 5px;
}

.UserNameSettingWrapper {
  margin-top: 0.5rem;
  height: auto;
  background: white;
  border-radius: 20px;
  padding: 1px 1px 1.5rem 1px;
}

.UserNameSettingTitle {
  font-size: 1.2rem;
  /*font-weight: bolder;*/
  margin-left: 0.9rem;
  margin-top: 0.8rem;
}

.UserNameSettingInputWrapper {
  width: calc(100vw - 10px);
}

.UserNameSettingInput {
  width: calc(100vw - 60px);
  height: 1.5rem;
  border-radius: 20px;
  border: 2px solid #86b7d3;
  padding: 0.5rem;
  margin-top: 0.5rem;
  margin-left: 0.5rem;

  font-size: 1rem;
}

.UserNameSettingTipsWrapper {
  margin-top: 0.5rem;
  margin-left: 0.8rem;
}

.UserNameSettingTips {
  color: #9f9d9d;
}

.UserNameSettingBtnWrapper {
  width: calc(100vw - 10px);
  margin-top: 0.5rem;
  margin-left: 0.5rem;
}

.UserNameSettingBtn {
  width: calc(100vw - 10px - 2rem);
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

.UserNameSettingBtn:hover {
  background: #34C471;
  color: #E9FCF1;
}

</style>