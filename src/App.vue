<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    // 获取UA
    this.ua = navigator.userAgent.toLowerCase();
    // 如果ua是手机，则设置为手机端
    if (this.ua.indexOf('mobile') > -1) {
      this.isMobile = true;
    }
    if (this.isMobile)
      this.$router.push('/m');
    else
      this.$router.push('/');
  }
}

</script>

<style scoped>
</style>