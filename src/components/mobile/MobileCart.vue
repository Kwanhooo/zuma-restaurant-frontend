<template>
  <div id="mobile-cart" v-if="cartShow">
    <div id="mobile-cart-top-bar">
      <span id="mobile-cart-title" @click.prevent="printCart()">🛒 购物车</span><span id="mobile-cart-total-amount">
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
      <ul style="padding: 0">
        <li v-for="(value,index) in this.foodInCart" :key="index">
          <div class="MobileFoodItemWrapper">
            <div class="MobileFoodItemWrapperLeft">
              <img class="MobileFoodImage" :src="value[0].img" :alt="value[0].name">
            </div>
            <div class="MobileFoodItemWrapperRight">
              <div class="FoodTitleWrapper">
                <span>{{ value[0].name }}</span>
              </div>
              <div class="FoodDescription">
                {{ value[0].text.split('@')[0] }}
              </div>
              <div class="BottomLine">
                <div class="PriceWrapper">
                  <span class="CharRMB">￥</span>{{ value[0].price }}
                </div>
                <div class="OperationWrapperFlex">
                  <div class="OperationWrapper">
                    <span class="BtnMinus" @click.prevent="handleChange(value[0],'-')">-</span>
                    <span class="NumberBoxWrapper">
              <input type="number" class="NumberBox" v-model="value[1]" readonly="readonly">
            </span>
                    <span class="BtnPlus" @click.prevent="handleChange(value[0],'+')">+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div id="mobile-cart-bottom-bar">
      <div id="submit-wrapper">
        <button class="MobileCartSubmitBtn" @click.prevent="mobileSubmitOrder()">下单</button>
      </div>
      <div id="total-price-wrapper">
        <div id="price-text-wrapper">
          合计 ￥ {{ this.totalPrice }}
        </div>
      </div>
      <div id="clear-wrapper">
        <button class="MobileCartClearBtn" @click.prevent="clearCart()">
          <svg t="1657340688738" class="ClearIcon" viewBox="0 0 1024 1024" version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               p-id="3798" width="200" height="200">
            <path
                d="M452.225097 146.90005l-340.587939 340.587939c-13.073072 13.073072-34.058794 13.073072-47.131866 0-13.073072-13.073072-12.901058-34.058794 0-47.131866l340.587939-340.587939c13.073072-13.073072 34.058794-13.073072 47.131866 0C465.298169 112.841257 465.298169 133.826978 452.225097 146.90005L452.225097 146.90005z"
                p-id="3799" fill="#DF3B88"></path>
            <path
                d="M924.231816 618.734756l-340.587939 340.587939c-13.073072 13.073072-34.058794 13.073072-47.131866 0-13.073072-13.073072-12.901058-34.058794 0-47.131866l340.587939-340.587939c13.073072-13.073072 34.058794-13.073072 47.131866 0C937.304888 584.675962 937.132874 605.833697 924.231816 618.734756L924.231816 618.734756z"
                p-id="3800" fill="#DF3B88"></path>
            <path
                d="M451.193012 620.798925l-103.036452 103.036452c-13.073072 13.073072-34.058794 13.073072-47.131866 0-13.073072-13.073072-12.901058-34.058794 0-47.131866l103.036452-103.036452c13.073072-13.073072 34.058794-13.073072 47.131866 0C464.266084 586.740131 464.266084 607.897867 451.193012 620.798925L451.193012 620.798925z"
                p-id="3801" fill="#DF3B88"></path>
            <path
                d="M298.444482 524.987065l-74.654124 74.654124c-13.073072 13.073072-34.058794 13.073072-47.131866 0-13.073072-13.073072-12.901058-34.058794 0-47.131866l74.654124-74.654124c13.073072-13.073072 34.058794-13.073072 47.131866 0C311.34554 490.928271 311.34554 512.086007 298.444482 524.987065L298.444482 524.987065z"
                p-id="3802" fill="#DF3B88"></path>
            <path
                d="M545.28473 771.999328l-74.654124 74.654124c-13.073072 13.073072-34.058794 13.073072-47.131866 0-13.073072-13.073072-12.901058-34.058794 0-47.131866l74.654124-74.654124c13.073072-13.073072 34.058794-13.073072 47.131866 0C558.357803 737.940534 558.357803 758.926256 545.28473 771.999328L545.28473 771.999328z"
                p-id="3803" fill="#DF3B88"></path>
            <path
                d="M536.339997 959.322694 64.505291 487.660003c-13.073072-13.073072-13.073072-34.058794 0-47.131866 13.073072-13.073072 34.058794-12.901058 47.131866 0l471.834705 471.834705c13.073072 13.073072 13.073072 34.058794 0 47.131866C570.398791 972.395767 549.413069 972.395767 536.339997 959.322694L536.339997 959.322694z"
                p-id="3804" fill="#DF3B88"></path>
            <path
                d="M732.264069 763.570637 260.429363 291.735931c-13.073072-13.073072-13.073072-34.058794 0-47.131866 13.073072-13.073072 34.058794-12.901058 47.131866 0L779.223921 716.43877c13.073072 13.073072 13.073072 34.058794 0 47.131866C766.322862 776.643709 745.165127 776.471695 732.264069 763.570637L732.264069 763.570637z"
                p-id="3805" fill="#DF3B88"></path>
            <path
                d="M912.362842 219.490005l-107.680833-107.852847c-13.073072-13.073072-13.073072-34.058794 0-47.131866 13.073072-13.073072 34.058794-12.901058 47.131866 0l107.680833 107.852847c13.073072 13.073072 13.073072 34.058794 0 47.131866C946.421636 232.563077 925.263901 232.563077 912.362842 219.490005L912.362842 219.490005z"
                p-id="3806" fill="#DF3B88"></path>
            <path
                d="M587.256173 328.718965 405.437259 146.90005c-13.073072-13.073072-13.073072-34.058794 0-47.131866 13.073072-13.073072 34.058794-12.901058 47.131866 0l181.990929 181.990929c13.073072 13.073072 13.073072 34.058794 0 47.131866C621.486981 341.792038 600.329246 341.792038 587.256173 328.718965L587.256173 328.718965z"
                p-id="3807" fill="#DF3B88"></path>
            <path
                d="M877.09995 618.562741 695.281035 436.743827c-13.073072-13.073072-13.073072-34.058794 0-47.131866 13.073072-13.073072 34.058794-12.901058 47.131866 0l181.990929 181.990929c13.073072 13.073072 13.073072 34.058794 0 47.131866C911.330758 631.635814 890.173022 631.635814 877.09995 618.562741L877.09995 618.562741z"
                p-id="3808" fill="#DF3B88"></path>
            <path
                d="M959.322694 219.490005 742.240887 436.571813c-13.073072 13.073072-34.058794 13.073072-47.131866 0-13.073072-13.073072-12.901058-34.058794 0-47.131866l217.081807-217.081807c13.073072-13.073072 34.058794-13.073072 47.131866 0C972.395767 185.259197 972.395767 206.416933 959.322694 219.490005L959.322694 219.490005z"
                p-id="3809" fill="#DF3B88"></path>
            <path
                d="M851.641861 111.637158 634.38804 328.718965c-13.073072 13.073072-34.058794 13.073072-47.131866 0-13.073072-13.073072-12.901058-34.058794 0-47.131866L804.509995 64.505291c13.073072-13.073072 34.058794-13.073072 47.131866 0C864.714934 77.578364 864.54292 98.564085 851.641861 111.637158L851.641861 111.637158z"
                p-id="3810" fill="#DF3B88"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
  <div id="confirm-order" v-else>
    <div id="confirm-order-top-bar">
      <div class="DetailGoBack" @click.prevent="goBack()">
        <svg t="1657522982030" class="GoBackIcon" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg" p-id="2262" width="200" height="200">
          <path
              d="M624.788992 204.047974 585.205965 164.464026 219.560038 530.185011 585.205965 895.864013 624.788992 856.280986 298.663014 530.16105Z"
              p-id="2263" fill="#18abce"></path>
        </svg>
      </div>
      <div class="DetailSettingTitle">订单确认</div>
    </div>
    <div id="confirm-order-content-wrapper">
      <div id="confirm-order-content-choose">
        <el-radio v-model="orderMethod" label="堂食" style="margin-top:10px"><h2>🏪堂食</h2></el-radio>
        <el-radio v-model="orderMethod" label="外卖"><h2>🍱外卖</h2></el-radio>
