<template>
  <div className="main_window">

    <header-block
      :city="city"/>

    <search-block
      v-model.trim="city"
      @getWeatherEmit="getWeather()"/>

    <!-- по умолчанию переменная errorFetchMes пустая, поэтому она отображаться не будет. но если наш фетч выдаст ошибку, то в этой переменной появится текст и он будет отображается -->
    <error-block
      :errorFetchMes="errorFetchMes"
      :fetchFail="fetchFail"/>

    <tips-city-name
      :tipsCityName="tipsCityName"
      @setCityName="setCityName"/>

    <!-- как только пользователь запросил данные о погоде - запускается спиннер  -->
    <waiting-spinner 
      v-show="showSpinner"/>

    <!-- Весь этот блок будет отображаться на странице только в том случае, если данные будут получены с сервера -->
    <weather-info-block
      v-show='weatherData !== null'
      :weatherData="weatherData"/>

    <start-screen
      v-show="showStartScreen"/>

  </div>
</template>


<script setup lang="ts">
  import { ref, computed, watch, onMounted } from 'vue'

  import WeatherInfoBlock from "@/components/WeatherInfoBlock.vue"
  import SearchBlock from "@/components/SearchBlock.vue";
  import TipsCityName from "@/components/TipsCityName.vue";
  import HeaderBlock from "@/components/HeaderBlock.vue";
  import StartScreen from "@/components/StartScreen.vue";
  import ErrorBlock from "@/components/ErrorBlock.vue";
  import type { City } from "@/services/apiGetCityList";
  import type { weatherResponse } from "@/services/apiGetWeather"

  // спиннер
  import WaitingSpinner from "@/components/UI/WaitingSpinner.vue"

  interface weatherDataInterface { 
    data: weatherResponse,
    flag: string | undefined
  }

  // js-файлы с API обращения к серверу
  import { ApiGetWeather } from "@/services/apiGetWeather"
  import { apiGetCityList } from "@/services/apiGetCityList"

  const errorFetchMessages = {
    minLength: 'minimum 3 characters',
    correctCityName: 'Enter the correct city name',
    fetchFail: 'We apologize! There was a technical problem with the site. Please try again later :('
  }

  const city = ref<string>('')
  const tipsCityName = ref<City[]>([])
  const availableCityList = ref<City[]>([])
  const weatherData = ref<weatherDataInterface | null>(null)  // данные, которые мы получаем с сервера и передаём в компонент WeatherInfoList
  const errorFetchMes = ref<string>('')
  const fetchFail = ref<boolean>(false)
  const showStartScreen = ref<boolean>(true)
  const showSpinner = ref<boolean>(false)
  const stopTipsCityName = ref<boolean>(true)

  // computedTipsCityName нужна, чтобы корректно показывать подсказки названия городов
  const computedTipsCityName = computed(() => {
    if(city.value.includes(' ')) {
      let cityName = city.value.split(' ').map(item => item = item[0].toUpperCase() + item.slice(1)).join(' ')
      return availableCityList.value.filter(item => item.name.includes(cityName))
    } else if(city.value.includes('-')) {
      let cityName = city.value.replace(/-/gi, ' ').trim().split(' ').map(item => item = item[0].toUpperCase() + item.slice(1)).join('-')
      return availableCityList.value.filter(item => item.name.includes(cityName))
    } else {
      let cityName = city.value[0]?.toUpperCase() + city.value.slice(1)
      return availableCityList.value.filter(item => item.name.includes(cityName))
    }
  }) 

  // функция получения данных с сервера
  const getWeather = async() => {
    const promise: Promise<void> = new Promise<void>((resolve) => {
      tipsCityName.value = []
      fetchFail.value = false
      errorFetchMes.value = ''

      if(city.value.length < 3) {
        errorFetchMes.value = errorFetchMessages.minLength
        showSpinner.value = false
        return false
      }

      showStartScreen.value = false
      weatherData.value = null
      resolve()
    })

    promise.then(() => showSpinner.value = true)

    const data = await ApiGetWeather(city.value)
    // проверка, что если пользователь неправильно ввёл название города и из ApiGetWeather() вернулась строка '404', то мы показываем пользователю соответствующую ошибку
    if (data == '404') {
      errorFetchMes.value = errorFetchMessages.correctCityName
    } else if(data == 'fetchFail') {
      const promise: Promise<void> = new Promise<void>((resolve) => {
        fetchFail.value = true
        errorFetchMes.value = errorFetchMessages.fetchFail
        resolve()
      })
      promise.then( () => showSpinner.value = false )
    } else {
      weatherData.value = data
    }
    showSpinner.value = false
  }

  const hideTipsCityNameFunc = () => {
    tipsCityName.value = []
  }

  // функция, которая устанавливает значение в название города (this.city) из выпадающих подсказок, и сразу же вызывает главную функцию getWeather()
  const setCityName = (value: string) => {
    city.value = value
    stopTipsCityName.value = true
    tipsCityName.value = []
    getWeather()
  }
    
  watch(
    () => city.value,
    (value, newValue) => {
      fetchFail.value = false
      errorFetchMes.value = '' // как только пользователь вводит (удаляет) что-то в инпуте - сообщение об ошибке исчезает
      showSpinner.value = false // как только пользователь вводит (удаляет) что-то в инпуте - спиннер исчезает

      if (city.value.length == 0) {
        window.history.pushState(null, document.title, `${window.location.pathname}`)
      } else {
        window.history.pushState(null, document.title, `${window.location.pathname}?city_name=${city.value}`)
      }

      if (!stopTipsCityName.value && city.value.length > 0) {
        tipsCityName.value = computedTipsCityName.value
      } else {
        tipsCityName.value = []
      }

      stopTipsCityName.value = false
    }
  )

  onMounted(async () => {
    // Используя window.location, мы создаём новый объект URL, после чего «достаём» из него searchParams и применяем метод Object.fromEntries. В итоге мы получаем объект вида: windowData = { city_name: 'какое-то значение' }
    const windowData = Object.fromEntries(
      // new URL(window.location).searchParams.entries()
      new URL(window.location.href).searchParams.entries()
    );

    // Далее просто проверяем, есть ли значения в city_name в windowData, и если да, то присваиваем его переменной city. Как только эти пемеренные изменятся, наша страница отрендерится...
    if (windowData.city_name)  city.value = windowData.city_name
    // ...и сразу же запускаем функцию getWeather()
    if(city.value.length >= 2) getWeather()

    availableCityList.value = await apiGetCityList()
    
    // обработчик событий, по клику на любую часть экрана скрывает подсказки названия города
    document.addEventListener('click', () => {
      hideTipsCityNameFunc()
    })
  })
</script>


<style scoped lang="scss">
  @use '@/assets/variables' as vars;

  .main_window {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    width: 1100px;
    height: 500px;
    border-radius: vars.$border-radius;
    background-color: vars.$dark-blue-bckg;
    text-align: center;
  }

  @media (max-width: 1300px) {
    .main_window {
      width: 900px;
    }
  }

  @media (max-width: 1100px) {
    .main_window {
      width: 750px;
    }
  }

  @media (max-width: 850px) {
    .main_window {
      width: 85vw;
    }
  }

  @media (max-width: 500px) {
    .main_window {
      height: 440px;
    }
  }

  @media (max-width: 370px) {
    .main_window {
      padding: 10px;
    }
  }
</style>

