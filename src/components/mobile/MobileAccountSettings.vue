<template>
  <div id="mobile-account-settings-wrapper">
    <div id="settings-top-bar">
      <div id="go-back-wrapper" @click.prevent="goBack()">
        <svg t="1657522982030" class="GoBackIcon" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg" p-id="2262" width="200" height="200">
          <path
              d="M624.788992 204.047974 585.205965 164.464026 219.560038 530.185011 585.205965 895.864013 624.788992 856.280986 298.663014 530.16105Z"
              p-id="2263" fill="#18abce"></path>
        </svg>
      </div>
      <div id="settings-title">账户设定</div>
    </div>
    <div id="settings-content">
      <div class="SettingItem" style="margin-top: 2rem;">
        <div class="SettingItemKey">
          头像
        </div>
        <div class="SettingItemValue" style="margin-top: 0">
          <div class="SettingValueWrapper" @click.prevent="goToDetailSettings('/m/me/settings/avatar')">
            <img alt="头像" class="SettingAvatarImg"
                 :src="avatarSrc">
            <svg t="1657468984251" class="AvatarMoreIcon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="2263" width="200" height="200">
              <path
                  d="M557.179 904c-8.189 0-16.379-3.124-22.628-9.372-12.496-12.497-12.496-32.759 0-45.256L871.924 512 534.551 174.627c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0l360 360c12.496 12.497 12.496 32.758 0 45.255l-360 360c-6.249 6.249-14.439 9.373-22.628 9.373z"
                  fill="#8a8a8a" p-id="2264"></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="SettingItem">
        <div class="SettingItemKey">
          用户名
        </div>
        <div class="SettingItemValue">
          <div class="SettingValueWrapper" @click.prevent="goToDetailSettings('/m/me/settings/username')">
            <svg t="1657468984251" class="SettingMoreIcon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="2263" width="200" height="200">
              <path
                  d="M557.179 904c-8.189 0-16.379-3.124-22.628-9.372-12.496-12.497-12.496-32.759 0-45.256L871.924 512 534.551 174.627c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0l360 360c12.496 12.497 12.496 32.758 0 45.255l-360 360c-6.249 6.249-14.439 9.373-22.628 9.373z"
                  fill="#8a8a8a" p-id="2264"></path>
            </svg>
            <div class="ValueText">{{ username }}</div>
          </div>
        </div>
      </div>
      <div class="SettingItem">
        <div class="SettingItemKey">
          账号密码
        </div>
        <div class="SettingItemValue">
          <div class="SettingValueWrapper" @click.prevent="goToDetailSettings('/m/me/settings/security')">
            <svg t="1657468984251" class="SettingMoreIcon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="2263" width="200" height="200">
              <path
                  d="M557.179 904c-8.189 0-16.379-3.124-22.628-9.372-12.496-12.497-12.496-32.759 0-45.256L871.924 512 534.551 174.627c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0l360 360c12.496 12.497 12.496 32.758 0 45.255l-360 360c-6.249 6.249-14.439 9.373-22.628 9.373z"
                  fill="#8a8a8a" p-id="2264"></path>
            </svg>
            <div class="ValueText">修改</div>
          </div>
        </div>
      </div>
      <div class="SettingItem">
        <div class="SettingItemKey">
          手机号
        </div>
        <div class="SettingItemValue">
          <div class="SettingValueWrapper" @click.prevent="goToDetailSettings('/m/me/settings/phone')">
            <svg t="1657468984251" class="SettingMoreIcon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="2263" width="200" height="200">
              <path
                  d="M557.179 904c-8.189 0-16.379-3.124-22.628-9.372-12.496-12.497-12.496-32.759 0-45.256L871.924 512 534.551 174.627c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0l360 360c12.496 12.497 12.496 32.758 0 45.255l-360 360c-6.249 6.249-14.439 9.373-22.628 9.373z"
                  fill="#8a8a8a" p-id="2264"></path>
            </svg>
            <div class="ValueText">{{ maskedPhoneNumber }}</div>
          </div>
        </div>
      </div>
      <div class="SettingItem">
        <div class="SettingItemKey">
          注销账号
        </div>
        <div class="SettingItemValue">
          <div class="SettingValueWrapper" @click.prevent="goToDetailSettings('/m/me/settings/cancellation')">
            <svg t="1657468984251" class="SettingMoreIcon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="2263" width="200" height="200">
              <path
                  d="M557.179 904c-8.189 0-16.379-3.124-22.628-9.372-12.496-12.497-12.496-32.759 0-45.256L871.924 512 534.551 174.627c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0l360 360c12.496 12.497 12.496 32.758 0 45.255l-360 360c-6.249 6.249-14.439 9.373-22.628 9.373z"
                  fill="#8a8a8a" p-id="2264"></path>
            </svg>
            <div class="ValueText">无法恢复，谨慎操作</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MobileAccountSettings",
  data() {
    return {
      username: sessionStorage.getItem('userId'),
      maskedPhoneNumber: "",
      avatarSrc: "",
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    putPhoneNumberMask(phoneNumber) {
      // 将this.phoneNumber的第4-7位替换为*
      this.maskedPhoneNumber = phoneNumber.substring(0, 3) + "****" + phoneNumber.substring(7);
    },
    goToDetailSettings(path) {
      this.$router.push(path);
    },
    getAvatar() {
      axios.get('/customer/getAvatar?userId=' + sessionStorage.getItem('userId')).then(res => {
        if (res.data.status === 0) {
          this.avatarSrc = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(() => {
        this.$message.error('网络错误，获取头像失败');
      });
    }
  },
  created() {
    axios.get("/customer/viewCustomer/" + sessionStorage.getItem('userId')).then(res => {
      this.username = res.data.data.userid;
      this.putPhoneNumberMask(res.data.data.phone);
    });
    this.getAvatar();
  }
}
</script>

<style scoped>
#mobile-account-settings-wrapper {
  height: 100%;

  padding: 0 0;
  background: #e7ecf8;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.2);
  margin: 4px 6px 10px 6px;
  width: auto;
}

#settings-top-bar {
  height: 60px;
  border-radius: 20px 20px 0 0;

  background: white;
  display: flex;
}

#go-back-wrapper {
  flex-shrink: 0;
}

