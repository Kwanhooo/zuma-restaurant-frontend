<template>
  <div id="mobile-purchase">
    <div id="mobile-purchase-nav">
      <ul class="mobile-purchase-nav-ul">
        <li v-for="(type,index) in typeList" :key="index">
          <button :class="{MobilePurchaseNavBtn:true,MobilePurchaseNavBtnActive:currentIndex===index}"
                  @click.prevent="handleAnchorClick(index)">
            {{ type.text }}
          </button>
        </li>
      </ul>
    </div>
    <div id="mobile-purchase-content">
      <div class="MobileFoodPage" :id="type.type" v-for="(type,index) in typeList" :key="index">
        <MobileFoodPage :displayType="type" :displayIndex="index"></MobileFoodPage>
      </div>
      <div class="PagePlaceHolder"></div>
    </div>
  </div>
</template>

<script>
import MobileFoodPage from "@/components/mobile/MobileFoodPage";
import axios from "axios";

export default {
  name: "MobileHomeOrder",
  components: {MobileFoodPage},
  data() {
    return {
      typeList: [],
      currentIndex: 0,
    }
  },
  methods: {
    handleAnchorClick(index) {
      this.$el.querySelector('#' + this.typeList[index].type).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
      this.currentIndex = index;
    }
  },
  created() {
    console.log("Purchase created");
    axios({
      method: "get",
      url: "/serve/viewFoodType",
      headers: {
        "token": sessionStorage.getItem('token')
      },
    }).then((response) => {
      this.typeList = response.data.data;
    });
  }
}
</script>

<style scoped>
#mobile-purchase {
  display: flex;
  flex-direction: row;

  height: 100%;
}

#mobile-purchase-nav {
  flex: 1.0;

  max-height: calc(100vh - 184px);
  overflow-x: hidden;
  overflow-y: scroll;
  /*在右侧加一条边框*/
  border-right: 1px solid #e5e5e5;
}

.mobile-purchase-nav-ul {
  height: 100%;
  width: 100%;
}

ul {
  list-style: none;
  padding: 0;
}

.MobilePurchaseNavBtn {
  /*width: 70px;*/
  width: 95%;
  height: 40px;
  margin: 5px 0;
  border: 3px;
  border-radius: 30px;

  font-size: 0.9em;

  transition-duration: 0.6s;
  /*padding: 5px 5px;*/
  background-color: #F1FBFE;
  color: #1383B6;

  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.06);
}

.MobilePurchaseNavBtn:hover {
  background-color: #1383B6;
  color: #F1FBFE;

}

.MobilePurchaseNavBtnActive {
  background-color: #1383B6;
  color: #F1FBFE;
}

#mobile-purchase-content {
  flex: 4.0;

  max-height: calc(100vh - 184px);
  overflow-x: hidden;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
}

.MobileFoodPage {
  flex: 1.0;
  /*min-height: 400px;*/
}

.PagePlaceHolder {
  /*min-height: 100px;*/
}
</style>