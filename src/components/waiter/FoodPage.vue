<template>
  <div class="TypeTitle">
    {{ foodType.text }}
  </div>
  <hr>
  <div class="ItemsWrapper">
    <template v-for="(food,index) in foodsInThisType" :key="index">
      <FoodItem :food="food" :index="index"></FoodItem>
    </template>
  </div>
</template>

<script>
import FoodItem from "@/components/waiter/FoodItem";
import axios from "axios";

export default {
  name: "FoodPage",
  data() {
    return {
      foodsInThisType: [],
    }
  },
  methods: {
    amountChanged(sourceFood, newAmount) {
      console.log(sourceFood)
      console.log(newAmount)
      if (newAmount === 0)
        this.orderMap.delete(sourceFood);
      else
        this.orderMap.set(sourceFood, newAmount);
    },
    getFoodsByType(foodType) {
      const vm = this;
      axios({
        method: "get",
        url: "/serve/viewOneTypeOfFood/" + foodType,
      }).then((response) => {
        vm.foodsInThisType = response.data.data;
        vm.foodsInThisType.forEach((food) => {
          food.type = vm.foodType;
        });
      });
    },
  },
  components: {FoodItem},
  props: {
    foodType: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.getFoodsByType(this.foodType.type);
  }
}

</script>

<style scoped>
.TypeTitle {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 10px;
}

.ItemsWrapper {

}
</style>