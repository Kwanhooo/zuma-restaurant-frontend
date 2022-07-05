<template>
  <el-header style="font-size:18px;font-family:Helvetica Neue,sans-serif">
    <div style="text-align:center;margin-top:40px">正在进行的订单...</div>
  </el-header>
  <el-main>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template #default="props">
          <!--eslint-disable-next-line-->
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
  </el-main>
</template>

<script>
import axios from "axios";

export default {
  name: "CheckOut",
  data() {
    return {
      tableData: [
        {
          id: 114514,
          table: "01",
          customerList: [],
          foodInUseList: [
            {
              id: 114514114514,
              name: "榴莲",
              ifCompleted: true,
            },
            {
              id: 6666,
              name: "臭豆腐",
              ifCompleted: false,
            }
          ],
          value: 100,
        }
      ],
    }
  },
  methods: {
    checkOut(row) {
      axios({
        method: 'POST',
        url: '/front/confirm',
        data: {
          id: row.id,
        }
      })
          .then((res) => {
            if (res.data.code === 0) {
              this.tableData.forEach(function (item, index, arr) {
                if (item === row) {
                  arr.splice(index, 1);
                }
              });
            } else {
              this.$alert(res.data.msg, '结账', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$message({
                    type: 'info',
                    message: `action: ${action}`
                  });
                }
              });
            }
          })
    }
  },
  created() {
    axios({
      method: 'POST',
      url: '/front/getUsingTables'
    })
        .then((res) => {
          if (res.status === 0) {
            this.tableData = res.data;
          } else {
            this.$alert(res.data.msg, '查看用餐桌号', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${action}`
                });
              }
            });
          }
        })
  }
}
</script>

<style scoped>

</style>