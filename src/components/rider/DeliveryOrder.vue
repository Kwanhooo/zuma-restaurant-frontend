<template>
  <div class="container">
    <div class="container">
      <div class="orderItem" v-for="item in tableData" :key="item">
        <div class="id"><h1><b>
          待接取的订单:{{ item.orderId }}
        </b></h1></div>
        <div class="userId">
          用户ID:{{ item.userId }}
        </div>
        <div class="time">
          下单时间:{{ item.time }}
        </div>
        <div class="address">
          地址:{{ item.address }}
        </div>
        <div class="allFood">
          订单内容:{{ item.allFood }}
        </div>
        <div class="totalPrice"><h2>
          消费合计:{{ item.totalPrice }}元
        </h2></div>
        <div class="Button">
          <el-button type="success" style="width:6em" @click="takeDialogShow(item.orderId)" round>✔️接取</el-button>
        </div>
      </div>
    </div>
  </div>
  <el-dialog
      v-model="takeDialogVisible"
      title="Tips"
      width="80%"
  >
    <span>您确定要接取单{{ orderId }}吗?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="takeDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="takeOrder()"
        >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from "axios";

export default {
  name: "DeliveryOrder",
  data() {
    return {
      id: sessionStorage.getItem('userId'),
      orderId: '',
      takeDialogVisible: false,
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
    takeDialogShow(orderId) {
      this.takeDialogVisible = true;
      this.orderId = orderId;
    },
    takeOrder() {
      axios({
        method: 'POST',
        url: '/rider/takeOrder',
        data: {
          id: this.id,
          orderId: this.orderId,
        }
      })
          .then((res) => {
            if (res.data.code === 0) {
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
  },
  created() {
    axios({
      method: 'POST',
      url: '/rider/getDoingOrder'
    })
        .then((res) => {
          if (res.data.code === 0) {
            this.tableData = res.data
          } else {
            this.$alert(res.data.msg, '错误信息');
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
  background-color: #e7e8e9;
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