<template>
  <div class="panel" :class="toggle ? 'shown' : 'hidden'">
    <button class="toggle" @click="toggle = !toggle" />
    <div class="content">
      <section><slot /></section>
      <aside v-if="closet"><slot name="closet" /></aside>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    closet: {
      type: Boolean,
      default: false,
    }
  },

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

.panel
  position absolute
  top 50%
  height 100vh
  z-index 3
  box-shadow 0px 0 1rem -.5rem rgba(#000, 0.5)
  transition transform .4s, border-width .4s

  &.left
    left 0

    &.hidden
      transform translate(calc(-100% + .25rem), -50%)
      border-right .25rem solid $fg

    & > .toggle
      left 100%

      &:before, &:after
        left 50%

      &:before
        transform rotate(45deg) translateX(-30%)

      &:after
        transform rotate(-45deg) translateX(-30%)

    &.shown > .toggle
      &:before, &:after
        left 25%
        width 50%

      &:before
        transform rotate(45deg) translateX(0)

      &:after
        transform rotate(-45deg) translateX(0)

  &.right
    right 0

    &.hidden
      transform translate(calc(100% - .25rem), -50%)
      border-left .25rem solid $fg

    & > .toggle
      right 100%

      &:before, &:after
        right 50%

      &:before
        transform rotate(135deg) translateX(-30%)

      &:after
        transform rotate(-135deg) translateX(-30%)

    &.shown > .toggle
      &:before, &:after
        left 25%
        width 50%

      &:before
        transform rotate(135deg) translateX(0)

      &:after
        transform rotate(-135deg) translateX(0)

  &.shown
    transform translate(0, -50%)
    border-width 0

  & > .toggle
    position absolute
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
    min-width 20vw
    height 100%
    max-height 100vh
    overflow: scroll
    background $vp
    border 1px solid $bd
    flex-direction column

    & > section
      position relative
      overflow scroll
      flex 0 1 auto
      color $fg

    & > aside
      position relative
      overflow scroll
      flex 1 1 auto
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
