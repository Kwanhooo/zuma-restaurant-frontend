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
        <div class="nowCooking" style="font-size: 30px; font-weight: bolder;" v-if="nowCook && nowCook.foodInUseListId != -1">
          {{ nowCook.foodType }}
        </div>
        <div class="nowCooking" style="font-size: 30px; color: #007BFF; text-decoration:underline; font-weight: bolder;"
             v-if="nowCook && nowCook.foodInUseListId == -1" @click="showDetail = true">外卖订单{{ nowCook.id }}号
        </div>
        <el-dialog title="订单菜品" v-model="showDetail" width="35%" style="font-size: 30px; font-weight: bold">
          {{ nowCook.foodType }}
        </el-dialog>
        <div class="nowCooking" style="font-size: 30px; font-weight: bolder;"
             v-if="nowCook && nextCook.foodType == null">休息中
        </div>
        <div class="nowCooking" style="font-size: 30px; font-weight: bolder;"
             v-if="nowCook && nextCook.foodType == null">暂无菜品需要烹饪噢
        </div>
        <button class="finishButton" @click.prevent="finishCook()" v-if="nowCook && nowCook.foodType != null">完成烹饪</button>
        <button class="finishButton" @click.prevent="continueCook()"
                v-if="nowCook == null && nextCook && nextCook.foodType != null">继续工作
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
        <div class="nowCooking" style="font-size: 30px; font-weight: bolder;" v-if="nextCook && nextCook.foodInUseListId != -1">
          {{ nextCook.foodType }}
        </div>
        <div class="nowCooking" style="font-size: 30px; color: #007BFF; text-decoration:underline; font-weight: bolder;"
             v-if="nextCook && nextCook.foodInUseListId == -1">外卖订单{{ nextCook.id }}号
        </div>
        <div v-if="stop" style="font-size: 30px">休息中</div>
        <div v-if="!nextCook" style="font-size: 30px">没有了哦</div>
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
            <span class="waiting-foodType" style="font-size: 35px;color: #007BFF ;font-weight: bold"
                  v-if="waiting && waiting.foodInUseListId != -1">{{ waiting.foodType }}</span>
            <span class="waiting-foodType" style="font-size: 35px;color: #007BFF ;font-weight: bold"
                  v-if="waiting && waiting.foodInUseListId == -1">外卖订单{{ waiting.id }}号</span>
            <br/>
            <span class="waiting-table" style="font-size: 20px; font-weight: bold;"
                  v-if="waiting && waiting.foodInUseListId != -1">{{ waiting.table }}号桌</span>
            <span class="waiting-table" style="font-size: 20px; font-weight: bold;"
                  v-if="waiting && waiting.foodInUseListId == -1">用户：{{ waiting.table }}</span>
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
              <span class="waiting-foodType" style="font-size: 25px; font-weight: bold"
                    v-if="dish && dish.foodInUseListId != -1">{{ dish.foodType }}</span>
              <span class="waiting-foodType" style="font-size: 25px; font-weight: bold"
                    v-if="dish && dish.foodInUseListId == -1">外卖订单{{ dish.id }}号</span>
              <br/>
              <br/>
              <span class="waiting-table" style="margin-left: 20px; font-size: 20px; font-weight: bold;"
                    v-if="dish && dish.foodInUseListId != -1">{{ dish.table }}号桌</span>
              <span class="waiting-table" style="margin-left: 20px; font-size: 20px; font-weight: bold;"
                    v-if="dish && dish.foodInUseListId == -1">用户：{{ dish.table }}</span>
              <button class="callingBtm" style="margin-left: 100px" @click.prevent="inform(index)"
                      v-if="dish && dish.foodInUseListId != -1">通知上菜
              </button>
              <button class="callingBtm" style="margin-left: 50px" @click.prevent="inform(index)"
                      v-if="dish && dish.foodInUseListId == -1">通知上菜
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

import * as dateUtils from "../../util/date";

