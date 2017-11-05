<template>
  <div ref="sellerEl" class="seller-wrap">
    <div class="seller">
      <div class="seller-header">
        <div class="baseinfo border-1px">
          <div class="title">{{seller.name}}</div>
          <div class="star-wrap">
            <span class="star-item"><star :size="36" :score="seller.score"></star></span>
            <span class="sell-count">月售{{seller.sellCount}}单</span>
          </div>
          <div class="favorite" :class="{active: favoriteCalc}" @click="favoriteSelectFn">
            <p class="icon icon-favorite"></p>
            <p class="text">{{favoriteCalc ? '已收藏' : '收藏'}}</p>
          </div>
        </div>
        <ul class="delivery-list">
          <li class="item">
            <p class="desc">起送价</p>
            <p class="content"><span class="num">{{seller.minPrice}}</span>元</p>
          </li>
          <li class="item">
            <p class="desc">商家配送</p>
            <p class="content"><span class="num">{{seller.deliveryPrice}}</span>元</p>
          </li>
          <li class="item">
            <p class="desc">平均配送时间</p>
            <p class="content"><span class="num">{{seller.deliveryTime}}</span>分钟</p>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="seller-bulletin">
        <h1 class="title">公告与活动</h1>
        <p class="content">{{seller.bulletin}}</p>
        <ul class="supports">
          <li class="support" v-for="item in seller.supports">
            <imgIcon :iconType="item.type"></imgIcon>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="real">
        <h1 class="title">商家实景</h1>
        <div class="pics-wrap" ref="picsWrapEl">
          <ul class="pics-list" ref="picsListEl">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120px" height="90px" alt="">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="infos">
        <h1 class="title">商家信息</h1>
        <ul class="info-list">
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {saveToLocal, loadFromLocal} from '../../common/js/store';
  import star from 'components/star/star';
  import split from 'components/split/split';
  import imgIcon from 'components/imgIcon/imgIcon';
  import Bscroll from 'better-scroll';
  export default {
    components: {
      star: star,
      split: split,
      imgIcon: imgIcon
    },
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        favoriteFlag: (() => {
          var _res = loadFromLocal(this.seller.id, 'favorite', false);
          return _res;
        })()
      };
    },
    mounted() {
      console.log(this.seller);
      this._initScroll();
      this._initRealScroll();
    },
    watch: {
      seller(newVal) {
        this._initScroll();
        this._initRealScroll();
      }
    },
    methods: {
      favoriteSelectFn() {
        this.favoriteFlag = !this.favoriteFlag;
        saveToLocal(this.seller.id, 'favorite', this.favoriteFlag);
      },
      _initScroll() {
        /* eslint-disable no-new */
        if (!this.scroll) {
          var sellerEl = this.$refs.sellerEl;
          this.scroll = new Bscroll(sellerEl, {
            click: true
          });
        } else {
          setTimeout(() => {
            this.scroll.refresh();
          }, 1000);
        }
      },
      _initRealScroll() {
        if (!this.seller.pics) return;
        var picW = 120;
        var picLen = this.seller.pics.length;
        var picsListEl = this.$refs.picsListEl;
        picsListEl.style.width = (picW * picLen + 6 * (picLen - 1)) + 'px';
        /* eslint-disable no-new */
        var picsWrapEl = this.$refs.picsWrapEl;
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new Bscroll(picsWrapEl, {
              scrollX: true,
              eventPassthrough: 'vertical'
            });
          } else {
            this.picScroll.refresh();
          }
        });
      }
    },
    computed: {
      favoriteCalc() {
        return this.favoriteFlag;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/css/mixin.styl";
.seller-wrap
  position: absolute
  left: 0
  top: 174px
  bottom: 0
  overflow: hidden
  .seller
    font-size: 10px
    .seller-header
      padding: 0 18px
      .baseinfo
        position: relative
        padding: 18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .title
          margin-bottom: 8px
          line-height: 14px
          color: rgb(7, 17, 27)
          font-size: 14px
        .star-wrap
          font-size: 0
          span
            display: inline-block
            vertical-align: middle
          .sell-count
            margin-left: 12px
            color: rgb(77, 85, 93)
            font-size: 10px
        .favorite
          position: absolute
          right: 10px
          top: 18px
          width: 40px
          text-align: center
          .icon
            position: relative
            left: -6px
            margin-bottom: 14px
            font-size: 24px
          .text
            width: 100%
            line-height: 10px
            font-size: 10px
            color: rgb(77, 85, 93)
          &.active
            .icon
              color: red
      .delivery-list
        display: flex
        padding: 18px 0px
        .item
          flex: 1
          border-right: solid 1px rgba(7, 17, 27, 0.1)
          text-align: center
          &:last-child
            border: none
          .desc
            margin-bottom: 4px
            font-size: 10px
            color: rgb(147, 153, 159)
          .content
            color: rgb(7, 17, 27)
            font-size: 10px
            .num
              font-size: 24px
    .seller-bulletin
      padding: 0 18px
      .title
        margin: 18px 0 8px
        font-size: 14px
      .content
        line-height: 24px
        padding: 0 12px
        color: rgb(240, 20, 20)
        font-size: 12px
      .supports
        margin-top: 16px
        font-size: 12px
        .support
          padding: 16px 12px
          border-top: solid 1px rgba(7, 17, 27, 0.1)
    .real
      padding: 0 18px 18px
      overflow: hidden
      .title
        margin: 18px 0 12px
        font-size: 14px
      .pics-wrap
        position: relative
        width: 100%
        height: 90px
        overflow: hidden
        .pics-list
          position: absolute
          left: 0
          top: 0
          font-size: 0
          .pic-item
            display: inline-block
            margin-right: 6px
            &:last-child
              margin-right: 0px
    .infos
      padding: 0 18px 36px
      .title
        margin: 18px 0
        font-size: 14px
      .info-list
        .info-item
          padding: 16px 12px
          line-height: 16px
          border-top: solid 1px rgba(7, 17, 27, 0.1)
          color: rgb(7, 17, 27)
          font-weight: 200
</style>
