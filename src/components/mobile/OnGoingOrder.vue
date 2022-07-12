<template>
  <div id="on-going-item-wrapper">
    <div class="NoOnGoingWrapper" v-if="this.dinner.length === 0">
      暂无已点的食物...
    </div>
    <template v-for="(data,index) in dinner" :key="index">
      <MobileOrderItem :foodName="data.name" :description="data.description"
                       :likenumber="data.likenumber" :dislikenumber="data.dislikenumber"
                       :price="data.price" :imgSrc="data.imgSrc"
                       :indexOfFood="index" :if-completed="data.ifCompleted">
      </MobileOrderItem>
    </template>
  </div>
  <hr v-if="dinner.length !== 0">
  <div id="urge-wrapper">
    <button class="UrgeBtn" @click="urge()">
      <svg t="1657639651727" class="UrgeIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
           p-id="1574" width="200" height="200">
        <path
            d="M511.998465 2.018983C229.745033 2.018983 1.009492 230.816946 1.009492 513.007957c0 282.193057 228.734518 510.992043 510.99102 510.992043 282.251386 0 510.992043-228.798986 510.992043-510.992043C1022.990508 230.816946 794.251897 2.018983 511.998465 2.018983zM718.96419 520.743128 327.300906 896.252501l105.72595-305.267589-112.64964-76.599585L564.704874 193.640232l202.790636 70.737064L599.385744 439.654298 718.96419 520.743128z"
            p-id="1575" fill="#df3b88"></path>
      </svg>
    </button>
  </div>
  <div id="on-going-total-price-wrapper" v-if="dinner.length !== 0">
    <span style="color: #0d0d0d">总计：￥ </span>{{ totalPrice }}
  </div>
</template>

<script>
import MobileOrderItem from "@/components/mobile/MobileOrderItem";
import axios from "axios";

export default {
  name: "OnGoingOrder",
  components: {MobileOrderItem},
  data() {
    return {
      dinner: [],
      OrderList: [],
      totalPrice: "",
    };
  },
  methods: {
    getOnGoing() {
      axios({
        url: "/customer/viewDinner/" + sessionStorage.getItem('tableID'),
        method: "GET",
      }).then((res) => {
        this.dinner = res.data.data;
        if (res.data.msg !== "this table is not used")
          this.totalPrice = res.data.msg;
        else this.totalPrice = "";
        console.log(this.dinner);
      });
    },
    urge() {
      const vm = this;
      axios({
        url: "/customer/urgeFood?table=" + sessionStorage.getItem('tableID'),
        method: "POST",
      }).then(() => {
        vm.$message.success('已催单，请耐心等待哦 ~');
      });
    },
  },
  created() {
    this.getOnGoing();
  }
}
</script>

<style scoped>
#on-going-item-wrapper {
  height: 72vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

.NoOnGoingWrapper {
  text-align: center;
  font-size: 1.3rem;
  margin-top: 1rem;
}

#on-going-total-price-wrapper {
  float: right;

  font-size: 1.3rem;
  font-weight: bold;
  color: #dc3545;
}

#urge-wrapper {
  display: inline-block;
  margin-left: 0.5rem;
}

.UrgeBtn {
  margin: 0;
  border: 3px;
  border-radius: 1.35rem;
  width: 2.7rem;
  height: 2.7rem;
  font-size: 0.9rem;

  transition-duration: 0.4s;
  background-color: #FFEDF3;
  color: #DF3B88;
}

.UrgeIcon {
  height: 90%;
  width: 90%;
  margin-right: 5%;
  margin-top: 5%;
}
</style>