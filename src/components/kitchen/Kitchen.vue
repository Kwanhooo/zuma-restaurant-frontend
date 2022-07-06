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
        <div class="nowCooking" style="font-size: 30px; font-weight: bolder;" v-if="nowCook">{{ nowCook.foodType }}
        </div>
        <div class="nowCooking" style="font-size: 30px; font-weight: bolder;"
             v-if="nowCook.foodType == null && nextCook.foodType != null">休息中
        </div>
        <div class="nowCooking" style="font-size: 30px; font-weight: bolder;"
             v-if="nowCook.foodType == null && nextCook.foodType == null">暂无菜品需要烹饪噢
        </div>
        <button class="finishButton" @click.prevent="finishCook()" v-if="nowCook.foodType != null">完成烹饪</button>
        <button class="finishButton" @click.prevent="continueCook()"
                v-if="nowCook.foodType == null && nextCook.foodType != null">继续工作
        </button>
      </div>
    </div>

    <div id="nextCook">
      <br/>
      <div class="nextTitle">🍱 下一个菜品</div>
      <hr style="width:80%">
      <div style="background: white;border-radius: 30px;margin: 20px 20px 10px 20px;height: 60%">
        <img src="../../assets/img/logo.webp" class="dishImg">
        <br/><br/>
        <div class="nowCooking" style="font-size: 30px; font-weight: bolder;">{{ nextCook.foodType }}</div>
        <div v-if="stop" style="font-size: 30px">休息中</div>
        <div v-if="nextCook.foodType == null" style="font-size: 30px">没有了哦</div>
        <button class="pauseButton" @click.prevent="pause()" v-if="!stop">小溜一会</button>
        <button class="continueButton" @click.prevent="continueCook()" v-if="stop">继续工作</button>
      </div>
    </div>
  </div>

  <div class="queue">
    <div class="categoryTitle">🚗 烹饪队列</div>
    <hr style="width:80%">
    <ul id="waiting-ul" style="overflow:auto;max-height:600px;">
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
            <span class="waiting-foodType" style="font-size: 35px;color: #007BFF ;font-weight: bold">{{ waiting.foodType }}</span>
            <br/>
            <span class="waiting-table" style="font-size: 20px; font-weight: bold;">{{ waiting.table }}号桌</span>
          </div>
          <br>
        </div>
      </li>
    </ul>
  </div>

  <div id="right">
    <div class="inform">
      <div class="todayTitle">
        <div style="height: 20px;"></div>
        <span>💡 通知服务员上菜</span>
      </div>
      <hr style="width:90%">
      <ul id="calling-ul" style="overflow:auto;max-height:600px;">
        <li style="background: white;border-radius: 30px;margin: 5px 20px 10px 0;" v-if="finish.length===0">
          <div style="margin-left: 20px;">
            <div>
              <div style="height: 13px;"></div>
              <span class="calling-table">还没有做完的菜哦</span>
            </div>
            <div style="margin-top:20px;">
              <span style="font-size: 20px;">继续加油吧~</span>
            </div>
            <br>
          </div>
        </li>
        <li v-for="(dish,index) in finish" :key="dish" class="infinite-list-item"
            style="background: white;border-radius: 30px;margin: 5px 20px 10px 0;">
          <div style="margin-left: 20px;">
            <div>
              <div style="height: 13px;"></div>
              <span class="waiting-foodType" style="font-size: 25px; font-weight: bold">{{ dish.foodType }}</span>
              <br/>
              <br/>
              <span class="waiting-table" style="margin-left: 20px; font-size: 20px; font-weight: bold;">{{ dish.table }}号桌</span>
              <button class="callingBtm" style="margin-left: 100px" @click.prevent="inform(index)">通知上菜</button>
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

