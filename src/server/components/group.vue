<template>
  <div class="group" :class="{ complete: toggle }">
    <div @click="toggle = !toggle">{{ name }}</div>
    <transition-expand>
      <section v-if="toggle"><slot /></section>
    </transition-expand>
  </div>
</template>

<script>
import TransitionExpand from '../transitions/expand.vue'

export default {
  components: { TransitionExpand },

  props: {
    name: {
      type: String,
      default: '',
    },
  },

  data: () => ({ toggle: true })
}
</script>

<style lang="stylus" scoped>
@import('../vars.styl')

.group
  transition margin-top .3s

  & > div
    position relative
    display block
    width 100%
    padding $dim 4 * $dim $dim $dim
    font-size .9rem
    color $darkgray2
    cursor pointer
    transition padding-bottom .3s

    &:before
      content ''
      position absolute
      top 0
      left 25%
      right 25%
      height 1px
      background $lightgray2

    &:after
      content ''
      position absolute
      right 1.5 * $dim
      top 50%
      width .3rem
      height .3rem
      border-top .1rem solid $fg
      border-right .1rem solid $fg
      transition top .3s, transform .3s
      transform translateY(-50%) rotate(45deg)

  &.complete > div
    padding-bottom .5 * $dim
    font-weight bold

  &.complete > div:after
      transform translateY(-50%) rotate(135deg)

  section
    overflow hidden

    &:after
      content '_'
      display block
      color transparent

    &.expand-enter-active, &.expand-leave-active
      transition opacity .3s, height .3s

    &.expand-enter, &.expand-leave-to
      opacity 0

  &:first-of-type > div:before
    display none

</style>
