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

  data: () => ({ toggle: false })
}
</script>

<style lang="stylus" scoped>
@import('../vars.styl')

.group
  & > div
    position relative
    display block
    width 100%
    padding 1rem
    font-size .8rem
    font-weight bold
    cursor pointer

    &:after
      content ''
      position absolute
      right 1rem
      top 50%
      width .3rem
      height .3rem
      border-top .2rem solid $fg
      border-right .2rem solid $fg
      transition transform .4s
      transform translateY(-50%) rotate(45deg)

  &.complete > div:after
      transform translateY(-50%) rotate(135deg)

  section
    overflow hidden

    &.expand-enter-active, &.expand-leave-active
      transition opacity .4s, height .4s

    &.expand-enter, &.expand-leave-to
      opacity 0

  & + .group
    border-top 1px solid $bd
</style>
