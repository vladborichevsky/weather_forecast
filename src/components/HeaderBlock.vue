<template>
  <h1>Weather in {{ cityName }}</h1>
</template>

<script>
  export default {
    props: {
      city: {
        type: String,
        required: true
      }
    },

    computed: {
      cityName() {
        if(this.city.length == 0 ) {
          return 'your city'
        } else {
          return `${this.city[0].toUpperCase()}${this.city.slice(1)}`
        }
      }
    }
  }
</script>

<style scoped>
  h1 {
    text-transform: uppercase;
    font-size: 22px;
  }
</style>