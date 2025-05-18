<template>
  <!-- Весь этот блок будет отображаться на странице только в том случае, если все переменные будут получены с сервера -->
  <div className="info">
    <main-info :weatherData="props.weatherData" />
    <add-info :weatherData="props.weatherData" />
  </div>
</template>

<script setup lang="ts">
import MainInfo from '@/components/MainInfo.vue'
import AddInfo from '@/components/AddInfo.vue'
import type { weatherResponse } from '@/services/apiGetWeather.ts'

interface weatherDataProps {
  data: weatherResponse
  flag: string | undefined
}

const props = defineProps<{
  weatherData: weatherDataProps | null
}>()
</script>

<style scoped lang="scss">
.info {
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

@media (max-width: 850px) {
  .info {
    justify-content: space-around;
  }
}
</style>
