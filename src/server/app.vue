<template>
  <div class="whiteroom">
    <headline v-if="false" />

    <panel ref="leftpanel" class="left">
      <navigation />
    </panel>

    <frame />

    <panel class="right" closet>
      <settings />
      <agents />
      <log slot="closet" />
    </panel>
  </div>
</template>

<script>
import Headline from './modules/headline.vue'
import Frame from './modules/frame.vue'
import Navigation from './modules/navigation.vue'
import Panel from './modules/panel.vue'
import Settings from './modules/settings.vue'
import Agents from './modules/agents.vue'
import Log from './modules/log.vue'

export default {
  components: { Headline, Frame, Navigation, Panel, Settings, Agents, Log },

  mounted() {
    this.$refs.leftpanel.toggle = true;
  }
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

.panel.left
  height auto

.panel.right .content
  width 20rem
</style>
