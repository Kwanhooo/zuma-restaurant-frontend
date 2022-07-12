<template>
  <div class="container">
    <div class="orderItem" v-for="item in tableData" :key="item">
      <div class="id"><h1><b>
        🚴订单编号:{{ item.orderId }}
      </b></h1></div>
      <div class="userId">
        👨‍🏭用户ID:{{ item.userId }}
      </div>
      <div class="time">
        📅下单时间:{{ item.time }}
      </div>
      <div class="address">
        🏠地址:{{ item.address }}
      </div>
      <div class="allFood">
        🧊订单内容:{{ item.allFood }}
      </div>
      <div class="totalPrice"><h2>
        💴消费合计:{{ item.totalPrice }}元
      </h2></div>
      <div class="Button">
        <el-button type="danger" style="width:6em;" @click="cancelDialogShow(item.orderId)" round>❌取消</el-button>
        <el-button type="success" style="width:6em" @click="completeDialogShow(item.orderId)" round>✔️完成</el-button>
      </div>
    </div>
    <div class="flash">
      <el-button type="text" @click="flash()">🔄️</el-button>
      <el-button type="text">刷新</el-button>
    </div>
  </div>
  <el-dialog
      v-model="cancelDialogVisible"
      title="Tips"
      width="80%"
  >
    <span>您确定要取消订单{{ orderId }}吗?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="cancelOrder()"
        >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
  <el-dialog
      v-model="completeDialogVisible"
      title="Tips"
      width="80%"
  >
    <span>您确定完成订单{{ orderId }}吗?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="completeDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="completeOrder()"
        >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  name: "DoingOrder",
  data() {
    return {
      id: sessionStorage.getItem('userId'),
      orderId: '',
      cancelDialogVisible: false,
      completeDialogVisible: false,
      tableData: [
        {
          orderId: '10001',
          address: '湖南省长沙市天心区中南大学铁道学院铁十舍',
          userId: '114514',
          comment: '',
          time: '2022-07-06 17:04:00',
          allFood: '榴莲 臭豆腐',
          check: '0',
          totalPrice: '50',
        },
        {
          orderId: '10002',
          address: '湖南省长沙市岳麓区中南大学南校区南五舍',
          userId: '114514',
          comment: '',
          time: '2022-07-06 17:04:00',
          allFood: '螺狮粉',
          check: '0',
          totalPrice: '50',
        },
        {
          orderId: '10003',
          address: '湖南省长沙市岳麓区中南大学南校区南五舍',
          userId: '114514',
          comment: '',
          time: '2022-07-06 17:04:00',
          allFood: '螺狮粉',
          check: '0',
          totalPrice: '50',
        }
      ]
    }
  },
  methods: {
    cancelDialogShow(orderId) {
      this.cancelDialogVisible = true;
      this.orderId = orderId;
    },
    cancelOrder() {
      axios({
        method: 'POST',
        url: '/rider/cancelOrder',
        data: {
          id: this.id,
          orderId: this.orderId,
        }
      })
          .then((res) => {
            if (res.data.status === 0) {
              let orderId = this.orderId;
              this.tableData.forEach(function (item, index, arr) {
                if (item.orderId === orderId) {
                  arr.splice(index, 1);
                }
              });
              this.cancelDialogVisible = false;
            } else {
              this.$alert(res.data.msg, '错误信息');
            }
          })
    },
    completeDialogShow(orderId) {
      this.completeDialogVisible = true;
      this.orderId = orderId;
      console.log(this.orderId);
      console.log(this.id);
    },
    completeOrder() {
      axios({
        method: 'PUT',
        url: '/rider/completeOrder?orderId=' + this.orderId + '&riderName=' + this.id,
      })
          .then((res) => {
            if (res.data.status === 0) {
              let orderId = this.orderId;
              this.tableData.forEach(function (item, index, arr) {
                if (item.orderId === orderId) {
                  arr.splice(index, 1);
                }
              });
              this.completeDialogVisible = false;
            } else {
              this.$alert(res.data.msg, '错误信息');
            }
          })
    },
    flash () {
      axios({
        method: 'GET',
        url: '/rider/getDoingOrder?riderId=' + this.id
      })
          .then((res) => {
            console.log(res.data.data);
            if (res.data.status === 0) {
              console.log("Doing Order running")
              this.tableData = res.data.data
            } else {
              console.log(res.data.msg);
            }
          })
    }
  },

  created() {

    axios({
      method: 'GET',
      url: '/rider/getDoingOrder?riderId=' + this.id
    })
        .then((res) => {
          console.log("Doing Order ");
          console.log(res.data.data);
          if (res.data.status === 0) {
            this.tableData = res.data.data
          } else {
            console.log(res.data.msg);
          }
        })
  }
}

</script>

<style scoped>
.container {
  overflow: auto;
  height: 32em;
}

.orderItem {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  margin-bottom: 1em;
  padding-left: 1em;
  text-align: left;
  background-color: #FFEDF3;
  line-height: 2em;
  border-radius: 2em;

}

.id {
  font-size: 1em;
}

.userId {
  font-size: 1.1em;
}

.time {
  font-size: 1.1em;
}

.address {
  font-size: 1.1em;
}

.allFood {
  font-size: 1.1em;
}

.Button {
  text-align: right;
  padding-right: 2em;
}
</style>