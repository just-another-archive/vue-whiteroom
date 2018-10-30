<template>
  <div class="whiteroom">
    <headline />
    <links />

    <frame />

    <panels>
      <settings />
      <agents />
      <log slot="closet" />
    </panels>
  </div>
</template>

<script>
import Headline from './modules/headline.vue'
import Frame from './modules/frame.vue'
import Links from './modules/links.vue'
import Panels from './modules/panels.vue'
import Settings from './modules/settings.vue'
import Agents from './modules/agents.vue'
import Log from './modules/log.vue'

export default {
  components: { Headline, Frame, Links, Panels, Settings, Agents, Log },
}
</script>

<style lang="stylus">
body
  background #f0f0f0

.whiteroom
  position absolute
  overflow hidden
  top 0
  right 0
  bottom 0
  left 0
</style>
