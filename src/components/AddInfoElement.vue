<template>
  <div class="add_info_element">
    <div class="subheader">
      {{ subheader }}
    </div>

    <div class="icon">
      <img :src="source" alt="">
    </div>
    
    <div class="value">
      {{ value }}
    </div>
  </div>
</template>


<script setup lang="ts">
  const props = defineProps<{
    value: string,
    subheader: string,
    source: string
  }>()
</script>


<style scoped lang="scss">
  @use '@/assets/variables' as vars;
  
  .add_info_element {
    width: 25%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    border-radius: vars.$border-radius;
    background-color: vars.$deep-dark-blue;
  }

  .subheader {
    text-transform: uppercase;
    font-size: 16px;
  }

  .icon img {
    width: 70%;
  }
  
  .value {
    font-size: 18px;
    font-weight: 600;
  }
</style>