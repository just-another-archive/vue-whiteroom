<script>
export default {
  abstract: true,
  functional: true,

  render(h, { props, children }) {
    const { child, ...options } = props.proxy

    return h(child, options, children)
  }
}
</script>
