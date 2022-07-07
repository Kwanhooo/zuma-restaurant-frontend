<template>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
<div class="wrapper">
<div class="formContent">
  <div class="head">

  </div>
<div class="body">
  <el-tabs tab-position="top" style="height: 100%;" type="border-card">
    <el-tab-pane label="进行中的订单">
      <template #label>
        <span class="custom-tabs-label">
          <span>🚲进行中的订单</span>
        </span>
      </template>
      <DoingOrder></DoingOrder>
    </el-tab-pane>
    <el-tab-pane label="全部订单">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><Postcard /></el-icon>
          <span>全部订单</span>
        </span>
    </template>
      <DeliveryOrder></DeliveryOrder>
    </el-tab-pane>
    <el-tab-pane label="历史订单">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><Calendar /></el-icon>
          <span>历史订单</span>
        </span>
      </template>
      <HistoryOrder></HistoryOrder>
    </el-tab-pane>
    <el-tab-pane label="公告">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><Message /></el-icon>
          <span>公告</span>
        </span>
      </template>
      <DoingOrder></DoingOrder>
    </el-tab-pane>
    <el-tab-pane label="我的">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><User /></el-icon>
          <span>我的</span>
        </span>
      </template>
      <DoingOrder></DoingOrder>
    </el-tab-pane>
  </el-tabs>
</div>
  <div class="foot">

  </div>
</div>
</div>
</template>

<script>
import { Calendar } from '@element-plus/icons-vue'
import { Postcard } from '@element-plus/icons-vue'
import { Message } from '@element-plus/icons-vue'
import { User } from '@element-plus/icons-vue'
import DoingOrder from "@/components/rider/DoingOrder"
import DeliveryOrder from '@/components/rider/DeliveryOrder'
import HistoryOrder from '@/components/rider/HistoryOrder'

export default {
  components:{
    DoingOrder,
    DeliveryOrder,
    HistoryOrder,
    Calendar,
    Postcard,
    Message,
    User,
  },

  name: "riderMain",
  data() {
    return {
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }

}
</script>

<style scoped>
.wrapper{
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  background-color:#F1FBFE;
}

.formContent{
  margin-top:15%;
  margin-bottom:10%;
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  width: 100%;
  height:100%;

  position: relative;
  padding: 0;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;

}
.head{
  height:10%;
}
.body{
  height:100%;
}
.foot{
}
</style>