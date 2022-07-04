<template>
<!--  <div id="wrapper">
    <div id="topBar">
      <div id="topBar-left">
        <img id="topBar-logo" style="height: 90px;width: 90px;" src="../../assets/img/logo.webp" alt="logo"/>
        <span id="topBar-restaurant-name">Zuma Restaurant</span>
      </div>
      <div id="topBar-right">
      </div>
    </div>
    <div id="content">-->
<!--      <div id="navigator">
        <div class="navigator-item">
          <button class="navigator-btn navigator-btn-home" @click.prevent="nowContent='cook'">
            烹饪
          </button>
        </div>
        <div class="navigator-item">
          <button class="navigator-btn navigator-btn-home" @click.prevent="nowContent='notice'">
            公告
          </button>
        </div>
        <div class="navigator-item">
          <button class="navigator-btn navigator-btn-home" @click.prevent="nowContent='user'">
            账号
          </button>
        </div>
      </div>-->
  <div id="left">
    <div id="nowCook">
      <div class="categoryTitle">🍳 当前正在烹饪</div>
      <hr style="width:80%">
      <div style="background: white;border-radius: 30px;margin: 20px 20px 10px 20px;height: 60%">
        <img src="../../assets/img/logo.webp" class="dishImg">
        <br/><br/>
        <div class="nowCooking" style="font-size: 30px; font-weight: bolder;">111</div>
        <button class="finishButton" @click.prevent="" >完成烹饪</button>
      </div>
    </div>

    <div id="nextCook">
      <br/>
      <div class="nextTitle">🍱 下一个菜品</div>
      <hr style="width:80%">
      <div style="background: white;border-radius: 30px;margin: 20px 20px 10px 20px;height: 60%">
        <img src="../../assets/img/logo.webp" class="dishImg">
        <br/><br/>
        <div class="nowCooking" style="font-size: 30px; font-weight: bolder;">111</div>
        <button class="pauseButton" @click.prevent="">休息一下</button>
      </div>
    </div>
  </div>

  <div class="queue">
    <div class="categoryTitle">🚗 烹饪队列</div>
    <hr style="width:80%">
    <ul id="waiting-ul" style="overflow:auto;max-height:680px;">
      <li style="background: white;border-radius: 30px;margin: 5px 20px 10px 0;" v-if="queue.length===0">
        <div style="margin-left: 20px;">
          <div>
            <div style="height: 13px;"></div>
            <span class="calling-table">烹饪队列为空</span>
          </div>
          <div style="margin-top:20px;">
            <span style="font-size: 20px;">休息一下吧~</span>
          </div>
          <br>
        </div>
      </li>
      <li v-for="waiting in queue" :key="waiting" class="infinite-list-item"
          style="background: white;border-radius: 30px;margin: 5px 20px 10px 0;">
        <div style="margin-left: 20px;">
          <div>
            <div style="height: 13px;"></div>
            <span class="waiting-foodType" style="font-size: 25px; font-weight: bold">{{ waiting.foodType }}</span>
            <br/>
            <br/>
            <span class="waiting-table" style="margin-left: 20px; font-size: 20px; font-weight: bold;">{{ waiting.table }}号桌</span>
            <span class="waiting-time" style="margin-left: 20px;">{{ waiting.time }}</span>
          </div>
          <br>
        </div>
      </li>
    </ul>
  </div>

  <div id="right">
      <div class="today">
        <div class="todayTitle">
          <div style="height: 20px;"></div>
          <span>📅 今日</span>
        </div>
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

    <div class="inform">
      <div class="todayTitle">
        <div style="height: 20px;"></div>
        <span>💡 通知服务员上菜</span>
      </div>
      <hr style="width:90%">
      <div id="inform" style="background: white;border-radius: 30px;margin: 20px 20px 10px 20px;height: 60%">
        <br>
        <div id="waitingDish" style="margin-top: 30px;font-weight: bold">
          <span style="font-size: 35px;">待取菜品数: {{ waitingDish }}</span>
        </div>
        <br><br>
        <button class="informButton" @click.prevent="">通知上菜</button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "kitchen",
  kitchen: {},
  data() {
    return{
      queue: [
        {num: "1", foodType: "红烧肉", table: "1", time: "2022-01-01 12:12:12"},
        {num: "2", foodType: "狮子头", table: "2", time: "2022-01-01 12:12:24"},
        {num: "3", foodType: "水煮鱼", table: "3", time: "2022-01-01 12:12:36"},
        {num: "4", foodType: "上海青", table: "4", time: "2022-01-01 12:12:48"},
        {num: "4", foodType: "上海青", table: "4", time: "2022-01-01 12:12:48"},
        {num: "4", foodType: "上海青", table: "4", time: "2022-01-01 12:12:48"},
        {num: "4", foodType: "上海青", table: "4", time: "2022-01-01 12:12:48"},
        {num: "4", foodType: "上海青", table: "4", time: "2022-01-01 12:12:48"},
      ],
      day: "",
      date: "",
      time: "",
      waitingDish: 0,
    }
  },
  methods: {},
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

