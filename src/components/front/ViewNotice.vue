<template>
  <el-header>
    <div class="addNotice">
      <el-button type="primary" class="pushButton" @click="dialogVisible=true" round>发布新公告</el-button>
    </div>
  </el-header>
  <el-main>
    <el-table :data="tableData" height="600" style="width: 100%">
      <el-table-column prop="noticeid" label="编号" width="180"/>
      <el-table-column prop="noticesource" label="发出者" width="180"/>
      <el-table-column prop="noticereceiver" label="接收者" width="180"/>
      <el-table-column prop="noticetime" label="发出时间" width="180"/>
      <el-table-column prop="text" label="文本内容" width="580"/>
    </el-table>
  </el-main>
  <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
  >
    <span>
      <p>🤖编  号:   <el-input v-model="noticeId" placeholder="Please input" style="width:225px"/></p>
      <p>👨‍🏭发出者:   <el-select v-model="noticeSource" class="m-2" placeholder="Select" size="middle">
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select></p>
      <p>👩‍🍳接收者:   <el-select v-model="noticeReceiver" class="m-2" placeholder="Select" size="middle">
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
    />
  </el-select></p>

      <p><el-form-item label="📚内容">
      <el-input v-model="text" type="textarea"/>
    </el-form-item></p>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="pushNotice()"
        >发布</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>

import axios from "axios";

export default {
  name: "viewNotice",
  data() {
    return {
      tableData: [
        {
          noticeId: 10001,
          noticeSource: "后厨",
          noticeReceiver: "采购员",
          noticeTime: "2022-07-04 13:40:29",
          text: "猪肉要用完哩"
        }
      ],
      dialogVisible: false,
      noticeId: "",
      noticeSource: "",
      noticeReceiver: "",
      noticeTime: "",
      text: "",
      options: [
        {
          value: '前台',
          label: '前台',
          disabled: true
        },
        {
          value: '后厨',
          label: '后厨',
        },
        {
          value: '经理',
          label: '经理',
        },
        {
          value: '服务员',
          label: '服务员',
        },
        {
          value: '其他',
          label: '其他',
        },
      ]
    }
  },
  methods: {
    pushNotice() {
      JSON.stringify()
      axios({
        method: 'POST',
        url: '/front/addNotice',
        dataType:'json',
        data: {
          noticeid:this.noticeId,
          noticesource:this.noticeSource,
          noticereceiver:this.noticeReceiver,
          text:this.text,
          ifchecked:'false',
        }
      })
          .then((res) => {
            console.log(res.data);
            if (res.data.status === 0) {
              var newNotice = {
                noticeid: res.data.data.noticeid,
                noticesource: res.data.data.noticesource,
                noticereceiver: res.data.data.noticereceiver,
                noticetime: res.data.data.noticetime,
                text: res.data.data.text
              };
              this.tableData.push(newNotice);
              this.noticeId = "";
              this.noticeSource = "";
              this.noticeReceiver = "";
              this.noticeTime = "";
              this.text = "";
              this.dialogVisible = false;
            } else {
              this.$alert(res.data.msg, '发布公告', {
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
      url: '/front/viewNotice'
    })
        .then((res) => {
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

.pushButton {
  position: relative;
  left: 1150px;
  top: 35px;
}
</style>