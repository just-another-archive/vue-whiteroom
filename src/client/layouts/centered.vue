<script>
export default {
  abstract: true,
  functional: true,

  render(h, { props, injections, children }) {
    const { child, ...options } = props.proxy

    return h('div', { class: 'centeredlayout' }, [
      h(child, options, children)
    ])
  }
}
</script>

<style lang="stylus">
.centeredlayout
  position absolute
  left 50%
  top 50%
  max-width 100vw
  max-height 100vh
  overflow scroll
  transform translate(-50%, -50%)
</style>
