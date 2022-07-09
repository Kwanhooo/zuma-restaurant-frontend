<template>
  <div id="mobile-order">
    <RiderMain></RiderMain>
  </div>
</template>

<script>
import RiderMain from "@/components/Rider";
export default {
  name: "MobileOrder",
  components: {RiderMain}
}
</script>

<style scoped>
#mobile-order {
  height: 100%;

  padding: 0 10px;
  background: white;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.2);
  margin: 4px 6px 10px 6px;
  width: auto;
}
</style>