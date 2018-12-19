import Vue from "vue"
import Vuex from "vuex"
import qs from 'query-string'

import connect from '../connector'
import expose from './api'

import { convert } from './types'

import layouts from './layouts'

Vue.use(Vuex);

// reactive routing
window.addEventListener('hashchange', () => store.commit('hash', window.location.hash))

// whiteroom <-> microscope communication
const whiteroom = connect(window.parent)

whiteroom.on(({ command, parameters }) => (
  command in store._mutations ? store.commit(command, parameters) : console.log(`${command} not found`)
))

// pass the list of layouts to whiteroom
whiteroom.emit('layouts', Object.keys(layouts))

// userland api
expose({
  inspect: parameters => {
    store.commit('register', parameters)

    const { experiment, ...others } = parameters
    let { mixins, props, inject, events, triggers, methods } = experiment

    // merge mixins for props
    if (mixins)
      props = mixins.reduce((props, mixin) => ({ ...props, ...mixin.props }), props)

    // cannot clone validator functions
    if (props)
      Object.values(props).forEach(prop => delete prop.validator)

    // use public methods as triggers
    if (methods)
      triggers = Object
        .keys(methods)
        .filter(method => !method.startsWith('$') && !method.startsWith('_'))
        .map(method => ({ [method]: {} }))
        .reduce((triggers, method) => ({ ...triggers, ...method }), triggers || {})

    // pass the command upstairs
    whiteroom.emit('register', {
      ...others,

      // cast away prop types
      agents: Object.entries(props || {})
                    .map(([name, def]) => ({
                      ...def, name, type: convert(def)
                    })),

      inject: Object.entries(inject || {})
                    .map(([name, def]) => ({ ...def, name })),

      events: events || [],

      triggers: Object.entries(triggers || {})
                    .map(([name, def]) => ({ ...def, name })),
    })
  },

  device: ({ name, dimensions }) => {
    whiteroom.emit('devices', { [name]: dimensions })
  },

  layout: ({ name, file }) => {
    store.commit('layouts', { [name]: file })
    whiteroom.emit('layouts', [name])
  },

  log: parameters => {
    whiteroom.emit('log', parameters)
  }
})

// store
const store = new Vuex.Store({
  state: {
    layouts: { ...layouts },
    layout: Object.values(layouts).shift(),

    db: {},
    path : '',
    query: {},

    trigger: '',
  },

  mutations: {
    hash(state, hash = '') {
      const path = hash
      .split('?')
      .shift()
      .replace(/^#\//, '')

      const query = hash.indexOf('?') !== -1
                  ? qs.parse(hash.substr(hash.indexOf('?')))
                  : {}

      if (state.path !== path) {
        state.path = path
        state.query = { ...query }
      }
      else {
        state.query = { ...state.query, ...query }
      }
    },

    register(state, { path, experiment, ...parameters }) {
      state.db = { ...state.db, [path]: experiment }
    },

    layouts(state, payload) {
      state.layouts = { ...state.layouts, ...payload }
    },

    layout(state, name = '') {
      if (name in state.layouts)
        state.layout = state.layouts[name]
    },

    trigger(state, name = '') {
      state.trigger = name
    },
  },

  actions: {
    log(context, parameters) {
      whiteroom.emit('log', parameters)
    }
  }
});

// initialize store hash
store.commit('hash', window.location.hash)

export default store;
