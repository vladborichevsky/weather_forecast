<template>
  <button>
    <slot/>
  </button>
</template>

<script>
  export default {
    name: 'search-button' 
  }
</script>

<style scoped lang="scss">
  @use '@/assets/variables' as vars;

  button {
    cursor: pointer;
    background-color: inherit;
    color: vars.$dark-blue;
    font-size: 18px;
    font-weight: 400;
    padding: 0 10px;
    border: none;
    border-radius: 5px;
  }

  button:disabled {
    cursor: not-allowed;
  }
</style>