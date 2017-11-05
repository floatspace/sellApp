<template>
  <div class="star" :class="'star-'+size">
      <span v-for="starClass in starClasses" class="star-item" :class="starClass">{{starClass}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  var STARLENGTH = 5;
  var STARON = 'star-on';
  var STARHALF = 'star-half';
  var STAROFF = 'star-off';
  export default{
      props: {
        size: Number,
        score: Number
      },
      data() {
          return {
          };
      },
      computed: {
        starClasses() {
            var res = [];
            var starOnCount;
            var starHalfCount;

            starOnCount = Math.floor(this.score);
            starHalfCount = (this.score - starOnCount) >= 0.5 ? 1 : 0;

            for (var i = 0; i < STARLENGTH; i++) {
                if (i < starOnCount) {
                    res.push(STARON);
                    continue;
                }
                if (i === starOnCount && starHalfCount === 1) {
                  res.push(STARHALF);
                  continue;
                }
                res.push(STAROFF);
            }
            return res;
        }
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/css/mixin.styl"
  .star
    font-size: 0
    span
      display: inline-block
      margin-right: 4px
      &:last-child
        margin-right: 0
    &.star-48
      .star-item
        width: 24px
        height: 24px
        background-size: 24px 24px
      .star-on
        bg-img('star48_on')
      .star-half
        bg-img('star48_half')
      .star-off
        bg-img('star48_off')
    &.star-36
      .star-item
        width: 18px
        height: 18px
        background-size: 18px 18px
      .star-on
        bg-img('star36_on')
      .star-half
        bg-img('star36_half')
      .star-off
        bg-img('star36_off')
    &.star-24
      .star-item
        width: 12px
        height: 12px
        background-size: 12px 12px
      .star-on
        bg-img('star24_on')
      .star-half
        bg-img('star24_half')
      .star-off
        bg-img('star24_off')



</style>
