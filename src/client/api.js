export default api => {
  // execute message cue
  if (Array.isArray(window.__whiteroom__)) {
    window.__whiteroom__
      .filter(({ command }) => command in api)
      .forEach(({ command, parameters }) => api[command](parameters))
  }

  // deliver api to userland
  window.__whiteroom__ = api
}
