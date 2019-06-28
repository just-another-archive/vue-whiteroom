<template>
  <div class="scale"
    @mousemove="e => e.buttons > 0 ? update(e.offsetX / e.target.clientWidth) : null"
    @dblclick="reset()">
    <div ref="track" class="track">
      <div class="thumb" :style="`width: ${100 * (fontsize - MIN) / (MAX - MIN)}%`" />
    </div>

    <p class="info">font-size <strong>{{fontsize.toFixed(3)}}em</strong></p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const MIN = .25
const MAX = 2.5
const STEP = .005

export default {
  computed: {
    ...mapState(['fontsize'])
  },

  data() {
    return {
      MIN, MAX
    }
  },

  methods: {
    update(val) {
      const clamp = MIN + val * (MAX - MIN)
      this.$store.commit('scale', STEP * Math.round(clamp / STEP))
      this.$root.$emit('frame', 'scale', STEP * Math.round(clamp / STEP))
    },

    reset() {
      this.$store.commit('scale', 1)
      this.$root.$emit('frame', 'scale', 1)
    }
  },
}
</script>

<style lang="stylus" scoped>
@import('../vars.styl')

.scale
  position relative
  width 100%
  padding 2 * $dim 1.5 * $dim $dim
  border-top 1px solid $lightgray

  .track, .thumb
    cursor pointer
    pointer-events none

  .track
    position relative
    width 100%
    height 1rem
    background $lightgray
    clip-path: polygon(0% 100%, 100% 0%, 100% 100%);

  .thumb
    position absolute
    left 0
    top 0
    height 100%
    background $fg

  .info
    margin .5rem 0 0
    font-size .5rem
    color $darkgray2
    text-align right
</style>
