<script>
import Vue from 'vue'

import { mapState } from 'vuex'
import { cast } from './types'

export default {
  provide() {
    return null // this is a hack, check about `query` watcher
  },

  computed: {
    ...mapState({
      layout  : state => state.layout,

      path    : state => state.path,
      query   : state => state.query,
      trigger : state => state.trigger,

      child   : state => state.path in state.db ? state.db[state.path] : null,
    }),
  },

  watch: {
    trigger(val) {
      if (!val)
        return

      this.$children.forEach(child => {
        try { child[val]() }
        catch(err) {}
      })

      this.$store.commit('trigger')
    },

    query(val) {
      if (!this.child)
        return

      this._provided = Object
        .entries(this.child.inject || {})
        .map(([prop, def]) => ({
          [prop]: prop in val ? val[prop] : def.default
        }))
        .reduce((a, b) => ({ ...a, ...b }), {})

      if (this.$children.length) {
        Vue.config.silent = true // we ignore Vue.js warning on purpose

        this.$children.forEach(child => {
          Object.entries(this._provided)
            .forEach(([prop, def]) => child[prop] = def)
        })

        Vue.config.silent = false // :)
      }
    }
  },

  render(h) {
    if (!this.child)
      return h('div')

    const mixins = this.child.mixins
                 ? this.child.mixins
                    .map(mixin => mixin.props)
                    .filter(Boolean)
                    .reduce((a, b) => ({ ...a, ...b }), {})
                 : {}

    const props = Object.entries({ ...this.child.props, ...mixins })
      .map(([prop, def]) => ({
        [prop]: cast(def, prop in this.query ? this.query[prop] : def.default)
      }))
      .reduce((a, b) => ({ ...a, ...b }), {})

    const on = (this.child.events || []).map(name => ({
        [name]: event => this.$store.dispatch('log', ['[EVENT TRIGGER]', name, JSON.stringify(event)])
      }))
      .reduce((a, b) => ({ ...a, ...b }), {})

    const proxy = { child: this.child, props, on }

    // force indirect update for injections
    if (this._provided === null) {
      this.$nextTick(() => {
        this._watchers
          .find(w => w.expression === 'query')
          .cb.call(this, this.query)
      })
    }

    return h(this.layout, {
      key: 'a',
      props: { proxy },
    }, this.query.slot || null)
  }
}
</script>

<style lang="stylus" scoped>
</style>
