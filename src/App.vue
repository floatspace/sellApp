<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="{path:'/goods', params: 123}" :params="seller">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {urlParse} from 'common/js/util';
  import header from 'components/header/header';
  import axios from 'axios';
  export default {
    name: 'app',
    data() {
      return {
          seller: {
            id: (() => {
              var _res = urlParse();
              return _res.id || null;
            })()
          }
      };
    },
    components: {
        'v-header': header
    },
    created() {
      axios.get('/api/seller').then((res) => {
        let getData = res.data;
        if (getData.errCode === 0) {
          this.seller = Object.assign({}, this.seller, getData.data);
          console.log(this.seller);
        }
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/css/index.styl"
  #app
    .tab
      display flex
      height  40px
      line-height 40px
      border-1px(rgba(7,17,27,0.1))
      font-size 14px
      .tab-item
        flex 1
        text-align center
        .active
          color: rgb(240,20,20)

</style>
