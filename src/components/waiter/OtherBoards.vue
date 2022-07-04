<template>
  <div id="otherWrapper">
    <div class="today">
      <div class="todayTitle">
        <div style="height: 20px;"></div>
        <span>📅 今日</span>
      </div>
      <div class="description" style="margin-top: 10px;">微笑服务</div>
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


    <div class="workIntro">
      <div class="introTitle">
        <div style="height: 20px;"></div>
        <span>💻 工作流</span>
      </div>

      <div class="description" style="margin-top: 10px;">工作流程电子化</div>
      <hr style="width:90%">
      <div class="workDisplay" style="background: white;border-radius: 30px;margin: 20px 20px 10px 20px;height: 28%">
        <div style="margin-left: 10px;">
          <div>
            <div style="height: 13px;"></div>
            <span class="calling-table">
              点餐<button class="confirmBtn" @click="handleBtn('/order')">去使用</button>
            </span>
          </div>
          <div style="margin-top:10px;">
            <div style="height: 10px"></div>
            <span class="notice-content">⏰ 为顾客点餐，并递送订单至后厨</span><br>
          </div>
          <br>
        </div>
      </div>
      <div class="workDisplay" style="background: white;border-radius: 30px;margin: 20px 20px 10px 20px;height: 28%">
        <div style="margin-left: 10px;">
          <div>
            <div style="height: 13px;"></div>
            <span class="calling-table">
              信息更新<button class="confirmBtn" @click="handleBtn('/me')">去使用</button>
            </span>
          </div>
          <div style="margin-top:10px;">
            <div style="height: 10px"></div>
            <span class="notice-content">📕 更新自己的职工信息，并报送给后台</span><br>
          </div>
          <br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OtherBoards",
  data() {
    return {
      day: "",
      date: "",
      time: ""
    }
  },
  methods: {
    handleBtn(work) {
      this.$router.push(work);
    }
  },
  created() {
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
#otherWrapper {
  height: 100%;
}

.today {
  top: 0;
  height: 49%;
  margin: 20px 0 0 20px;
  text-align: center;
  background: #ffd3e2;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
}

.workIntro {
  height: 48%;
  bottom: 0;
  margin: 20px 0 20px 20px;

  background: #dbf6fd;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
}

.todayTitle {
  margin-top: 20px;
  /*margin-left: 20px;*/
  /*color: #007BFF;*/
  font-size: 40px;
  font-weight: bold;
}

.introTitle {
  text-align: center;
  margin-top: 20px;
  /*margin-left: 20px;*/
  /*color: #007BFF;*/
  font-size: 40px;
  font-weight: bold;
}

.description {
  text-align: center;
}

.calling-table {
  font-size: 25px;
  font-weight: bold;
}

.notice-content {
  font-size: 18px;
}

.confirmBtn {
  float: right;
  margin: 0 10px 10px 0;
  border: 3px;
  border-radius: 30px;
  width: 100px;
  height: 40px;
  font-size: 13px;

  transition-duration: 0.4s;
  background-color: #F1FBFE;
  color: #1383B6;
}

.confirmBtn:hover {
  background-color: #1383B6;
  color: #F1FBFE;
}
</style>