<template>
  <div class="WaiterCartWrapper fadeIn">
    <div class="WaiterCartTitle">
      <span style="margin-left: 20px;">🛒下单</span>
      <hr style="margin-left: 20px;width: 90%">
    </div>
    <div id="CartItemWrapper">
      <div v-if="orderMap.size === 0">
        <div style="margin-left: 10px;" class="CartItem fadeInFast">
          <div>
            <div style="height: 13px;"></div>
            <span style="margin-left: 15px;font-size: 25px;font-weight: bold;">😢还没有添加餐品</span>
          </div>
          <div style="margin-top:10px;">
          <span style="margin-left: 15px;font-size: 18px;font-style: italic;">
            Tips: 请在左侧选取餐品...
          </span>
            <br>
          </div>
          <br>
        </div>
      </div>
      <ul class="infinite-list " v-infinite-scroll="load" :infinite-scroll-immediate="false"
          v-for="(value,order) in this.orderMap" :key="order"
          style="max-height:680px;">
        <li>
          <div style="margin-left: 10px;" class="CartItem fadeInFast">
            <div>
              <div style="height: 13px;"></div>
              <span class="item-title">{{ value[0].name }}</span>
              <span class="item-type">
            {{ value[0].type.text }}
            <div class="item-price">
              单价： {{ value[0].price }}
            </div>
          </span>
            </div>
            <div style="margin-top:10px;">
          <span class="item-amount">
            序号：{{ order + 1 }}
          </span>
              <br>
              <div class="item-amount-container">
                <span class="item-amount-minus" @click.prevent="handleAmountChanged('-',value[0])">-</span>
                <input type="number" class="item-amount-field" v-model="value[1]" readonly="readonly">
                <span class="item-amount-plus" @click.prevent="handleAmountChanged('+',value[0])">+</span>
              </div>
            </div>
            <br>
          </div>
        </li>
      </ul>
    </div>
    <div id="TotalPriceWrapper" v-if="orderMap.size !== 0" class="fadeInFast">
      <span style="font-weight: bold;">总价：</span>
      <span style="font-style: italic;font-weight: bold;color: var(--blue);">
        {{ totalPrice }}</span>
    </div>
    <div id="CartSubmitWrapper" v-if="orderMap.size !== 0" class="fadeInFast">
      <input type="number" class="TableIdInput" v-model="tableId" placeholder="🍽️桌号">
      <button class="CartClearBtn" @click.prevent="clearAll">清除</button>
      <button class="CartSubmitBtn" @click.prevent="submitOrder">下单</button>
    </div>
  </div>
</template>

<script>
import bus from '../../util/bus.ts';
import axios from "axios";

export default {
  name: "WaiterCart",
  data() {
    return {
      orderMap: new Map(),
      tableId: null,
      totalPrice: 0.0,
    };
  },
  methods: {
    load() {
      console.log("load");
    },
    handleAmountChanged(sign, data) {
      if (sign === '-') {
        bus.emit("ChangedBack", {affectedFood: data, newAmount: this.orderMap.get(data) - 1});
        this.calculateTotalPrice();
        if (this.orderMap.get(data) > 1) {
          this.orderMap.set(data, this.orderMap.get(data) - 1);
        } else {
          this.orderMap.delete(data);
        }
      } else {
        bus.emit("ChangedBack", {affectedFood: data, newAmount: this.orderMap.get(data) + 1});
        this.calculateTotalPrice();
        this.orderMap.set(data, this.orderMap.get(data) + 1);
      }
    },
    calculateTotalPrice() {
      let temp = 0;
      this.orderMap.forEach((value, key) => {
        temp += key.price * value;
      });
      // 保留两位小数
      this.totalPrice = Math.round(temp * 100) / 100;
    },
    clearAll() {
      // 清空orderMap
      this.orderMap.clear();
      // 清空tableId
      this.tableId = null;
      // 从bus发送消息清空购物车
      bus.emit("ClearCart");
    },
    submitOrder() {
      // 构造传送给服务器的数据
      let foodInUse = [];
      let orderToSend = {};


      orderToSend.tableid = this.tableId.toString();

      let foodInUseIndex = 0;
      // 遍历orderMap
      for (let [food, amount] of this.orderMap) {
        for (let i = 0; i < amount; i++) {
          let clonedFood = JSON.parse(JSON.stringify(food))
          clonedFood.id = foodInUseIndex;
          foodInUseIndex++;
          foodInUse.push(clonedFood);
        }
      }
      orderToSend.foodInUse = foodInUse;
      this.calculateTotalPrice();
      orderToSend.totalPrice = this.totalPrice;

      //TODO:删掉这个
      console.log(orderToSend);

      this.clearAll();

      // TODO:发送orderToSend到/serve/order
      let vm = this;
      axios({
        method: "post",
        url: "/serve/submitDinner",
        dataType:"json",
        data: orderToSend,
      }).then(() => {
        vm.clearAll();
      });
    }
  },
  mounted() {
    const vm = this;
    bus.on("ItemChanged", (data) => {
      if (data.newAmount === 0)
        vm.orderMap.delete(data.affectedFood);
      else
        vm.orderMap.set(data.affectedFood, data.newAmount);
      this.calculateTotalPrice();
    });
  },
};
</script>

