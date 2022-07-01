<!--Author:Kwanho-->
<!--Date:2022-06-30-->
<!--Description:认证组件，注入在App.vue根组件中-->
<template>
  <div class="wrapper fadeInDown">
    <h2 v-if="isErr" style="color: coral">{{ errInfo }}</h2>
    <div id="formContent">
      <h2 :class="{active:isLogin,inactive:!isLogin,underlineHover:!isLogin,} " @click="isLogin=true;"> 登入 </h2>
      <h2 :class="{active:!isLogin,inactive:isLogin, underlineHover:isLogin}" @click="isLogin=false;">注册 </h2>
      <div id="loginView" v-if="isLogin">
        <div class="fadeIn first">
          <img src="../assets/img/logo.webp"
               style="max-width: 200px; height: auto; width: auto;padding-bottom: 20px;padding-top: 30px;" id="icon"
               alt="Icon"/>

          <div style="font-family: 'Times New Roman',serif;font-size: 25px;font-style: italic;margin-bottom: 20px;">
            <b>Zuma</b> Restaurant
          </div>
        </div>

        <form>
          <input type="text" id="login" class="fadeIn second" name="login" placeholder="💳  账号" v-model="username">
          <input type="password" id="password" class="fadeIn third" name="login" placeholder="🔑  密码"
                 v-model="password">
          <input type="submit" class="fadeIn fourth" value="登录" @click.prevent="userLogin()">
        </form>

        <div id="formFooter">
          <a class="underlineHover" href="#">需要帮助?</a>
        </div>
      </div>
      <div id="registerView" v-if="!isLogin">
        <div style="font-family: 'Times New Roman',serif;font-size: 25px;margin-bottom: 20px;">
          <b>用户注册</b>
          <p></p>
          <form>
            <input type="text" id="username" class="fadeIn second" name="register" placeholder="🧊  用户名" v-model="username">
            <input type="text" id="telephone" class="fadeIn second" name="register" placeholder="📞 电话号码" v-model="telephone">
            <input type="password" id="firstPassword" class="fadeIn third" name="register" placeholder="🔑  密码"
                   v-model="password">
            <input type="password" id="confirmPassword" class="fadeIn third" name="register" placeholder="🔑  确认密码"
                   v-model="confirmPassword"  v-on:blur="judgePwd()">
            <div v-if="judgePwdStatus" style="color:green;font-size:14px;">{{}}</div>
            <div v-else style="color:red;font-size:14px">❌{{judgePwdMsg}}</div>
            <input type="submit" class="fadeIn fourth" value="员工注册" @click.prevent="userRegister()">
            <input type="submit" class="fadeIn fourth" value="顾客注册" @click.prevent="userRegister()" style="background-color: #ff6600;">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Authenticator",
  data() {
    return {
      isLogin: true,
      username: "",
      password: "",
      telephone:"",
      isErr: false,
      errInfo: "",
      confirmPassword:"",
      judgePwdMsg:"",
      pwdSafetyStatus:0,
      judgePwdStatus:true,
    };
  },
  methods: {
    userLogin() {
      // 将账号和密码Post到服务器，并获取token
      axios({
        method: "post",
        url: "/api/login",
        data: {
          username: this.username,
          password: this.password,
        },
      })
          .then((res) => {
            if (res.data.code === 0) {
              // 登录成功，将token存入本地存储
              localStorage.setItem("token", res.data.token);
              // 跳转到首页
              this.$router.push("/home");
            } else {
              // 登录失败，提示错误信息
              this.errInfo = res.data.msg;
              this.isErr = true;
            }
          })
          .catch((err) => {
            console.log(err);
          });
    },
    judgePwd() {
      //判断密码和二次输入密码是否一致
      if(this.password===this.confirmPassword){
        //如果相等
        this.judgePwdStatus=true;
        this.judgePwdMsg="两次密码一致";
      }
      else{
        this.judgePwdStatus=false;
        this.judgePwdMsg="两次密码不一致，请检查！";
      }
    },
    userRegister() {
      if(!this.judgePwdStatus){
        alert("请保证两次密码一致！");
        return;
      }

      // 将账号和密码Post到服务器，并获取token
      axios({
        method: "post",
        url: "/api/register",
        data: {
          username: this.username,
          password: this.password,
          telephone:this.telephone,
        },
      })
          .then((res) => {
            if (res.data.code === 0) {
              // 登录成功，将token存入本地存储
              localStorage.setItem("token", res.data.token);
              // 跳转到首页
              this.$router.push("/home");
            } else {
              // 登录失败，提示错误信息
              this.errInfo = res.data.msg;
              this.isErr = true;
            }
          })
          .catch((err) => {
            console.log(err);
          });
    },

  },
  created() {
    //  把页面标题改为登录
    document.title = "登入 - Zuma Restaurant";
  },
}
</script>

<style scoped>
html {
  background-color: #56baed;
}

body {
  font-family: "Poppins", sans-serif;
  height: 100vh;
}

a {
  color: #92badd;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
}

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  margin: 40px 8px 10px 8px;
  color: #cccccc;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}


/* 总体结构 */

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;

}

#formContent {
  margin-top: 60px;
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}


/* 标签页样式 */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}


/* 表单样式 */

input[type=button], input[type=submit], input[type=reset] {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 16px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 20px 20px 30px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover {
  background-color: #39ace7;
}

input[type=button]:active, input[type=submit]:active, input[type=reset]:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type=text] {
  background-color: #f6f6f6;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type=text]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type=text]::placeholder {
  color: #cccccc;
}

input[type=password] {
  background-color: #f6f6f6;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type=password]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type=password]::placeholder {
  color: #cccccc;
}

/* 动画 */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
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

  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after {
  width: 100%;
}


/* 其它控制 */
*:focus {
  outline: none;
}

#icon {
  width: 60%;
}

* {
  box-sizing: border-box;
}
</style>