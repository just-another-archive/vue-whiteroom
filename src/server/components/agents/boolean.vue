<template>
  <input type="checkbox" :ckecked="value === true || value === 'true'" @click="e => $emit('input', e.target.checked.toString())" v-bind="$attrs" />
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Boolean],
      default: 'false'
    }
  }
}
</script>

<style lang="stylus" scoped>
input
  display inline !important
  width 1rem !important
</style>