<!--        {{ orderMethod }}-->
      </div>
      <div id="address" v-if="orderMethod==='外卖'">
        <div style="margin-left:10px"><h3>🚲填写您的相关配送信息：</h3></div>
        <input type="text" v-model="receiverName" class="addressInput" placeholder="请输入姓名"/>
        <input type="text" v-model="receiverPhone" class="addressInput" placeholder="请输入电话号码"/>
        <input type="text" v-model="address" class="addressInput" placeholder="请输入配送地址"/>
      </div>
      <div id="confirm-order-content-food">
        <ul style="padding: 0">
          <li v-for="(value,index) in this.foodInCart" :key="index">
            <div class="MobileFoodItemWrapper">
              <div class="MobileFoodItemWrapperLeft">
                <img class="MobileFoodImage" :src="value[0].img" :alt="value[0].name">
              </div>
              <div class="MobileFoodItemWrapperRight">
                <div class="FoodTitleWrapper">
                  <span>{{ value[0].name }}</span>
                </div>
                <div class="FoodDescription">
                  {{ value[0].text.split('@')[0] }}
                </div>
                <div class="BottomLine">
                  <div class="PriceWrapper">
                    <span class="CharRMB">￥</span>{{ value[0].price }}
                  </div>
                  <div class="OperationWrapperFlex">
                    <div class="OperationWrapper">
                      <span class="BtnMinus" @click.prevent="handleChange(value[0],'-')">-</span>
                      <span class="NumberBoxWrapper">
              <input type="number" class="NumberBox" v-model="value[1]" readonly="readonly">
            </span>
                      <span class="BtnPlus" @click.prevent="handleChange(value[0],'+')">+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div id="confirm-order-bottom-bar">
      <div id="confirm-total">合计：{{ this.totalPrice }}￥</div>
      <div class="confirm-pay" v-if="orderMethod==='外卖'">
        <button type="button" class="confirm-button" @click="payForFoodOut()">去支付</button>
      </div>
      <div class="confirm-pay" v-else>
        <button type="button" class="confirm-button" @click="payForFoodIn()">确定</button>
      </div>
    </div>
  </div>
