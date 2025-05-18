<template>
  <input
    :value="modelValue"
    @input="onInput"
    type="text"
    class="search_input"
  />
</template>

<script lang="ts">
export default {
  name: 'search-input',

  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },

  emits: ['update:modelValue'],

  methods: {
    onInput(event: Event) {
      const target = event.target as HTMLInputElement
      this.updateModelValue(target.value)
    },
    updateModelValue(value: string) {
      this.$emit('update:modelValue', value)
    },
  },
}
</script>

<style scoped lang="scss">
@use '@/assets/variables' as vars;

.search_input {
  width: 255px;
  text-align: left;
  background: inherit;
  color: vars.$main-color;
  border: none;
  border-bottom: 2px solid vars.$grey-color;
  font-size: 18px;
  outline: none;
}

input:focus {
  border-bottom: 2px solid vars.$main-color;
}

@media (max-width: 500px) {
  .search_input {
    width: 200px;
    font-size: 16px;
  }
}
</style>
