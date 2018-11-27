<p align="center"><img src="./logo.svg" width="150px"></p>

# Vue Whiteroom

### white what?

`vue-whiteroom` is a javascript web-application which aim is to display vue components in a safely sealed environment where they can be manipulated while developing them.

> I personally think that the "whiteroom" vocabulary is more appropriate, since nowadays not so many people use storybook to display user stories, rather as a safe way to isolate components, as if they were bacterias to observe ; which explains the name of the project. The UI may not look fancy but the main idea behind it is to provide the maximum space available to display your component, as it is the main function of this application. Panels come on overlay and are foldable on purpose ; that said, i'd be more than happy to have some inputs to improve.

#### features

- [x] hot reload
- [x] _experiments_ (like "story objects") as plain Vue files
- [x] automatically generated knobs from `props` inspection
- [x] `props` can be extended to enhance knobs easily
- [x] multiple _layouts_
- [x] multiple _devices_
- [x] extensible _devices_ and _layouts_ declaration
- [x] multi level navigation

### why not reuse?

while [storybook](https://github.com/storybooks/storybook) is an incredible project, it has been written with React for React. The abstraction layer is great, but doesn't work well with Vue.js (as for now, at the very least). An other project, [vue-play](https://github.com/vue-play/vue-play), was completing the task, but lacked of "knobs", and also doesn't look maintained for a year or so.

### under the hood?

This is a basic "storybook" application, so the architecture is quite similar. The application is split in two parts, one rendered in the main frame, and the second one rendered in an iframe.

Your components are rendered in the iframe, and fed with property values from the url of the iframe. The main application has some knobs which are serialized and passed to the iframe's url, and voila.

### how to run?

1. Install it from npm `npm install --save-dev vue-whiteroom`
2. Add `./node_modules/vue-whiteroom/bin/whiteroom` to your npm scripts
3. Use the default entrypoint `./experiments` in your project

A basic entrypoint looks like this :

```js
import { inspect } from 'vue-whiteroom/api'

import Demo1 from './demo1.vue'
inspect(Demo1)
```

### `vue-whiteroom/api` functions

- `inspect(VueObject, { path = VueObject.__file__, group = '', name = path, description = null })` : this function registers a new object to be inspected. If you come from other projects such as vue-play or storybook, it's almost similar as `.add(() => VueObject)`. The "group" property provides a simple way to add foldable navigation by categories.

- `device(name, css)` : this function adds the `name` device in the devices definition. `css` must contain at least `width` and `height` as normal css declaration.

- `layout(name, VueObject)` : this function adds the `name` layout in the list of available layouts. see next chapter about how to write a proper layout (there's a trick)

- `log(...parameters)` : this function will pass `parameters` to the cute log box, instead of using `console.log`. It's not overriden by default on purpose, but you can do it so easily it's almost mandatory.

    ```
    import { log } from 'vue-whiteroom/api'
    const _log = console.log;
    console.log = function() {
      log(Array.from(arguments))
      _log.apply(console, arguments)
    }
    ```

- `wrap(VueComponent)` : this function will return an auto-generated Vue file to handle your component. It will pass props along (but can't really guess for enums) ; injections will be passed, events will be _all_ listened to, and public functions (not starting with `_` or `$`) will be automatically registered as trigger.

### configure my experiment

A simple experiment should be a Vue file rendering at least an element.

```
<template>
  <div class="button">
    <slot />
  </div>
</template>

<style lang="stylus" scoped>
.button
  position relative
  overflow hidden
  display inline-block
  padding .5rem 1rem
  border .25rem solid #3eaf7c
  cursor pointer
  color #3eaf7c
  font-family -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif
  font-weight bold
  text-transform uppercase
  transition color .3s

  &:before
    content ''
    position absolute
    z-index -1
    left -1rem
    top 0
    width 0
    height 100%
    transform skewX(-20deg)
    transition width 1s, background .3s

  &:hover
    color #fff

    &:before
      width calc(100% + 2rem)
      background #3eaf7c
</style>
```

- Only the default slot is customizable (for now). It is available as a string.

- Properties will be automatically parsed and will match type and default value accordingly. If you want to customize the property to limit the values to a limited set, you can use a special `enum` property and your whiteroom will display a `<select>` box instead of the corresponding input.

```
<template>
  <div class="button" :class="{ [color]: true, disabled }">
    <slot>{{ label }}</slot>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null,
    },

    color: {
      type: String,
      default: 'green',
      enum: ['red', 'green', 'blue']
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style>...</style>
```

- If you wish to use injections, they are also parsed and available automatically.

```
<template>
  <div class="button" :class="{ [color]: true, disabled }">
    <slot>{{ $t(_button_label) }}</slot>
  </div>
</template>

<script>
export default {
  inject: {
    _button_label: {
      default: 'missing-key'
    },
  },

  props: {
    color: {
      type: String,
      default: 'green',
      enum: ['red', 'green', 'blue']
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    // supposely vue-i18n
    $t(key) {
      return `label_${key}`
    },
  },
}
</script>
```

- If you want to call methods on your experiment, all _public_ methods (non `$`, `_`) can be automatically called. It should be noted that no arguments can be passed.

```
<template>
  <div class="button" :class="{ [color]: true, disabled }" @click="onclick">
    <slot>{{ $t(_button_label) }}</slot>
  </div>
</template>

<script>
export default {
  inject: {
    _button_label {
      default: 'missing-key'
    },
  },

  props: {
    color: {
      type: String,
      default: 'green',
      enum: ['red', 'green', 'blue']
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onclick() { window.alert('you clicked !') }
  },
}
</script>
```


### layouts

The real component will be passed to you in a `proxy` prop, along with props. Injections are automatically resolved, so there's no so much other things to care about.

You'll need to make it `abstract` and `functional` to avoid messing with parenting and connections with the rest of the application. After that, render the child as many times as necessary in the `render(h)` function. Don't forget to pass `children` along, as it contains the default `slot` string.

Here's the most basic example :

```
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
```

Or, if you wanted something more sophisticated :

```
<script>
export default {
  abstract: true,
  functional: true,

  render(h, { props, children }) {
    const { child, ...options } = props.proxy
    const instances = Array(4).fill('div')
                              .map(div => h(div, null, [ h(child, options, children) ]))

    return h('div', { class: 'foolayout' }, instances)
  }
}
</script>

<style lang="stylus" scoped>
.foolayout
  position absolute
  width 100%
  height 100%

  & > div
    position absolute
    width 50%
    height 50%

  & > div:nth-child(2n + 1)
    left 50%

  & > div:nth-child(2) ~ div
    top 50%
</style>
```
