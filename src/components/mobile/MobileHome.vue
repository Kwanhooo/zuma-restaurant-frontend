<template>
  <div id="mobile-home">
    <div id="mobile-top-bar">
      <div id="mobile-top-bar-wrapper">
        <HomeTitle></HomeTitle>
      </div>
    </div>
    <div id="mobile-content">
      <div id="mobile-content-wrapper">
        <HomePurchase></HomePurchase>
      </div>
    </div>
  </div>
</template>

<script>
import HomeTitle from "@/components/mobile/HomeTopBar";
import HomePurchase from "@/components/mobile/HomePurchase";

export default {
  name: "MobileHome",
  components: {HomeTitle, HomePurchase}
}
</script>

<style scoped>
#mobile-home {
  height: 100%;
  display: flex;
  flex-direction: column;
}

#mobile-top-bar {
  background: #f3f6fd;
  flex-shrink: 0;
  height: 86px;
  padding: 0 3px 0 3px;
}

#mobile-top-bar-wrapper {
  padding: 5px 10px;
  margin: 4px 3px 0 3px;
  background: white;
  height: 65px;
  width: inherit;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.2);
}

#mobile-content {
  background: #f3f6fd;
  /*overflow-y: auto;*/
  flex-grow: 2;
  /*z-index: 0;*/
  overflow: hidden;
  padding: 0 3px 10px 3px;
}

#mobile-content-wrapper {
  padding: 0 5px;
  background: white;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.2);
  margin: 0 3px 3px 3px;
  height: 100%;
  width: auto;
}
</style>