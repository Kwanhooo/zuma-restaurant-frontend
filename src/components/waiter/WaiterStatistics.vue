<template>
  <div class="fadeIn fourth">
    <h1 style="margin-left: 20px;margin-top: 30px;">🪢统计总览</h1>
    <hr style="width: 90%">
    <div style="margin-left: 25px;font-size: 22px;font-style: italic;font-weight: bold">🎞️概览</div>
    <div class="statistics-row">
      <div class="statistics-left">
        <p style="font-style: italic;color: grey">目前用餐桌数</p>
        <h1>{{ usingTableCount }}</h1>
      </div>
      <div class="statistics-right">
        <p style="font-style: italic;color: grey">在售菜点种类</p>
        <h1>{{ sellingDishCount }}</h1>
      </div>
    </div>
    <hr style="width: 90%">
    <div style="margin-left: 25px;font-size: 22px;font-style: italic;font-weight: bold">✨负载</div>
    <div class="statistics-row">
      <div class="statistics-left">
        <p style="font-style: italic;color: grey">服务员在岗数</p>
        <h1>{{ workingWaiterCount }}</h1>
      </div>
      <div class="statistics-right">
        <p style="font-style: italic;color: grey">厨师在岗数</p>
        <h1>{{ workingChiefCount }}</h1>
      </div>
    </div>
    <div class="statistics-row">
      <div class="statistics-left">
        <p style="font-style: italic;color: grey">当前等待菜品数</p>
        <h1>{{ dishInQueueCount }}</h1>
      </div>
      <div class="statistics-right">
        <p style="font-style: italic;color: grey">餐厅负载指数</p>
        <h1>{{ loadIndex + '%' }}</h1>
      </div>
    </div>

    <hr style="width: 90%">
    <div style="margin-left: 25px;font-size: 22px;font-style: italic;font-weight: bold">🎢营业</div>
    <div class="statistics-row">
      <div class="statistics-left">
        <p style="font-style: italic;color: grey">今日营收</p>
        <h1>{{ revenueTodayCount }}</h1>
      </div>
      <div class="statistics-right">
        <p style="font-style: italic;color: grey">今日翻台数</p>
        <h1>{{ turnsTodayCount }}</h1>
      </div>
    </div>
    <hr style="width: 90%">
    <p style="font-style: italic;color: grey;float: right;margin-right: 30px;">*上一次统计时间：{{ lastUpdateTime }}</p>
    <button class="updateBtn" @click="updateNow()">立即更新</button>
  </div>
</template>

<script>
// import axios from "axios";

import axios from "axios";

export default {
  name: "WaiterStatistics",
  methods: {
    updateNow() {
      this.lastUpdateTime = new Date().toLocaleString();
      // 向后端发送请求，更新数据
      //TODO:接口还没写好，暂时不能更新数据
      axios({
        method: "get",
        url: "/common/viewRestaurant",
      }).then((res) => {
        this.usingTableCount = res.data.data.freeTable.length;
        this.sellingDishCount = res.data.data.numberOfFood;
        this.workingWaiterCount = res.data.data.serveNumber;
        this.workingChiefCount = res.data.data.backNumber;
        this.dishInQueueCount = res.data.data.foodInListNumber;
        this.loadIndex = res.data.data.overload;
        this.revenueTodayCount = res.data.data.todayRevenue;
        this.turnsTodayCount = res.data.data.todayDinnerNumber;
      });
    }
  },
  data() {
    return {
      usingTableCount: 23,
      sellingDishCount: 89,
      workingWaiterCount: 12,
      workingChiefCount: 3,
      dishInQueueCount: 17,
      loadIndex: 58,
      revenueTodayCount: 4154.26,
      turnsTodayCount: 38,
      lastUpdateTime: new Date().toLocaleString(),
    }
  },
  created() {
    this.updateNow();
  }
}
</script>

<style scoped>
.updateBtn {
  float: right;
  margin: 0 20px 10px 0;
  border: 3px;
  border-radius: 30px;
  width: 100px;
  height: 40px;
  font-size: 13px;

  transition-duration: 0.4s;
  background-color: #E9FCF1;
  color: #34C471;
}

.updateBtn:hover {
  background-color: #34C471;
  color: #E9FCF1;
}

.statistics-row {
  display: flex;
  flex-direction: row;
}

.statistics-left {
  margin-left: 30px;
  flex: 1;
}

.statistics-right {
  margin-left: 30px;
  flex: 1;
}

</style>