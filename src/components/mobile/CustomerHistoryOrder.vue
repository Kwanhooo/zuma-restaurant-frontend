<template>
  <button class="orderTypeBtm" @click.prevent="checkOrderIn()">堂食订单</button>
  <button class="orderTypeBtm" @click.prevent="checkOrderOut()">外卖订单</button>
  <br>
  <div class="customer-history-order-wrapper" v-if="orderType">
      <div id="historyOrderIn-ul" v-for="(data,index) in orderInList" :key="data">
          <div class="historyOrderWrapper" @click.prevent="showOrderInDetail(index)">
            <div style="flex-direction: column">
              <div style="margin-left: 10px;font-family: 黑体, ui-sans-serif;font-size: 1.1rem;font-weight: bold;color: #007BFF;text-decoration:underline;">
                堂食订单{{data.orderid}}号
              </div>
              <div style="font-family: 黑体, ui-sans-serif;font-size: 1.1rem;margin: 0 0 0 10px">
                餐桌号：{{data.tableid}}
              </div>
              <div style="font-size: 0.8rem;margin: 0 10px;color: #3f3f3f;font-style: italic">
                下单时间：{{data.ordertime}}
              </div>
              <div style="margin-left: 10px;flex: 1;font-family: 黑体, ui-sans-serif;font-weight: bolder;font-size: 1.35rem;color: #e75d4f">
                总价：￥{{data.totalprice}}
              </div>
            </div>

            <div style="margin-right: 10px;font-style: italic;font-size: 0.9rem">
              点击查看详情或评价
            </div>
          </div>
      </div>
  </div>

  <el-dialog title="订单详情" v-model="showInDetail" width="70%">
    <div class="detail">
      <div class="foodList" v-for="food in showFoodList" :key="food">
        <div style="flex-direction: row">
          <div>
            {{food}}×1   👍👎
          </div>
        </div>
        <br>
      </div>
    </div>
    <p>对本订单进行评价：</p>
    <input type="text" v-model="comment" style="margin-top: 10px;margin-left: 10%;height: 80px;width: 80%;font-size: 15px">
    <button class="orderTypeBtm" @click.prevent="submitComment()" style="margin-top: 10px;margin-left: 25%;width: 50%">提交评论</button>
  </el-dialog>

  <div class="customer-history-order-wrapper" v-if="!orderType">
      <div id="historyOrderOut-ul" v-for="(data,index) in orderOutList" :key="data" style="overflow:auto;margin-top: auto" @click.prevent="showOrderOutDetail(index)">
          <div class="historyOrderWrapper">
            <div style="flex-direction: column">
              <div style="margin-left: 10px;font-family: 黑体, ui-sans-serif;font-size: 1.1rem;font-weight: bold;color: #007BFF;text-decoration:underline;">
                外卖订单{{data.orderId}}号
              </div>
              <div style="font-family: 黑体, ui-sans-serif;font-size: 1.1rem;margin: 0 0 0 10px">
                <div>由骑手:{{data.riderName}}</div>
                <div>配送至:{{data.address}}</div>
              </div>
              <div style="font-size: 0.8rem;margin: 0 10px;color: #3f3f3f;font-style: italic">
                下单时间：{{data.orderoutTime}}
              </div>
              <div style="margin-left: 10px;flex: 1;font-family: 黑体, ui-sans-serif;font-weight: bolder;font-size: 1.35rem;color: #e75d4f">
                总价：￥{{data.totalPrice}}
              </div>
            </div>

            <div style="margin-right: 10px;font-style: italic;font-size: 0.9rem">
              点击查看详情或评价
            </div>
          </div>
      </div>

  </div>

  <el-dialog title="订单详情" v-model="showOutDetail" width="70%">
    <div class="detail">
      <div class="foodList" v-for="food in showFoodList" :key="food">
        <div style="flex-direction: row">
          <div>
            {{food}}×1   👍👎
          </div>
        </div>
        <br>
      </div>
    </div>
    <p>对本订单进行评价：</p>
    <input type="text" v-model="comment" style="margin-top: 10px;margin-left: 10%;height: 50px;width: 80%;font-size: 15px">
    <button class="orderTypeBtm" @click.prevent="submitComment()" style="margin-top: 10px;margin-left: 25%;width: 50%">提交评论</button>
  </el-dialog>

</template>

<script>
import axios from "axios";

export default {
  name: "CustomerHistoryOrder",
  data() {
    return {
      orderType: true,
      showOutDetail: false,
      showInDetail: false,
      comment: "",
      showFoodList: [],
      orderInList: [
        {
          orderid: 1,
          tableid: 1,
          allfood: "猪柳蛋麦满分套餐,小食,小食,小食,小食,饮料,汉堡",
          ordercomment: "好",
          ordertime: "2022-07-09 10:04:16",
          totalprice: "24"
        },
      ],
      orderOutList: [
        {
          orderId: 1,
          address: "中南大学铁道学院",
          allFood: "猪柳蛋麦满分套餐",
          orderoutComplete: "true",
          orderoutComment: "好",
          orderoutTime: "2022-07-09 10:04:16",
          riderName: "骑手",
          totalPrice: "24",
          receiverName: "俺",
          receiverPhone: "19999999999"
        }
      ]
    };
  },
  methods: {
    checkOrderIn() {
      this.orderType = true
    },

    checkOrderOut() {
      this.orderType = false
    },

    showOrderInDetail(index) {
      this.showInDetail = true
      this.showFoodList = this.orderInList[index].allfood.split(',')
    },

    showOrderOutDetail(index) {
      this.showOutDetail = true
      this.showFoodList = this.orderOutList[index].allFood.split(',')
    },

    submitComment() {}
  },
  created() {
    axios({
      url: "/customer/viewOrderIn/"+sessionStorage.getItem("userId"),
      method: "GET",
    }).then((res) => {
      console.log(res.data)
      // this.orderInList = res.data.data;
    });

    axios({
      url: "/customer/viewOrderOut/"+sessionStorage.getItem("userId"),
      method: "GET",
    }).then((res) => {
      console.log(res.data)
      // this.orderOutList = res.data.data;
    });
  }
}
</script>

<style scoped>
.customer-history-order-wrapper {
  height: auto;
  overflow-y: scroll;
  overflow-x: hidden;
  /*overflow:auto;*/
  max-height:450px;
}

.orderTypeBtm {
  text-align: center;
  width: 120px;
  height: 40px;
  border: 3px;
  border-radius: 30px;
  transition-duration: 0.4s;
  background-color: #F1FBFE;
  color: #1383B6;
}

.orderTypeBtm:hover {
  background-color: #1383B6;
  color: #F1FBFE;
}

.historyOrderWrapper {
  /*border: #0d0d0d 1px solid;*/
  border-radius: 10px;

  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.07);

  padding: 5px 0;
  margin: 10px 5px;

  display: flex;
  flex-direction: row;

  cursor: pointer;
  background: #fffddc;
}

.detail {
  height: auto;
  overflow-y: scroll;
  overflow-x: hidden;
  /*overflow:auto;*/
  max-height:200px;
}
</style>