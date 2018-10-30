<template>
  <select @input="e => $emit('input', e.target.value)" v-bind="$attrs">
    <option :key="i" v-for="(v, k, i) in dataset" :value="Array.isArray(dataset) ? v : k">{{ v }}</option>
  </select>
</template>

<script>
export default {
  props: {
    dataset: {
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
