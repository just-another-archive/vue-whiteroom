<template>
  <div class="frame" :style="dimensions">
    <iframe
        ref="frame"
        :src="`./microscope.html#${$route.fullPath}`"
        @load="frame.bridge = $refs.frame.contentWindow" />
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
.frame
  z-index 0
  position absolute
  left 50%
  top 50%
  width 100%
  height 100%
  transform translate(-50%, -50%)
  background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAPklEQVQ4T+2TsQkAQAwCE7L/xgZ/AsEyD1qLxeE1SZaR3TVaVZ1BySkMJZoPbgPAMmVmPFMyKDmFoTbl/G0e08Nta2ZMKSUAAAAASUVORK5CYII=')
  transition width .4s, height .4s, transform .4s
  box-shadow 0 0 1rem -.25rem rgba(0,0,0,.5)

.frame > iframe
  width 100%
  height 100%
  border none
</style>
