<template>
  <div id="on-going-item-wrapper">
    <template v-for="(data,index) in OrderList" :key="index">
      <MobileOrderItem :display-food="data.food" :type-of-food="data.typeOfFood"
                       :food-status="data.status" :food-amount="data.amount" :ordered-time="data.orderedTime"
                       :indexOfFood="index">

      </MobileOrderItem>
    </template>
  </div>
</template>

<script>
import MobileOrderItem from "@/components/mobile/MobileOrderItem";
import axios from "axios";

export default {
  name: "OnGoingOrder",
  components: {MobileOrderItem},
  data() {
    return {
      OrderList: [
        {
          food: {
            "id": 1,
            "text": "1份猪柳蛋麦满分+1份小食+1杯饮料@1人份#汉堡",
            "price": "13.8",
            "name": "猪柳蛋麦满分套餐",
            "img": "https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2019/08/201908271032169362.png",
            "likenumber": 4852,
            "dislikenumber": 544
          },
          orderedTime: "2022-06-27 10:32:16",
          typeOfFood: {"id": 1, "text": "麦满分", "type": "mmf", "img": null},
          amount: 2,
          status: '正在制作'
        }, {
          food: {
            "id": 1,
            "text": "1份猪柳蛋麦满分+1份小食+1杯饮料@1人份#汉堡",
            "price": "13.8",
            "name": "猪柳蛋麦满分套餐",
            "img": "https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2019/08/201908271032169362.png",
            "likenumber": 4852,
            "dislikenumber": 544
          },
          orderedTime: "2022-06-27 10:32:16",
          typeOfFood: {"id": 1, "text": "麦满分", "type": "mmf", "img": null},
          amount: 2,
          status: '正在制作'
        }, {
          food: {
            "id": 1,
            "text": "1份猪柳蛋麦满分+1份小食+1杯饮料@1人份#汉堡",
            "price": "13.8",
            "name": "猪柳蛋麦满分套餐",
            "img": "https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2019/08/201908271032169362.png",
            "likenumber": 4852,
            "dislikenumber": 544
          },
          orderedTime: "2022-06-27 10:32:16",
          typeOfFood: {"id": 1, "text": "麦满分", "type": "mmf", "img": null},
          amount: 2,
          status: '正在制作'
        },
      ],
    };
  },
  methods: {},
  created() {
    axios({
      url: "/customer/viewOrder",
      method: "GET",
    }).then((res) => {
      this.OrderList = res.data.data;
    });
  }
}
</script>

<style scoped>
#on-going-item-wrapper {
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>