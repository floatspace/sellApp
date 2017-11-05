<template>
  <span class="icon" :class="supportClass[iconType]"></span>
</template>

<script type="text/ecmascript-6">
  export default {
      props: {
          iconType: Number
      },
      created() {
          this.supportClass = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/css/basic.styl"
  @import "../../common/css/mixin.styl"
  .icon
    display: inline-block
    width: 12px
    height: 12px
    background-size: 12px 12px
    background-repeat: no-repeat
    &.decrease
      bg-img('decrease_1')
    &.discount
      bg-img('discount_1')
    &.guarantee
      bg-img('guarantee_1')
    &.invoice
      bg-img('invoice_1')
    &.special
      bg-img('special_1')
</style>
