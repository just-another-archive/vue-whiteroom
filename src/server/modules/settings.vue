<template>
  <div class="settings">
    <devices />
    <rotate />
    <layout />
  </div>
</template>

<script>
import Devices from './devices.vue'
import Rotate from './rotate.vue'
import Layout from './layout.vue'

export default {
  components: { Devices, Rotate, Layout }
}
</script>

<style lang="stylus" scoped>
@import('../vars.styl')

.settings
  display flex
  flex-direction row
  justify-content flex-end
  height 2rem
  border-bottom 1px solid $bd
</style>
