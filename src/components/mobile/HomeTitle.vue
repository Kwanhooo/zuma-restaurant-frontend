<template>
  <div id="title-wrapper">
    <span>{{ restaurantName }}</span>
  </div>
  <div>
  </div>
</template>

<script>
export default {
  name: "HomeTitle",
  data() {
    return {
      restaurantName: "条野太郎日料",
    }
  },
  methods: {

  }, created() {
    // 从后端获取数据
  }
}
</script>

<style scoped>
#title-wrapper{
  font-size: 20px;
  font-weight: bold;
  color: #333;
}
</style>