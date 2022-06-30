<template>
<div></div>
</template>

<script>
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Authenticator",
  created() {
    // 获取本地存储的token
    const token = localStorage.getItem("token");
    // 向后端请求token是否有效
    axios.get("/api/auth", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      // 如果token有效，则跳转到首页
      if (res.data.status === 200) {
        this.$router.push("/home");
      }
    }).catch(err => {
      // 如果token无效，则跳转到登录页
      if (err.response.status === 401) {
        this.$router.push("/login");
      }
    });
  }
}
</script>

<style scoped>

</style>