</template>


<script>

// eslint-disable-next-line no-unused-vars
import bus from '../../util/bus.ts';
import axios from "axios";
//import vm from "vm";

export default {
  name: "MobileCart",
  data() {
    return {
      foodInCart: new Map(),// <food, amount>
      totalPrice: 0.0,
      cartShow: true,
      orderMethod: "堂食",
      address: "",
      receiverName: "",
      receiverPhone: "",
      allFood: "",
    }
  },
  methods: {
    goBack() {
      this.cartShow=true;
    },
    printCart() {
      console.log("cart::");
      console.log(this.foodInCart);
    },
    calTotalPrice() {
      let temp = 0;
      this.foodInCart.forEach((value, key) => {
        temp += key.price * value;
      });
      // 保留两位小数
      this.totalPrice = Math.round(temp * 100) / 100;
    },
    handleChange(food, operator) {
      let amount = this.foodInCart.get(food)
      if (operator === "+") {
        bus.emit('cartAmountChange', {food: food, amount: amount + 1});
        this.foodInCart.set(food, amount + 1);
      } else if (operator === "-") {
        if (amount > 1) {
          bus.emit('cartAmountChange', {food: food, amount: amount - 1});
          this.foodInCart.set(food, amount - 1);
        } else {
          bus.emit('cartAmountChange', {food: food, amount: 0});
          this.foodInCart.delete(food);
        }
      }
      this.calTotalPrice();
    },
    clearCart() {
      this.foodInCart.forEach((value, key) => {
        bus.emit('cartAmountChange', {food: key, amount: 0});
        this.foodInCart.delete(key);
      });
      this.calTotalPrice();
    },
    mobileSubmitOrder() {
      if (this.foodInCart.size === 0) {
        this.$message({
          message: '请先在首页加入菜品，之后再下单',
          type: 'warning'
        });
        return;
      }
      axios({
        method: "POST",
        url: "/customer/addDinner/" + sessionStorage.getItem("userId") + "/?table=" + sessionStorage.getItem("tableID"),
      }).then(() => {
        this.cartShow = false;
      });
    },

    payForFoodIn() {
      const vm = this;
      this.allFood = "";

      this.foodInCart.forEach((value, key) => {
        vm.allFood += key.name + ",";
      });

      console.log('allFood:' + this.allFood);
      axios({
        method: 'POST',
        url: '/customer/addDinnerFood?allFood=' + this.allFood + '&table=' + sessionStorage.getItem('tableID') + '&totalPrice=' + this.totalPrice,
      }).then((res) => {
        if (res.data.status === 0) {
          this.clearCart();
          this.$message({
            message: '下单成功',
            type: 'success'
          });
          vm.goBack();
        } else {
          console.log(res.data.msg);
        }
      })
    },
    payForFoodOut() {
      let allFood = "";

      // eslint-disable-next-line no-unused-vars
      function foodMapToString(value, key, thisMap) {
        for (var i = 0; i < value; i++) {
          allFood = allFood + key.name + ',';
        }
      }

      this.allFood = allFood;
      this.foodInCart.forEach(foodMapToString);
      const vm = this;
      axios({
        method: 'POST',
        url: '/customer/addOrderOut?allFood=' + allFood + '&userid=' + sessionStorage.getItem('userid') + '&totalPrice=' + this.totalPrice
            + '&address=' + this.address + '&receiverName=' + this.receiverName + '&receiverPhone=' + this.receiverPhone,
      }).then((res) => {
        if (res.data.status === 0) {
          this.clearCart();
          //    this.$alert('下单成功！','点餐通知');
          vm.$message({
            message: '下单成功',
            type: 'success'
          });
        } else {
          console.log(res.data.msg);
        }
      })
    },
    loadList() {
    },
  },
  created() {
    // let cartID = Math.random();
    // setInterval(() => {
    //   console.log(cartID);
    // }, 2000);

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
      this.calTotalPrice();
    });
  },
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
  flex-shrink: 0;

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
  height: calc(100vh - 240px);
  /*max-height: calc(100vh - 170px);*/
  overflow-x: hidden;
  overflow-y: scroll;
}

