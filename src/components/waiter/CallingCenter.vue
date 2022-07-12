<template>
  <div class="callingCenter fadeIn">
    <div class="callingCenterTitle">
      <span style="margin-left: 20px;">📞 服务呼叫</span>
      <hr style="margin-left: 20px;width: 90%">
    </div>
    <div>
      <ul id="calling-ul" class="infinite-list" v-infinite-scroll="load" :infinite-scroll-immediate="false"
          style="overflow:auto;max-height:680px;">
        <li style="background: white;border-radius: 30px;margin: 5px 20px 10px 0;" v-if="isShowNoCall()">
          <div style="margin-left: 20px;">
            <div>
              <div style="height: 13px;"></div>
              <span class="calling-table">暂无呼叫</span>
            </div>
            <div style="margin-top:20px;">
              <span style="font-size: 20px;">休息一下吧~</span>
            </div>
            <br>
          </div>
        </li>
        <li v-for="(time,table) in callings" :key="table" class="infinite-list-item"
            style="background: white;border-radius: 30px;margin: 5px 20px 10px 0;">
          <div style="margin-left: 20px;">
            <div>
              <div style="height: 13px;"></div>
              <span class="calling-table">{{ table }} <span style="font-size: 20px"> 号桌</span></span>
              <span class="calling-time">{{ time }}</span>
            </div>
            <div style="margin-top:10px;">
              <button class="okBtn" @click="handleBtn(table)">现在去</button>
            </div>
            <br><br><br>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CallingCenter",
  data() {
    return {
      callings: {},
    };
  },
  methods: {
    // 从后台获取公告数据
    getCallings() {
      axios.get("/serve/getCallings").then(res => {
        this.callings = res.data.data;
      });
    },
    load() {
      console.log(123);
      this.callings.push({});
    },
    handleBtn(table) {
      //TODO: 发送确认消息到后台
      axios.get("/serve/discardCalling?tableID=" + table).then(() => {
      }).then(() => {
        this.$message({
          message: "已确认，请立即前往"+table+"号桌",
          type: "success"
        });
      });
      // this.callings.splice(this.callings.indexOf(table), 1);
      Reflect.deleteProperty(this.callings, table);
    },
    isShowNoCall() {
      let count = 0;
      // eslint-disable-next-line no-unused-vars
      for (let p in this.callings) {
        count++;
      }
      if (count === 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    setInterval(this.getCallings, 5000);
  },
}
</script>

<style scoped>
#calling-ul::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #F5F5F5;
  border-radius: 10px;
}

#calling-ul::-webkit-scrollbar {
  width: 10px;
  background-color: #F5F5F5;
}

#calling-ul::-webkit-scrollbar-thumb {
  background-color: #F90;
  border-radius: 10px;
  background-image: -webkit-linear-gradient(45deg,
  rgba(255, 255, 255, .2) 25%,
  transparent 25%,
  transparent 50%,
  rgba(255, 255, 255, .2) 50%,
  rgba(255, 255, 255, .2) 75%,
  transparent 75%,
  transparent);
}


.callingCenter {
  margin: 20px 10px 20px 20px;
  /*width: 100%;*/
  height: 95%;
  /*text-align: center;*/
  background: #fee4cb;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
}

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

.callingCenterTitle {
  padding-top: 10px;
  margin: 0;
  font-size: 35px;
  font-weight: bold;
}

.calling-table {
  font-size: 30px;
  font-weight: bold;
}

.calling-time {
  float: right;
  text-align: right;
  margin: 20px 30px 0 10px;
  font-size: 13px;
  font-style: italic;
}

.notice-content {
  font-size: 20px;
}


.okBtn {
  float: right;
  margin: 15px 20px 10px 0;
  border: 3px;
  border-radius: 30px;
  width: 100px;
  height: 40px;
  font-size: 13px;

  transition-duration: 0.4s;
  background-color: #FFF4EA;
  color: #FF9465;
}

.okBtn:hover {
  background-color: #FF9465;
  color: #FFF4EA;
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