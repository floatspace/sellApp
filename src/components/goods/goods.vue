<template>
  <div class="goods">
    <div class="menu-wrap" ref="menuWrap">
      <ul class="menu">
        <li v-for="(good, index) in goods" class="menu-item border-1px" :class="{active: index===getIndex}"
            @click="selectMenu(index, $event)">
          <div class="name-wrap">
            <imgIcon :iconType="good.type" v-if="good.type !== -1"></imgIcon>
            <span class="name">{{good.name}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div ref="foodsWrap">
      <div class="foods-wrap">
        <div v-for="good in goods" class="food-list-hook">
          <h1 class="type">{{good.name}}</h1>
          <ul class="foods">
            <li class="food-item border-1px" v-for="food in good.foods">
              <div class="img-wrap" @click="showFoodDetailFn(food)">
                <img :src="food.image" alt="">
              </div>
              <div class="content">
                <h1 class="name">{{food.name}}</h1>
                <p class="desc">{{food.description}}</p>
                <p class="count-wrap">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                </p>
                <p class="price-wrap">
                  <span class="price">¥{{food.price}}</span>
                  <span class="oldPrice" v-if="food.oldPrice ">¥{{food.oldPrice}}</span>
                </p>
                <div class="cartcontrol-wrap">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></shopcart>
    <foodDetail :selectedFood="selectedFood" ref="foodDetaiEl"></foodDetail>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import BScroll from 'better-scroll';
  import imgIcon from 'components/imgIcon/imgIcon';
  import shopcart from 'components/shopcart/shopcart';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import foodDetail from 'components/foodDetail/foodDetail';
  export default {
    components: {
      imgIcon: imgIcon,
      shopcart: shopcart,
      cartcontrol: cartcontrol,
      foodDetail: foodDetail
    },
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        heightList: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    created() {
      axios.get('./api/goods').then(res => {
        let getData = res.data;
        if (getData.errCode === 0) {
          this.goods = getData.data;
          this.$nextTick(() => {
            this._initScroll();
            this._getHeightList();
          });
        }
      });
    },
    methods: {
      _initScroll() {
        var memuEl = this.$refs.menuWrap;
        var foodsEl = this.$refs.foodsWrap;
        /* eslint-disable no-new */
        new BScroll(memuEl, {
          click: true
        });
        /* 初始化foods列表滚动 */
        this.foodsScrollEl = new BScroll(foodsEl, {
          click: true,
          probeType: 3
        });
        /* 监听滚动 */
        this.foodsScrollEl.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _getHeightList() {
        let foodList = document.querySelectorAll('.food-list-hook');
        let _height = 0;
        this.heightList.push(_height);
        foodList.forEach((val, i) => {
          this.heightList.push(_height += val.clientHeight);
        });
      },
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = document.querySelectorAll('.food-list-hook');
        let curMenu = foodList[index];
        this.foodsScrollEl.scrollToElement(curMenu, 300);
      },
      showFoodDetailFn(food) {
        this.selectedFood = food;
        this.$refs.foodDetaiEl.showDetailFn();
      }
    },
    computed: {
      getIndex() {
        let heightList = this.heightList;
        for (var i = 0; i < heightList.length; i++) {
          let height1 = heightList[i];
          let height2 = heightList[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        var selectFoods = [];
        this.goods.forEach((val) => {
          val.foods.forEach((food) => {
            if (food.count) {
              selectFoods.push(food);
            }
          });
        });
        return selectFoods;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/css/mixin.styl"
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 58px
    overflow: hidden
    .menu-wrap
      flex: 0 0 80px
      background-color: #f3f5f7
      color: rgb(75, 85, 93)
      .menu
        .menu-item
          display: table
          vertical-align: middle
          width: 100%
          height: 54px
          text-align: center
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 0
          &.active
            background-color: #fff
          .name-wrap
            padding: 0 12px
            display: table-cell
            vertical-align: middle
            .name
              line-height: 14px
              vertical-align: top
              font-size: 12px
              font-weight: 200
    .foods-wrap
      flex: 1
      font-size: 12px
      .type
        height: 26px
        line-height: 26px
        border-left: solid 2px #d9dde1
        padding-left: 12px
        background-color: #f3f5f7
        color: rgb(147, 153, 159)
        font-weight: 200
      .foods
        padding: 0 18px
        .food-item
          display: flex
          padding: 18px 0
          border-1px(rgba(7, 17, 27, 0.1))
          &.last-child
            &:after
              border: none
          .img-wrap
            flex: 0 0 64px
            img
              width: 64px
              height: 64px
          .content
            position: relative
            flex: 1
            margin-left: 10px
            .name
              margin-bottom: 8px
              font-size: 14px
              color: rgb(7, 17, 27)
            .desc
              margin-bottom: 8px
              line-height: 14px
              color: rgb(147, 153, 159)
            .count-wrap
              margin-bottom: 10px
              color: rgb(147, 153, 159)
              span
                display: inline-block
            .price-wrap
              font-size: 0
              span
                display: inline-block
                &.price
                  font-size: 14px
                  font-weight: 700
                  color: rgb(240, 20, 20)
                &.oldPrice
                  margin-left: 8px
                  color: rgb(147, 153, 159)
                  font-size: 10px
                  font-weight: 700
                  text-decoration: line-through
            .cartcontrol-wrap
              position: absolute
              right: -10px
              bottom: -16px

</style>
