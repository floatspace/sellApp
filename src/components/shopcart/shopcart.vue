<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left" @click="showMenuFn">
        <div class="cart-wrap">
          <div class="cart" :class="{active: totalCount > 0}">
            <span class="icon icon-shopping_cart"></span>
            <span class="food-num" v-if="totalCount > 0">{{totalCount}}</span>
          </div>
        </div>
        <div class="price"><span>¥{{totalPrice}}</span></div>
        <div class="deliver">配送费¥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="buy" :class="{active: totalPrice >= minPrice}">{{btnText}}</div>
      </div>
    </div>
    <transition name="fade">
      <div class="menu-wrap" v-if="showCartMenu" @click="hideMenuFn($event)">
        <div class="menu">
          <div class="menu-top clearfix">
            <span class="title">购物车</span>
            <span class="reset" @click="resetShopcartFn">清空</span>
          </div>
          <div class="menu-content" ref="menuContent">
            <ul class="food-list">
              <li class="food-item" v-for="selectFood in selectFoods" v-if="selectFood">
                <div class="food-item-left">{{selectFood.name}}</div>
                <div class="food-item-right">
                  <span class="price">¥{{selectFood.price * selectFood.count}}</span>
                </div>
                <div class="cartcontrol-wrap">
                  <cartcontrol :food="selectFood"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import BScroll from 'better-scroll';
  export default {
    props: {
      deliveryPrice: {
        type: Number
      },
      minPrice: {
        type: Number
      },
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    components: {
      cartcontrol: cartcontrol
    },
    data() {
      return {
        showCartMenu: false
      };
    },
    methods: {
      showMenuFn() {
        if (!this.totalCount) {
          this.showCartMenu = false;
          return false;
        }
        this.showCartMenu = !this.showCartMenu;
        this._initMenuScroll();
      },
      _initMenuScroll() {
        this.$nextTick(() => {
          if (this.showCartMenu) {
            var menuContentEl = this.$refs.menuContent;
            /* eslint-disable no-new */
            if (!this.scroll) {
              this.scroll = new BScroll(menuContentEl, {
                click: true
              });
            } else {
//              this.scroll.refresh();
              this.scroll = new BScroll(menuContentEl, {
                click: true
              });
            }
          }
        });
      },
      resetShopcartFn() {
        this.selectFoods.forEach((val) => {
          val.count = 0;
        });
        this.showCartMenu = false;
      },
      hideMenuFn(event) {
        if (event.target.className === 'menu-wrap') {
          this.showCartMenu = false;
        }
      }
    },
    computed: {
      totalPrice() {
        let _res = 0;
        this.selectFoods.forEach((val) => {
          _res += val.price * val.count;
        });
        return _res;
      },
      totalCount() {
        let _res = 0;
        this.selectFoods.forEach((val) => {
          _res += val.count;
        });
        return _res;
      },
      btnText() {
        let _totalPrice = this.totalPrice;
        if (_totalPrice === 0) {
          return `¥${this.minPrice}元起送`;
        }
        if (_totalPrice < this.minPrice) {
          let disPrice = this.minPrice - _totalPrice;
          return `还差¥${disPrice}起送`;
        }
        if (_totalPrice >= this.minPrice) {
          return '去结算';
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    height: 48px
    z-index: 50
    .content
      display: flex
      position: absolute
      bottom: 0
      left: 0
      width: 100%
      height: 48px
      background-color: #141d27
      z-index: 50
      .content-left
        flex: 1
        font-size: 0
        .cart-wrap
          display: inline-block
          position: relative
          top: -10px
          margin: 0 12px
          width: 46px
          height: 46px
          padding: 6px
          border-radius: 50%
          background-color: #141d27
          .cart
            position relative
            width: 44px
            height: 44px
            margin: 0 auto
            text-align: center
            border-radius: 50%
            background-color: rgba(255, 255, 255, 0.2)
            &.active
              background-color: #449fdb
              .icon
                color: #fff
            .icon
              display: inline-block
              line-height: 44px
              color rgba(255, 255, 255, 0.4)
              font-size: 24px
              margin-left: -12px
            .food-num
              position: absolute
              right: -8px
              top: -6px
              padding: 2px 8px
              border-radius: 8px
              background-color: #f01414
              color: #fff
              font-size: 10px
              font-weight: 200
        .price
          position: relative
          display: inline-block
          line-height: 48px
          vertical-align: top
          margin-right: 8px
          color: rgba(255, 255, 255, 0.4)
          font-size: 16px
          font-weight: 700
          span
            border-right: solid 1px rgba(255, 255, 255, 0.4)
            padding-right: 12px
        .deliver
          display: inline-block
          vertical-align: top
          line-height: 48px
          color: rgba(255, 255, 255, 0.4)
          font-size: 14px
      .content-right
        flex: 0 0 105px
        width: 105px
        height: 48px
        .buy
          width: 100%
          height: 48px
          line-height: 48px
          text-align: center
          background-color: rgba(255, 255, 255, 0.2)
          color: rgba(255, 255, 255, 0.4)
          font-size: 14px
          font-weight: 700
          &.active
            background-color: rgba(0, 180, 60, 0.8)
            color: #fff
    .fade-enter-active, .fade-leave-active
      transition: opacity .5s
    .fade-enter, .fade-leave-to
      opacity: 0
    .menu-wrap
      position: fixed
      left: 0
      top: 0px
      width: 100%
      height: 100%
      z-index: 49
      background-color: rgba(7, 17, 27, 0.6)
      backdrop-filter: blur(10px)
      .menu
        position: absolute
        bottom: 48px
        width: 100%
        height: 254px
        overflow: hidden
        background-color: rgb(255, 255, 255)
        font-size: 12px
        .menu-top
          padding: 0px 20px
          height: 40px
          line-height: 40px
          border-bottom: solid 1px rgba(7, 17, 27, 0.1)
          background-color: #f3f5f7
          overflow: hidden
          .title
            float: left
            width: 100px
            color: rgb(7, 17, 27)
            font-size: 14px
            font-weight: 200
          .reset
            float: right
            color: rgb(0, 160, 220)
        .menu-content
          padding: 0px 20px
          height: 214px
          overflow: hidden
          .food-list
            padding: 5px 0
            .food-item
              position: relative
              display: flex
              height: 48px
              line-height: 48px
              border-bottom: solid 1px rgba(7, 17, 27, 0.1)
              .food-item-left
                flex: 1
                font-size: 14px
              .food-item-right
                flex: 0 0 100px
                font-size: 14px
                .price
                  color: rgb(240, 20, 20)
                  font-weight: bold
                  font-size: 10px
              .cartcontrol-wrap
                line-height: 24px
                position: absolute
                right: -10px
                top: 8px
                font-size: 12px

</style>