<style>
body {
  background-color: #f3f6fd;
}

#navigator {
  order: 1;
  width: 5%;
  background: #ffffff;
  border-radius: 20px;
}

.navigator-item {
  position: relative;
  margin-top: 40%;
  margin-left: 5%;
}

.navigator-btn {
  text-align: center;
  transition-duration: 0.4s;
  width: 60px;
  height: 60px;
  border: 3px;
  border-radius: 30px;
}

.navigator-btn-home:hover {
  background-color: #FFD400;
}

#module-wrapper {
  order: 2;
  margin-left: 17px;
  margin-right: 17px;
  height: 100%;
  width: 55%;
  flex: auto;
  background: #ffffff;
  border-radius: 30px;
}

#left {
  float: left;
  position: relative;
  top: 3%;
  margin-left: 4%;
  height: 90%;
  width: 30%;
}

.queue {
  float: left;
  position: relative;
  top: 5%;
  margin-left: 4%;
  height: 90%;
  width: 25%;
  text-align: center;
  background: #ffd3e2;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
}

#right {
  float: left;
  position: relative;
  top: 3%;
  margin-left: 4%;
  height: 90%;
  width: 30%;
}

#nowCook {
  float: top;
  position: relative;
  height: 46%;
  width: 100%;
  text-align: center;
  background: #fee4cb;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
}

.dishImg {
  float: left;
  position: relative;
  left: 5%;
  top: 10%;
  height: 175px;
  width: 175px;
}

.finishButton {
  position: relative;
  float: left;
  text-align: center;
  left: 15%;
  top: 30%;
  width: 30%;
  height: 20%;
  border: 3px;
  border-radius: 30px;
  transition-duration: 0.4s;
  background-color: #FFF4EA;
  color: #FF9465;
}
.finishButton:hover {
  background-color: #FF9465;
  color: #FFF4EA;
}

.pauseButton {
  position: relative;
  float: left;
  text-align: center;
  left: 15%;
  top: 30%;
  width: 30%;
  height: 20%;
  border: 3px;
  border-radius: 30px;
  transition-duration: 0.4s;
  background-color: #F6F5FE;
  color: #4F3FF0;
}

.pauseButton:hover{
  background-color: #4F3FF0;
  color: #F6F5FE;
}

#nextCook {
  float: top;
  position: relative;
  height: 46%;
  width: 100%;
  margin-top: 10%;
  text-align: center;
  background: #e9e7fd;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
}

.nextTitle {
  margin-top: 20px;
  /*margin-left: 20px;*/
  font-size: 40px;
  font-weight: bold;
}

.categoryTitle {
  margin-top: 20px;
  /*margin-left: 20px;*/
  font-size: 40px;
  font-weight: bold;
}

ul {
  margin: 0;
  padding-left: 20px;
  list-style-type: none;
}

#waiting-ul::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #F5F5F5;
  border-radius: 10px;
}

#waiting-ul::-webkit-scrollbar {
  width: 10px;
  background-color: #F5F5F5;
}

#waiting-ul::-webkit-scrollbar-thumb {
  background-color: #e83e8c;
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

.today {
  float: top;
  position: relative;
  height: 46%;
  width: 100%;
  text-align: center;
  background: #c8f7dc;
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

.inform {
  float: top;
  position: relative;
  height: 46%;
  width: 100%;
  margin-top: 10%;
  text-align: center;
  background: #dbf6fd;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
}

.informButton {
  text-align: center;
  left: 15%;
  top: 30%;
  width: 30%;
  height: 20%;
  border: 3px;
  border-radius: 30px;
  transition-duration: 0.4s;
  background-color: #F1FBFE;
  color: #1383B6;
}

.informButton:hover {
  background-color: #1383B6;
  color: #F1FBFE;
}

.description {
  text-align: center;
}

.calling-table {
  font-size: 25px;
  font-weight: bold;
}

#otherWrapper {
  position: relative;
  float: right;
  right: 5%;
  top: 50px;
  height: auto;
  width: auto;
}

</style>