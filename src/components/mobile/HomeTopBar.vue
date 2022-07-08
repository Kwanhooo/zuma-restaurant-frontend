<template>
  <div id="top-bar-wrapper">
    <div id="top-bar-left">
      <div id="title-wrapper">
        <span>{{ restaurantName }}</span>
      </div>
      <div id="address-wrapper">
        <span>{{ restaurantAddress }}</span>
      </div>
    </div>
    <div id="top-bar-right">
      <div id="tag-wrapper">
        <div class="restaurant-tag" style="background: #f8aae2;">{{ tags[0] }}</div>
        <div class="restaurant-tag" style="background: #a8ecd9;">{{ tags[1] }}</div>
      </div>
      <div id="img-wrapper">
        <img :src="this.logoSrc" alt="logo" style="max-height: 55px;width: auto;height: auto;">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeTitle",
  data() {
    return {
      restaurantName: "由美子日料",
      tags: ['日料榜第3', '综合 4.8分'],
      restaurantAddress: "天心区文源街道127号",
      logoSrc: "https://cdn2.iconfinder.com/data/icons/cafe-and-restaurant-2/119/Stickers_I-11-01-1024.png"
    }
  },
  methods: {}, created() {
    // 从后端获取数据
  }
}
</script>

<style scoped>
#top-bar-wrapper {
  display: flex;
  flex-direction: row;
}

#top-bar-left {
  flex: 1;
  display: flex;
  flex-direction: column;
}

#title-wrapper {
  flex: 1;

  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
}

#address-wrapper {
  font-size: 1.0em;
  font-style: italic;
  color: gray;
}

#top-bar-right {
  display: flex;
  flex-direction: row;
}

#tag-wrapper {
  font-size: 0.8rem;
}

.restaurant-tag {
  width: auto;
  border-radius: 5px;
  padding: 2px 3px;
  margin: 5px 2px;
}

#img-wrapper {
}
</style>