<template>
  <h1>Weather in {{ cityName }}</h1>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  city: string
}>()

const cityName = computed<string>(() => {
  if (props.city.length == 0) {
    return 'your city'
  } else {
    return `${props.city[0].toUpperCase()}${props.city.slice(1)}`
  }
})
</script>

<style scoped lang="scss">
h1 {
  text-transform: uppercase;
  font-size: 22px;
}

@media (max-width: 500px) {
  h1 {
    font-size: 20px;
  }
}
</style>
