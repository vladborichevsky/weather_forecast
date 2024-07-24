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

<script>
  export default {
    props: {
      value: {
        type: String,
        required: false
      },

      subheader: {
        type: String,
        required: true
      },

      source: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>
  .add_info_element {
    width: 25%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    border-radius: var(--border-radius);
    background-color: var(--deep-dark-blue);
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