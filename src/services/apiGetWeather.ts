// это функция по работе с фетч get-запроса. Функция возвращает в чистом виде ответ response, поскольку для получения погоды информация приходит в json-формате, а в функции с флагом - нет. поэтому обе эти функции будут по-своему дальше работать с response
import GetData from "./apiFetch.js"

export interface flagResponse {
  ok: boolean,
  redirected: boolean,
  status: number,
  statusText: string,
  type: string,
  url: string
}

export interface weatherResponse {
  "coord": {
    "lon": number, 
    "lat": number
  }, 
  "weather":[{
    "id": number,
    "main": string,
    "description": string,
    "icon":string 
  }],
  "base": string,
  "main":{
    "temp": number,
    "feels_like": number,
    "temp_min": number,
    "temp_max": number,
    "pressure": number,
    "humidity": number,
    "sea_level": number,
    "grnd_level": number
  },
  "wind":{
    "speed": number,
    "deg": number,
    "gust": number
  },
  "clouds":{
    "all": number
  },
  "dt": number,
  "sys":{
    "type": number,
    "id": number,
    "country": string,
    "sunrise": number,
    "sunset": number
  },
  "timezone": number,
  "id": number,
  "name": string,
  "cod": number
}

export const ApiGetWeather = (cityName: string) => {
  // функция по получению url с флагом страны
  async function getFlag(country: string) {
    const data: flagResponse | string = await GetData(`https://flagcdn.com/48x36/${country.toLowerCase()}.png`)
    // проверка, что если пользователь неправильно ввёл название города и из функции GetData() вернулась строка '404', то мы ничего не возвращаем из функции getFlag()
    if (typeof data == "string") {
      return
    } else {
      return data.url
    }
  }

  // главная функция
  async function getWeather(city: string) {
    const response = await GetData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=12b4534afa0341b20cc5034a7fbbfaf8`)

    // проверка, что если пользователь неправильно ввёл название города и из функции GetData() вернулась строка '404', то мы возвращаем из функции getWeather() строку '404'
    if (response == '404') {
      return '404'
    } else if (response == 'fetchFail') {
      return 'fetchFail'
    } else {
      // поскольку из функции GetData() сюда возвращается обычный объект ответа response, то здесь мы применяем к нему метод json()
      const data: weatherResponse = await response.json()
      // передаём полученные данные по названию страны в функцию флага
      const flag = await getFlag(data.sys.country)
      // возравщаем объект с данными о погоде и url с флагом нужной страны
      return { 'data': data, 'flag': flag }
    }
  }

  return getWeather(cityName)
}
