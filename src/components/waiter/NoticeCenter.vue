<template>
  <div class="noticeCenter fadeIn">
    <div class="noticeCenterTitle">
      <span style="margin-left: 20px;">🔔 通知中心</span>
      <hr style="margin-left: 20px;width: 90%">
    </div>
    <div>
      <ul id="notice-list" class="infinite-list" v-infinite-scroll="load" :infinite-scroll-immediate="false"
          style="overflow:auto;max-height:680px;">
        <li style="background: white;border-radius: 30px;margin: 5px 20px 10px 0;" v-if="notices.length===0">
          <div style="margin-left: 20px;">
            <div>
              <div style="height: 13px;"></div>
              <span class="calling-table" style="font-size: 30px;">暂无通知</span>
            </div>
            <div style="margin-top:20px;">
              <span style="font-size: 20px;">休息一下吧~</span>
            </div>
            <br>
          </div>
        </li>
        <li v-for="notice in notices" :key="notice" class="infinite-list-item"
            style="background: white;border-radius: 30px;margin: 5px 20px 10px 0;">
          <div style="margin-left: 10px;">
            <div>
              <div style="height: 13px;"></div>
              <span class="calling-table">{{ notice.noticesource === 'kitchen' ? '送菜' : '公告' }}</span>
              <span class="calling-time">
            {{ notice.noticetime }}
            <div class="notice-source">
               From => {{ notice.noticesource }}
            </div>
          </span>
            </div>
            <div style="margin-top:10px;">
          <span class="notice-content" v-if="notice.noticesource === 'kitchen'">
            📦 送：{{ notice.foodName }} × {{ 1 }} <br>
            🐾 到：{{ notice.toTable }}
          </span>
              <span class="notice-content" v-if="notice.noticesource !== 'kitchen'">
           {{ notice.text }} <br>
          </span>
              <button class="confirmBtn" @click="handleBtn(notice)" v-if="notice.noticesource === 'kitchen'">确认
              </button>
            </div>
            <br>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NoticeBoard",
  data() {
    return {
      notices: [
        // {type: '送餐', source: '后厨', toTable: '1号', foodName: '狮子头', quantity: '1', time: '2022-01-01 12:12:12'},
      ],
    };
  },
  methods: {
    // 从后台获取公告数据
    getNoticeData() {
      axios.get('/serve/viewNoticeForServe').then(res => {
        this.notices = res.data.data;
        this.notices.forEach(notice => {
          notice.noticetime = notice.noticetime.split('T')[0];
          notice.foodName = notice.text.split(',')[0];
          notice.toTable = notice.text.split(',')[1];
        });
      });
      axios.get('/serve/viewNoticeAll').then(res => {
        res.data.data.forEach(notice => {
          notice.noticetime = notice.noticetime.split('T')[0];
          notice.foodName = notice.text.split(',')[0];
          notice.toTable = notice.text.split(',')[1];
          this.notices.push(notice);
        });
      });
    },
    load() {
      this.notices.push({
        type: '送餐',
        source: '后厨',
        toTable: '12',
        foodName: '狮子头',
        quantity: '1',
        time: '2022-01-01 12:12:12'
      });
    },
    handleBtn(notice) {
      axios({
        method: 'GET',
        url: '/serve/noticeReadReceipt?noticeid=' + notice.noticeid,
      }).then(()=>{
        this.$message({
          message: '已确认收到',
          type: 'success'
        });
      });
      this.notices.splice(this.notices.indexOf(notice), 1);
    },
  },
  // 当这个组件被加载的时候，就会被调用
  mounted() {
    this.getNoticeData();
    // TODO:每隔十秒钟执行一次getNoticeData函数，获取公告数据
    setInterval(this.getNoticeData, 5000);
  },
}
</script>

<style scoped>
ul {
  margin: 0;
  padding-left: 20px;
  list-style-type: none;
}

hr {
  margin-left: 0;
  padding-left: 0;
  width: 95%;
}

.noticeCenter {
  margin: 20px 20px 20px 10px;
  /*width: 100%;*/
  height: 95%;
  /*text-align: center;*/
  background: #e9e7fd;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
}

.noticeCenterTitle {
  padding-top: 10px;
  margin: 0;
  font-size: 35px;
  font-weight: bold;
}

.calling-table {
  font-size: 25px;
  font-weight: bold;
}

.calling-time {
  float: right;
  text-align: right;
  margin: 5px 30px 0 10px;
  font-size: 13px;
  font-style: italic;
}

.notice-content {
  font-size: 20px;
}


.confirmBtn {
  float: right;
  margin: 0 20px 10px 0;
  border: 3px;
  border-radius: 30px;
  width: 100px;
  height: 40px;
  font-size: 13px;

  transition-duration: 0.4s;
  background-color: #F6F5FE;
  color: #4F3FF0;
}

.confirmBtn:hover {
  background-color: #4F3FF0;
  color: #F6F5FE;
}

#notice-list::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #F5F5F5;
  border-radius: 10px;
}

#notice-list::-webkit-scrollbar {
  width: 10px;
  background-color: #F5F5F5;
}

#notice-list::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-image: -webkit-gradient(linear,
  left bottom,
  left top,
  color-stop(0.44, rgb(122, 153, 217)),
  color-stop(0.72, rgb(73, 125, 189)),
  color-stop(0.86, rgb(28, 58, 148)));
}

@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 0.5s;
  -moz-animation-duration: 0.5s;
  animation-duration: 0.5s;
}
</style>