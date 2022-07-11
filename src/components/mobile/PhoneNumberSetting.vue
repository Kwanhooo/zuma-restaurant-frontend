<template>
  <div class="DetailSettingWrapper">
    <div class="DetailSettingTopBar">
      <div class="DetailGoBack" @click.prevent="goBack()">
        <svg t="1657465858500" class="GoBackIcon" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg"
             p-id="2259" width="200" height="200">
          <path
              d="M700.371228 394.525472 174.028569 394.525472l255.952416-227.506551c12.389168-11.011798 13.505595-29.980825 2.492774-42.369993-11.011798-12.386098-29.977755-13.506619-42.367947-2.492774L76.425623 400.975371c-6.960529 5.496178-11.434423 14.003945-11.434423 23.561625 0 0.013303 0.001023 0.026606 0.001023 0.039909 0 0.01228-0.001023 0.025583-0.001023 0.037862 0 0.473791 0.01535 0.946558 0.037862 1.418302 0.001023 0.016373 0.001023 0.032746 0.001023 0.049119 0.39295 8.030907 3.992941 15.595186 10.034541 20.962427l315.040163 280.028764c5.717212 5.083785 12.83533 7.580652 19.925818 7.580652 8.274454 0 16.514115-3.403516 22.442128-10.07445 11.011798-12.387122 9.896394-31.357172-2.492774-42.367947l-256.128425-227.665163 526.518668 0c109.219517 0 198.075241 88.855724 198.075241 198.075241s-88.855724 198.075241-198.075241 198.075241L354.324888 850.696955c-16.57449 0-30.011524 13.437034-30.011524 30.011524s13.437034 30.011524 30.011524 30.011524l346.046341 0c142.31631 0 258.098289-115.783003 258.098289-258.098289S842.686515 394.525472 700.371228 394.525472z"
              p-id="2260"></path>
        </svg>
      </div>
      <div class="DetailSettingTitle">手机绑定</div>
    </div>
    <div class="DetailSettingContent">
      <div class="PhoneNumberSettingWrapper">
        <div class="PhoneNumberSettingTitle">
          手机号码：
        </div>
        <div class="PhoneNumberSettingInputWrapper">
          <input type="text" class="PhoneNumberSettingInput" v-model="phoneNumber" placeholder="请输入手机号码...">
        </div>
        <div class="PhoneNumberSettingTipsWrapper">
          <div class="PhoneNumberSettingTips">
            请输入中国大陆地区的手机号码，暂不支持港澳台及海外号码。
          </div>
        </div>
        <div class="PhoneNumberSettingBtnWrapper">
          <button class="PhoneNumberSettingBtn" @click.prevent="checkAndUpdatePhoneNumber()">
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
  name: "PhoneNumberSetting",
  data() {
    return {
      phoneNumber: "17806693323"
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getCurrentPhoneNumber() {
      axios({
        method: "get",
        url: "/customer/getPhoneNumber"
      }).then(res => {
        this.phoneNumber = res.data.data;
      }).catch(() => {
        this.$message.error('网络错误，请稍后再试');
      });
    },
    checkAndUpdatePhoneNumber() {

    }
  },
  created() {
    this.getCurrentPhoneNumber();
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
  margin-left: calc(50vw - 44px - 35px - 30px - 5px);
  margin-top: calc(30px - 11px - 5px);
}

.DetailSettingContent {
  height: calc(100% - 70px);
  margin: 5px 5px;
}

.PhoneNumberSettingWrapper {
  margin-top: 0.5rem;
  height: auto;
  background: white;
  border-radius: 20px;
  padding: 1px 1px 1.5rem 1px;
}

.PhoneNumberSettingTitle {
  font-size: 1.2rem;
  /*font-weight: bolder;*/
  margin-left: 0.9rem;
  margin-top: 0.8rem;
}

.PhoneNumberSettingInputWrapper {
  width: calc(100vw - 10px);
}

.PhoneNumberSettingInput {
  width: calc(100vw - 60px);
  height: 1.5rem;
  border-radius: 20px;
  border: 2px solid #86b7d3;
  padding: 0.5rem 0.5rem 0.5rem 0.7rem;
  margin-top: 0.5rem;
  margin-left: 0.5rem;

  font-size: 1.1rem;
}

.PhoneNumberSettingTipsWrapper {
  margin-top: 0.5rem;
  margin-left: 0.8rem;
}

.PhoneNumberSettingTips {
  margin: 0.8rem 0;
  color: #9f9d9d;
}

.PhoneNumberSettingBtnWrapper {
  width: calc(100vw - 10px);
  margin-top: 0.5rem;
  margin-left: 0.5rem;
}

.PhoneNumberSettingBtn {
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

.PhoneNumberSettingBtn:hover {
  background: #34C471;
  color: #E9FCF1;
}

</style>