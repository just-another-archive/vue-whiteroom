<script>
export default {
  abstract: true,
  functional: true,

  render(h, { props, children }) {
    const { child, ...options } = props.proxy

    const grid = [
      'b r',  'b',   'b l r',  'b',  'b l',
      'r', null, 'l r', null, 'l',
      'r t b',  't b',  'f',  't b',  'l t b',
      'r', null, 'l r', null, 'l',
      't r',  't',   't l r',  't',  't l',
    ]

    return h('div', { class: 'fluidlayout' }, grid.map(e => (
      e === null ? h(child, options, children)
                 : h('div', { class: e })
    )))
  }
}
</script>

<style lang="stylus">
.fluidlayout
  display grid
  width calc(100vw - 20px)
  height calc(100vh - 20px)
  margin 10px

  grid-template-columns 10px min-content 20px auto 10px
  grid-template-rows 10px min-content 20px auto 10px

  $style = 1px dashed #888

  .f
    border $style

  .t
    border-top $style

  .r
   border-right $style

  .b
   border-bottom $style

  .l
    border-left $style
</style>

