<template>
  <div id="top-bar-wrapper">
    <div id="top-bar-left">
      <div id="title-wrapper">
        <span>{{ restaurantName }}</span>
        <span style="font-weight: normal;font-size: 0.8rem">{{ showTableID() }}</span>
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
  <CallWaiter></CallWaiter>
</template>

<script>
import axios from "axios";
import CallWaiter from "@/components/mobile/CallWaiter";

export default {
  name: "HomeTitle",
  components: {CallWaiter},
  data() {
    return {
      restaurantName: "",
      tags: [],
      restaurantAddress: "",
      logoSrc: "",
    }
  },
  methods: {
    showTableID() {
      return sessionStorage.getItem('tableID')+'号桌';
    },
    getRestaurantInfo() {
      axios({
        method: "get",
        url: "/common/getRestaurantInfo",
      }).then(res => {
        this.restaurantName = res.data.data.name;
        this.restaurantAddress = res.data.data.address;
        this.tags = res.data.data.tags;
        this.logoSrc = res.data.data.logoSrc;
      }).catch(err => {
        console.log(err);
      });
    }
  },
  created() {
    this.getRestaurantInfo();
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