<template>
  <el-container>
    <el-header>
      <div class="block" style="text-align:center;">
        查询从：
        <el-date-picker
            v-model="timeValue"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
        </el-date-picker>
        的订单
        <el-button type="primary" @click="search()"><i class="el-icon-search">搜索</i></el-button>
      </div>
    </el-header>
    <el-main>
      <el-table
          :data="tableData"
          height="650"
          border
          style="width: 100%">
        <el-table-column
            prop="orderId"
            label="编号"
            width="80">
        </el-table-column>
        <el-table-column
            prop="table"
            label="桌号"
            width="80">
        </el-table-column>
        <el-table-column
            prop="time"
            label="时间"
            width="80">
        </el-table-column>
        <el-table-column
            prop="check"
            label="结账状态"
            width="80">
        </el-table-column>
        <el-table-column
            prop="allFood"
            label="菜品">
        </el-table-column>
        <el-table-column
            prop="comment"
            label="评价">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  name: "ViewOrder",
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      timeValue: '',
      tableData: [],
    };
  },
  methods: {
    search() {
      axios({
        method: "post",
        url: "/front/viewOrder?time1="+this.timeValue.at(0).toString()+"&time2="+this.timeValue.at(1).toString(),
      })
          .then((res) => {
            if (res.data.code === 0) {
              this.tableData = res.data;
            } else {
              console.log(res.data.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });

    }
  },

}
</script>

<style scoped>
.block {
  text-align: center;
  padding-top: 20px;
}
</style>