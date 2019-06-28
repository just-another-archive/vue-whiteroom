<template>
  <div class="navigation">
    <search v-model="filter" />

    <div class="groups">
      <template v-for="(links, group, i) in groups">
        <group :key="i" ref="groups" :name="group">
          <router-link :key="link.path" v-for="link in links"
                        class="link" :to="link.path">
                          <span>{{ link.name }}</span>
          </router-link>
        </group>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Search from '../components/search.vue'
import Group from '../components/group.vue'

export default {
  components: { Search, Group },

  data() { return {
      filter: '',
  }; },

  computed: {
    ...mapState({
      links: state => Object
        .entries(state.db)
        .map(([path, data]) => ({
          path: `/${path}`,
          name: data.title || path,
          group: data.group || '',
          description: data.description,
        }))
    }),

    filtered() {
      return this.filter.length
           ? this.links.filter(link => (
              link.group.indexOf(this.filter) !== -1 || link.name.indexOf(this.filter) !== -1
            ))
           : this.links
    },

    groups() {
      return this.filtered.reduce((object, link) => {
        (object[link.group] = object[link.group] || []).push(link)
        return object
      }, {})
    },
  },
}
</script>

<style lang="stylus" scoped>
@import('../vars.styl')

.navigation
  display flex
  flex-direction column

  .search
    flex 0 0 auto
    margin 0 $dim $dim

  .groups
    flex 1 1 auto
    max-height calc(100vh - 10rem)
    overflow scroll

  .link
    position relative
    display block
    padding $navdim $dim $navdim 2 * $dim
    cursor pointer
    color $darkgray2
    font-size .8rem
    text-decoration none
    transition background .2s, color .2s, padding-left .2s

    & span
      position relative
      z-index 1

    &:before
      z-index -1
      content ''
      position absolute
      top 0
      left 0
      width 0
      height 100%
      background rgba($fg, .8)
      transition width .3s

    &:first-child
      border-top-color $fg

    &:hover
      color $bg
      padding-left 2.5 * $dim

      &:before
        width 80%

    &.router-link-active
      background $fg
      color $bg
      padding-left 3 * $dim

      &:before
        width 100%

</style>
