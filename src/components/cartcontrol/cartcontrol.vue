<template>
  <div class="cartcontrol">
    <transition name="slideleft">
      <div class="cart-reduce" v-if="food.count > 0" @click="reduceCart">
        <span class="icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-if="food.count > 0">{{food.count}}</div>
    <div class="cart-add" @click="addCart">
      <span class="icon-add_circle"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default{
  props: {
      food: {
        type: Object,
        default: {}
      }
  },
  methods: {
    addCart() {
        if (!this.food.count) {
          this.$set(this.food, 'count', 1);
        } else {
          this.food.count ++;
        }
    },
    reduceCart() {
      if (this.food.count > 0) {
        this.food.count --;
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
  font-size: 0
  .slideleft-enter-active, .slideleft-leave-active
    transition: all .5s
  .slideleft-enter, .slideleft-leave-to
    opacity: 0
    transform: translateX(40px) rotate(90deg)
  .cart-reduce, .cart-add
    padding: 6px
    display: inline-block
    font-size: 24px
    color: #449fdb
  .cart-count
    display: inline-block
    vertical-align: top
    padding: 4px 2px 0
    text-align: center
    height: 24px
    line-height: 24px
    font-size: 10px
</style>
