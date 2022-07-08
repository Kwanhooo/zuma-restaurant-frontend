<template>
  <div id="mobile-me">
    <div id="mobile-me-top-bar">
      <div id="mobile-me-top-bar-wrapper">

      </div>
    </div>
    <div id="mobile-me-content">
      <div id="mobile-me-content-wrapper">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MobileMe"
}
</script>

<style scoped>
#mobile-me {
  height: 100%;
  display: flex;
  flex-direction: column;
}

#mobile-me-top-bar {
  background: #f3f6fd;
  flex-shrink: 0;
  height: 86px;
  padding: 0 3px 0 3px;
}

#mobile-me-top-bar-wrapper {
  padding: 5px 10px;
  margin: 4px 3px 0 3px;
  background: white;
  height: 65px;
  width: inherit;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.2);
}

#mobile-me-content {
  background: #f3f6fd;
  /*overflow-y: auto;*/
  flex-grow: 2;
  /*z-index: 0;*/
  overflow: hidden;
  padding: 0 3px 10px 3px;
}

#mobile-me-content-wrapper {
  padding: 0 10px;
  background: white;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.2);
  margin: 0 3px 3px 3px;
  height: 100%;
  width: auto;
}
</style>