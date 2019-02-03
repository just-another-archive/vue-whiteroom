import Vue from "vue";
import Vuex from "vuex";
import connect from '../connector';

Vue.use(Vuex);

// whiteroom <-> microscope communication
const microscope = connect()

microscope.on(({ command, parameters }) => {
  const commands = ['register', 'devices', 'layouts', 'log']

  if (commands.includes(command))
    store.commit(command, parameters)
})

// store
const store = new Vuex.Store({
  state: {
    title: 'vue-whiteroom',
    fullscreen: 0,

    db: {},
    log: [],

    layouts: [],

    devices: {
      'responsive'    : { width: '100%',   height: '100%' },
      'Galaxy S5'     : { width: '360px',  height: '640px' },
      'Pixel 2'       : { width: '411px',  height: '731px' },
      'Pixel 2 XL'    : { width: '411px',  height: '823px' },
      'iPhone 5/SE'   : { width: '320px',  height: '568px' },
      'iPhone 6/7/8'  : { width: '375px',  height: '667px' },
      'iPhone 6/7/8 +': { width: '414px',  height: '736px' },
      'iPhone X'      : { width: '375px',  height: '812px' },
      'iPad'          : { width: '768px',  height: '1024px' },
      'iPad Pro'      : { width: '1024px', height: '1366px' },
    },

    device: 'responsive',

    rotate: false,

    fontsize: 1,
  },

  mutations: {
    register(state, { path, ...parameters }) {
      state.db = { ...state.db, [path]: {
        ...parameters,

        // we have to manipulate agents data structure a little bit...
        agents: (parameters.agents || []).map(agent => {
          const { name, type, description, ...properties } = agent

          // we cant deconstruct 'default' property, so we manually handle it
          delete properties.default

          return {
            name, type, description, properties, default: agent.default
          }
        }),

        injects: (parameters.inject || {})
      } }
    },

    log(state, parameters) {
      if (parameters)
        state.log = [parameters.join(' ')].concat(state.log).slice(0, 50)
      else
        state.log = []
    },

    layouts(state, parameters) {
      state.layouts = [...state.layouts, ...parameters]
        .filter((e, i, a) => a.indexOf(e) === i)
    },

    devices(state, parameters) {
      state.devices = { ...state.devices, ...parameters }
    },

    device(state, parameters) {
      state.device = parameters
    },

    rotate(state) {
      state.rotate = !state.rotate
    },

    fullscreen(state, value) {
      state.fullscreen += value
    },

    scale(state, parameters) {
      state.fontsize = parameters
    },
  },

  actions: {
    clear(context) {
      context.commit('log', null)
    },
  }
});


export default store;
