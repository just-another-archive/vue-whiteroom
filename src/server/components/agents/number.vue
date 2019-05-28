<template>
  <input type="number" :value="value" @input="e => $emit('input', e.target.value)" v-bind="$attrs" />
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>
