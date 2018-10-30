<template>
  <button class="trigger" @click="() => $root.$emit('frame', 'trigger', trigger)">trigger</button>
</template>

<script>
export default {
  props: {
    trigger: String,
  }
}
</script>

<style lang="stylus" scoped>
@import('../../vars.styl')

.trigger
  background transparent !important
  border 2px solid $fg !important
  color $fg !important
  font-weight bold !important
  text-transform uppercase
  cursor pointer
  transition background .2s

  &:hover
    background rgba(#fff, .5) !important

  &:active
    background rgba(#fff, .1) !important
</style>
