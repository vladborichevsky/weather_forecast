<template>
  <div 
    className="main_window" >

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
      v-show='Object.entries(weatherData).length > 0'
      :weatherData="weatherData"/>

    <start-screen
      v-show="showStartScreen"/>

  </div>
</template>

<script>
  import WeatherInfoBlock from "@/components/WeatherInfoBlock.vue"
  import SearchBlock from "@/components/SearchBlock.vue";
  import TipsCityName from "@/components/TipsCityName.vue";
  import HeaderBlock from "@/components/HeaderBlock.vue";
  import StartScreen from "@/components/StartScreen.vue";
  import ErrorBlock from "@/components/ErrorBlock.vue";


  // спиннер
  import WaitingSpinner from "@/components/UI/WaitingSpinner.vue"

  // js-файлы с API обращения к серверу
  import { ApiGetWeather } from "@/services/apiGetWeather.js"
  import { apiGetCityList } from "@/services/apiGetCityList.js"


  export default {
    setup() {
      const errorFetchMessages = {
        minLength: 'minimum 3 characters',
        correctCityName: 'Enter the correct city name',
        fetchFail: 'We apologize! There was a technical problem with the site. Please try again later :('
      }

      return {
        errorFetchMessages
      }
    },

    components: { 
      WeatherInfoBlock, SearchBlock, TipsCityName, HeaderBlock, WaitingSpinner, StartScreen, ErrorBlock 
    },

    data() {
      return {
        city: '',
        tipsCityName: [],
        availableCityList: [],
        weatherData: {}, // данные, которые мы получаем с сервера и передаём в компонент WeatherInfoList
        errorFetchMes: '',
        fetchFail: false,
        showStartScreen: true,
        showSpinner: false,
        stopTipsCityName: true
      }
    },

    methods: {
      // функция получения данных с сервера
      async getWeather() {

        const promise = new Promise((resolve) => {
          this.tipsCityName = []
          this.fetchFail = false
          this.errorFetchMes = ''

          if(this.city.length < 3 ) {
            this.errorFetchMes = this.errorFetchMessages.minLength
            this.showSpinner = false
            
            return false
          }

          this.showStartScreen = false
          this.weatherData = {}
          resolve()
        })

        promise.then( () => this.showSpinner = true )

        const data = await ApiGetWeather(this.city)
        // проверка, что если пользователь неправильно ввёл название города и из ApiGetWeather() вернулась строка '404', то мы показываем пользователю соответствующую ошибку
        if (data == '404') {
          this.errorFetchMes = this.errorFetchMessages.correctCityName
        } else if(data == 'fetchFail') {
          const promise = new Promise((resolve) => {
            this.fetchFail = true
            this.errorFetchMes = this.errorFetchMessages.fetchFail
            resolve()
          })

          promise.then( () => this.showSpinner = false )
        } else {
          this.weatherData = data
        }

        this.showSpinner = false
      },

      // функция, которая устанавливает значение в название города (this.city) из выпадающих подсказок, и сразу же вызывает главную функцию getWeather()
      setCityName(value) {
        this.city = value
        this.stopTipsCityName = true

        this.tipsCityName = []
        this.getWeather()
      },

      // эта функция нужна, чтобы корректно показывать подсказки названия городов
      computedTipsCityName() {
        if(this.city.includes(' ')) {
          let cityName = this.city.split(' ').map(item => item = item[0].toUpperCase() + item.slice(1)).join(' ')

          return this.availableCityList.filter(item => item.name.includes(cityName))
        } else if(this.city.includes('-')) {
          let cityName = this.city.replace(/-/gi, ' ').trim().split(' ').map(item => item = item[0].toUpperCase() + item.slice(1)).join('-')

          return this.availableCityList.filter(item => item.name.includes(cityName))
        } else {
          let cityName = this.city[0]?.toUpperCase() + this.city.slice(1)

          return this.availableCityList.filter(item => item.name.includes(cityName))
        }
      },

      hideTipsCityNameFunc() {
        this.tipsCityName = []
      }
    },
    
    watch: {
      city() {
        this.fetchFail = false
        this.errorFetchMes = '' // как только пользователь вводит (удаляет) что-то в инпуте - сообщение об ошибке исчезает
        this.showSpinner = false // как только пользователь вводит (удаляет) что-то в инпуте -спиннер исчезает

        const promise = new Promise((resolve) => {
          // отслеживаем изменения переменной city, чтобы добавить данные о её текущем состоянии в объект window.history (в виде строки), используя метод pushState()
          if (this.city.length == 0) {
            window.history.pushState(null, document.title, `${window.location.pathname}`)
          } else {
            window.history.pushState(null, document.title, `${window.location.pathname}?city_name=${this.city}`)
          }


          if(!this.stopTipsCityName && this.city.length > 0) {
            // этот промис и последующий вызов then нужен для оптимизации скорости показа вспомогательных подсказок названия города
            let promise = new Promise((resolve) => {
              resolve(this.computedTipsCityName())
            })

            promise.then(result => this.tipsCityName = result)
          } else {
            this.tipsCityName = []
          }

            resolve()
        })

        promise.then( () => this.stopTipsCityName = false )
      }
    },

    async mounted() {
      // Используя window.location, мы создаём новый объект URL, после чего «достаём» из него searchParams и применяем метод Object.fromEntries. В итоге мы получаем объект вида: windowData = { city_name: 'какое-то значение' }
      const windowData = Object.fromEntries(
        new URL(window.location).searchParams.entries()
      );

      // Далее просто проверяем, есть ли значения в city_name в windowData, и если да, то присваиваем его переменной city. Как только эти пемеренные изменятся, наша страница отрендерится...
      if (windowData.city_name)  this.city = windowData.city_name
      // ...и сразу же запускаем функцию getWeather()
      if(this.city.length >= 2) this.getWeather()

      this.availableCityList = await apiGetCityList()    
      
      // обработчик событий, по клику на любую часть экрана скрывает подсказки названия города
      document.addEventListener('click', () => {
        this.hideTipsCityNameFunc()
      })
    }
  }
</script>

<style scoped>
  .main_window {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    width: 1100px;
    height: 500px;
    border-radius: var(--border-radius);
    background-color: var(--dark-blue);
    text-align: center;
  }
</style>