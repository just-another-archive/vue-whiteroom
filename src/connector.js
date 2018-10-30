export default bridge => {
  let listeners = []

  window.addEventListener('message', event => {
    if (event.data.whiteroom) {
      listeners.forEach(({ cb }) => cb(event.data))
      listeners = listeners.filter(l => l.i === -1 || --l.i > 0)
    }
  })

  return {
    bridge,

    on(cb) {
      listeners.push({ cb, i: -1 })
      return this
    },

    once(cb) {
      listeners.push({ cb, i: 1 })
      return this
    },

    off(cb) {
      const i = listeners.find(l => l.cb === cb)

      if (i !== -1)
        listeners.splice(i, 1)

      return this
    },

    emit(command, parameters) {
      if (!this.bridge)
        return

      try {
        this.bridge.postMessage({
          whiteroom: true, command, parameters,
        }, window.origin)
      }
      catch(err) { console.log(err) }

      return this
    }
  }
}
