<!--Date:2022-06-30-->
<!--Description:认证组件，注入在App.vue根组件中-->
<template>
  <div class="wrapper fadeInDown">
    <h2 v-if="isErr" class="fadeInDown" style="color: coral;padding: 10px 20px;background: white;border-radius: 15px;">
      {{ errInfo }}</h2>
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
          <!--          <input type="submit" class="fadeIn fourth" value="登录" @click.prevent="userLogin()">-->
          <label class="dropdown">
            <div class="dd-button fadeIn fourth LoginSelect">
              登录
            </div>
            <input type="checkbox" class="dd-input" id="test">
            <ul class="dd-menu">
              <li @click="userLogin('waiter')">职工登录</li>
              <li class="divider"></li>
              <li class="admin-li" style="background: #7bcaf6" @click="userLogin('admin')">
                <a>管理员登录</a>
              </li>
            </ul>
          </label>
        </form>

        <div id="formFooter">
          <a class="underlineHover" href="#">需要帮助?</a>
        </div>
      </div>
      <div id="registerView" v-if="!isLogin">
        <div style="font-family: var(--font-family-sans-serif),serif;font-size: 25px;margin-bottom: 20px;">
          <!--          <div id="regTitle">用户注册</div>-->
          <div class="fadeIn first">
            <img src="../assets/img/register.png"
                 style="max-width: 150px; height: auto; width: auto;padding-bottom: 20px;padding-top: 30px;" id="icon"
                 alt="Icon"/>
            <div style="font-family: 'Times New Roman',serif;font-size: 25px;font-style: italic;margin-bottom: 20px;">
              <b>Zuma</b> Restaurant
            </div>
          </div>
          <form>
            <input type="text" id="username" class="fadeIn second" name="register" placeholder="🧊  用户名"
                   v-model="username">
            <input type="text" id="telephone" class="fadeIn second" name="register" placeholder="📞 电话号码"
                   v-model="telephone">
            <input type="password" id="firstPassword" class="fadeIn third" name="register" placeholder="🔑  密码"
                   v-model="password">
            <input type="password" id="confirmPassword" class="fadeIn third" name="register" placeholder="🔑  确认密码"
                   v-model="confirmPassword" v-on:blur="judgePwd()">
            <div v-if="judgePwdStatus" style="color:green;font-size:14px;">{{}}</div>
            <div v-else style="color:red;font-size:14px">❌{{ judgePwdMsg }}</div>
            <!--            <input type="submit" class="fadeIn fourth" value="员工注册" @click.prevent="userRegister()" style="width:40px;text-align:center">-->
            <!--                      <input type="submit" class="fadeIn fourth" value="顾客注册" @click.prevent="userRegister()"-->
            <!--                             style="background-color: #ff6600;width:40px;text-align:center">-->
            <!--            <input type="submit" class="fadeIn fourth" value="骑手注册" @click.prevent="userRegister()" style="width:40px;text-align:center">-->
            <el-button type="primary" class="fadeIn fourth" style="width:120px;text-align:center"
                       @click.prevent="userRegister()">员工注册
            </el-button>
            <el-button type="success" class="fadeIn fourth" style="width:120px;text-align:center"
                       @click.prevent="riderRegister()">骑手注册
            </el-button>
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
      telephone: "",
      isErr: false,
      errInfo: "",
      confirmPassword: "",
      judgePwdMsg: "",
      pwdSafetyStatus: 0,
      judgePwdStatus: true,
    };
  },
  methods: {
    userLogin(userRole) {
      const vm = this;
      // 将账号和密码Post到服务器，并获取token
      axios({
        method: "post",
        url: "/common/login",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: {
          userid: this.username,
          password: this.password,
          charactor: userRole,
        }
        ,
      }).then((res) => {
        // 获取url中的redirect参数，用于跳转到相应的页面
        if (res.data.status === 0) {
          // const redirectTo = vm.$router.currentRoute.value.query.redirect;
          // 将token存入sessionStorage
          sessionStorage.setItem("token", res.data.data);
          // 将用户角色存入sessionStorage
          sessionStorage.setItem("role", res.data.msg);
          sessionStorage.setItem("userId", this.username);
          vm.isErr = false;
          // console.log(redirectTo);
          vm.$router.push('/');
        } else {
          // 账号密码错误
          vm.isErr = true;
          vm.errInfo = res.data.msg;
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    judgePwd() {
      //判断密码和二次输入密码是否一致
      if (this.password === this.confirmPassword) {
        //如果相等
        this.judgePwdStatus = true;
        this.judgePwdMsg = "两次密码一致";
      } else {
        this.judgePwdStatus = false;
        this.judgePwdMsg = "两次密码不一致，请检查！";
      }
    },
    userRegister() {
      if (!this.judgePwdStatus) {
        alert("请保证两次密码一致！");
        return;
      }

      // 将账号和密码Post到服务器，并获取token
      axios({
        method: "post",
        url: "/user/register",
        dataType: "json",
        data: {
          userId: this.username,
          password: this.password,
          phone: this.telephone,
        }
      })
          .then((res) => {
            if (res.data.code === 0) {
              // 登录成功，将token存入本地存储
              sessionStorage.setItem("token", res.data.token);
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
    riderRegister() {
      if (!this.judgePwdStatus) {
        alert("请保证两次密码一致！");
        return;
      }

      // 将账号和密码Post到服务器，并获取token
      // JSON.stringify()
      axios({
        method: "post",
        url: "/rider/register",
        dataType: "json",
        data: {
          name: this.username,
          password: this.password,
          phone: this.telephone,
        }
      })
          .then((res) => {
            console.log(res.data);
            if (res.data.code === 0) {
              // 登录成功，将token存入本地存储
              sessionStorage.setItem("token", res.data.token);
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
    }

  },
  created() {
    //  把页面标题改为登录
    document.title = "登入 - Zuma Restaurant";
  },
}
</script>

<style scoped>
/*body {*/
/*  color: #000000;*/
/*  font-family: Sans-Serif;*/
/*  padding: 30px;*/
/*  background-color: #f6f6f6;*/
/*}*/

a {
  text-decoration: none;
  color: #000000;
}

a:hover {
  color: #222222
}

/* Dropdown */

.dropdown {
  display: inline-block;
  position: relative;
}

.dd-button {
  display: inline-block;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 10px 30px 10px 20px;
  /*background-color: #ffffff;*/
  cursor: pointer;
  white-space: nowrap;
}

.dd-button:after {
  content: '';
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid black;
}

.dd-button:hover {
  /*background-color: #3aace7;*/
}


.dd-input {
  display: none;
}

.dd-menu {
  position: absolute;
  top: 80%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0;
  margin: 0 0 0 85px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  list-style-type: none;
}

.dd-input + .dd-menu {
  display: none;
}

.dd-input:checked + .dd-menu {
  display: block;
}

.dd-menu li {
  padding: 10px 20px;
  cursor: pointer;
  white-space: nowrap;
}

.dd-menu li:hover {
  background-color: #f6f6f6;
}

.admin-li:hover {
  background-color: #3aace7;
}

.dd-menu li a {
  display: block;
  margin: -10px -20px;
  padding: 10px 20px;
}

.dd-menu li.divider {
  padding: 0;
  border-bottom: 1px solid #cccccc;
}


html {
  background-color: #f3f6fd;
}

body {
  font-family: "Poppins", sans-serif;
  height: 100vh;
}

a {
  color: #3f3f3f;
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
  margin-top: 9vh;
  margin-bottom: 0;
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
  height: 674px;
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

input[type=button], input[type=submit], input[type=reset], .LoginSelect {
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

input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover, .LoginSelect {
  background-color: #39ace7;
}

input[type=button]:active, input[type=submit]:active, input[type=reset]:active, .LoginSelect {
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

  -webkit-animation-duration: 0.5s;
  -moz-animation-duration: 0.5s;
  animation-duration: 0.5s;
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