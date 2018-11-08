 <script>
 export default {
  name: 'TransitionExpand',
  functional: true,

  render(h, context) {
    const data = {
      props: { name: 'expand', },

      on: {
        enter(el) {
          Object.entries({
            position: 'absolute',
            visibility: 'hidden',
            width: getComputedStyle(el).width,
            height: 'auto',
          }).forEach(([k, v]) => el.style.setProperty(k, v))

          const height = getComputedStyle(el).height;

          Object.entries({
            position: null,
            visibility: null,
            width: null,
            height: 0,
          }).forEach(([k, v]) => el.style.setProperty(k, v))

          setTimeout(() => el.style.height = height)
        },

        leave(el) {
          el.style.height = getComputedStyle(el).height;
          setTimeout(() => el.style.height = 0)
        },
      }
    }

    return h('transition', data, context.children)
  },
}
 </script>
