<template>
  <div class="agents">
    <search v-model="filter" v-if="fields > 5" />
    <agent name="<slot />" description="default slot as text">
      <text-agent multiline :value="$route.query['slot']" @input="value => set('slot', value)" />
    </agent>
    <h3 v-if="filtered_injects.length">injections</h3>
    <agent :key="`inject_${i}`" v-for="(inject, i) in filtered_injects"
           :name="inject.name" :description="inject.description">
      <text-agent :value="$route.query[inject.name]" @input="value => set(inject.name, value)" />
    </agent>
    <h3 v-if="filtered_props.length">props</h3>
    <agent :key="`agent_${i}`" v-for="(prop, i) in filtered_props"
           :name="prop.name" :description="prop.description">
      <component
        :is="AGENTS[prop.type]"
        :value="$route.query[prop.name]"
        @input="value => set(prop.name, value)"
        v-bind="prop.properties" />
    </agent>
    <h3 v-if="filtered_triggers.length">methods</h3>
    <agent :key="`trigger_${i}`" v-for="(trigger, i) in filtered_triggers"
           :name="trigger.name" :description="trigger.description">
      <trigger :trigger="trigger.name" />
    </agent>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Search from '../components/search.vue'

import AGENTS from '../components/agents'
import Agent from '../components/agents/agent.vue'
import Trigger from '../components/agents/trigger.vue'
import TextAgent from '../components/agents/text.vue'

export default {
  components: { Search, Agent, Trigger, TextAgent },

  data() { return {
    AGENTS, filter: ''
  }; },

  computed: {
    ...mapState({
      props(state) {
        if (this.path in state.db)
          return state.db[this.path].agents || []

        return []
      },

      injects(state) {
        if (this.path in state.db)
          return state.db[this.path].injects || []

        return []
      },

      triggers(state) {
        if (this.path in state.db)
          return state.db[this.path].triggers || []

        return []
      },
    }),

    path() {
      return this.$route.path.substr(1)
    },

    fields() {
      return (this.props.length + this.injects.length + this.triggers.length)
    },

    filtered_props() {
      return this.props.filter(({ name }) => name.indexOf(this.filter) !== -1)
    },

    filtered_injects() {
      return this.injects.filter(({ name }) => name.indexOf(this.filter) !== -1)
    },

    filtered_triggers() {
      return this.triggers.filter(({ name }) => name.indexOf(this.filter) !== -1)
    },
  },

  watch: {
    '$route.path'(val) {
      this.$router.replace({
        query:  [...this.props, { name: 'slot' }]
                .map(prop => ({ [prop.name]: prop.default || null }))
                .reduce((w, o) => ({ ...w, ...o }), {})
      })
    },
  },

  methods: {
    set(k, v) {
      this.$router.replace({
        query: { ...this.$route.query, [k]: v }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import('../vars.styl')

.agents
  & > .search
    padding 1rem

  & > hr
    width 100%
    margin 0
    border none
    border-top 1px solid $bd

    &:first-child, &:last-child, & + hr
      display none

  .agent, .inject, .trigger
    padding 1rem
    border-bottom 1px solid $bd

  h3
    margin 0
    padding .5rem .5rem 1rem
    border-top .25rem solid $bd
    border-bottom 1px solid $bd
    color $fg
    font-size .75rem
    font-weight bold
    text-align right

</style>
