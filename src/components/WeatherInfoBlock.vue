
<template>
  <!-- Весь этот блок будет отображаться на странице только в том случае, если все переменные будут получены с сервера -->
  <div className="info">

    <main-info
      :weatherData="weatherData"/>

    <add-info
      :weatherData="weatherData"/>

  </div>
</template>


<script>
  import MainInfo from "@/components/MainInfo.vue";
  import AddInfo from "@/components/AddInfo.vue";


  export default {
    components: {
      MainInfo, AddInfo
    },

    props: {
      weatherData: {
        type: Object,
        required: true
      }
    }
  }
</script>



<style scoped>
  .info {
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
</style>