<template>
  <div class="links" :class="toggle ? 'shown' : 'hidden'">
    <button class="toggle" @click="toggle = !toggle" />
    <div ref="content" class="content"
         @mousemove="e => mouse = (e.clientY - $refs.content.offsetTop) / $refs.content.clientHeight"
         @mouseleave="e => {
           window.clearTimeout(t1);
           t1 = window.setTimeout(() => offset = anchor, 1000)
         }">
      <!-- <search v-model="filter" /> -->
      <div ref="list" class="list" :style="{ top: `${tween}px` }">
        <router-link :key="link.path" v-for="link in filtered"
                      class="link" :to="link.path">{{ link.name }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { TweenMax } from 'gsap/TweenMax'

import Search from '../components/search.vue'

export default {
  components: { Search },

  data() { return {
    window,

    toggle: false,
    filter: '',
    mouse: 0,
    anchor: 0,
    offset: 0,

    tween: 0,

    t1: null,
    t2: null,
  }; },

  watch: {
    toggle(val) {
      if (val)
        this.offset = this.anchor

      this.$store.commit('fullscreen', val ? 1 : -1)
    },

    '$route.path'(val) {
      const child = this.$children
        .find(child => child.to === val)

      this.anchor = - (child.$el.offsetTop + child.$el.clientHeight * .5) + this.$refs.content.clientHeight * .5
      this.offset = this.anchor

      window.clearTimeout(this.t2);
      this.t2 = window.setTimeout(() => this.toggle = false, 100)
    },

    mouse(val) {
      const min = Math.min(this.$refs.content.clientHeight, this.$refs.list.clientHeight)
      const max = Math.max(this.$refs.content.clientHeight, this.$refs.list.clientHeight)

      if (0 <= val && val <= 1)
        this.offset = -val * (max - min)
    },

    offset(val) {
      TweenMax.to(this.$data, .5, { tween: val })
    },
  },

  computed: {
    ...mapState({
      links: state => Object
        .entries(state.db)
        .map(([path, data]) => ({
          path: `/${path}`,
          name: data.title || path,
          description: data.description,
        }))
    }),

    filtered() {
      return this.links.filter(link => link.name.indexOf(this.filter) !== -1)
    },
  },

  mounted() {
    setTimeout(() => this.toggle = true, 25)
  }
}
</script>

<style lang="stylus" scoped>
@import('../vars.styl')

.links
  position absolute
  left 0
  top 0
  height 100vh
  max-width 50vw
  z-index 1
  transition transform .4s

  &.hidden
    transform translateX(-100%)

  &.shown
    transform translateX(0)

    & .toggle
      &:before, &:after
        left 25%
        width 50%

      &:before
        transform rotate(45deg) translateX(0)

      &:after
        transform rotate(-45deg) translateX(0)

  .toggle
    position absolute
    left 100%
    top calc(50% - 1.25rem)
    width 2.5rem
    height 2.5rem
    border none
    background transparent
    cursor pointer
    outline none
    transition background .4s

    &:before, &:after
      content ''
      position absolute
      left 50%
      top 50%
      width 25%
      height .25rem
      background $fg
      transition left .4s, width .4s, background .4s, transform .4s

    &:before
      transform rotate(45deg) translateX(-30%)

    &:after
      transform rotate(-45deg) translateX(-30%)

  .content
    position relative
    top 25%
    width 100%
    height 50%

  .list
    z-index 2
    position relative
    display flex
    flex-direction column
    align-items flex-start
    top 0

    .link
      position relative
      display inline-block
      padding .25rem .5rem
      cursor pointer
      background $fg
      color $bg
      font-size .75rem
      font-weight bold
      text-decoration none
      text-align center
      transform scale(.9) translateX(-.25rem)
      transform-origin left center
      transition background .2s, color .2s, transform .2s

      &:hover
        z-index 4
        transform translateX(0)

      &.router-link-active
        z-index 3
        background $bg
        transform scale(1)
        color #000
        box-shadow 0 0 1rem -.25rem rgba(#000, .25)

</style>
