<template>
  <div class="headline" :class="toggle && fullscreen ? null : 'small'" @click="toggle = !toggle">
    <hgroup>
      <h6 v-if="title">{{ title }}</h6>
      <h1>{{ path }}</h1>
      <transition name="plode">
        <aside v-if="description">{{ description }}</aside>
      </transition>
    </hgroup>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      fullscreen: state => state.fullscreen === 0,

      title: state => state.title,

      path(state) {
        const path = this.$route.path.substr(1)

        return path in state.db
             ? state.db[path].title || path
             : 'unknown'
      },

      description(state) {
        const path = this.$route.path.substr(1)

        return path in state.db && state.db[path].description
             ? state.db[path].description
             : null
      }
    }),
  },

  data() { return {
    toggle: false,
  }; },
}
</script>

<style lang="stylus" scoped>
@import('../vars.styl')

.headline
  position absolute
  left 0
  top 0
  padding 2rem 0 0 2rem
  z-index 2
  transition padding .4s

  /*
  &:before // shadow
    content ''
    position absolute
    z-index 1
    left 0
    bottom 0
    width 100vw
    height 10vh
    background linear-gradient(to top, rgba(0,0,0,.25) -100%,rgba(0,0,0,0) 100%)
    pointer-events none
    transform rotate(2.5deg)
    transform-origin left bottom
  */

  &.small
    padding 1rem 0 0 1rem

    hgroup
      transform scale(.5)

  hgroup
    position relative
    z-index 3
    display flex
    flex-direction column
    align-items flex-start
    transform-origin left top
    transition transform .4s

  h6
    display inline-block
    margin 0
    padding .5rem .75rem
    background #fff
    font-size .75rem

  h1
    display inline-block
    margin 0
    padding .5rem .75rem
    background $fg
    color $bg
    font-size 4rem

  aside
    max-width 50vw
    max-height 5rem
    margin-top 1rem
    overflow hidden

    &.plode-enter-active, &.plode-leave-active
      transition max-height .4s, margin-top .4s, opacity .4s

    &.plode-enter, &.plode-leave-to
      max-height 0
      margin-top 0
      opacity 0
</style>
