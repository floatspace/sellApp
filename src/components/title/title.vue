<template>
  <div class="title">
    <div class="line"></div>
    <div class="text">{{text}}</div>
    <div class="line"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
      props: {
          text: String
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .title
    width: 100%
    margin: 0 auto
    display: flex
    .line
      flex: 1
      position: relative
      top: -6px
      border-bottom: solid 1px rgba(255, 255, 255, 0.2)
    .text
      padding: 0 12px
      font-weight: 700
</style>
