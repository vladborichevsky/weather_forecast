<template>
  <input 
    :value="modelValue"
    @input="UpdateModelValue($event.target.value)"
    type="text"
    class="search_input">

</template>

<script>
  export default {
    name: 'search-input',

    props: {
      modelValue: {
        type: String,
        required: true
      }
    },

    emits: [ 'update:modelValue' ],

    methods: {
      UpdateModelValue(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
</script>

<style scoped>
  .search_input {
    width: 255px;
    text-align: left;
    background: inherit;
    color: var(--main-color);
    border: none;
    border-bottom: 2px solid var(--grey-color); 
    font-size: 18px;
    outline: none;
  }

  input:focus {
    border-bottom: 2px solid var(--main-color);
  }
</style>