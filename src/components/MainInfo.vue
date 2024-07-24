<template>
  <div class="main_info">

    <div>
      <div class="iconWeather">
        <img :src="iconURL" alt="weather_icon">
      </div>
      <div class="description">{{ description }}</div>
    </div>

    <div>
      <div class="temperature">{{ temperature }} °C</div>
      <div class="feelsLike" title="How hot or cold it really feels">Feels like: {{ feelsLike }} °C</div>
    </div>

    <hr> 
    
    <div class="location">
      <div class="city_name_wrapper">
        <div class="location_icon">
          <img src="/icons/location_icon.png" alt="location_icon">
        </div>
        <div class="city_name">{{ weatherData?.data?.name }}</div>
      </div>
      <div class="flag">
        <img :src="weatherData?.flag" alt="flag">
      </div>
    </div>
    
  </div>
</template>

<script>
  export default {
    props: {
      weatherData: {
        type: Object,
        required: true
      }
    },

    computed: {
      iconURL() {
        return `https://openweathermap.org/img/wn/${this.weatherData?.data?.weather[0]?.icon}@2x.png`
      },

      temperature() {
        return this.weatherData?.data?.main?.temp.toFixed()
      },

      feelsLike() {
        return this.weatherData?.data?.main?.feels_like.toFixed()
      },

      description() {
        return this.weatherData?.data?.weather[0]?.description[0].toUpperCase() + this.weatherData?.data?.weather[0]?.description.slice(1)
      }
    }

  }
</script>

<style scoped>
  .main_info {
    width: 25%;
    height: 340px;
    margin: 0 20px;
    border: 2px solid var(--main-color);
    border-radius: var(--border-radius);
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

  .location_icon img{
    width: 22px;
  }

  .flag img {
    width: 32px;
  }
</style>