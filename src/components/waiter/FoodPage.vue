<template>
  <div class="TypeTitle">
    {{ foodType }}
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

export default {
  name: "FoodPage",
  data() {
    return {}
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
  },
  components: {FoodItem},
  props: {
    foodType: {
      type: String,
      required: true,
    },
    foodsInThisType: {
      type: Array,
      required: true,
    },
  },
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