<template>
  <div class="rating-select">
    <div class="btn-group border-1px">
      <span class="btn btn-all" :class="{active: activeFlag===showText[0]}" @click="btnToggle(showText[0])">{{showText[0]}}{{ratings.length}}</span>
      <span class="btn btn-positive" :class="{active: activeFlag===showText[1]}" @click="btnToggle(showText[1])">{{showText[1]}}{{postiveCount}}</span>
      <span class="btn btn-negative" :class="{active: activeFlag===showText[2]}" @click="btnToggle(showText[2])">{{showText[2]}}{{ratings.length - postiveCount}}</span>
    </div>
    <div class="only-content" @click="onlyContentFn">
      <span class="icon icon-check_circle" :class="{active: onlyContentShow}"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
        ratings: {
          type: Array
        },
        showText: {
          type: Array,
          default() {
              return ['全部', '推荐', '吐槽'];
          }
        },
        onlyContent: {
          type: Boolean,
          default: false
        }
    },
    data() {
      return {
        activeFlag: this.showText[0]
      };
    },
    methods: {
      onlyContentFn() {
        this.$emit('onlyContentHandle');
      },
      btnToggle(val) {
        this.activeFlag = val;
        var rateTypeFlag = '';
        switch (val) {
          case this.showText[1]:
            rateTypeFlag = 'POSITIVE';
            break;
          case this.showText[2]:
            rateTypeFlag = 'NEGATIVE';
            break;
          default:
            rateTypeFlag = 'ALL';
        }
        this.$emit('rateTypeToggleHandle', rateTypeFlag);
      }
    },
    computed: {
      postiveCount() {
        var _count = 0;
        this.ratings.forEach((val) => {
          if (val.rateType === 0) {
              _count++;
          }
        });
        return _count;
      },
      onlyContentShow() {
        return this.onlyContent;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/css/mixin.styl'
  .rating-select
    font-size: 12px
    padding: 0 18px
    .btn-group
      padding: 18px 0 22px
      font-size: 0
      border-1px(rgba(7, 17, 27, 0.1))
      .btn
        margin-right: 8px
        padding: 8px 12px
        line-height: 16px
        border-radius: 2px
        font-size: 12px
        &.btn-all
          background-color: rgba(0, 160, 200, 0.4)
        &.btn-positive
          background-color: rgba(0, 160, 200, 0.2)
          color: rgb(77, 85, 93)
        &.btn-negative
          background-color: rgba(77, 85, 93, 0.2)
          color: rgb(77, 85, 93)
        &.active
          background-color: rgb(0, 160, 200)
          color: #fff
    .only-content
      padding: 12px 0
      color: rgb(147, 153, 159)
      span
        display: inline-block
        vertical-align: top
        line-height: 24px
      .icon
        margin-right: 6px
        font-size: 18px
        &.active
          color: rgb(0, 160, 220)
</style>
