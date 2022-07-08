<template>
  <div id="mobile-purchase">
    <div id="mobile-purchase-nav">
      <ul v-for="(type,index) in typeList" :key="index">
        <li>
          <button :class="{MobilePurchaseNavBtnActive:currentIndex===index,MobilePurchaseNavBtn:true}">{{ type }}</button>
        </li>
      </ul>
    </div>
    <div id="mobile-purchase-content">

    </div>
  </div>
</template>

<script>
export default {
  name: "MobileHomeOrder",
  data() {
    return {
      typeList: ['主食', '甜品', '饮料'],
      //TODO:假数据
      foodData: [
        {
          type: '主食',
          name: '咸酸菜',
          price: 88.8,
          rating: 4,
          img: 'https://cdn.pixabay.com/photo/2016/11/19/12/44/burgers-1839090_960_720.jpg'
        },
        {
          type: '主食',
          name: '荷兰豆',
          price: 66.6,
          rating: 5,
          img: 'https://cdn.pixabay.com/photo/2016/11/19/12/44/burgers-1839090_960_720.jpg'
        },
        {
          type: '饮料',
          name: '蓝山王',
          price: 28,
          rating: 3,
          img: 'https://cdn.pixabay.com/photo/2016/11/19/12/44/burgers-1839090_960_720.jpg'
        },
        {
          type: '饮料',
          name: '拿铁',
          price: 45,
          rating: 3,
          img: 'https://cdn.pixabay.com/photo/2016/11/19/12/44/burgers-1839090_960_720.jpg'
        },
        {
          type: '甜品',
          name: '杨枝甘露',
          price: 12,
          rating: 3,
          img: 'https://cdn.pixabay.com/photo/2016/11/19/12/44/burgers-1839090_960_720.jpg'
        },
        {
          type: '甜品',
          name: '芒果班戟',
          price: 17,
          rating: 5,
          img: 'https://cdn.pixabay.com/photo/2016/11/19/12/44/burgers-1839090_960_720.jpg'
        },
        {
          type: '甜品',
          name: '绿豆沙',
          price: 17,
          rating: 5,
          img: 'https://cdn.pixabay.com/photo/2016/11/19/12/44/burgers-1839090_960_720.jpg'
        },
      ],
      currentIndex: 0,
    }
  }
}
</script>

<style scoped>
#mobile-purchase {
  display: flex;
  flex-direction: row;

  height: 100%;
}

#mobile-purchase-nav {
  flex: 1.0;

  max-height: calc(100vh - 184px);
  overflow-x: hidden;
  overflow-y: scroll;
  /*在右侧加一条边框*/
  border-right: 1px solid #e5e5e5;
}

ul{
  list-style: none;
  padding: 0;
}

.MobilePurchaseNavBtn {
  width: 70px;
  height: 40px;
  margin: 5px 0;
  border: 3px;
  border-radius: 30px;

  font-size: 17px;

  transition-duration: 0.6s;
  background-color: #F1FBFE;
  color: #1383B6;

  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.06);
}

.MobilePurchaseNavBtn:hover {
  background-color: #1383B6;
  color: #F1FBFE;

}

.MobilePurchaseNavBtnActive {
  background-color: #1383B6;
  color: #F1FBFE;
}

#mobile-purchase-content {
  flex: 4.0;

  max-height: calc(100vh - 184px);
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>