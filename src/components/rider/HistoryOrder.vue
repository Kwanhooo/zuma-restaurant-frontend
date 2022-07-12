<template>
  <div class="header">
    <div class="block">
      <el-cascader
          v-model="time1"
          :options="Data"
          style="width:30%;"></el-cascader>
      至
      <el-cascader
          v-model="time2"
          :options="Data"
          style="width:30%"></el-cascader>
      的订单
      <el-button @click="search()" circle>🔍</el-button>
    </div>
  </div>
  <div class="container">
    <div class="container">
      <div class="orderItem" v-for="item in tableData" :key="item">
        <div v-if="item.orderoutcomplete" class="orderOutComplete">
          <div class="id"><h1><b>
            🚴订单:{{ item.orderId }}已完成
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
        </div>
        <div v-else class="orderOutUnComplete">
          <div class="id"><h1><b>
            🚴订单:{{ item.orderId }}未完成
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
        </div>
      </div>
      <div class="flash">
        <el-button type="text" @click="flash()">🔄️</el-button>
        <el-button type="text">刷新</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  name: "HistoryOrder",
  data() {
    return {
      id: sessionStorage.getItem('userId'),
      orderId: '',
      searchTime: '',
      time1: "",
      time2: "",
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
          orderoutcomplete: false,
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
          orderoutcomplete: true,
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
          orderoutcomplete: true,
        }
      ],
      monthData: [
        {
          label: "一月",
          value: "01",
          children: this.dateData,
        },
        {
          label: "二月",
          value: "二月",
          children: this.dateData,
        },
        {
          label: "三月",
          value: "三月",
          children: this.dateData,
        },
        {
          label: "四月",
          value: "四月",
          children: this.dateData,
        },
        {
          label: "五月",
          value: "五月",
          children: this.dateData,
        },
        {
          label: "六月",
          value: "六月",
          children: this.dateData,
        },
        {
          label: "七月",
          value: "七月",
          children: this.dateData,
        },
        {
          label: "八月",
          value: "八月",
          children: this.dateData,
        },
        {
          label: "九月",
          value: "九月",
          children: this.dateData,
        },
        {
          label: "十月",
          value: "十月",
          children: this.dateData,
        },
        {
          label: "十一月",
          value: "十一月",
          children: this.dateData,
        },
        {
          label: "十二月",
          value: "十二月",
          children: this.dateData,
        },
      ],
      Data: [
        {
          label: "一月",
          value: "01",
          children: [
            {
              label: "1日",
              value: "01",
            },
            {
              label: "2日",
              value: "02",
            },
            {
              label: "3日",
              value: "03",
            },
            {
              label: "4日",
              value: "04",
            },
            {
              label: "5日",
              value: "05",
            },
            {
              label: "6日",
              value: "06",
            }, {
              label: "7日",
              value: "07",
            }, {
              label: "8日",
              value: "08",
            }, {
              label: "9日",
              value: "09",
            }, {
              label: "10日",
              value: "10",
            }, {
              label: "11日",
              value: "11",
            }, {
              label: "12日",
              value: "12",
            }, {
              label: "13日",
              value: "13",
            }, {
              label: "14日",
              value: "14",
            }, {
              label: "15日",
              value: "15",
            }, {
              label: "16日",
              value: "16",
            }, {
              label: "17日",
              value: "17",
            }, {
              label: "18日",
              value: "18",
            }, {
              label: "19日",
              value: "19",
            }, {
              label: "20日",
              value: "20",
            }, {
              label: "21日",
              value: "21",
            }, {
              label: "22日",
              value: "22",
            }, {
              label: "23日",
              value: "23",
            }, {
              label: "24日",
              value: "24",
            }, {
              label: "25日",
              value: "25",
            }, {
              label: "26日",
              value: "26",
            }, {
              label: "27日",
              value: "27",
            }, {
              label: "28日",
              value: "28",
            }, {
              label: "29日",
              value: "29",
            },
            {
              label: "30日",
              value: "30",
            },
          ],
        },
        {
          label: "二月",
          value: "02",
          children: [
            {
              label: "1日",
              value: "01",
            },
            {
              label: "2日",
              value: "02",
            },
            {
              label: "3日",
              value: "03",
            },
            {
              label: "4日",
              value: "04",
            },
            {
              label: "5日",
              value: "05",
            },
            {
              label: "6日",
              value: "06",
            }, {
              label: "7日",
              value: "07",
            }, {
              label: "8日",
              value: "08",
            }, {
              label: "9日",
              value: "09",
            }, {
              label: "10日",
              value: "10",
            }, {
              label: "11日",
              value: "11",
            }, {
              label: "12日",
              value: "12",
            }, {
              label: "13日",
              value: "13",
            }, {
              label: "14日",
              value: "14",
            }, {
              label: "15日",
              value: "15",
            }, {
              label: "16日",
              value: "16",
            }, {
              label: "17日",
              value: "17",
            }, {
              label: "18日",
              value: "18",
            }, {
              label: "19日",
              value: "19",
            }, {
              label: "20日",
              value: "20",
            }, {
              label: "21日",
              value: "21",
            }, {
              label: "22日",
              value: "22",
            }, {
              label: "23日",
              value: "23",
            }, {
              label: "24日",
              value: "24",
            }, {
              label: "25日",
              value: "25",
            }, {
              label: "26日",
              value: "26",
            }, {
              label: "27日",
              value: "27",
            }, {
              label: "28日",
              value: "28",
            }, {
              label: "29日",
              value: "29",
            },
            {
              label: "30日",
              value: "30",
            },
          ],
        },
        {
          label: "三月",
          value: "03",
          children: [
            {
              label: "1日",
              value: "01",
            },
            {
              label: "2日",
              value: "02",
            },
            {
              label: "3日",
              value: "03",
            },
            {
              label: "4日",
              value: "04",
            },
            {
              label: "5日",
              value: "05",
            },
            {
              label: "6日",
              value: "06",
            }, {
              label: "7日",
              value: "07",
            }, {
              label: "8日",
              value: "08",
            }, {
              label: "9日",
              value: "09",
            }, {
              label: "10日",
              value: "10",
            }, {
              label: "11日",
              value: "11",
            }, {
              label: "12日",
              value: "12",
            }, {
              label: "13日",
              value: "13",
            }, {
              label: "14日",
              value: "14",
            }, {
              label: "15日",
              value: "15",
            }, {
              label: "16日",
              value: "16",
            }, {
              label: "17日",
              value: "17",
            }, {
              label: "18日",
              value: "18",
            }, {
              label: "19日",
              value: "19",
            }, {
              label: "20日",
              value: "20",
            }, {
              label: "21日",
              value: "21",
            }, {
              label: "22日",
              value: "22",
            }, {
              label: "23日",
              value: "23",
            }, {
              label: "24日",
              value: "24",
            }, {
              label: "25日",
              value: "25",
            }, {
              label: "26日",
              value: "26",
            }, {
              label: "27日",
              value: "27",
            }, {
              label: "28日",
              value: "28",
            }, {
              label: "29日",
              value: "29",
            },
            {
              label: "30日",
              value: "30",
            },
          ],
        },
        {
          label: "四月",
          value: "04",
          children: [
            {
              label: "1日",
              value: "01",
            },
            {
              label: "2日",
              value: "02",
            },
            {
              label: "3日",
              value: "03",
            },
            {
              label: "4日",
              value: "04",
            },
            {
              label: "5日",
              value: "05",
            },
            {
              label: "6日",
              value: "06",
            }, {
              label: "7日",
              value: "07",
            }, {
              label: "8日",
              value: "08",
            }, {
              label: "9日",
              value: "09",
            }, {
              label: "10日",
              value: "10",
            }, {
              label: "11日",
              value: "11",
            }, {
              label: "12日",
              value: "12",
            }, {
              label: "13日",
              value: "13",
            }, {
              label: "14日",
              value: "14",
            }, {
              label: "15日",
              value: "15",
            }, {
              label: "16日",
              value: "16",
            }, {
              label: "17日",
              value: "17",
            }, {
              label: "18日",
              value: "18",
            }, {
              label: "19日",
              value: "19",
            }, {
              label: "20日",
              value: "20",
            }, {
              label: "21日",
              value: "21",
            }, {
              label: "22日",
              value: "22",
            }, {
              label: "23日",
              value: "23",
            }, {
              label: "24日",
              value: "24",
            }, {
              label: "25日",
              value: "25",
            }, {
              label: "26日",
              value: "26",
            }, {
              label: "27日",
              value: "27",
            }, {
              label: "28日",
              value: "28",
            }, {
              label: "29日",
              value: "29",
            },
            {
              label: "30日",
              value: "30",
            },
          ],
        },
        {
          label: "五月",
          value: "05",
          children: [
            {
              label: "1日",
              value: "01",
            },
            {
              label: "2日",
              value: "02",
            },
            {
              label: "3日",
              value: "03",
            },
            {
              label: "4日",
              value: "04",
            },
            {
              label: "5日",
              value: "05",
            },
            {
              label: "6日",
              value: "06",
            }, {
              label: "7日",
              value: "07",
            }, {
              label: "8日",
              value: "08",
            }, {
              label: "9日",
              value: "09",
            }, {
              label: "10日",
              value: "10",
            }, {
              label: "11日",
              value: "11",
            }, {
              label: "12日",
              value: "12",
            }, {
              label: "13日",
              value: "13",
            }, {
              label: "14日",
              value: "14",
            }, {
              label: "15日",
              value: "15",
            }, {
              label: "16日",
              value: "16",
            }, {
              label: "17日",
              value: "17",
            }, {
              label: "18日",
              value: "18",
            }, {
              label: "19日",
              value: "19",
            }, {
              label: "20日",
              value: "20",
            }, {
              label: "21日",
              value: "21",
            }, {
              label: "22日",
              value: "22",
            }, {
              label: "23日",
              value: "23",
            }, {
              label: "24日",
              value: "24",
            }, {
              label: "25日",
              value: "25",
            }, {
              label: "26日",
              value: "26",
            }, {
              label: "27日",
              value: "27",
            }, {
              label: "28日",
              value: "28",
            }, {
              label: "29日",
              value: "29",
            },
            {
              label: "30日",
              value: "30",
            },
          ],
        },
        {
          label: "六月",
          value: "06",
          children: [
            {
              label: "1日",
              value: "01",
            },
            {
              label: "2日",
              value: "02",
            },
            {
              label: "3日",
              value: "03",
            },
            {
              label: "4日",
              value: "04",
            },
            {
              label: "5日",
              value: "05",
            },
            {
              label: "6日",
              value: "06",
            }, {
              label: "7日",
              value: "07",
            }, {
              label: "8日",
              value: "08",
            }, {
              label: "9日",
              value: "09",
            }, {
              label: "10日",
              value: "10",
            }, {
              label: "11日",
              value: "11",
            }, {
              label: "12日",
              value: "12",
            }, {
              label: "13日",
              value: "13",
            }, {
              label: "14日",
              value: "14",
            }, {
              label: "15日",
              value: "15",
            }, {
              label: "16日",
              value: "16",
            }, {
              label: "17日",
              value: "17",
            }, {
              label: "18日",
              value: "18",
            }, {
              label: "19日",
              value: "19",
            }, {
              label: "20日",
              value: "20",
            }, {
              label: "21日",
              value: "21",
            }, {
              label: "22日",
              value: "22",
            }, {
              label: "23日",
              value: "23",
            }, {
              label: "24日",
              value: "24",
            }, {
              label: "25日",
              value: "25",
            }, {
              label: "26日",
              value: "26",
            }, {
              label: "27日",
              value: "27",
            }, {
              label: "28日",
              value: "28",
            }, {
              label: "29日",
              value: "29",
            },
            {
              label: "30日",
              value: "30",
            },
          ],
        },
        {
          label: "七月",
          value: "07",
          children: [
            {
              label: "1日",
              value: "01",
            },
            {
              label: "2日",
              value: "02",
            },
            {
              label: "3日",
              value: "03",
            },
            {
              label: "4日",
              value: "04",
            },
            {
              label: "5日",
              value: "05",
            },
            {
              label: "6日",
              value: "06",
            }, {
              label: "7日",
              value: "07",
            }, {
              label: "8日",
              value: "08",
            }, {
              label: "9日",
              value: "09",
            }, {
              label: "10日",
              value: "10",
            }, {
              label: "11日",
              value: "11",
            }, {
              label: "12日",
              value: "12",
            }, {
              label: "13日",
              value: "13",
            }, {
              label: "14日",
              value: "14",
            }, {
              label: "15日",
              value: "15",
            }, {
              label: "16日",
              value: "16",
            }, {
              label: "17日",
              value: "17",
            }, {
              label: "18日",
              value: "18",
            }, {
              label: "19日",
              value: "19",
            }, {
              label: "20日",
              value: "20",
            }, {
              label: "21日",
              value: "21",
            }, {
              label: "22日",
              value: "22",
            }, {
              label: "23日",
              value: "23",
            }, {
              label: "24日",
              value: "24",
            }, {
              label: "25日",
              value: "25",
            }, {
              label: "26日",
              value: "26",
            }, {
              label: "27日",
              value: "27",
            }, {
              label: "28日",
              value: "28",
            }, {
              label: "29日",
              value: "29",
            },
            {
              label: "30日",
              value: "30",
            },
          ],
        },
        {
          label: "八月",
          value: "08",
          children: [
            {
              label: "1日",
              value: "01",
            },
            {
              label: "2日",
              value: "02",
            },
            {
              label: "3日",
              value: "03",
            },
            {
              label: "4日",
              value: "04",
            },
            {
              label: "5日",
              value: "05",
            },
            {
              label: "6日",
              value: "06",
            }, {
              label: "7日",
              value: "07",
            }, {
              label: "8日",
              value: "08",
            }, {
              label: "9日",
              value: "09",
            }, {
              label: "10日",
              value: "10",
            }, {
              label: "11日",
              value: "11",
            }, {
              label: "12日",
              value: "12",
            }, {
              label: "13日",
              value: "13",
            }, {
              label: "14日",
              value: "14",
            }, {
              label: "15日",
              value: "15",
            }, {
              label: "16日",
              value: "16",
            }, {
              label: "17日",
              value: "17",
            }, {
              label: "18日",
              value: "18",
            }, {
              label: "19日",
              value: "19",
            }, {
              label: "20日",
              value: "20",
            }, {
              label: "21日",
              value: "21",
            }, {
              label: "22日",
              value: "22",
            }, {
              label: "23日",
              value: "23",
            }, {
              label: "24日",
              value: "24",
            }, {
              label: "25日",
              value: "25",
            }, {
              label: "26日",
              value: "26",
            }, {
              label: "27日",
              value: "27",
            }, {
              label: "28日",
              value: "28",
            }, {
              label: "29日",
              value: "29",
            },
            {
              label: "30日",
              value: "30",
            },
          ],
        },
        {
          label: "九月",
          value: "09",
          children: [
            {
              label: "1日",
              value: "01",
            },
            {
              label: "2日",
              value: "02",
            },
            {
              label: "3日",
              value: "03",
            },
            {
              label: "4日",
              value: "04",
            },
            {
              label: "5日",
              value: "05",
            },
            {
              label: "6日",
              value: "06",
            }, {
              label: "7日",
              value: "07",
            }, {
              label: "8日",
              value: "08",
            }, {
              label: "9日",
              value: "09",
            }, {
              label: "10日",
              value: "10",
            }, {
              label: "11日",
              value: "11",
            }, {
              label: "12日",
              value: "12",
            }, {
              label: "13日",
              value: "13",
            }, {
              label: "14日",
              value: "14",
            }, {
              label: "15日",
              value: "15",
            }, {
              label: "16日",
              value: "16",
            }, {
              label: "17日",
              value: "17",
            }, {
              label: "18日",
              value: "18",
            }, {
              label: "19日",
              value: "19",
            }, {
              label: "20日",
              value: "20",
            }, {
              label: "21日",
              value: "21",
            }, {
              label: "22日",
              value: "22",
            }, {
              label: "23日",
              value: "23",
            }, {
              label: "24日",
              value: "24",
            }, {
              label: "25日",
              value: "25",
            }, {
              label: "26日",
              value: "26",
            }, {
              label: "27日",
              value: "27",
            }, {
              label: "28日",
              value: "28",
            }, {
              label: "29日",
              value: "29",
            },
            {
              label: "30日",
              value: "30",
            },
          ],
        },
        {
          label: "十月",
          value: "10",
          children: [
            {
              label: "1日",
              value: "01",
            },
            {
              label: "2日",
              value: "02",
            },
            {
              label: "3日",
              value: "03",
            },
            {
              label: "4日",
              value: "04",
            },
            {
              label: "5日",
              value: "05",
            },
            {
              label: "6日",
              value: "06",
            }, {
              label: "7日",
              value: "07",
            }, {
              label: "8日",
              value: "08",
            }, {
              label: "9日",
              value: "09",
            }, {
              label: "10日",
              value: "10",
            }, {
              label: "11日",
              value: "11",
            }, {
              label: "12日",
              value: "12",
            }, {
              label: "13日",
              value: "13",
            }, {
              label: "14日",
              value: "14",
            }, {
              label: "15日",
              value: "15",
            }, {
              label: "16日",
              value: "16",
            }, {
              label: "17日",
              value: "17",
            }, {
              label: "18日",
              value: "18",
            }, {
              label: "19日",
              value: "19",
            }, {
              label: "20日",
              value: "20",
            }, {
              label: "21日",
              value: "21",
            }, {
              label: "22日",
              value: "22",
            }, {
              label: "23日",
              value: "23",
            }, {
              label: "24日",
              value: "24",
            }, {
              label: "25日",
              value: "25",
            }, {
              label: "26日",
              value: "26",
            }, {
              label: "27日",
              value: "27",
            }, {
              label: "28日",
              value: "28",
            }, {
              label: "29日",
              value: "29",
            },
            {
              label: "30日",
              value: "30",
            },
          ],
        },
        {
          label: "十一月",
          value: "11",
          children: [
            {
              label: "1日",
              value: "01",
            },
            {
              label: "2日",
              value: "02",
            },
            {
              label: "3日",
              value: "03",
            },
            {
              label: "4日",
              value: "04",
            },
            {
              label: "5日",
              value: "05",
            },
            {
              label: "6日",
              value: "06",
            }, {
              label: "7日",
              value: "07",
            }, {
              label: "8日",
              value: "08",
            }, {
              label: "9日",
              value: "09",
            }, {
              label: "10日",
              value: "10",
            }, {
              label: "11日",
              value: "11",
            }, {
              label: "12日",
              value: "12",
            }, {
              label: "13日",
              value: "13",
            }, {
              label: "14日",
              value: "14",
            }, {
              label: "15日",
              value: "15",
            }, {
              label: "16日",
              value: "16",
            }, {
              label: "17日",
              value: "17",
            }, {
              label: "18日",
              value: "18",
            }, {
              label: "19日",
              value: "19",
            }, {
              label: "20日",
              value: "20",
            }, {
              label: "21日",
              value: "21",
            }, {
              label: "22日",
              value: "22",
            }, {
              label: "23日",
              value: "23",
            }, {
              label: "24日",
              value: "24",
            }, {
              label: "25日",
              value: "25",
            }, {
              label: "26日",
              value: "26",
            }, {
              label: "27日",
              value: "27",
            }, {
              label: "28日",
              value: "28",
            }, {
              label: "29日",
              value: "29",
            },
            {
              label: "30日",
              value: "30",
            },
          ],
        },
        {
          label: "十二月",
          value: "12",
          children: [
            {
              label: "1日",
              value: "01",
            },
            {
              label: "2日",
              value: "02",
            },
            {
              label: "3日",
              value: "03",
            },
            {
              label: "4日",
              value: "04",
            },
            {
              label: "5日",
              value: "05",
            },
            {
              label: "6日",
              value: "06",
            }, {
              label: "7日",
              value: "07",
            }, {
              label: "8日",
              value: "08",
            }, {
              label: "9日",
              value: "09",
            }, {
              label: "10日",
              value: "10",
            }, {
              label: "11日",
              value: "11",
            }, {
              label: "12日",
              value: "12",
            }, {
              label: "13日",
              value: "13",
            }, {
              label: "14日",
              value: "14",
            }, {
              label: "15日",
              value: "15",
            }, {
              label: "16日",
              value: "16",
            }, {
              label: "17日",
              value: "17",
            }, {
              label: "18日",
              value: "18",
            }, {
              label: "19日",
              value: "19",
            }, {
              label: "20日",
              value: "20",
            }, {
              label: "21日",
              value: "21",
            }, {
              label: "22日",
              value: "22",
            }, {
              label: "23日",
              value: "23",
            }, {
              label: "24日",
              value: "24",
            }, {
              label: "25日",
              value: "25",
            }, {
              label: "26日",
              value: "26",
            }, {
              label: "27日",
              value: "27",
            }, {
              label: "28日",
              value: "28",
            }, {
              label: "29日",
              value: "29",
            },
            {
              label: "30日",
              value: "30",
            },
          ],
        },
      ],
    }
  },
  methods: {
    search() {
      axios({
        method: 'POST',
        url: '/rider/getHistoryOrderByTime?time1=' + this.time1 + "&time2=" + this.time2,
      })
          .then((res) => {
            if (res.data.status === 0) {
              this.tableData = res.data.data;
            } else {
              console.log(res.data.msg);
            }
          })
    },
    flash() {
      axios({
        method: 'GET',
        url: '/rider/getAllHistoryOrder?riderName=' + this.id,
      })
          .then((res) => {
            console.log("History Order");
            console.log(res.data.data);
            if (res.data.status === 0) {
              this.tableData = res.data.data
            } else {
              this.$alert(res.data.msg, '错误信息');
            }
          })
    }
  },
  created() {
    axios({
      method: 'GET',
      url: '/rider/getAllHistoryOrder?riderName=' + this.id,
    })
        .then((res) => {
          if (res.data.status === 0) {
            this.tableData = res.data.data
          } else {
            this.$alert(res.data.msg, '错误信息');
          }
        })
  },
}

</script>

<style scoped>
.header {
  margin-bottom: 1em;
}

.container {
  overflow: auto;
  height: 32em;
}

.orderOutComplete {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  margin-bottom: 1em;
  padding-left: 1em;
  text-align: left;
  background-color: #34C471;
  line-height: 2em;
  border-radius: 2em;

}

.orderOutUnComplete {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  margin-bottom: 1em;
  padding-left: 1em;
  text-align: left;
  background-color: #c5c6c7;
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