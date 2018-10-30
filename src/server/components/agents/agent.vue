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
    toggle: false,
  }; }
}
</script>

<style lang="stylus" scoped>
@import('../../vars.styl')

.agent
  transition border .2s

  &:hover
    border-left 4px solid $fg

  & > .container
    display flex

    & > .label
      flex 1 1 auto
      padding .25rem 0
      font-size .8rem
      font-weight bold

      &.clickable
        cursor pointer

        & > span
          padding-bottom .25rem
          border-bottom 1px dotted rgba($fg, .5)

    & > div
      display flex
      justify-content flex-end
      align-items center
      width 50%

      & >>> *
        display block
        width 100%
        height 100%
        padding .25rem .5rem
        background #fff
        border none
        border-radius .3rem
        outline none

.agent.trigger > .container > div >>> *
  background transparent

.agent > .description
  max-height 100px
  margin-top 1rem
  color #444
  font-size .5rem

  &.plode-enter-active, &.plode-leave-active
    transition max-height .4s, margin-top .4s, opacity .4s

  &.plode-enter, &.plode-leave-to
    max-height 0
    margin-top 0
    opacity 0
</style>
