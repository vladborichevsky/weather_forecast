<template>
  <div>
    <div className="info_item_error">
      {{ errorFetchMes }}
    </div>

    <div v-show="fetchFail">
      <img src="/fetchFail.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      errorFetchMes: {
        type: String,
        required: true
      },

      fetchFail: {
        type: Boolean,
        required: true 
      }
    }
  }
</script>

<style scoped>
  .info_item_error {
    margin-top: 5px;
    color: var(--red-color);
    font-size: 16px;
    min-height: 20px;
  }
</style>