axios.defaults.withCredentials = true;

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "kitchen",
  kitchen: {},
  data() {
    return {
      stop: false,
      nowCook: {/*num: "3", foodType: "水煮鱼", table: "3", time: "2022-01-01 12:12:36"*/},
      nextCook: {/*num: "4", foodType: "上海青", table: "4", time: "2022-01-01 12:12:48"*/},
      queue: [
        {id: 1, foodType: "红烧肉", table: 1, foodInUseListId: 1},
        {id: 2, foodType: "狮子头", table: 2, foodInUseListId: 1},
        {id: 3, foodType: "水煮鱼", table: 3, foodInUseListId: 1},
        /*{num: "4", foodType: "上海青", table: "4", time: "2022-01-01 12:12:48"},
        {num: "4", foodType: "上海青", table: "4", time: "2022-01-01 12:12:48"},
        {num: "4", foodType: "上海青", table: "4", time: "2022-01-01 12:12:48"},
        {num: "4", foodType: "上海青", table: "4", time: "2022-01-01 12:12:48"},
        {num: "4", foodType: "上海青", table: "4", time: "2022-01-01 12:12:48"},*/
      ],
      finish: [
        /*{num: "1", foodType: "红烧肉", table: "1", time: "2022-01-01 12:12:12"},
        {num: "2", foodType: "狮子头", table: "2", time: "2022-01-01 12:12:24"},
        {num: "3", foodType: "水煮鱼", table: "3", time: "2022-01-01 12:12:36"},
        {num: "4", foodType: "上海青", table: "4", time: "2022-01-01 12:12:48"},*/
      ],
    }
  },
  methods: {
    pause() {
      this.stop = true;
    },

    finishCook() {
      this.finish.push(this.nowCook);
      this.nowCook.ordercheck = '0';
      axios({
        method: 'POST',
        url: '/back/modifyDinner/'+this.nowCook.id+'/'+this.nowCook.foodInUseListId,
      })
          .catch(err => {
            //打印响应数据(错误信息)
            console.log(err);
          });
      if (!this.stop) {
        if (this.nextCook.foodType != null) {
          this.nowCook = this.nextCook;
        } else {
          this.nowCook = {};
        }
        if (this.queue.length > 0) {
          this.nextCook = this.queue[0];
          this.queue.splice(0, 1);
        } else {
          this.nextCook = {};
        }
      } else {
        this.nowCook = {};
      }
      this.reload();
    },

    continueCook() {
      this.stop = false;
      if (this.nowCook.foodType == null) {
        this.nowCook = this.nextCook;
        if (this.queue.length > 0) {
          this.nextCook = this.queue[0];
          this.queue.splice(0, 1);
        }
      }
    },

    inform(index) {
      var notice = {text:"将"+this.finish[index].foodType+"送到"+this.finish[index].table+"号桌"};
      this.finish.splice(index,1);
      axios.post("/back/submitNotice",{
        notice: notice
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    }
  },
  created() {
    axios({
      method: 'GET',
      url: '/back/viewDinner'
    })
        .then((res) => {
          console.log(res);
          for(let i in res.data){
            let temp={
              id: i.id,
              table: i.table,
              foodInUseList:{
                id: i.foodInUseList.id,
                name: i.foodInUseList.name,
              }
            }
            for(let food in temp.foodInUseList){
              let temp1 = {
                id : temp.id,
                table : temp.table,
                foodInUseListId : food.id,
                foodType : food.name,
              }
              this.queue.push(temp1);
            }
          }
        })
        .catch(err => {
          //打印响应数据(错误信息)
          console.log(err);
        });
    if(this.nextCook.id == null){
      this.nextCook = this.queue[0];
      this.queue.splice(0,1);
    }

    if(this.nowCook.id == null && !this.stop){
      this.nowCook = this.nextCook;
      this.nextCook = this.queue[0];
      this.queue.splice(0,1);
    }
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
  margin-left: 3%;
  height: 90%;
  width: 28%;
  text-align: center;
  background: #ffd3e2;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
}

#right {
  float: left;
  position: relative;
  top: 3%;
  margin-left: 3%;
  height: 90%;
  width: 28%;
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
  margin-left: 17%;
  margin-top: 12%;
  width: 30%;
  height: 20%;
  border: 3px;
  border-radius: 30px;
  transition-duration: 0.4s;
  background-color: #F6F5FE;
  color: #4F3FF0;
}

.pauseButton:hover {
  background-color: #4F3FF0;
  color: #F6F5FE;
}

.continueButton {
  position: relative;
  float: left;
  text-align: center;
  margin-left: 17%;
  margin-top: 4%;
  width: 30%;
  height: 20%;
  border: 3px;
  border-radius: 30px;
  transition-duration: 0.4s;
  background-color: #F6F5FE;
  color: #4F3FF0;
}

.continueButton:hover {
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
  background-color: #007BFF;
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
  height: 100%;
  width: 100%;
  margin-top: 0%;
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

.callingBtm {
  text-align: center;
  width: 120px;
  height: 40px;
  border: 3px;
  border-radius: 30px;
  transition-duration: 0.4s;
  background-color: #F1FBFE;
  color: #1383B6;
}

.callingBtm:hover{
  background-color: #1383B6;
  color: #F1FBFE;
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