axios.defaults.withCredentials = true;

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "kitchen",
  kitchen: {},
  data() {
    return {
      num : 0,
      stop: false,
      showDetail: false,
      nowCook: {},
      nextCook: {},
      queue: [
        {id: 1, foodType: "红烧肉", table: "1", foodInUseListId: 1},
        {id: 2, foodType: "狮子头", table: "2", foodInUseListId: 1},
      ],
      finish: [],
    }
  },
  methods: {
    pause() {
      this.stop = true;
    },

    finishCook() {
      this.finish.push(this.nowCook);
      if (this.nowCook.foodInUseListId != -1) {
        axios({
          method: 'PUT',
          url: '/back/modifyDinner/' + this.nowCook.id + '/' + this.nowCook.foodInUseListId,
        })
            .catch(err => {
              //打印响应数据(错误信息)
              console.log(err);
            });
      } else {
        axios({
          method: 'PUT',
          url: '/back/modifyOrderOut/' + this.nowCook.id,
        })
            .catch(err => {
              //打印响应数据(错误信息)
              console.log(err);
            });
      }
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
      var date = new Date();
      var notice = {};
      if (this.finish[index].foodInUseListId != -1) {
        notice = {
          noticeid: 1,
          noticesource: "back",
          noticereceiver: "serve",
          noticetime: null,
          text: this.finish[index].foodType + "," + this.finish[index].table,
          ifchecked: "false"
        };
      } else {
        notice = {
          noticeid: 1,
          noticesource: "back",
          noticereceiver: "rider",
          noticetime: dateUtils.formatDate(date, 'yyyy-MM-dd hh:mm:ss'),
          text: this.finish[index].id + "," + this.finish[index].table,
          ifchecked: "false"
        };
      }
      this.finish.splice(index, 1);
      axios({
        method: 'POST',
        url: '/back/submitNotice',
        data: notice
      })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            //打印响应数据(错误信息)
            console.log(err);
          });
    },

    getNewQueue() {
      console.log("第" + this.num++ + "次刷新烹饪队列");

      this.nowCook = {},
      this.nextCook = {},
      this.queue = [
        {id: 1, foodType: "红烧肉", table: "1", foodInUseListId: 1},
        {id: 2, foodType: "狮子头", table: "2", foodInUseListId: 1},
      ],

      axios({
        method: 'GET',
        url: '/back/viewDinner'
      })
          .then((res) => {
            console.log(res.data)
            if (res.data.status != 1) {
              for (let i in res.data.data) {
                let temp = {
                  id: res.data.data[i].id,
                  table: res.data.data[i].table,
                  foodInUseList: {
                    id: res.data.data[i].foodInUseList.id,
                    name: res.data.data[i].foodInUseList.name,
                  }
                }
                for (let food in temp.foodInUseList) {
                  let temp1 = {
                    id: temp.id,
                    table: temp.table.toString(),
                    foodInUseListId: temp.foodInUseList[food].id,
                    foodType: temp.foodInUseList[food].name,
                  }
                  this.queue.push(temp1);
                }
              }
            }
          })
          .catch(err => {
            //打印响应数据(错误信息)
            console.log(err);
          });

      //获取外卖队列
      axios({
        method: 'GET',
        url: '/back/viewOrderOut'
      })
          .then((res) => {
            if (res.data.status != 1) {
              console.log(res.data)
              for (let i in res.data.data) {
                let temp1 = {
                  id: res.data.data[i].orderId,
                  table: res.data.data[i].userId,
                  foodInUseListId: -1,
                  foodType: res.data.data[i].allFood,
                }
                this.queue.push(temp1);
              }
            }
          })
          .catch(err => {
            //打印响应数据(错误信息)
            console.log(err);
          });

      if (this.nextCook == null) {
        this.nextCook = this.queue[0];
        this.queue.splice(0, 1);
      }

      if (this.nowCook == null && !this.stop) {
        this.nowCook = this.nextCook;
        this.nextCook = this.queue[0];
        this.queue.splice(0, 1);
      }
    }
  },
  created() {
    this.timer = window.setInterval(() => {
      setTimeout(() => {
        this.getNewQueue()
      },0)
    },5000)

    //获取堂食队列
    axios({
      method: 'GET',
      url: '/back/viewDinner'
    })
        .then((res) => {
          console.log(res.data)
          if (res.data.status != 1) {
            for (let i in res.data.data) {
              let temp = {
                id: res.data.data[i].id,
                table: res.data.data[i].table,
                foodInUseList: {
                  id: res.data.data[i].foodInUseList.id,
                  name: res.data.data[i].foodInUseList.name,
                }
              }
              for (let food in temp.foodInUseList) {
                let temp1 = {
                  id: temp.id,
                  table: temp.table.toString(),
                  foodInUseListId: temp.foodInUseList[food].id,
                  foodType: temp.foodInUseList[food].name,
                }
                this.queue.push(temp1);
              }
            }
          }
        })
        .catch(err => {
          //打印响应数据(错误信息)
          console.log(err);
        });

    //获取外卖队列
    axios({
      method: 'GET',
      url: '/back/viewOrderOut'
    })
        .then((res) => {
          if (res.data.status != 1) {
            for (let i in res.data.data) {
              let temp1 = {
                id: res.data.data[i].orderId,
                table: res.data.data[i].userId,
                foodInUseListId: -1,
                foodType: res.data.data[i].allFood,
              }
              this.queue.push(temp1);
            }
          }
        })
        .catch(err => {
          //打印响应数据(错误信息)
          console.log(err);
        });

    if (this.nextCook.id == null) {
      this.nextCook = this.queue[0];
      this.queue.splice(0, 1);
    }

    if (this.nowCook.id == null && !this.stop) {
      this.nowCook = this.nextCook;
      this.nextCook = this.queue[0];
      this.queue.splice(0, 1);
    }
  },

  unmounted() {
    console.log("销毁")
    window.clearInterval(this.timer)
  }
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

.callingBtm:hover {
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