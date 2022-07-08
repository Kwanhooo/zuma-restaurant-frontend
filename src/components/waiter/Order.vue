<template>
  <div id="color-wrapper" class="fadeIn">
    <div id="order-wrapper">
      <div class="side-bar">
        <div style="background: white;border-radius: 30px;height: auto;position: absolute;top: 20px;">
          <nav class="navigation">
            <ul v-for="(type,index) in typeList" :key="index">
              <li style="margin: 10px 0;">
                <button @click.prevent="handleJump(type.type,index)"
                        :class="{active:currentIndex===index,NavigatorBtn:true}">
                  {{ type.text }}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="main-content" v-for="(type,index) in typeList" :key="index">
        <section :id="type.type">
          <FoodPage :foodType="type"></FoodPage>
        </section>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import FoodPage from "@/components/waiter/FoodPage";
import axios from "axios";
// import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Order",
  components: {FoodPage},
  data() {
    return {
      typeList: [],
      foodData: [],
      currentIndex: 0,
    }
  },
  methods: {
    handleJump(type, index) {
      console.log('index:' + index);
      this.$el.querySelector('#' + type).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
      this.currentIndex = index;
      console.log('currentIndex:' + this.currentIndex);
    },
  },
  created() {
    //TODO: 从后端获取对应typeList
    axios({
      method: "get",
      url: "/serve/viewFoodType",
    }).then((response) => {
      this.typeList = response.data.data;
    });
    // 从后端获取对应foodData
    axios({
      method: "get",
      url: "/serve/viewFood",
    }).then((response) => {
      this.foodData = response.data;
    });
  }
}
</script>

<style scoped>
/*滚动条样式重写*/
#order-wrapper::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: #F5F5F5;
}

#order-wrapper::-webkit-scrollbar {
  width: 12px;
  background-color: #F5F5F5;
}

#order-wrapper::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}

/**************/

/* 通用 */
#color-wrapper {
  /*height: 95%;*/
  border-radius: 30px;
  margin: 20px 20px 20px 20px;

  background: #F1FBFE;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.09);
}

#order-wrapper {
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 810px;
}

.NavigatorBtn {
  width: 110px;
  height: 50px;
  margin: 0 10px 0 10px;
  border: 3px;
  border-radius: 30px;

  font-size: 17px;

  transition-duration: 0.6s;
  background-color: #F1FBFE;
  color: #1383B6;

  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.06);
}

.NavigatorBtn:hover {
  background-color: #1383B6;
  color: #F1FBFE;

}

.active {
  background-color: #1383B6;
  color: #F1FBFE;
}

/***********/

/* 导航组件 */
/** {*/
/*  box-sizing: border-box*/
/*}*/

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Montserrat', sans-serif;
}

.side-bar {
  width: 160px;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

nav ul {
  padding: 0;
}

nav li {
  list-style: none;
}

nav li a {
  text-decoration: none;
  color: #333;
  display: block;
  padding: 0.6rem 0.3rem;
  font-weight: 400;
  transition: all ease-out 250ms;
}

nav li a:hover {
  color: lime;
}

.main-content {
  margin-left: 160px;
}

section {
  background-color: #f3f6fd;
  /*height: 100%;*/
  min-height: 500px;
  margin: 0;
  padding: 2.5rem 4rem;
}

/*section:nth-of-type(2n) {*/
/*  background-color: #ccc;*/
/*}*/

/*section:last-of-type {*/
/*  height: 100vh;*/
/*}*/

h1 {
  color: #444;
  font-weight: 600;
}


/***********/


/* 动画部分 */
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


/**********/
</style>