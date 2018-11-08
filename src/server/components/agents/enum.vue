<template>
  <select @input="e => $emit('input', e.target.value)" v-bind="$attrs">
    <option :key="i" v-for="(v, k, i) in $props.enum" :value="Array.isArray($props.enum) ? v : k">{{ v }}</option>
  </select>
</template>

<script>
export default {
  props: {
    enum: {
      type: [Array, Object],
      default() { return [] },
    },

    value: {
      type: String,
      default: '',
    }
  }
}
</script>
