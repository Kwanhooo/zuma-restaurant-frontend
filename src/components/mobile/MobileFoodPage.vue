<template>
  <div class="TypeTitleBar">
    <div>{{ this.$props.displayType.text }}</div>
  </div>
  <template v-for="(food,index) in foodsOfThisType" :key="index">
    <MobileFoodItem :display-food="food" :type-of-food="this.displayType"></MobileFoodItem>
  </template>
</template>

<script>
import axios from "axios";
import MobileFoodItem from "@/components/mobile/MobileFoodItem";

export default {
  name: "MobileFoodPage",
  components: {MobileFoodItem},
  data() {
    return {
      foodsOfThisType: [],
    }
  },
  methods: {
    loadFoodsWithType() {
      const vm = this;
      axios({
        method: "get",
        url: "/serve/viewOneTypeOfFood/" + this.$props.displayType.type,
      }).then((response) => {
        vm.foodsOfThisType = response.data.data;
        vm.foodsOfThisType.forEach((food) => {
          food.type = vm.foodType;
        });
      });
    }
  },
  props: {
    displayType: {
      type: Object,
      required: true,
    },
    displayIndex: {
      type: Number,
      required: true,
    },
  },
  created() {
    this.loadFoodsWithType();
  }
}
</script>

<style scoped>
.TypeTitleBar {
  margin: 0.5rem 0.5rem;
}
</style>