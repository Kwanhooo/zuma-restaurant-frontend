<template>
  <el-header style="margin-top:30px">
    店铺所有的订单评价...
  </el-header>
  <el-main>
    <el-table :data="tableData" height="250" style="width: 100%">
      <el-table-column prop="id" label="评价id" width="180"/>
      <el-table-column prop="customerId" label="顾客id" width="180"/>
      <el-table-column prop="time" label="评价时间" width="180ox"/>
      <el-table-column prop="content" label="评价内容" width="380ox"/>
    </el-table>
  </el-main>
</template>

<script>
import axios from "axios";

export default {
  name: "viewEvaluation",
  data() {
    return {
      tableData: [
        {
          id: "10001",
          customerId: "114514",
          time: "1145-14-11 45:14:00",
          content: "姐妹们，这家饭店真是绝绝子，好吃到跺jiojio，我直接暴风吸入，真是太上头啦！"
        },
        {
          id: "10002",
          customerId: "114514114514",
          time: "1145-14-11 45:14:01",
          content: "嗨嗨嗨，来了奥",
        }
      ]
    }
  },
  created() {
    console.log(5555);
    axios({
      method: 'POST',
      url: '/front/viewEvaluation'
    })
        .then((res) => {
          console.log(res.data);
          if (res.data.status === 0) {
            this.tableData = res.data.data;
          }
        })
  }
}
</script>

<style scoped>

</style>