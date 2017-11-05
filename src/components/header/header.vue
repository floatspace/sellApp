<template>
  <div class="header">
    <div class="content-wrap">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="desc">{{seller.description}}</div>
        <div v-if="seller.supports" class="supports">
          <imgIcon :iconType="seller.supports[0].type"></imgIcon>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div @click="showDetailFn" class="supports-count">
        <span v-if="seller.supports" class="count">{{seller.supports.length}}</span>个
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div @click="showDetailFn" class="bulletin-wrap">
      <span class="bulletin"></span>
      <span class="txt">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div v-if="showDetailFlag" class="detail-page">
        <div class="detail-wrap clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrap">
              <Star :size="48" :score="seller.score"></Star>
            </div>
            <Titles :text="titleTxt1"></Titles>
            <ul class="supports">
              <li class="support" v-for="item in seller.supports">
                <imgIcon :iconType="item.type"></imgIcon>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <Titles :text="titleTxt2"></Titles>
            <p class="bulletin">{{seller.bulletin}}</p>
          </div>
        </div>
        <div @click="hideDetailFn" class="detail-close">
          <span class="icon-close"></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Star from 'components/star/star';
  import Titles from 'components/title/title';
  import imgIcon from 'components/imgIcon/imgIcon';
  export default {
    components: {
      Star: Star,
      Titles: Titles,
      imgIcon: imgIcon
    },
    props: {
      seller: {
        type: Object
      }
    },
    data() {
        return {
          showDetailFlag: false,
          titleTxt1: '优惠信息',
          titleTxt2: '商家公告'
        };
    },
    methods: {
      showDetailFn() {
        this.showDetailFlag = true;
      },
      hideDetailFn() {
          this.showDetailFlag = false;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/css/basic.styl"
  @import "../../common/css/mixin.styl"
  .header
    position: relative
    background: rgba(7, 17, 27, 0.5)
    .content-wrap
      position: relative
      padding: 24px 12px 18px 24px
      color: #fff
      font-size: 0px
      .avatar
        display: inline-block
        width: 64px
        height: 64px
        img
          width: 100%
          border-radius: 4px
      .content
        display: inline-block
        margin-left: 16px
        vertical-align: top
        font-size: 14px
        .title
          margin: 0 0 8px 0
          font-size: 0
          span
            font-size: 16px
            display: inline-block
          .brand
            width: 30px
            height: 18px
            bg-img('brand')
            background-size: 30px 18px
          .name
            margin-left: 3px
            vertical-align: top
            font-size: 16px
            font-weight: bold
        .desc
          font-size: 12px
          font-weight: 200
          margin-bottom: 10px
        .supports
          font-size: 10px
          margin-bottom: 2px
          span
            display: inline-block
          .text
            vertical-align: top
      .supports-count
        position: absolute
        right: 10px
        bottom: 16px
        border-radius: 10px
        padding: 4px 4px 4px 6px
        background-color: rgba(0, 0, 0, 0.2)
        font-size: 10px
        span
          display: inline-block
        span + span
          margin-left: -3px

    .bulletin-wrap
      position: relative
      height: 28px
      line-height: 28px
      padding-right: 20px
      font-size: 10px
      background-color: rgba(7, 17, 27, 0.2)
      color: #fff
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
      .bulletin
        display: inline-block
        width: 22px
        height: 12px
        line-height: 28px
        vertical-align: top
        margin: 8px 4px auto 12px
        bg-img('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .icon-keyboard_arrow_right
        position: absolute
        right: 12px
        top: 8px
    .background
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: -1
      overflow: hidden
      img
        filter: blur(10px)
    .fade-enter-active, .fade-leave-active
      transition: all 0.5s
    .fade-enter, .fade-leave-to
      opacity: 0
      transform: translateX(100%)
    .detail-page
      position : fixed
      left : 0
      top : 0
      width : 100%
      height : 100%
      overflow: auto
      background : rgba(0,0,0, 0.8)
      backdrop-filter: blur(10px)
      color: #fff
      font-size : 14px
      z-index: 100
      .detail-wrap
        min-height : 100%
        .detail-main
          width: 80%
          margin: 0 auto
          padding-top: 64px
          padding-bottom: 64px
          .name
            text-align: center
            font-size: 16px
            font-weight: 700
            line-height: 16px
          .star-wrap
            margin: 16px auto 28px
            text-align: center
          .supports
            margin: 24px 12px 28px
            font-size: 0
            .support
              margin-bottom: 12px
              span
                display: inline-block
                vertical-align: middle
                font-size: 12px
              .text
                margin-left: 3px
          .bulletin
            margin: 12px 12px 0
            line-height: 24px
            font-size: 12px
            font-weight: 200
      .detail-close
        position : relative
        width : 32px
        height : 32px
        margin : -64px auto 0
        clear: both
        font-size : 32px

</style>
