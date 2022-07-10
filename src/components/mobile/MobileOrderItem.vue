<template>
  <div class="MobileFoodItemWrapper">
    <div class="MobileFoodItemWrapperLeft">
      <img class="MobileFoodImage" :src="this.$props.displayFood.img" :alt="this.$props.displayFood.name">
    </div>
    <div class="MobileFoodItemWrapperRight">
      <div class="TagsWrapper">
        <span class="FoodTag" style="background: #fdd1c5;color: #ff835e">{{ this.tags }}</span>
        <span><div class="OrderFoodIndexWrapper">{{ this.$props.indexOfFood + 1 }}</div></span>
      </div>
      <div class="FoodTitleWrapper">
        <span>{{ this.$props.displayFood.name }}</span>
      </div>
      <div class="FoodDescription">
        {{ this.$props.displayFood.text.split('@')[0] }}
      </div>
      <div class="FoodRatingWrapper">
        <DynamicRatingStars :rating="getRating()"></DynamicRatingStars>
      </div>
      <div class="MonthlySales">
        <span>{{ this.$props.orderedTime }}</span>
      </div>
      <div class="BottomLine">
        <div class="PriceWrapper">
          <span class="CharRMB">￥</span>
          <span>{{ this.$props.displayFood.price }}</span>
          <span class="CharRMB">× {{ this.$props.foodAmount }} = </span>
          <span> {{ this.$props.displayFood.price * this.$props.foodAmount }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import bus from '../../util/bus.ts';
import DynamicRatingStars from "@/components/mobile/DynamicRatingStars";

export default {
  name: "MobileOrderItem",
  components: {DynamicRatingStars},
  data() {
    return {
      tags: "",
      amount: 0,
    };
  },
  methods: {
    resolveTags() {
      this.tags = this.$props.foodStatus;
    },
    getRating() {
      let like = this.$props.displayFood.likenumber;
      let dislike = this.$props.displayFood.dislikenumber;
      // 按五星评分计算
      let rating = (like / (like + dislike)) * 5;
      // 取出rating的小数部分，如果在0.25-0.75之间，将小数部分设置为0.5，反之向上或向下取整
      let ratingDecimal = parseFloat('0.' + rating.toString().split('.')[1]);
      if (ratingDecimal >= 0.25 && ratingDecimal <= 0.75) {
        rating = parseFloat(rating.toString().split('.')[0] + '.5');
      } else if (ratingDecimal > 0.75) {
        rating = (parseFloat(rating.toString().split('.')[0]) + 1);
      } else {
        rating = (parseFloat(rating.toString().split('.')[0]));
      }
      return rating;
    },
    handleOperatorClick(operator) {
      if (operator === '+') {
        this.amount++;
        bus.emit('itemAmountChange', {food: this.$props.displayFood, amount: this.amount});
      } else {
        if (this.amount > 0)
          this.amount--;
      }
    },
  },
  props: {
    displayFood: {
      type: Object,
      required: true
    },
    typeOfFood: {
      type: Object,
      required: true
    },
    orderedTime: {
      type: String,
      required: true
    },
    foodAmount: {
      type: Number,
      required: true
    },
    foodStatus: {
      type: String,
      required: true
    },
    indexOfFood: {
      type: Number,
      required: false
    }
  },
  created() {
    this.resolveTags();
  },
  mounted() {
    //TODO:删掉下面这行
    // this.handleOperatorClick('+');
    bus.on('cartAmountChange', (callBackData) => {
      if (callBackData.food === this.$props.displayFood) {
        this.amount = callBackData.amount;
      }
    });
  }
}
</script>

<style scoped>
.MobileFoodItemWrapper {
  /*border: #0d0d0d 1px solid;*/
  border-radius: 10px;

  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.07);

  padding: 5px 0;
  margin: 10px 5px;


  display: flex;
  flex-direction: row;
}

.MobileFoodItemWrapperLeft {
  flex: 1;
}

.OrderFoodIndexWrapper {
  margin-right: 1rem;
  float: right;
  font-size: 1.2rem;
  /*font-weight: bolder;*/
  background: #ffc56b;
  border-radius: 0.75rem;

  height: 1.5rem;
  width: 1.5rem;
  text-align: center;
  vertical-align: central;
}

.MobileFoodImage {
  /*margin-top: 1rem;*/
  max-width: 100%;
  width: auto;
  height: auto;
}

.MobileFoodItemWrapperRight {
  flex: 2;
}

.TagsWrapper {

}

.FoodTag {
  font-size: 0.7rem;
  width: auto;
  border-radius: 5px;
  padding: 2px 5px;
  margin: 5px 2px;
}

.FoodTitleWrapper {
  font-family: 黑体, ui-sans-serif;
  font-size: 1.1rem;
  font-weight: bold;

  margin: 4px 2px 0 2px;
}

.FoodDescription {
  font-size: 0.8rem;
  margin: 0 0 0 2px;
  color: #555555;
}

.FoodRatingWrapper {

}

.RatingStar {
  max-height: 15px;
  width: auto;
  height: auto;
  margin: 0 1px;
}

.MonthlySales {
  font-size: 0.8rem;
  margin: 0 2px;

  color: #3f3f3f;
  font-style: italic;
}

.BottomLine {
  display: flex;
  flex-direction: row;
}

.PriceWrapper {
  flex: 1;

  font-family: 黑体, ui-sans-serif;
  font-weight: bolder;
  font-size: 1.35rem;
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
  /*border: 1px solid #e0e0e0;*/
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
  border-radius: 15px;
  text-align: center;
}

.BtnPlus {
  position: relative;
  display: inline-block;
  cursor: pointer;
}
</style>