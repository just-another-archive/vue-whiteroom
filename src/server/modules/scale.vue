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
      this.$store.commit('scale', MIN + val * (MAX - MIN))
      this.$root.$emit('frame', 'scale', MIN + val * (MAX - MIN))
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
  padding 1rem
  border-bottom 1px solid #eaeaea

  .track, .thumb
    cursor pointer
    pointer-events none

  .track
    position relative
    width 100%
    height 1rem
    background rgba(0,0,0,.1)
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
    color #888
    text-align right
</style>
