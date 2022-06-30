<template>
  <router-view></router-view>
</template>

<script>
// import axios from "axios";

export default {
  name: 'App',
  mounted() {
    this.$router.push('/home');

    // ***在生产环境中请解除注释***
    // // 从本地存储中获取token
    // const token = localStorage.getItem('token');
    // // 向服务器请求token是否有效
    // if (token) {
    //   axios.get('/api/validate?token='+token).then(res => {
    //       if (res.data.code === 0) {
    //         // token有效，跳到首页
    //         this.$router.push('/home');
    //       } else {
    //         // token无效，清除假token
    //         localStorage.removeItem('token');
    //       }
    //   });
    // } else {
    //   this.$router.push('/auth');
    // }
  }
}

</script>

<style scoped>

</style>