<template>
  <div class="add_info">
    <add-info-element
      :value="pressure"
      :title="titles.pressure"
      :subheader="subheaders.pressure"
      :source="sources.pressure"
    />

    <add-info-element
      :value="humidity"
      :title="titles.humidity"
      :subheader="subheaders.humidity"
      :source="sources.humidity"
    />

    <add-info-element
      :value="windSpeed"
      :title="titles.windSpeed"
      :subheader="subheaders.windSpeed"
      :source="sources.windSpeed"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AddInfoElement from '@/components/AddInfoElement.vue'
import type { weatherResponse } from '@/services/apiGetWeather.ts'

interface weatherDataProps {
  data: weatherResponse
  flag: string | undefined
}

const props = defineProps<{
  weatherData: weatherDataProps | null
}>()

const subheaders = {
  pressure: 'pressure',
  humidity: 'humidity',
  windSpeed: 'wind speed',
}

const sources = {
  pressure: '/icons/pressure_icon.webp',
  humidity: '/icons/humidity_icon.webp',
  windSpeed: '/icons/wind_icon.webp',
}

const titles = {
  pressure:
    'The air around you has weight, and it presses against everything it touches. That pressure is called atmospheric pressure, or air pressure. It is the force exerted on a surface by the air above it as gravity pulls it to Earth.',

  humidity:
    'Humidity is the amount of water vapor in the air. If there is a lot of water vapor in the air, the humidity will be high. The higher the humidity, the wetter it feels outside.',

  windSpeed:
    'In meteorology, wind speed, or wind flow speed, is a fundamental atmospheric quantity caused by air moving from high to low pressure, usually due to changes in temperature.',
}

const pressure = computed<string>(() => {
  if (props.weatherData) {
    return (props.weatherData.data.main.pressure * 0.7506).toFixed() + ' mm'
  } else {
    return ''
  }
})

const humidity = computed<string>(() => {
  if (props.weatherData) {
    return props.weatherData.data.main.humidity + '%'
  } else {
    return ''
  }
})

const windSpeed = computed<string>(() => {
  if (props.weatherData) {
    return props.weatherData.data.wind.speed + ' m/s'
  } else {
    return ''
  }
})
</script>

<style scoped lang="scss">
@use '@/assets/variables' as vars;

.add_info {
  width: 75%;
  height: 340px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 20px;
  border: 2px solid vars.$main-color;
  border-radius: vars.$border-radius;
  padding: 15px;
}

@media (max-width: 850px) {
  .add_info {
    width: 25%;
    flex-direction: column;
  }
}

@media (max-width: 700px) {
  .add_info {
    width: 155px;
    padding: 10px;
  }
}

@media (max-width: 500px) {
  .add_info {
    width: 125px;
    height: 270px;
    margin: 0;
  }
}

@media (max-width: 370px) {
  .add_info {
    width: 115px;
  }
}

@media (max-width: 340px) {
  .add_info {
    border: none;
  }
}
</style>
