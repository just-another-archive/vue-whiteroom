<template>
  <div class="agent">
    <div class="container">
      <label v-if="name" class="label" :class="!!description ? 'clickable' :null" @click="toggle = !toggle">
        <span>{{ name }}</span>
      </label>
      <div><slot /></div>
    </div>

    <transition name="plode">
      <div class="description" v-if="toggle && description">{{ description }}</div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    description: String,
  },

  data() { return {
    toggle: true,
  }; }
}
</script>

<style lang="stylus" scoped>
@import('../../vars.styl')

.agent
  position relative

  &:before
    content ''
    position absolute
    top 0
    left 25%
    right 25%
    height 1px
    background $lightgray2

  & > .container
    display flex

    & > .label
      flex 1 1 auto
      display flex
      align-items center
      padding .25rem 0
      font-size .8rem
      font-weight bold
      color $darkgray2

      &.clickable
        cursor pointer

        & > span
          padding-bottom .25rem
          border-bottom 1px dotted rgba($fg, .5)

    & > div
      display flex
      justify-content flex-end
      align-items center
      width 60%

      & >>> *
        display block
        width 100%
        height 100%
        padding .6 * $dim
        background $bg
        border 1px solid $lightgray2
        border-radius .2rem
        outline none

.agent.trigger > .container > div >>> *
  padding 0
  background transparent

.agent > .description
  max-height 100px
  margin-top .5 * $dim
  color $darkgray2
  font-size .5rem

  &.plode-enter-active, &.plode-leave-active
    transition max-height .4s, margin-top .4s, opacity .4s

  &.plode-enter, &.plode-leave-to
    max-height 0
    margin-top 0
    opacity 0
</style>