<style scoped>
/*滚动条样式重写*/
#CartItemWrapper::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: #F5F5F5;
}

#CartItemWrapper::-webkit-scrollbar {
  width: 12px;
  background-color: #F5F5F5;
}

#CartItemWrapper::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}


/**************/

ul {
  margin: 0;
  padding-left: 0;
  list-style-type: none;
}

.WaiterCartWrapper {
  margin: 10px 15px 10px 10px;
  /*width: 100%;*/
  height: 97%;
  /*text-align: center;*/
  background: #fee4cb;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
}

.WaiterCartTitle {
  padding-top: 10px;
  margin: 0;
  font-size: 30px;
  font-weight: bold;
}

#CartItemWrapper {
  overflow-x: hidden;
  overflow-y: auto;

  list-style: none;
  margin-left: 0;
  margin-right: 7px;
  margin-bottom: 10px;
  /*height: 100%;*/
  height: 630px;
}


#CartSubmitWrapper {
  height: 60px;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 0;
}


#TotalPriceWrapper {
  /*float: right;*/
  margin: 0 20px 0 180px;
  font-size: 20px;
}

.item-title {
  margin-left: 15px;
  font-size: 20px;
  font-weight: bold;
}


.CartItem {
  background: white;
  border-radius: 30px;
  min-height: 110px;
  margin-bottom: 10px;
}

.item-amount {
  padding: 10px 0;
  text-align: center;
}

.item-amount-container {
  width: 102px;
  height: 26px;
  margin: 0 auto;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  text-align: center;
}

.item-amount-minus,
.item-amount-plus {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.item-amount-field {
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

.CartClearBtn {
  float: left;
  margin: 15px 0 10px 20px;
  border: 3px;
  border-radius: 30px;
  width: 90px;
  height: 45px;
  font-size: 13px;

  transition-duration: 0.4s;
  background-color: #FFEDF3;
  color: #DF3B88;
}

.CartClearBtn:hover {
  background-color: #DF3B88;
  color: #FFEDF3;
}

.TableIdInput {
  /*选中时边框设置为无*/
  border: none;

  float: left;
  margin: 15px 0 0 10px;
  font-size: 22px;
  text-align: center;
  /*box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.09);*/
  border-radius: 30px;
  width: 90px;
  height: 45px;
}

/*shits*/

.item-type {
  float: right;
  text-align: right;
  margin: 5px 30px 0 10px;
  font-size: 15px;
  font-style: italic;
}

.item-amount {
  margin-left: 15px;
  font-size: 18px;
}

.deleteBtn {
  float: right;
  margin: 0 10px 5px 0;
  border: 3px;
  border-radius: 30px;
  width: 80px;
  height: 30px;
  font-size: 13px;

  transition-duration: 0.4s;
  background-color: #F6F5FE;
  color: #4F3FF0;
}

.deleteBtn:hover {
  background-color: #4F3FF0;
  color: #F6F5FE;
}

/*******/

/* 动画部分 */
.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 0.5s;
  -moz-animation-duration: 0.5s;
  animation-duration: 0.5s;
}

.fadeInFast {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 0.2s;
  -moz-animation-duration: 0.2s;
  animation-duration: 0.2s;
}

/************/
</style>