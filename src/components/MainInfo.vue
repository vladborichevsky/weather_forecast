<template>
  <div class="main_info">
    <div>
      <div class="iconWeather">
        <img :src="iconURL" alt="weather_icon" />
      </div>
      <div class="description">
        {{ description }}
      </div>
    </div>

    <div>
      <div class="temperature">{{ temperature }} °C</div>
      <div class="feelsLike" title="How hot or cold it really feels">
        Feels like: {{ feelsLike }} °C
      </div>
    </div>

    <hr />

    <div class="location">
      <div class="city_name_wrapper">
        <div class="location_icon">
          <img src="/icons/location_icon.webp" alt="location_icon" />
        </div>
        <div v-if="props.weatherData" class="city_name">
          {{ props.weatherData.data.name }}
        </div>
      </div>
      <div v-if="props.weatherData" class="flag">
        <img :src="props.weatherData.flag" alt="flag" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { weatherResponse } from '@/services/apiGetWeather.ts'

interface weatherDataProps {
  data: weatherResponse
  flag: string | undefined
}

const props = defineProps<{
  weatherData: weatherDataProps | null
}>()

const iconURL = computed<string>(() => {
  if (props.weatherData) {
    return `https://openweathermap.org/img/wn/${props.weatherData.data.weather[0].icon}@2x.png`
  } else {
    return ''
  }
})

const temperature = computed<string>(() => {
  if (props.weatherData) {
    return props.weatherData.data.main.temp.toFixed()
  } else {
    return ''
  }
})

const feelsLike = computed<string>(() => {
  if (props.weatherData) {
    return props.weatherData.data.main.feels_like.toFixed()
  } else {
    return ''
  }
})

const description = computed<string>(() => {
  if (props.weatherData) {
    return (
      props.weatherData.data.weather[0].description[0].toUpperCase() +
      props.weatherData.data.weather[0].description.slice(1)
    )
  } else {
    return ''
  }
})
</script>

<style scoped lang="scss">
@use '@/assets/variables' as vars;

.main_info {
  width: 25%;
  height: 340px;
  margin: 0 20px;
  border: 2px solid vars.$main-color;
  border-radius: vars.$border-radius;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: left;
  text-align: left;
}

.iconWeather img {
  width: 100px;
}

.temperature {
  font-size: 30px;
  font-weight: 600;
}

.feelsLike {
  font-size: 18px;
}

.description {
  font-size: 18px;
}

hr {
  width: 95%;
  margin: 0 auto;
}

.location {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  font-size: 22px;
}

.city_name_wrapper {
  display: flex;
}

.city_name {
  margin: 0 10px;
  font-size: 22px;
  line-height: 22px;
}

.location_icon img {
  width: 22px;
}

.flag img {
  width: 32px;
}

@media (max-width: 1300px) {
  .location {
    flex-direction: column;
  }

  .city_name {
    font-size: 18px;
  }
}

@media (max-width: 700px) {
  .main_info {
    width: 155px;
    padding: 10px;
  }
}

@media (max-width: 500px) {
  .main_info {
    width: 125px;
    height: 270px;
    margin: 0;
  }

  .location_icon {
    display: none;
  }

  .iconWeather img {
    width: 60px;
  }

  .description,
  .feelsLike,
  .city_name {
    font-size: 14px;
    margin: 0 5px;
  }

  .temperature {
    font-size: 24px;
  }
}

@media (max-width: 370px) {
  .main_info {
    width: 115px;
  }

  .location {
    padding: 0;
  }

  .city_name {
    font-size: 12px;
    margin: 0 0 0 5px;
  }
}

@media (max-width: 340px) {
  .main_info {
    border: none;
  }
}
</style>
