<template>
  <el-container id="center-wrapper">

  </el-container>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Authenticator",
  created() {
    console.log("Authenticator created");
  }
}
</script>

<style scoped>
#center-wrapper{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>