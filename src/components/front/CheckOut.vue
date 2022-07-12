<template>
  <ul id="table-ul" style="overflow:auto;max-height:830px;" class="fadeIn">
    <li class="row" v-for="row of 5" :key="row">
      <div class="column" v-for="column of 6" :key="column">
        <div class="emptyTable" v-if="!(busyTable[row * 6 + column - 7])">
          <div class="tableTitle" style="text-align: center;font-weight: bold;font-size: 25px">
            {{row * 6 + column - 7}}号桌
          </div>
<!--          <br><br>
          <div style="text-align: center;font-weight: bold;font-size: 40px">
            空闲
          </div>-->
        </div>
        <div class="busyTable" v-if="busyTable[row * 6 + column - 7]" @click.prevent="tableDetail(row * 6 + column - 7)">
          <div class="tableTitle" style="text-align: center;font-weight: bold;font-size: 25px">
            {{row * 6 + column - 7}}号桌
          </div>
          <br>
          <div style="font-size: 20px; margin-left: 30px">
            订单号：{{findOrder(row * 6 + column - 7).id}}
          </div>
          <br>
          <div style="font-size: 20px; margin-left: 30px">
            点餐人数：{{findOrder(row * 6 + column - 7).customerList.length}}
          </div>

          <el-dialog title="订单详情" v-model="showDetail" width="35%" style="font-size: 30px; font-weight: bold">
            <div style="margin-top: 15px;text-align: center;font-size: 25px;font-weight: bold">
              桌号：{{nowCheck.table}}
            </div>
            <div style="margin-top: 5px;text-align: center;font-size: 20px">
              订单号：{{nowCheck.id}}
            </div>
            <ul id="foodInUseList-ul" style="overflow:auto; max-height:400px" v-for="(food,index) in nowCheck.foodInUseList" :key="food">
              <li>
                <div style="font-size: 15px">
                  <p v-if="food.ifCompleted">{{index+1}}. {{ food.name }}： 已完成</p>
                  <p v-else>{{index+1}}. {{ food.name }}： 未完成</p>
                </div>
              </li>
            </ul>
            <div style="font-size: 25px;margin-left: 30px;margin-top: 20px;font-weight: bold;color: #007BFF">
              总计：{{nowCheck.value}} 元
            </div>
            <button class="checkout" @click.prevent="checkOut(nowCheck.table)">结账</button>
          </el-dialog>
        </div>
      </div>
      <br>
    </li>
  </ul>
<!--  <el-header style="font-size:18px;font-family:Helvetica Neue,sans-serif">
    <div style="text-align:center;margin-top:40px">正在进行的订单...</div>
  </el-header>
  <el-main>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template #default="props">
          &lt;!&ndash;eslint-disable-next-line&ndash;&gt;
          <div v-for="food in props.row.foodInUseList">
            <p v-if="food.ifCompleted">{{ food.name }}:已完成</p>
            <p v-else>{{ food.name }}:未完成</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="编号" prop="id"/>
      <el-table-column label="桌号" prop="table"/>
      <el-table-column label="顾客" prop="customerList"/>
      <el-table-column label="总价" prop="value"/>
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button type="success" @click="checkOut(scope.row)" plain>结账</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>-->
</template>

<script>
import axios from "axios";

export default {
  name: "CheckOut",
  data() {
    return {
      showDetail: false,
      nowCheck: {},
      busyTable: [
        false,false,false,false,false,false,
        false,false,false,false,false,false,
        false,false,false,false,false,false,
        false,false,false,false,false,false,
        false,false,false,false,false,false
      ],
      tableData: [],
    }
  },
  methods: {
    checkOut(row) {
      console.log('row is'+row);
      const vm = this;
      axios({
        method: 'POST',
        url: '/front/confirm?tableId=' + row,
      })
          .then((res) => {
            console.log(res.data);
            if (res.data.status === 0) {
              this.tableData.forEach(function (item, index, arr) {
                if (item.table === row) {
                  arr.splice(index, 1);
                  vm.busyTable[item.table]=false;
                }
              });
            } else {
              console.log(res.data.msg)
            }
          })
    },

    findOrder(table) {
      console.log(table)
      for(let i in this.tableData) {
        if(table === this.tableData[i].table) {
          return this.tableData[i]
        }
      }
    },

    tableDetail(table) {
      this.showDetail = true
      this.nowCheck = this.findOrder(table)
    }
  },
  created() {
    axios({
      method: 'POST',
      url: '/front/viewDinner'
    })
        .then((res) => {
          console.log(444444444444444444);
          console.log(res.data.data);
          if (res.data.status === 0) {
            this.tableData = res.data.data;

            for(var i = 0;i<=res.data.data.length-1;i++) {
            this.busyTable[(res.data.data[i].table)] = true;
            }
          } else {
            console.log(res.data.msg);
          }
        })
  }
}
</script>

<style scoped>

ul {
  margin: 0;
  padding-left: 20px;
  list-style-type: none;
}

#table-ul::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #F5F5F5;
  border-radius: 10px;
}

#table-ul::-webkit-scrollbar {
  width: 10px;
  background-color: #F5F5F5;
}

#table-ul::-webkit-scrollbar-thumb {
  background-color: #5fbae9;
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

.row {
  position: relative;
  float: top;
  height: 200px;
  width: 100%;
}

.column {
  position: relative;
  float: left;
  height: 100%;
  width: 15%;
  margin-left: 1.5%;
}

.emptyTable {
  margin-left: 5%;
  margin-top: 5%;
  width: 90%;
  height: 90%;
  background: #d1ffcf;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
}

.busyTable {
  margin-left: 5%;
  margin-top: 5%;
  width: 90%;
  height: 90%;
  background: #ffd7ed;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.09);
  border-radius: 30px;

  cursor: pointer
}

.checkout {
  text-align: center;
  margin-left: 30%;
  margin-top: 5%;
  width: 40%;
  height: 50px;
  border: 3px;
  border-radius: 30px;
  transition-duration: 0.4s;
  background-color: #F6F5FE;
  color: #4F3FF0;
}

.checkout:hover {
  background-color: #4F3FF0;
  color: #F6F5FE;
}

@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 0.5s;
  -moz-animation-duration: 0.5s;
  animation-duration: 0.5s;
}

</style>