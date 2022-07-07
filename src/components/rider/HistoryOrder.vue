<template>
  <div class="header">
  </div>
  <div class="container">
    <div class="container">
      <div class="orderItem" v-for="item in tableData" :key="item" >
        <div v-if="item.orderoutcomplete" class="orderOutComplete">
          <div class="id"><h1><b>
            订单:{{item.orderId}}已完成
          </b></h1></div>
          <div class="userId">
            用户ID:{{item.userId}}
          </div>
          <div class="time">
            下单时间:{{item.time}}
          </div>
          <div class="address">
            地址:{{item.address}}
          </div>
          <div class="allFood">
            订单内容:{{item.allFood}}
          </div>
          <div class="totalPrice"><h2>
            消费合计:{{item.totalPrice}}元
          </h2></div>
        </div>
        <div v-else class="orderOutUnComplete">
          <div class="id"><h1><b>
            订单:{{item.orderId}}未完成
          </b></h1></div>
          <div class="userId">
            用户ID:{{item.userId}}
          </div>
          <div class="time">
            下单时间:{{item.time}}
          </div>
          <div class="address">
            地址:{{item.address}}
          </div>
          <div class="allFood">
            订单内容:{{item.allFood}}
          </div>
          <div class="totalPrice"><h2>
            消费合计:{{item.totalPrice}}元
          </h2></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HistoryOrder",
  data() {
    return {
      id:sessionStorage.getItem('userId'),
      orderId:'',
      searchTime:'',
      defaultTime1:'2022-02-07 12:23:40',
      tableData:[
        {
          orderId:'10001',
          address:'湖南省长沙市天心区中南大学铁道学院铁十舍',
          userId:'114514',
          comment:'',
          time:'2022-07-06 17:04:00',
          allFood:'榴莲 臭豆腐',
          check:'0',
          totalPrice:'50',
          orderoutcomplete:false,
        },
        {
          orderId:'10002',
          address:'湖南省长沙市岳麓区中南大学南校区南五舍',
          userId:'114514',
          comment:'',
          time:'2022-07-06 17:04:00',
          allFood:'螺狮粉',
          check:'0',
          totalPrice:'50',
          orderoutcomplete:true,
        },
        {
          orderId:'10003',
          address:'湖南省长沙市岳麓区中南大学南校区南五舍',
          userId:'114514',
          comment:'',
          time:'2022-07-06 17:04:00',
          allFood:'螺狮粉',
          check:'0',
          totalPrice:'50',
          orderoutcomplete:true,
        }
      ]
    }
  },
  created() {
    axios({
      method: 'POST',
      url: '/rider/getAllHistoryOrder'
    })
        .then((res) => {
          if (res.data.code === 0) {
            this.tableData = res.data
          } else {
            this.$alert(res.data.msg,'错误信息');
          }
        })
  }
}
</script>

<style scoped>
.container{
  overflow: auto;
  height:32em;
}
.orderOutComplete{
  padding-top:0.5em;
  padding-bottom:0.5em;
  margin-bottom:1em;
  padding-left:1em;
  text-align: left;
  background-color:#34C471;
  line-height: 2em;
  border-radius: 2em;

}
.orderOutUnComplete{
  padding-top:0.5em;
  padding-bottom:0.5em;
  margin-bottom:1em;
  padding-left:1em;
  text-align: left;
  background-color:#c5c6c7;
  line-height: 2em;
  border-radius: 2em;

}
.id{
  font-size:1em;
}
.userId{
  font-size:1.1em;
}
.time{
  font-size:1.1em;
}
.address{
  font-size:1.1em;
}
.allFood{
  font-size:1.1em;
}
.Button{
  text-align: right;
  padding-right: 2em;
}
</style>