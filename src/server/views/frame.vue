<template>
  <div class="frame" :class="{ responsive: device === 'responsive' }">
    <div class="viewport" :style="dimensions">
    <iframe
        ref="frame"
        :src="`./microscope.html#${$route.fullPath}`"
        @load="frame.bridge = $refs.frame.contentWindow" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import connect from '../../connector'

export default {
  computed: {
    ...mapState(['devices', 'device', 'rotate']),

    dimensions() {
      const style = this.devices[this.device];
      return this.rotate ? { width: style.height, height: style.width } : style
    },
  },

  data() { return {
    frame: connect()
  }; },

  beforeCreate() {
    this.$root.$on('frame', (command, parameters) => {
      this.frame.emit(command, parameters)
    })
  },
}
</script>

<style lang="stylus" scoped>
@import '../vars.styl'

.frame
    flex 1 1 auto
    position relative
    border-radius .25rem

    &:not(.responsive)
      background rgba($fglight, .1)
      border 1px dashed $fglight

  .viewport
    position absolute
    top 50%
    left 50%
    transform translate(-50%,-50%)
    z-index 0
    background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAPklEQVQ4T+2TsQkAQAwCE7L/xgZ/AsEyD1qLxeE1SZaR3TVaVZ1BySkMJZoPbgPAMmVmPFMyKDmFoTbl/G0e08Nta2ZMKSUAAAAASUVORK5CYII=')
    transition width .4s, height .4s, transform .4s
    box-shadow $shadow
    border-radius $radius

  .viewport > iframe
    width 100%
    height 100%
    border none
</style>
