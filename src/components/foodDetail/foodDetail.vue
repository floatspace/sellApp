<template>
  <transition name="slidein">
    <div ref="foodDetailEl" class="food-detail-el" v-if="showFlag">
      <div class="food-detail-wrap">
        <div class="img-header">
          <img class="img" :src="selectedFood.image" alt="">
          <span class="icon icon-arrow_lift" @click="showFlag = !showFlag"></span>
        </div>
        <div class="food-content">
          <p class="name">{{selectedFood.name}}</p>
          <p class="baseinfo">
            <span class="sell-count">月售{{selectedFood.sellCount}}份</span>
            <span class="rating">好评率{{selectedFood.rating}}%</span>
          </p>
          <p class="price-wrap">
            <span class="price">{{selectedFood.price}}</span>
            <span class="old-price">{{selectedFood.oldPrice}}</span>
          </p>
          <div class="add-cardshop-wrap">
            <div class="add-cardshop" v-if="hideCartControl" @click="addFirstFn">加入购物车</div>
            <transition name="move">
              <div class="cartcontrol-wrap" v-if="!hideCartControl">
                <cartcontrol :food="selectedFood"></cartcontrol>
              </div>
            </transition>
          </div>
        </div>
        <split v-if="selectedFood.info"></split>
        <div class="food-info" v-if="selectedFood.info">
          <h1 class="title">商品介绍</h1>
          <p class="intro">{{selectedFood.info}}</p>
        </div>
        <split v-if="selectedFood.ratings"></split>
        <div class="ratings">
          <h1 class="title">商品评价</h1>
          <ratingselect :ratings="selectedFood.ratings" :onlyContent="onlyContentFlag" @onlyContentHandle="onlyContentToggle" @rateTypeToggleHandle="rateTypeToggle"></ratingselect>
          <div class="content">
            <ul class="rating-list">
              <li class="rating-item" v-for="rating in curRatings">
                <div class="sub-title">
                  <span class="time">{{rating.rateTime | formateDate}}</span>
                  <div class="user-wrap">
                    <span class="username">{{rating.username}}</span>
                    <img class="avatar" :src="rating.avatar"/>
                  </div>
                </div>
                <p class="text" v-if="rating.text"><span class="icon" :class="iconThumbs[rating.rateType]"></span>{{rating.text}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {formateDate} from '../../common/js/util';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';
  import Bscroll from 'better-scroll';
  export default {
    components: {
      cartcontrol: cartcontrol,
      split: split,
      ratingselect: ratingselect
    },
    props: {
      selectedFood: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        showFlag: false,
        onlyContentFlag: false,
        iconThumbs: ['icon-thumb_up', 'icon-thumb_down'],
        ratingTypeFlag: 'All'
      };
    },
    methods: {
      onlyContentToggle() {
        this.onlyContentFlag = !this.onlyContentFlag;
      },
      rateTypeToggle(data) {
        this.ratingTypeFlag = data;
      },
      showDetailFn() {
        this.showFlag = true;
        this.$nextTick(() => {
          var foodDetialEl = this.$refs.foodDetailEl;
          /* eslint-disable no-new */
          new Bscroll(foodDetialEl, {
              click: true
          });
        });
      },
      addFirstFn() {
        this.$set(this.selectedFood, 'count', 1);
      }
    },
    computed: {
      hideCartControl() {
        var res = true;
        if (this.selectedFood.count > 0) {
          res = false;
        }
        return res;
      },
      curRatings() {
        var _res = this.selectedFood.ratings;
        if (this.onlyContentFlag) {
          _res = this.selectedFood.ratings.filter((val) => {
            return val.text.length > 0;
          });
        }
        if (this.ratingTypeFlag === 'POSITIVE') {
          _res = _res.filter((val) => {
             return val.rateType === 0;
          });
        }
        if (this.ratingTypeFlag === 'NEGATIVE') {
          _res = _res.filter((val) => {
             return val.rateType === 1;
          });
        }
        return _res;
      }
    },
    filters: {
      formateDate(time) {
        return formateDate(time, 'yyyy-MM-dd hh:mm:ss');
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .slidein-enter-active, .slidein-leave-active
      transition: all .8s
    .slidein-enter, .slidein-leave-to
      opacity: 0
      transform: translateX(80%)
    .food-detail-el
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 30
      overflow: hidden
      background-color: #fff
      .food-detail-wrap
        padding-bottom: 60px
        .img-header
          position: relative
          width: 100%
          height: 0
          padding-top: 100%
          .img
            position: absolute
            left: 0
            top: 0
            width: 100%
            height: 100%
          .icon
            position: absolute
            left: 18px
            top: 18px
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5)
            color: #fff
        .food-content
          position: relative
          padding: 18px
          font-size: 12px
          .name
            color: rgb(7, 17, 27)
            font-size: 14px
            font-weight: 700
          .baseinfo
            padding: 8px 0 18px
            span
              display: inline-block
              color: rgb(147, 153, 159)
              &.rating
                margin-left: 6px
          .price-wrap
            color: rgb(240, 20, 20)
            font-size: 0
            line-height: 24px
            span
              display: inline-block
              font-size: 14px
              font-weight: 700
              &.old-price
                margin-left: 6px
                color: rgb(147, 153, 159)
                font-size: 10px
                text-decoration: line-through
          .add-cardshop-wrap
            position: absolute
            right: 18px
            bottom: 22px
            .move-enter-active, .move-leave-active
              transition: all .5s
            .move-enter, .move-leave-to
              opacity: 0
              transform: translateY(30px)
            .add-cardshop
              position: absolute
              right: 0px
              bottom: 0px
              width: 74px
              height: 24px
              line-height: 24px
              text-align: center
              color: #fff
              border-radius: 24px
              background-color: rgb(0, 160, 200)
            .cartcontrol-wrap
              position: relative
              top: 7px
              right: -6px
        .food-info
          padding: 18px
          .title
            font-size: 14px
            margin-bottom: 6px
            font-weight: 700
            color: rgb(7, 17, 27)
          .intro
            line-height: 24px
            font-size: 12px
            font-weight: 200
            color: rgb(77, 85, 93)
        .ratings
          padding: 18px 0
          .title
            padding: 0 18px
            font-size: 14px
            margin-bottom: 6px
            font-weight: 700
            color: rgb(7, 17, 27)
          .content
            padding: 0 18px
            border-top: solid 1px #eee
            .rating-list
              font-size: 12px
              .rating-item
                border-bottom: solid 1px #eee
                padding: 16px 0
                .sub-title
                  display: flex
                  line-height: 12px
                  font-size: 10px
                  color: rgb(147, 153, 159)
                  .time
                    flex: 1
                  .user-wrap
                    flex: 0 0 80px
                    width: 80px
                    .avatar
                      width: 12px
                      height: 12px
                      border-radius: 50%
                .text
                  margin-top: 6px
                  line-height: 16px
                  color: rgb(7, 17, 27)
                  .icon
                    font-size: 12px
                    margin-right: 4px
                    &.icon-thumb_up
                      color: rgb(0, 160, 200)
                    &.icon-thumb_down
                      color: rgb(147, 153, 159)
</style>
