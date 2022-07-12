<template>
  <div id="on-going-item-wrapper">
    <template v-for="(data,index) in dinner" :key="index">
      <MobileOrderItem :display-food="data.food" :type-of-food="data.typeOfFood"
                       :food-status="data.status" :food-amount="data.amount" :ordered-time="data.orderedTime"
                       :indexOfFood="index">

      </MobileOrderItem>
    </template>
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
    };
  },
  methods: {},
  created() {
    axios({
      url: "/customer/viewDinner/" + sessionStorage.getItem('tableID'),
      method: "GET",
    }).then((res) => {
      this.dinner = res.data.data;
    });
  }
}
</script>

<style scoped>
#on-going-item-wrapper {
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>