<template>
  <div id="mobile-cart">
    <div id="mobile-cart-top-bar">
      <span id="mobile-cart-title">🛒 购物车</span><span id="mobile-cart-total-amount">
      ({{ this.foodInCart.size }})
    </span>
    </div>
    <div id="mobile-cart-content-wrapper">
      <div class="MobileCartItem" v-if="this.foodInCart.size === 0">
        <div>
          <div style="height: 13px;"></div>
          <span style="margin-left: 15px;font-size: 25px;font-weight: bold;">😢还没有添加餐品</span>
        </div>
        <div style="margin-top:10px;">
          <span style="margin-left: 15px;font-size: 18px;font-style: italic;">
            Tips: 请在首页选取餐品...
          </span>
          <br>
        </div>
        <br>
      </div>

      <ul class="infinite-list " v-infinite-scroll="" :infinite-scroll-immediate="false"
          v-for="(value,index) in this.foodInCart" :key="index"
          style="max-height:680px;">
        <li>
          <div class="MobileCartItem">
            <div>
              <div style="height: 13px;"></div>
              <span class="ItemTitle">{{ value[0].name }}</span>
              <span class="ItemType">
                {{ value[0].type.text }}
                <div class="ItemPrice">
                  单价： {{ value[0].price }}
                </div>
              </span>
            </div>
            <div style="margin-top:10px;">
              <span class="ItemAmount">
                序号：{{ index + 1 }}
              </span>
              <br>
              <div class="ItemAmountContainer">
                <span class="ItemAmountMinus" @click.prevent="handleChange('-',value[0])">-</span>
                <input type="number" class="ItemAmountField" v-model="value[1]" readonly="readonly">
                <span class="ItemAmountPlus" @click.prevent="handleChange('+',value[0])">+</span>
              </div>
            </div>
            <br>
          </div>
        </li>
      </ul>
    </div>
    <div id="mobile-cart-bottom-bar">

    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import bus from '../../util/bus.ts';

export default {
  name: "MobileCart",
  data() {
    return {
      foodInCart: new Map(),// <food, amount>
      totalPrice: 0.0,
    }
  },
  methods: {
    handleChange(food, amount) {
      bus.emit('cartAmountChange', {food, amount});
    }
  },
  mounted() {
    const vm = this;
    bus.on('itemAmountChange', (callBackData) => {
      console.log('BUS IS CALLED');
      console.log(callBackData);
      if (vm.foodInCart.has(callBackData.food)) {
        if (callBackData.amount === 0) {
          vm.foodInCart.delete(callBackData.food);
        } else {
          vm.foodInCart.set(callBackData.food, callBackData.amount);
        }
      } else {
        vm.foodInCart.set(callBackData.food, callBackData.amount);
      }
    });
  }
}
</script>

<style scoped>
#mobile-cart {
  height: 100%;
  display: flex;
  flex-direction: column;

  padding: 0 10px;
  background: white;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.2);
  margin: 4px 6px 10px 6px;
  width: auto;
}

#mobile-cart-top-bar {
  margin: 10px 0 10px 5px;

  font-family: 黑体, ui-sans-serif;
}

#mobile-cart-title {
  font-weight: bolder;
  font-size: 1.5rem;
}

#mobile-cart-total-amount {
  font-size: 1.2rem;
  margin-left: 3px;
}

#mobile-cart-content-wrapper {
  height: 100%;
}

.MobileCartItem {
  background: #edf0f7;
  border-radius: 30px;
  /*min-height: 110px;*/
  /*margin-bottom: 10px;*/
}

.ItemTitle {
  margin-left: 15px;
  font-size: 20px;
  font-weight: bold;
}

.ItemType {
  float: right;
  text-align: right;
  margin: 5px 30px 0 10px;
  font-size: 15px;
  font-style: italic;
}

.ItemPrice {

}

.ItemAmount {
  margin-left: 15px;
  font-size: 18px;
}

.ItemAmountContainer {
  width: 102px;
  height: 26px;
  margin: 0 auto;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  text-align: center;
}

.ItemAmountMinus,
.ItemAmountPlus {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.ItemAmountField {
  display: inline-block;
  max-width: 50px;
  height: 22px;
  border: 1px solid transparent;
  text-align: center;

}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

#mobile-cart-bottom-bar{

}

.CartSubmitBtn {
  float: right;
  margin: 15px 20px 10px 0;
  border: 3px;
  border-radius: 30px;
  width: 100px;
  height: 45px;
  font-size: 13px;

  transition-duration: 0.4s;
  background-color: #FFF4EA;
  color: #FF9465;
}

.CartSubmitBtn:hover {
  background-color: #FF9465;
  color: #FFF4EA;
}
</style>