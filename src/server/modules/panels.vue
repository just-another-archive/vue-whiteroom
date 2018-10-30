<template>
  <div class="panels" :class="toggle ? 'shown' : 'hidden'">
    <button class="toggle" @click="toggle = !toggle" />
    <div class="content">
      <section><slot /></section>
      <aside><slot name="closet" /></aside>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() { return {
    toggle: false,
  }; },

  watch: {
    toggle(val) {
      this.$store.commit('fullscreen', val ? 1 : -1)
    },
  },
}
</script>

<style lang="stylus" scoped>
@import('../vars.styl')

.panels
  position absolute
  right 0
  height 100vh
  z-index 3
  box-shadow 0px 0 1rem -.5rem rgba(#000, 0.5)
  transition transform .4s

  &.hidden
    transform translateX(100%)

  &.shown
    transform translateX(0)

    & .toggle
      &:before, &:after
        left 25%
        width 50%

      &:before
        transform rotate(135deg) translateX(0)

      &:after
        transform rotate(-135deg) translateX(0)

  & > .toggle
    position absolute
    right 100%
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
      right 50%
      top 50%
      width 25%
      height .25rem
      background $fg
      transition left .4s, width .4s, background .4s, transform .4s

    &:before
      transform rotate(135deg) translateX(-30%)

    &:after
      transform rotate(-135deg) translateX(-30%)

  & > .content
    position relative
    z-index 2
    display flex
    width 300px
    height 100%
    background $vp
    border-left 1px solid $bd
    flex-direction column

    & > section
      position relative
      flex 1 1 auto
      overflow scroll
      color $fg

    & > aside
      position relative
      overflow scroll
      flex 0 0 auto
      height 30%
      border-top 1px solid $bd
      color $fg
      background darken($vp, 3%)

      &:before
        content ''
        position sticky
        display block
        top 0
        width 100%
        height .5rem
        margin-bottom -.25rem
        background linear-gradient(to bottom, rgba(0,0,0,0.1) -50%, rgba(0,0,0,0) 100%)
        pointer-events none

</style>
