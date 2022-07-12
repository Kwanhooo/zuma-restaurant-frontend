<template>
  <div class="container">
    <div class="noticeItem" v-for="item in tableData" :key="item">
      <div class="id"><h1><b>
        编号:{{ item.noticeId }}
      </b></h1></div>
      <div class="noticeReceiver">
        发出者:{{ item.noticeReceiver }}
      </div>
      <div class="noticeSource">
        接收者:{{ item.noticeSource }}
      </div>
      <div class="noticeTime">
        时间:{{ item.noticeTime }}
      </div>
      <div class="text">
        内容:{{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RiderNotice",
  data() {
    return {
      tableData: [
        {
          noticeId: "10001",
          noticeSource: "经理",
          noticeReceiver: "所有人",
          noticeTime: "2022-07-08 14:32:26",
          text: "这是谁写的shishan，有1400行？？"
        },
      ]
    }
  },
  created() {
    axios({
      method: 'POST',
      url: '/rider/getNotice'
    })
        .then((res) => {
          if (res.data.status === 0) {
            this.tableData = res.data.data
          } else {
            this.$alert(res.data.msg, '错误信息');
          }
        })
  }

}
</script>

<style scoped>
.noticeItem {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  margin-bottom: 1em;
  padding-left: 1em;
  text-align: left;
  background-color: #5fbae9;
  line-height: 2em;
  border-radius: 2em;
}

.container {
  overflow: auto;
  height: 32em;
}
</style>