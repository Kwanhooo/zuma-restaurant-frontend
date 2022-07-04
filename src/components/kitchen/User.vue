<template>
  <div class="user">
    <div class="categoryTitle" align="center">📃 账号信息</div>
    <hr style="width:80%;top:0%" >
    <div style="background: white;border-radius: 30px;margin: 20px 20px 10px 20px;height: 60%">
      <table class="userMsgForm">
        <tr>
          <td>id:</td>
          <td>{{id}}</td>
        </tr>
        <tr>
          <td>用户名:</td>
          <td>{{userId}}</td>
        </tr>
        <tr>
          <td>电话:</td>
          <td>{{phone}}</td>
        </tr>
      </table>
    </div>
  </div>

  <div class="changePhone">
    <div class="categoryTitle" align="center">💾 修改电话</div>
    <hr style="width:80%" >
    <div style="background: white;border-radius: 30px;margin: 20px 20px 10px 20px;height: 60%">
      <br>
      <input class="phoneText" type="text" v-text="phone">
      <br><br>
      <button class="changePhoneBtm" @click.prevent="">确定</button>
    </div>
  </div>

  <div class="other">
    <div class="categoryTitle" align="center">📎 其他操作</div>
    <hr style="width:80%" >
    <div style="background: white;border-radius: 30px;margin: 20px 20px 10px 20px;height: 60%">
      <br>
      <button class="otherBtm" @click.prevent="">修改密码</button>
      <br><br>
      <button class="otherBtm" @click.prevent="">注销</button>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "user"
}
</script>

<style scoped>

.user {
  position: relative;
  float: left;
  width: 50%;
  height: 87%;
  left: 5%;
  top: 8%;

  background: #c8f7dc;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
}

.changePhone {
  position: relative;
  float: right;
  width: 35%;
  right: 5%;
  top: 8%;
  height: 40%;
  text-align: center;
  background: #dbf6fd;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
}

.other {
  position: relative;
  float: right;
  width: 35%;
  right: 5%;
  top: 15%;
  height: 40%;
  text-align: center;
  background: #ffd7ed;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
}

.userMsgForm {
  position: relative;
  font-size: 25px;
  float: bottom;
  align-content: center;
  left: 10%;
  bottom: 0%;
  height: 60%;
  width: 80%;
}

.phoneText {
  position: relative;
  float: top;
  left: 2%;
  top: 5%;
  width: 60%;
  height: 30%;
}

.changePhoneBtm {
  position: relative;
  float: top;
  text-align: center;
  left: 2%;
  top: 8%;
  width: 40%;
  height: 30%;
  border: 3px;
  border-radius: 30px;
  transition-duration: 0.4s;
  background-color: #F1FBFE;
  color: #1383B6;
}

.changePhoneBtm:hover{
  background-color: #1383B6;
  color: #F1FBFE;
}

.otherBtm {
  position: relative;
  float: top;
  text-align: center;
  left: 2%;
  top: 5%;
  width: 60%;
  height: 30%;
  border: 3px;
  border-radius: 30px;
  transition-duration: 0.4s;
  background-color: #F6F5FE;
  color: hotpink;
}

.otherBtm:hover {
  background-color: hotpink;
  color: #F6F5FE;
}

</style>