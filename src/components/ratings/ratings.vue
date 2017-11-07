<template>
  <div class="rating-wrap"  ref="ratingWrap">
    <div class="ratings">
      <div class="rating-header">
        <div class="header-left">
          <div class="score">{{seller.score}}</div>
          <div class="text">综合评分</div>
          <div class="rate">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="header-right">
          <div class="item">
            <span>服务态度</span>
            <span><star :size="36" :score="seller.serviceScore"></star></span>
            <span class="score-text">{{seller.serviceScore}}</span>
          </div>
          <div class="item">
            <span>商品评分</span>
            <span><star :size="36" :score="seller.foodScore"></star></span>
            <span class="score-text">{{seller.foodScore}}</span>
          </div>
          <div class="item">
            <span>送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <div class="ratingselect-wrap">
        <ratingselect :ratings="ratings" :showText="['全部', '满意', '不满意']" :onlyContent="onlyContentFlag" @onlyContentHandle="onlyContentFn" @rateTypeToggleHandle="rateTypeToggleFn"></ratingselect>
      </div>
      <div class="rating-body">
        <ul class="rating-list">
          <li class="rating-item border-1px" v-for="rating in ratingsCalcRes">
            <div class="avatar">
              <img :src="rating.avatar" alt="">
            </div>
            <div class="content">
              <h1 class="username">{{rating.username}}</h1>
              <div class="star-wrap">
                <span class="star-item"><star :size="24" :score="rating.score"></star></span>
                <span class="star-item delivery-time" v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-if="rating.recommend">
                <span class="icon" :class="recommendTypes[rating.rateType]"></span>
                <span class="recommend-item" v-for="recommend in rating.recommend">{{recommend}}</span>
              </div>
              <p class="rating-time">{{rating.rateTime | formatDate}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import {formateDate} from '../../common/js/util';
  import Bscroll from 'better-scroll';
  import split from 'components/split/split';
  import star from 'components/star/star';
  import ratingselect from 'components/ratingselect/ratingselect';
  export default{
    components: {
      split: split,
      ratingselect: ratingselect,
      star: star
    },
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        recommendTypes: ['icon-thumb_up', 'icon-thumb_down'],
        onlyContentFlag: false,
        rateTypeFlag: 'ALL'
      };
    },
    created() {
      axios.get('./api/ratings').then(res => {
        let getData = res.data;
        if (getData.errCode === 0) {
          this.ratings = getData.data;
          this.$nextTick(() => {
            this._initScroll();
          });
        }
      });
    },
    methods: {
      _initScroll() {
        var ratingEl = this.$refs.ratingWrap;
        /* eslint-disable no-new */
        new Bscroll(ratingEl, {
          click: true
        });
      },
      onlyContentFn() {
        this.onlyContentFlag = !this.onlyContentFlag;
      },
      rateTypeToggleFn(flag) {
        this.rateTypeFlag = flag;
      }
    },
    computed: {
      ratingsCalcRes() {
        var res = [];
        if (this.rateTypeFlag === 'ALL') {
          res = this.ratings;
        } else if (this.rateTypeFlag === 'POSITIVE') {
          res = this.ratings.filter((item) => {
            return item.rateType === 0;
          });
        } else if (this.rateTypeFlag === 'NEGATIVE') {
          res = this.ratings.filter((item) => {
            return item.rateType === 1;
          });
        }

        if (this.onlyContentFlag) {
          res = res.filter((item) => {
            return item.text.length > 0;
          });
        }
        return res;
      }
    },
    filters: {
      formatDate(time) {
        return formateDate(time, 'yyyy-MM-dd hh:mm:ss');
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/css/mixin.styl"
  .rating-wrap
    position: absolute
    width: 100%
    top: 174px
    bottom: 0px
    overflow: hidden
    z-index: 49
    .rating-header
      display: flex
      padding: 18px 0
      font-size: 12px
      .header-left
        flex: 0 0 142px
        text-align: center
        border-right: solid 1px rgba(147, 153, 159, 0.2)
        .score
          font-size: 24px
          color: rgb(255, 153, 0)
        .text
          margin: 6px 0px 8px
          color: rgb(7, 17, 27)
        .rate
          font-size: 10px
          color: rgb(147, 153, 159)
      .header-right
        flex: 1
        .item
          padding: 0 24px
          font-size: 10px
          span
            display: inline-block
            line-height: 24px
            vertical-align: middle
          .score-text
            color: rgb(255, 153, 0)
          .time
            color: rgb(147, 153, 159)
    .ratingselect-wrap
      padding-top: 18px
      border-bottom: 1px solid rgba(147, 153, 159, 0.2)
    .rating-body
      font-size: 12px
      .rating-list
        padding: 0 18px
        .rating-item
          padding: 18px 0
          display: flex
          border-1px(rgba(7, 17, 27, 0.1))
          .avatar
            flex: 0 0 28px
            width: 28px
            height: 28px
            margin-right: 12px
            img
              width: 100%
              height: 100%
              border-radius: 50%
          .content
            position: relative
            flex: 1
            .username
              line-height: 12px
              margin-bottom: 4px
              font-size: 10px
              color: rgb(7, 17, 27)
            .star-wrap
              .star-item
                display: inline-block
                vertical-align: top
              .delivery-time
                color: rgb(147, 153, 159)
            .text
              margin: 6px 0 8px
              line-height: 18px
              font-size: 12px
            .recommend
              font-size: 0px
              margin-bottom: -4px
              .icon
                font-size: 10px
              .icon-thumb_up
                color: rgb(0, 160, 200)
              .icon-thumb_down
                color: rgb(183, 187, 191)
              .recommend-item
                display: inline-block
                font-size: 9px
                margin-left: 8px
                margin-bottom: 4px
                padding: 0 6px
                line-height: 16px
                border: solid 1px rgba(7, 17, 27, 0.1)
                border-radius: 2px
                color: rgb(147, 153, 159)
                background-color: #fff
            .rating-time
              position: absolute
              right: 0
              top: 0
              color: rgb(147, 153, 159)
              font-size: 10px

</style>
