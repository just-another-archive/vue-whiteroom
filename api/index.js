import Vue from 'vue'

const client = (command, parameters, context = window) => {
  if (!context.__whiteroom__)
    context.__whiteroom__ = [{ command, parameters }]
  else if (Array.isArray(context.__whiteroom__))
    context.__whiteroom__.push({ command, parameters })
  else if (command in context.__whiteroom__)
    context.__whiteroom__[command](parameters)
}

export const inspect = (experiment, { path, ...parameters } = {}) => {
  if (experiment.__file && !path)
    path = experiment.__file.replace(/.vue$/, '')

  client('inspect', { path, experiment, ...parameters })
}
export const infos  = (parameters) => client('infos', parameters)

export const device = (name, dimensions) => client('device', { name, dimensions })

export const layout = (name, file) => client('layout', { name, file })

export const log    = (...parameters) => client('log', parameters)

export const wrap = component => {
  return {
    abstract: true,
    functional: true,

    inject: component.inject,
    props: component.props,

    triggers: component.triggers || Object
      .keys(component.methods || {})
      .filter(method => !method.startsWith('_') && !method.startsWith('$'))
      .reduce((object, method) => ({ ...object, [method]: {} }), {}),

    render(h, { props, parent, children }) {
      const { $store } = parent
      const child = h(component, { props }, children)

      // we use internal Vue insert hook to get into the instance
      const insert = child.data.hook.insert;
      child.data.hook.insert = function(vnode) {
        const vm = vnode.componentInstance;

        // and hijack $emit to add store dispatch and event pop in the console
        const emit = vm.$emit;
        vm.$emit = function() {
          const event = Array.from(arguments)
          $store.dispatch('log', ['[EVENT TRIGGER]', event.shift(), ...event])
          return emit.apply(vm, arguments)
        }

        return insert(vnode)
      }

      return child
    },
  }
}
