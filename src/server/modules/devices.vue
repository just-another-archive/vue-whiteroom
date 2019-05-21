<template>
  <div class="devices">
    <svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 58 58'>
      <path d='M58,13h-4V9h-4V5H8v4H4v4H0v32h4v4h4v4h42v-4h4v-4h4V13z M2,43V15h2v28H2z M6,47v-2V13v-2h2v36H6z M48,51H10v-2V9V7h38v2v40V51z M52,47h-2V11h2v2v32V47z M56,43h-2V15h2V43z' fill='#666'/>
    </svg>

    <select :value="device" @input="e => $store.commit('device', e.target.value)">
      <option :key="i" v-for="(device, i) in devices">{{ device }}</option>
    </select>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      devices: state => Object.keys(state.devices),
      device: state => state.device
    })
  },
}
</script>

<style lang="stylus" scoped>
.devices
  position relative
  width 1rem
  height 1rem
  margin .5rem
  cursor pointer

  svg
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    pointer-events none

  select
    width 100%
    height 100%
    border none
    cursor pointer
    outline none
    font-size 0
    -moz-appearance none
    -webkit-appearance none

    &:-ms-expand
      display none
</style>
