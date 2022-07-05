<template>
  <div class="product-container">
    <a href="#" class="product-image-wrapper">
      <span class="product-image-link"
            style="background-image: url('https://cdn.pixabay.com/photo/2016/11/19/12/44/burgers-1839090_960_720.jpg')">
      </span>
    </a>

    <div class="product-title">
      <a href="#">{{ food.name }}</a>
    </div>

    <div class="product-price">
      <!--      <span class="price-old">19.9</span>-->
      <span class="price-current">{{ '￥' + food.price }}</span>
    </div>

    <div class="item-amount">
      <div class="item-amount-container">
        <span class="item-amount-minus" @click.prevent="handleAmountChanged('-')">-</span>
        <input type="number" name="#" id="#" class="item-amount-field" v-model="this.currentAmount" readonly="readonly">
        <span class="item-amount-plus" @click.prevent="handleAmountChanged('+')">+</span>
      </div>
    </div>

    <div class="item-btn">
      <button class="btn-basket"><i class="fas fa-shopping-basket"></i>下单</button>
    </div>
  </div>
</template>

<script>
import bus from '../../util/bus.ts';

export default {
  name: "FoodItem",
  data() {
    return {
      currentAmount: 0,
    }
  },
  methods: {
    handleAmountChanged(sign) {
      if (sign === '-') {
        if (this.currentAmount > 0) {
          this.currentAmount--;
          bus.emit("ItemChanged", {affectedFood: this.food, newAmount: this.currentAmount});
        }
      } else if (sign === '+') {
        this.currentAmount++;
        bus.emit("ItemChanged", {affectedFood: this.food, newAmount: this.currentAmount});
      }
    },
  },
  props: {
    food: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  created() {
    const vm = this;
    bus.on("ChangedBack", (data) => {
      if (data.affectedFood === vm.food)
        vm.currentAmount = data.newAmount;
    });
  },
}
</script>

<style scoped>


.product-container {
  display: inline-block;
  width: 24%;
  height: auto;
  border: 1px solid #e6e6e6;
  /*padding: 15px;*/
  margin: 0;
  padding: 0;
  /*padding: 5px 5px;*/
  background: #fff;
  border-radius: 4px;
}

.product-image-wrapper {
  position: relative;
  display: block;
  margin: 0 auto;
  height: 230px;
  width: auto;
}

.product-image-link {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0 auto;
  max-width: 200px;
  max-height: 200px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.product-title {
  padding-top: 20px;
  text-align: center;
  line-height: 18px;
}

.product-title a {
  /*font-style: 14px;*/
  font-weight: 700;
  color: rgb(21, 189, 71);
  text-decoration: none;
  text-transform: uppercase;
}

.product-price {
  padding: 10px 0;
  text-align: center;
}

.price-old {
  color: #a5a5a5;
  text-decoration: line-through;
  font-size: 13px;
}


.price-current {
  color: #3f3f3f;
  font-size: 22px;
  font-weight: 700;
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

.item-btn {
  text-align: center;
  margin-bottom: 20px;
}

.btn-basket {
  position: relative;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 9px 12px;
  background-color: rgb(21, 189, 71);
  border: none;
  color: #fff;
  outline: none;
  cursor: pointer;
}

</style>