<template>
  <div class="add_info">
    
    <add-info-element
      :value="pressure"
      :title="titles.pressure"
      :subheader="subheaders.pressure"
      :source="sources.pressure"/>
      
    <add-info-element
      :value="humidity"
      :title="titles.humidity"
      :subheader="subheaders.humidity"
      :source="sources.humidity"/>
      
    <add-info-element
      :value="windSpeed"
      :title="titles.windSpeed"
      :subheader="subheaders.windSpeed"
      :source="sources.windSpeed"/>
      
  </div>
</template>

<script>
  import AddInfoElement from "@/components/AddInfoElement.vue"

  export default {
    setup() {
      const subheaders = {
        pressure: "pressure",
        humidity: "humidity",
        windSpeed: "wind speed"
      }

      const sources = {
        pressure: "/icons/pressure_icon.png",
        humidity: "/icons/humidity_icon.png",
        windSpeed: "/icons/wind_icon.png"
      }

      const titles = {
        pressure: "The air around you has weight, and it presses against everything it touches. That pressure is called atmospheric pressure, or air pressure. It is the force exerted on a surface by the air above it as gravity pulls it to Earth.",

        humidity: "Humidity is the amount of water vapor in the air. If there is a lot of water vapor in the air, the humidity will be high. The higher the humidity, the wetter it feels outside.",
        
        windSpeed: "In meteorology, wind speed, or wind flow speed, is a fundamental atmospheric quantity caused by air moving from high to low pressure, usually due to changes in temperature."
      }

      return { subheaders, sources, titles }
    },

    components: {
      AddInfoElement
    },

    props: {
      weatherData: {
        type: Object,
        required: true
      }
    },

    computed: {
      pressure() {
        return (this.weatherData?.data?.main?.pressure * 0.7506).toFixed() + " mm"
      },

      humidity() {
        return this.weatherData?.data?.main?.humidity + "%"
      },

      windSpeed() {
        return this.weatherData?.data?.wind?.speed + " m/s"
      }
    }
  }
</script>

<style scoped>
  .add_info {
    width: 75%;
    height: 340px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 20px;
    border: 2px solid var(--main-color);
    border-radius: var(--border-radius);
    padding: 15px;
  }
</style>