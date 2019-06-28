 <script>
 export default {
  name: 'TransitionExpand',
  functional: true,

  render(h, context) {
    const data = {
      props: { name: 'expand', },

      on: {
        enter(el) {
          const { width, paddingTop, paddingBottom } = getComputedStyle(el)

          Object.entries({
            position: 'absolute',
            visibility: 'hidden',
            width,
            height: 'auto',
          }).forEach(([k, v]) => el.style.setProperty(k, v))

          const height = getComputedStyle(el).height;

          Object.entries({
            position: null,
            visibility: null,
            width: null,
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
          }).forEach(([k, v]) => el.style.setProperty(k, v))

          setTimeout(() => {
            el.style.height = height
            el.style.paddingTop = paddingTop
            el.style.paddingBottom = paddingBottom
          })
        },

        leave(el) {
          el.style.height = getComputedStyle(el).height;

          setTimeout(() => {
            el.style.height = 0
            el.style.paddingTop = 0
            el.style.paddingBottom = 0
          })
        },
      }
    }

    return h('transition', data, context.children)
  },
}
 </script>
