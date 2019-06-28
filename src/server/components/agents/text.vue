<template>
  <input v-if="!multiline" type="text" :value="value" @input="e => $emit('input', e.target.value)" v-bind="$attrs" />
  <textarea v-else :value="value" @input="e => $emit('input', e.target.value)" v-bind="$attrs" />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },

    multiline: {
      type: Boolean,
      default: false,
    },
  }
}
</script>

<style lang="stylus" scoped>
textarea
  resize vertical
  min-height calc(3em + 1px)
  height calc(3em + 1px)
  max-height 10em
</style>

