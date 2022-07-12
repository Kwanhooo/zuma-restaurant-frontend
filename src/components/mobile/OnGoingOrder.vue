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
<!--  <hr>-->
<!--  <div id="on-going-total-price-wrapper">-->
<!--    <span style="color: #0d0d0d">总计：￥ </span>{{ totalPrice }}-->
<!--  </div>-->
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
    getOnGoing(){
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
  },
  created() {
    this.getOnGoing();
  }
}
</script>

<style scoped>
#on-going-item-wrapper {
  height: 73vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

.NoOnGoingWrapper{
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
</style>