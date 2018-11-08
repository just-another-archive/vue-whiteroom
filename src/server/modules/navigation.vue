<template>
  <div class="navigation">
    <search v-model="filter" />

    <template v-for="(links, group, i) in groups">
      <group :key="i" ref="groups" :name="group">
        <router-link :key="link.path" v-for="link in links"
                      class="link" :to="link.path">{{ link.name }}</router-link>
      </group>
    </template>
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
           ? this.links.filter(link => link.name.indexOf(this.filter) !== -1)
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
  .search
    margin 1rem

  .link
    display block
    position relative
    padding 1rem
    border-top 1px solid lighten($bd, 5%)
    cursor pointer
    color #bbb
    font-size .8rem
    font-weight bold
    text-decoration none
    transition background .2s, color .2s, padding-left .2s

    &:first-child
      border-top-color $fg

    &:hover
      background rgba(#000, .05)
      padding-left 1.5rem

    &.router-link-active
      background $fg
      color $bg
      padding-left 2rem

</style>
