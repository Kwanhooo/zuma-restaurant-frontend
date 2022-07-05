<template>
  <div class="WaiterCartWrapper fadeIn">
    <div class="WaiterCartTitle">
      <span style="margin-left: 20px;">🛒下单</span>
      <hr style="margin-left: 20px;width: 90%">
    </div>
    <div id="CartItemWrapper">
      <ul class="infinite-list " v-infinite-scroll="load" :infinite-scroll-immediate="false"
          v-for="(value,order) in this.orderMap" :key="order"
          style="max-height:680px;">
        <li>
          <div style="margin-left: 10px;" class="CartItem fadeInFast">
            <div>
              <div style="height: 13px;"></div>
              <span class="item-title">{{ value[0].name }}</span>
              <span class="item-type">
            {{ value[0].type }}
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
                <input type="number" name="#" id="#" class="item-amount-field" v-model="value[1]" readonly="readonly">
                <span class="item-amount-plus" @click.prevent="handleAmountChanged('+',value[0])">+</span>
              </div>
            </div>
            <br>
          </div>
        </li>
      </ul>
    </div>
    <div id="CartSubmitWrapper">
      <button class="CartSubmitBtn" v-if="orderMap.size !== 0">下单</button>
    </div>
  </div>
</template>

<script>
import bus from '../../util/bus.ts';

export default {
  name: "WaiterCart",
  data() {
    return {
      orderMap: new Map(),
    };
  },
  methods: {
    load() {
      console.log("load");
    },
    handleAmountChanged(sign, data) {
      if (sign === '-') {
        bus.emit("ChangedBack", {affectedFood: data, newAmount: this.orderMap.get(data) - 1});
        if (this.orderMap.get(data) > 1) {
          this.orderMap.set(data, this.orderMap.get(data) - 1);
        } else {
          this.orderMap.delete(data);
        }
      } else {
        bus.emit("ChangedBack", {affectedFood: data, newAmount: this.orderMap.get(data) + 1});
        this.orderMap.set(data, this.orderMap.get(data) + 1);
      }
    },
  },
  mounted() {
    const vm = this;
    bus.on("ItemChanged", (data) => {
      if (data.newAmount === 0)
        vm.orderMap.delete(data.affectedFood);
      else
        vm.orderMap.set(data.affectedFood, data.newAmount);
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
  height: 665px;
}


#CartSubmitWrapper {
  max-height: 55px;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 10px;
}

.item-title {
  margin-left: 10px;
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
  width: 105px;
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

/*shits*/

.item-type {
  float: right;
  text-align: right;
  margin: 5px 30px 0 10px;
  font-size: 13px;
  font-style: italic;
}

.item-amount {
  margin-left: 10px;
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