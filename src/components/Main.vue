<template>
  <div id="wrapper">
    <div id="topBar">
      <div id="topBar-left">
        <img id="topBar-logo" style="height: 90px;width: 90px;" src="../assets/img/logo.webp" alt="logo"/>
        <span id="topBar-restaurant-name">Zuma Restaurant</span>
      </div>
      <div id="topBar-right">
        <div class="MenuContent">
          <span style="color: var(--blue)">{{ restaurantName }}</span>
          |
          <span>
            <a style="color:var(--danger);" @click.prevent="logout()">注销🚪</a>
          </span>
          |
          <span style="color: #3f3f3f">{{ getUserID() }}</span>
        </div>
      </div>
    </div>
    <div id="content">
      <div id="navigator">
        <dock-item :dockItems="dockItems"></dock-item>
      </div>
      <div id="module-wrapper">
        <router-view></router-view>
      </div>
      <div id="statistics-wrapper">
        <router-view name="content-right"></router-view>
      </div>
    </div>
    <div id="bottomBar">
      <BottomBar></BottomBar>
    </div>
  </div>
</template>

<script>
import DockItem from "@/components/LeftDock";
import BottomBar from "@/components/BottomBar";
import axios from "axios";


export default {
  name: "global-frame",
  components: {
    // WaiterStatistics,
    DockItem,
    BottomBar,
  },
  data() {
    return {
      restaurantName: "卖当牢铁道学院店",
      dockItems: [
        {
          routeTo: '/dashboard/waiter',
          img: 'https://cdn4.iconfinder.com/data/icons/eon-ecommerce-i-1/32/home_house_desktop_dashboard-512.png',
          toolTips: 'dashboard',
          role: 'waiter',
        },
        {
          routeTo: '/order',
          img: 'https://cdn4.iconfinder.com/data/icons/e-commerce-lineart/48/Artboard_4-512.png',
          toolTips: 'order',
          role: 'waiter',
        },
        {
          routeTo: '/front/checkOut',
          img: 'https://cdn3.iconfinder.com/data/icons/finance-business-15/91/Finance__Business_09-512.png',
          toolTips: 'checkOut',
          role: 'waiter'
        },
        {
          routeTo: '/notice/waiter',
          img: 'https://cdn4.iconfinder.com/data/icons/media-icons-23/24/24pt_bell-512.png',
          toolTips: 'notice',
          role: 'waiter',
        },
        {
          routeTo: '/calling/waiter',
          img: 'https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-01-512.png',
          toolTips: 'calling',
          role: 'waiter',
        },
        {
          routeTo: '/user/waiter',
          img: 'https://cdn2.iconfinder.com/data/icons/user-set-1-line/32/Interface_user_about_me_computer_person_3-512.png',
          toolTips: 'user',
          role: 'waiter',
        },
        {
          routeTo: '/dashboard/kitchen',
          img: 'https://cdn4.iconfinder.com/data/icons/eon-ecommerce-i-1/32/home_house_desktop_dashboard-512.png',
          toolTips: 'dashboard',
          role: 'kitchen'
        },
        {
          routeTo: '/user',
          img: 'https://cdn2.iconfinder.com/data/icons/user-set-1-line/32/Interface_user_about_me_computer_person_3-512.png',
          toolTips: 'user',
          role: 'kitchen'
        },
        {
          routeTo: '/notice',
          img: 'https://cdn4.iconfinder.com/data/icons/media-icons-23/24/24pt_bell-512.png',
          toolTips: 'notice',
          role: 'kitchen'
        },
        {
          routeTo: '/dashboard/front',
          img: 'https://cdn4.iconfinder.com/data/icons/eon-ecommerce-i-1/32/home_house_desktop_dashboard-512.png',
          toolTips: 'dashboard',
          role: 'front'
        },
        {
          routeTo: '/front/viewOrder',
          img: 'https://cdn1.iconfinder.com/data/icons/pixa-vol-1/160/blockchain-1-512.png',
          toolTips: 'viewOrder',
          role: 'front'
        },
        {
          routeTo: '/front/viewUser',
          img: 'https://cdn4.iconfinder.com/data/icons/zeir-miscellaneous-007/64/admin_user_edit_config-256.png',
          toolTips: 'viewUser',
          role: 'front'
        },
        {
          routeTo: '/front/viewNotice',
          img: 'https://cdn4.iconfinder.com/data/icons/media-icons-23/24/24pt_bell-512.png',
          toolTips: 'viewNotice',
          role: 'front'
        },
        {
          routeTo: '/front/checkOut',
          img: 'https://cdn3.iconfinder.com/data/icons/finance-business-15/91/Finance__Business_09-512.png',
          toolTips: 'checkOut',
          role: 'front'
        },
        {
          routeTo: '/front/viewFood',
          img: 'https://cdn0.iconfinder.com/data/icons/food-1216/24/rice-bowl-nutrition-food-512.png',
          toolTips: 'viewFood',
          role: 'front'
        },
        {
          routeTo: '/front/viewEvaluation',
          img: 'https://cdn1.iconfinder.com/data/icons/shopping-346/24/rating-rate-hand-star-512.png',
          toolTips: 'viewEvaluation',
          role: 'front'
        },
        {
          routeTo: '/dashboard/rider',
          img: 'https://cdn1.iconfinder.com/data/icons/pixa-vol-1/160/blockchain-1-512.png',
          toolTips: 'dashboard',
          role: 'rider'
        },
      ],
      statistics: [],
      //TODO:userInfo应该从后台获取，而不是在这里定义
      userinfo: {role: 'waiter'},
    };
  },
  methods: {
    logout() {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('role');
      window.location.href = '/auth';
    },
    getUserID(){
      return sessionStorage.getItem('userId');
    },
    // 向后端拉取用户信息
    getInfos() {
      axios.all([
        axios.get("/api/user/info"),
        axios.get("/api/statistics"),
      ]).then(axios.spread((userinfo, statistics) => {
        this.userinfo = userinfo.data;
        this.statistics = statistics.data;
      }));
    }
  },
  created() {
    this.$router.push("/dashboard");
    // TODO:暂时由data的userinfo指定角色，生产环境下解除这个注释
    // this.getInfos();
    // 将页面标题改为Zuma
    document.title = '管理系统 - Zuma Restaurant';
  }
}

