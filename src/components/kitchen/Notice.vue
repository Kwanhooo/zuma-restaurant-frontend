<template>
  <div id="noticeList">
    <div class="noticeListTitle">📫 公告列表</div>
    <hr style="width:80%">
    <ul id="notice-ul" style="overflow:auto;max-height:580px;">
      <li style="background: white;border-radius: 30px;margin: 5px 20px 10px 0;" v-if="noticeList.length===0">
        <div style="margin-left: 20px;">
          <div>
            <div style="height: 13px;"></div>
            <span class="calling-table">暂无公告噢</span>
          </div>
          <br>
        </div>
      </li>
      <li v-for="(notice,index) in noticeList" :key="notice" class="infinite-list-item"
          style="background: white;border-radius: 30px;margin: 5px 20px 10px 0;cursor: pointer" @click.prevent="checkNotice(index)">
        <div style="margin-left: 20px;">
          <div>
            <div style="height: 30px;"></div>
            <span class="noticeTopic" style="font-size: 35px; color: #007BFF; font-weight: bold">来自：{{ notice.noticesource }}的公告</span>
            <br><br>
            <br>
            <span class="noticeTime" style="margin-left: 20px;font-style: italic">公告时间：{{ notice.noticetime }}</span>
          </div>
          <br>
        </div>
      </li>
    </ul>
  </div>
  <template v-for="(notice,index) in noticeList" :key="notice">
    <div class="noticeDetail" v-if="index == choose">
      <div class="noticeListTitle">📮 公告详情</div>
      <hr style="width:80%">
      <div class="noticeTopic" style="font-size: 50px; color: #007BFF; font-weight: bold">来自：{{ notice.noticesource }}的公告</div>
      <div class="noticeTime" style="font-size: 20px; font-style: italic">{{ notice.noticetime }}</div>
      <div class="inform" style="background: white;border-radius: 30px;margin: 20px 20px 10px 20px;height: 55%;width: 96%;overflow:auto;max-height:680px;">
        <div class="noticeContent" style="font-size: 20px;">{{ notice.text }}</div>
      </div>
      <button class="readBtm" @click.prevent="read(index)">确认</button>
    </div>
  </template>
  <div class="noticeDetail" v-if="choose === -1">
    <div class="noticeListTitle">📮 公告详情</div>
    <hr style="width:80%">
    <div class="noticeTopic" style="font-size: 50px; color: #007BFF; font-weight: bold">请选择公告</div>
    <div class="inform" style="background: white;border-radius: 30px;margin: 20px 20px 10px 20px;height: 70%;width: 96%;overflow:auto;max-height:580px;"></div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "notice",
  notice: {},
  data() {
    return{
      noticeList: [
        {noticeid: "12345", noticesource:"前台" ,text:"今天晚上十点半到会议室开会", noticetime:"2022-01-01 12:12:12"},
        {noticeid: "67890", noticesource:"前台" ,text:"国庆假期仅放1至3号，4至7号正常上班，三倍工薪，若有特殊情况需提前报备", noticetime:"2022-01-01 12:34:56"},
      ],
      choose: -1,
    }
  },
  methods: {
    checkNotice(index){
      this.choose = index;
    },
    read(index){
      this.noticeList.splice(index,1);
      if(this.noticeList.length == 0){
        this.choose=-1;
      }
      else{
        this.choose=0;
      }
    }
  },
  created() {
    axios({
      method: 'GET',
      url: '/common/viewNotice'
    })
        .then((res) => {
          console.log(res.data.data)
          if(res.data.status != 1){
            for(let i in res.data.data){
              let temp = {
                noticeid : res.data.data[i].noticeid,
                noticesource : res.data.data[i].noticesource == "front"?"前台":res.data.data[i].noticesource,
                text : res.data.data[i].text,
                noticetime : res.data.data[i].noticetime,
              }
              console.log(temp)
              this.noticeList.push(temp);
            }
          }
        })
        .catch(err => {
          //打印响应数据(错误信息)
          console.log(err);
        });
  }
}
</script>

<style scoped>

#noticeList {
  float: left;
  position: relative;
  top: 5%;
  margin-left: 4%;
  height: 90%;
  width: 28%;
  text-align: center;
  background: #d6feff;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
}

.noticeListTitle {
  margin-top: 20px;
  /*margin-left: 20px;*/
  font-size: 40px;
  font-weight: bold;
}

.noticeDetail {
  float: left;
  position: relative;
  top: 5%;
  margin-left: 4%;
  height: 90%;
  width: 60%;
  text-align: center;
  background: #fff5e2;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
}

.readBtm {
  text-align: center;
  width: 15%;
  height: 7%;
  border: 3px;
  border-radius: 30px;
  transition-duration: 0.4s;
  background-color: #fffcfb;
  color: #FFD400;
}

.readBtm:hover {
  background-color: #FFD400;
  color: #fffcfb;
}

ul {
  margin: 0;
  padding-left: 20px;
  list-style-type: none;
}

#notice-ul::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #F5F5F5;
  border-radius: 10px;
}

#notice-ul::-webkit-scrollbar {
  width: 10px;
  background-color: #F5F5F5;
}

#notice-ul::-webkit-scrollbar-thumb {
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

.calling-table {
  font-size: 25px;
  font-weight: bold;
}

</style>