<template>
  <div id="mobile-dashboard-wrapper">
    <div id="mobile-notification-board-wrapper">
      <div id="notification-title-bar">
        <span class="NotificationTitle">🔔 通知中心</span>
        <hr style="width: 94%">
        <div id="notification-content">
          <ul id="mobile-notice-list">
            <li v-for="(notice,index) in noticeList" :key="index">
              <div class="MobileNoticeItem">
                <div class="MobileNoticeTitle">
                  <span>{{ notice.noticesource }}</span>
                  <span class="MobileNoticeTime">{{ notice.noticetime }}</span>
                </div>
                <div class="MobileNoticeText">
                  {{ notice.text }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MobileDashboard",
  data() {
    return {
      noticeList: [],
    };
  },
  methods: {
    getNoticeList() {
      axios.get('/common/viewNotice').then(res => {
        this.noticeList = res.data.data;
        this.noticeList.forEach(notice => {
          notice.noticetime = notice.noticetime.split("T")[0] +
              " " + notice.noticetime.split("T")[1].split(".000")[0];
        });
      });
    },
  },
  created() {
    this.getNoticeList();
  },
}
</script>

<style scoped>
#mobile-dashboard-wrapper {
  /*background: #5fbae9;*/

  margin: 10px 0 0 0;
  height: calc(100% - 22px);
}

#mobile-notification-board-wrapper {
  background: rgba(229, 235, 248, 0.94);

  height: 100%;
  border-radius: 20px 20px 20px 20px;
}

#notification-title-bar {
  padding-top: 0.5rem;
}

.NotificationTitle {
  font-size: 1.4rem;
  font-weight: bold;
  color: #3c3c3c;

  margin-left: 3%;
}

#notification-content {
  /*background: black;*/
  height: calc(100vh - 280px);
  overflow-x: hidden;
  overflow-y: scroll;
}

#mobile-notice-list {
  padding: 0 0.6rem;
}

.MobileNoticeItem {
  background: white;
  border-radius: 20px;
  height: auto;
  padding: 1px 1px 0.6rem 1px;
}

.MobileNoticeTitle {
  font-size: 1.3rem;
  font-weight: bold;
  margin-left: 0.7rem;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
}

.MobileNoticeTime {
  float: right;

  margin-top: 0.5rem;
  margin-right: 0.8rem;
  font-size: 0.9rem;
  font-weight: lighter;
  font-style: italic;
}

.MobileNoticeText {
  padding: 0 0.7rem;
  font-size: 1.1rem;
}
</style>