.MobileCartItem {
  background: rgba(243, 246, 253, 0.94);
  border-radius: 30px;
  /*min-height: 110px;*/
  /*margin-bottom: 10px;*/
}

.MobileFoodItemWrapper {
  /*border: #0d0d0d 1px solid;*/
  border-radius: 10px;

  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.07);

  padding: 0;
  margin: 5px 5px;

  display: flex;
  flex-direction: row;
  background: white;

  /*max-height: 100px;*/
}

.MobileFoodItemWrapperLeft {
  flex: 1;
  align-items: center;
}

.MobileFoodImage {
  /*margin-top: 1rem;*/
  margin: auto;
  max-width: 110px;
  width: auto;
  height: auto;
}

.MobileFoodItemWrapperRight {
  flex: 2;
}

.FoodTitleWrapper {
  font-family: 黑体, ui-sans-serif;
  font-size: 1.3rem;
  font-weight: bold;

  margin: 15px 2px 0 2px;
}

.FoodDescription {
  font-size: 0.9rem;
  margin: 0 0 0 2px;
  color: #555555;
}


.BottomLine {
  display: flex;
  flex-direction: row;

  margin-top: 5px;
}

.PriceWrapper {
  flex: 1;

  font-family: 黑体, ui-sans-serif;
  font-weight: bolder;
  font-size: 1.40rem;
  color: #e75d4f;

  margin-top: 2px;
  /*border: #0d0d0d 1px solid;*/
}

