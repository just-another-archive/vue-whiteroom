<template>
  <div class="whiteroom">
    <panel class="left" name="left" closet>
      <hgroup>
        <img :src="poster" />
      </hgroup>
      <navigation slot="closet" />
    </panel>

    <frame />

    <panel class="right" name="right" closet>
      <settings />
      <scale />
      <agents />
      <log slot="closet" />
    </panel>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Frame from './views/frame.vue'
import Panel from './views/panel.vue'
import Navigation from './views/navigation.vue'
import Settings from './views/settings.vue'
import Scale from './views/scale.vue'
import Agents from './views/agents.vue'
import Log from './views/log.vue'

export default {
  components: { Frame, Panel, Navigation, Settings, Scale, Agents, Log },

  computed: {
    ...mapState({
      poster: state => state.poster,
    }),
  },
}
</script>

<style lang="stylus">
@import './vars.styl'

body
  background-color #f3f4f8

.whiteroom
  position absolute
  overflow hidden
  display flex
  width 100vw
  height 100vh
  padding $dim

  /*.left
    flex 0 0 auto
    display flex
    flex-direction column
    min-width 18rem
    width 20%
    max-width 25rem
    margin-left -1 * $dim
    overflow scroll*/

  .left
    hgroup
      display flex
      padding $dim 2 * $dim
      align-items center

      img
        flex 1 1 auto
        height 6 * $dim
        object-fit contain
        object-position center

@media screen and (min-width: 768px)
  .whiteroom
    padding $dim 0

  .right
    min-width 20rem !important
    width 25% !important
    max-width 30rem !important
</style>
