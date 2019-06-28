<template>
  <div class="select">
  <select @input="e => $emit('input', e.target.value)" v-bind="$attrs">
    <option :key="i" v-for="(v, k, i) in $props.enum" :value="Array.isArray($props.enum) ? v : k">{{ v }}</option>
  </select>
  </div>
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

<style lang="stylus" scoped>
.select select
  -webkit-appearance none
  -moz-appearance none
  -ms-appearance none
  appearance none
  background url("data:image/svg+xml;,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'%3E%3Cpath fill='%23353a40' d='M0 1L2 3L4 1L3 1L2 2L1 1'/%3E%3C/svg%3E") no-repeat right 0.8em center/0.5em 0.625em #fff !important

.select
  position relative
  padding 0 !important
  border none !important

.select:after
  content ''
  position absolute
  right 1rem

</style>

