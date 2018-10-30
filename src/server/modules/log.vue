<template>
  <div class="log">
    <div class="header">
      <search v-model="filter" />
      <span class="clear" @click="$store.dispatch('clear')">clear</span>
    </div>
    <ul>
      <li :key="i" v-for="(log, i) in filtered">{{ log }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Search from '../components/search.vue'

export default {
  components: { Search },

  data() { return {
    filter: ''
  }; },

  computed: {
    ...mapState({
      logs: state => state.log
    }),

    filtered() {
      return this.logs.filter(log => log.indexOf(this.filter) !== -1)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import('../vars.styl')

.log
  display flex
  flex-direction column

  .header
    display flex
    flex 0 0 auto
    padding 1rem

    .search
      flex 1 0 auto

    .clear
      display block
      flex 0
      margin-left 1rem
      padding .25rem .5rem
      border none
      background transparent
      cursor pointer
      background transparent
      transition background .2s, color .2s
      color #333
      font-size .5rem
      line-height 1rem

      &:hover
        background rgba($bg, .8)
        color $fg

  ul
    flex 1 1 auto
    overflow scroll
    margin 0rem 1rem 1rem
    padding 0
    list-style none
    font-size .8rem

    li
      padding .5rem 0
      border-bottom 1px solid $bd
      color #888
      font-family Menlo, monospace
      font-size .6rem

      &:last-child
        border none
</style>
