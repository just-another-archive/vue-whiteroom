<template>
  <div class="search">
    <fieldset>
      <input ref="input" type="text" placeholder="Search..." v-model="input" />
      <span @click="input = ''">⨯</span>
    </fieldset>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  },

  data() { return {
    input: this.value
  }; },

  watch: {
    input(val) {
      this.$emit('input', val)
    }
  }
}
</script>


<style lang="stylus" scoped>
@import('../vars.styl')

.search fieldset
    position relative
    height 1.5rem
    margin 0
    padding 0
    border none
    border-bottom 1px solid $lightgray

  input
    display block
    width 100%
    height 100%
    padding .25rem
    background transparent
    border none
    outline none
    color $black
    font-family system-ui

  span
    position absolute
    display block
    top 0
    right 0
    width calc(1.5rem - 2px)
    height calc(1.5rem - 2px)
    cursor pointer
    color $fg
    line-height 1.1rem
    text-align center
    transition opacity .2s

    &:hover
      background $lightgray

  input:placeholder-shown + span
    opacity 0
</style>