</script>

<style>
body {
  background-color: #f3f6fd;
}


#wrapper {
  background: #f3f6fd;
  /*overflow: hidden;*/
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 20px;
  right: 20px;
  bottom: 0;
  margin-left: 0;
  margin-right: 0;
  width: auto;
  height: 100%;
}

#topBar {
  order: 1;
  display: flex;
  flex-direction: row;
  height: 120px;
  background: #f3f6fd;
}

#topBar-left {
  order: 1;
  width: 1000px;
  height: 100%;
  background: #f3f6fd;

  display: flex;
  flex-direction: row;
}

#topBar-logo {
  order: 1;
  margin-top: 10px;
  margin-left: 5px;
}

#topBar-restaurant-name {
  order: 2;
  margin-top: 33px;
  margin-left: 30px;
  font-size: 40px;

  font-family: "Times New Roman", Times, serif;
  font-style: italic;
  font-weight: bold;
  color: #795548;
}

#topBar {
  margin: 0;
  order: 1;
  bottom: 0;
}

.MenuContent {
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
  margin-right: 60px;
  float: right;
}

#topBar-right {
  position: relative;
  order: 2;
  height: 100%;
  flex: auto;
  background: #f3f6fd;
}

.MenuContent {
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
  margin-right: 60px;
  float: right;
}

#content {
  order: 2;
  flex: 1;
  display: flex;
  flex-direction: row;
  background: #f3f6fd;
}

#navigator {
  order: 1;
  width: 5%;
  background: #ffffff;
  border-radius: 20px;
}

#module-wrapper {
  order: 2;
  margin-left: 17px;
  margin-right: 17px;
  height: 100%;
  width: 55%;
  flex: auto;
  background: #ffffff;
  border-radius: 30px;
}


#statistics-wrapper {
  max-width: 360px;

  order: 3;
  height: 100%;
  width: auto;
  flex: auto;
  background: #ffffff;
  border-radius: 30px;
}

#bottomBar {
  order: 3;
  margin-top: 17px;
  margin-bottom: 17px;
  height: 70px;
  background: #ffffff;
  border-radius: 30px;
}

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
</style>
