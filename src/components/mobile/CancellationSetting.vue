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
      <div class="DetailSettingTitle">注销账户</div>
    </div>
    <div class="DetailSettingContent">
      <div class="CancellationSettingWrapper">
        <div class="CancellationWarningWrapper">

          <div class="CancellationWarningSvgWrapper">
            <svg t="1657529802872" class="CancellationWarningSvg" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 p-id="4341" width="200" height="200">
              <path
                  d="M1001.661867 796.544c48.896 84.906667 7.68 157.013333-87.552 157.013333H110.781867c-97.834667 0-139.050667-69.504-90.112-157.013333l401.664-666.88c48.896-87.552 128.725333-87.552 177.664 0l401.664 666.88zM479.165867 296.533333v341.333334a32 32 0 1 0 64 0v-341.333334a32 32 0 1 0-64 0z m0 469.333334v42.666666a32 32 0 1 0 64 0v-42.666666a32 32 0 1 0-64 0z"
                  fill="#FAAD14" p-id="4342"></path>
            </svg>
          </div>
          <div class="CancellationWarningTitleWrapper">
            注销祖玛菜App服务
          </div>
          <div class="CancellationWarningTextWrapper">
            注销服务后，以下信息可能被清空且无法找回，包括：
          </div>
        </div>
        <div class="CancellationWarningContentWrapper">
          <ul class="CancellationWarningContentUl">
            <li class="CancellationWarningContentLi">1. 祖玛菜App内产生的订单和购物车信息清空</li>
            <li class="CancellationWarningContentLi">2. 店铺会员累计消费记录以及明细信息清空</li>
            <li class="CancellationWarningContentLi">3. 在祖玛菜App留存的其它信息将被清空</li>
          </ul>
        </div>
        <div class="CancellationWarningTextWrapper" style="margin-top: 1rem;">
          点击【确认注销】即代表你同意上述信息，并立即执行
        </div>
        <div class="CancellationBtnWrapper">
          <button class="CancellationBtn" @click.prevent="cancellationConfirm()">确认注销</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CancellationSetting",
  data() {
    return {}
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    cancellationConfirm() {
      axios({
        method: "POST",
        url: "/customer/deleteAccount?userId=" + sessionStorage.getItem("userId"),
      }).then(res => {
        if (res.data.status === 0) {
          this.$message.success("您已彻底注销！");
          sessionStorage.removeItem("userId");
          sessionStorage.removeItem("role");
          sessionStorage.removeItem("token");
          this.$router.push("/m/auth/" + sessionStorage.getItem('tableID'));
        }
      });
    }
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

.CancellationSettingWrapper {
  height: auto;
  padding: 1rem 1rem;
}

.CancellationWarningWrapper {
  margin: 1rem 0;
}

.CancellationWarningSvgWrapper {
  width: 100%;
  text-align: center;
}

.CancellationWarningSvg {
  width: 5rem;
  height: 5rem;
  margin: 0 auto;
}

.CancellationWarningTitleWrapper {
  text-align: center;
  font-size: 1.3rem;
  font-weight: bolder;
}

.CancellationWarningTextWrapper {
  text-align: center;
  font-size: 0.8rem;
  color: #9f9d9d;
  margin-top: 0.3rem;
}

.CancellationWarningContentWrapper {
  background: white;
  padding: 1rem;
  border-radius: 20px;
}

.CancellationWarningContentUl {
  padding: 0;
}

.CancellationWarningContentLi {
  color: #525050;
}


.CancellationBtnWrapper {

}

.CancellationBtn {
  width: calc(100vw - 10px - 3rem);
  height: 2.4rem;
  border-radius: 10px;
  border: 1px solid #eb3941;
  background: #fff0f0;
  color: #eb3941;
  font-size: 0.9rem;
  margin-top: 0.8rem;
  margin-left: 0.2rem;
  transition: all 0.2s ease-in-out;
}

.CancellationBtn:hover {
  background: #eb3941;
  color: #e0e0e0;
}
</style>

