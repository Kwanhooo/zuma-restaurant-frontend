<template>
  <div id="mobile-account-settings-wrapper">
    <div id="settings-top-bar">
      <div id="go-back-wrapper" @click.prevent="goBack()">
        <svg t="1657465858500" class="GoBackIcon" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg"
             p-id="2259" width="200" height="200">
          <path
              d="M700.371228 394.525472 174.028569 394.525472l255.952416-227.506551c12.389168-11.011798 13.505595-29.980825 2.492774-42.369993-11.011798-12.386098-29.977755-13.506619-42.367947-2.492774L76.425623 400.975371c-6.960529 5.496178-11.434423 14.003945-11.434423 23.561625 0 0.013303 0.001023 0.026606 0.001023 0.039909 0 0.01228-0.001023 0.025583-0.001023 0.037862 0 0.473791 0.01535 0.946558 0.037862 1.418302 0.001023 0.016373 0.001023 0.032746 0.001023 0.049119 0.39295 8.030907 3.992941 15.595186 10.034541 20.962427l315.040163 280.028764c5.717212 5.083785 12.83533 7.580652 19.925818 7.580652 8.274454 0 16.514115-3.403516 22.442128-10.07445 11.011798-12.387122 9.896394-31.357172-2.492774-42.367947l-256.128425-227.665163 526.518668 0c109.219517 0 198.075241 88.855724 198.075241 198.075241s-88.855724 198.075241-198.075241 198.075241L354.324888 850.696955c-16.57449 0-30.011524 13.437034-30.011524 30.011524s13.437034 30.011524 30.011524 30.011524l346.046341 0c142.31631 0 258.098289-115.783003 258.098289-258.098289S842.686515 394.525472 700.371228 394.525472z"
              p-id="2260"></path>
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
          <div class="SettingValueWrapper">
            <img alt="头像" class="SettingAvatarImg"
                 src="https://pic.allhistory.com/T1AjCvB5bv1RCvBVdK.jpeg?w=3840&h=&rc=resize">
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
          <div class="SettingValueWrapper">
            <svg t="1657468984251" class="SettingMoreIcon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="2263" width="200" height="200">
              <path
                  d="M557.179 904c-8.189 0-16.379-3.124-22.628-9.372-12.496-12.497-12.496-32.759 0-45.256L871.924 512 534.551 174.627c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0l360 360c12.496 12.497 12.496 32.758 0 45.255l-360 360c-6.249 6.249-14.439 9.373-22.628 9.373z"
                  fill="#8a8a8a" p-id="2264"></path>
            </svg>
            <div class="ValueText">暴龙哥</div>
          </div>
        </div>
      </div>
      <div class="SettingItem">
        <div class="SettingItemKey">
          账号密码
        </div>
        <div class="SettingItemValue">
          <div class="SettingValueWrapper">
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
          <div class="SettingValueWrapper">
            <svg t="1657468984251" class="SettingMoreIcon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="2263" width="200" height="200">
              <path
                  d="M557.179 904c-8.189 0-16.379-3.124-22.628-9.372-12.496-12.497-12.496-32.759 0-45.256L871.924 512 534.551 174.627c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0l360 360c12.496 12.497 12.496 32.758 0 45.255l-360 360c-6.249 6.249-14.439 9.373-22.628 9.373z"
                  fill="#8a8a8a" p-id="2264"></path>
            </svg>
            <div class="ValueText">178****3323</div>
          </div>
        </div>
      </div>
      <div class="SettingItem">
        <div class="SettingItemKey">
          注销账号
        </div>
        <div class="SettingItemValue">
          <div class="SettingValueWrapper">
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
export default {
  name: "MobileAccountSettings",
  data() {
    return {}
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
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