#settings-title {
  font-weight: bolder;
  font-size: 22px;
  margin-left: calc(50vw - 44px - 35px - 30px - 5px);
  margin-top: calc(30px - 11px - 5px);
}

.GoBackIcon {
  width: 35px;
  height: 35px;
  margin: 13px 15px;
  fill: #18abce;
}

#settings-content {
  height: calc(100% - 70px);
  margin: 5px 5px;
}

.SettingItem {
  width: 100%;
  height: 3rem;
  background: white;
  border-radius: 20px 20px 20px 20px;
  margin: 0.5rem 0;

  display: flex;
}

.SettingItemKey {
  flex-shrink: 0;
  font-size: 1.0rem;
  margin-top: calc(3rem / 2 - 0.7rem);
  padding-left: 0.9rem;
}

.SettingItemValue {
  font-size: 1.0rem;
  /*margin-top: calc(3rem / 2 - 0.7rem);*/

  flex-grow: 1;
  color: #7c7a7a;
}

.ValueText {
  float: right;
  font-size: 1rem;
  margin-top: calc(24px - 0.7rem);
  width: auto;
  height: 2.6rem;
}

.SettingValueWrapper {
  float: right;
  margin-right: 1.1rem;
  height: 50px;
}

.SettingAvatarImg {
  margin-top: 0.2rem;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;
}

.AvatarMoreIcon {
  width: 1.2rem;
  height: 2.6rem;
  margin-top: 0.2rem;
  margin-left: 0.2rem;
}

.SettingMoreIcon {
  float: right;
  width: 1.2rem;
  height: 2.6rem;
  margin-top: 0.2rem;
  margin-left: 0.2rem;
  /*fill: #8a8a8a;*/
}
</style>