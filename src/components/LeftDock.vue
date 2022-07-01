<template>
  <div v-for="(item,index) in dockItems" :key="index" :class="{'navigator-item':true}">
    <button class="navigator-btn" @click.prevent="this.$router.push(item.routeTo)">
      <img :src="item.img" style="width: 40px;height: 40px;" alt="home">
      <span>{{ item.toolTips }}</span>
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
        return [
        ];
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
  width: 60px;
  height: 60px;
  border: 3px;
  border-radius: 30px;
}

.navigator-btn:hover {
  background: #5fbae9;
}
</style>