.CharRMB {
  font-size: 0.9rem;
  margin: 0 1px;
}

.OperationWrapperFlex {
  flex: 3.5;

  /*border: #0d0d0d 1px solid;*/
}

.OperationWrapper {
  float: right;
  width: 90px;
  margin: 3px 10px 10px 0;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  text-align: center;
}

.BtnMinus {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.NumberBoxWrapper {

}

.NumberBox {
  display: inline-block;
  max-width: 45px;
  height: 1.25rem;
  border: 1px solid transparent;
  text-align: center;
}

.BtnPlus {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

#mobile-cart-bottom-bar {
  flex-shrink: 0;
  min-height: 4rem;
  margin: 0.6rem 0 0.6rem 0;
  background: #f8e6f3;
  border-radius: 20px 20px 20px 20px;

  /*display: flex;*/
}

#total-price-wrapper {
  /*flex: 1;*/

  float: right;
}

#price-text-wrapper {
  margin: 1.4rem 1.5rem 0 0;
  font-size: 1rem;
}

#submit-wrapper {
  /*flex: 1;*/

  float: right;
}

.MobileCartSubmitBtn {
  float: right;
  margin: 0.7rem 0.7rem 0 0;
  border: 3px;
  border-radius: 30px;
  width: 100px;
  height: 2.7rem;
  font-size: 0.9rem;

  transition-duration: 0.4s;
  background-color: #DF3B88;
  color: #FFEDF3;
}

#clear-wrapper {
  float: left;
  margin-left: 1.0rem;
}

.MobileCartClearBtn {
  margin: 0.7rem 0.7rem 0 0;
  border: 3px;
  border-radius: 1.35rem;
  width: 2.7rem;
  height: 2.7rem;
  font-size: 0.9rem;

  transition-duration: 0.4s;
  background-color: #FFEDF3;
  color: #DF3B88;
}

.ClearIcon {
  height: 90%;
  width: 90%;
  margin-right: 10%;
  margin-top: 10%;
}

#confirm-order-top-bar {
  height: 60px;
  border-radius: 20px 20px 0 0;

  background: white;
  display: flex;
}

.DetailGoBack {
  flex-shrink: 0;
}

.GoBackIcon {
  width: 35px;
  height: 35px;
  margin: 13px 15px;
  fill: #18abce;
}

.DetailSettingTitle {
  font-weight: bolder;
  font-size: 22px;
  margin-left: calc(50vw - 44px - 35px - 30px - 5px);
  margin-top: calc(30px - 11px - 5px);
}

.DetailSettingContent {
  height: calc(100% - 70px);
  margin: 5px 5px;
}

#confirm-order-content-wrapper {
  height: calc(100vh - 204px);
  margin: 5px 5px;
  overflow-y: scroll
}

#confirm-order-content-choose {
  text-align: center;
}

.addressInput {
  background-color: #EEEEFF;
  color: #0d0d0d;
  padding: 15px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

#confirm-order-bottom-bar {
  padding-left: 30px;
  text-align: left;
  background-color: #b8c0c2;
  border-radius: 25px;
  height: 50px;
}

#confirm-total {
  margin-top: 12px;
  float: left;
  width: 210px;
  font-size: 20px;
  font-weight: bolder;
  color: #fffcfb;
}

.confirm-pay {
  margin-left: 220px;
}

.confirm-button {
  border-radius: 25px;
  height: 50px;
  width: 100px;
  background-color: #FFF4EA;
  color: #FF9465;
  font-size: 20px;
  font-weight: normal;
  border: 0;
  transition: 0.4s;
}

.confirm-button:hover{
  background-color: #FF9465;
  color: #FFF4EA;
}
</style>