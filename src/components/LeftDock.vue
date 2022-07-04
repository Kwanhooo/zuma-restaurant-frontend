<template>
  <div v-for="(item,index) in dockItems" :key="index" :class="{'navigator-item':true}">
    <button class="navigator-btn" @click.prevent="this.$router.push(item.routeTo)">
      <img :src="item.img" style="width: 50px;height: 50px;" alt="home">
      <!--      <span>{{ item.toolTips }}</span>-->
    </button>
  </div>
</template>

<script>
export default {
  name: "DockItem",
  data() {
    return {}
  },
  props: {
    dockItems: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    }
  },
}
</script>

<style scoped>
.navigator-item {
  margin-top: 25px;
  margin-left: 13px;
}

.navigator-btn {
  text-align: center;
  transition-duration: 0.4s;
  width: 70px;
  height: 70px;
  border: 3px;
  border-radius: 35px;
}

.navigator-btn:hover {
  background: #5fbae9;
}
</style>