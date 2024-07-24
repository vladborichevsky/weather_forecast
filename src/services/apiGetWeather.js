
  // это функция по работе с фетч get-запроса. Функция возвращает в чистом виде ответ response, поскольку для получения погоды информация приходит в json-формате, а в функции с флагом - нет. поэтому обе эти функции будут по-своему дальше работать с response
import GetData from "./apiFetch.js"


export const ApiGetWeather = (cityName) => {
    // функция по получению url с флагом страны
    async function getFlag(country) {
      const data = await GetData(`https://flagcdn.com/48x36/${country.toLowerCase()}.png`)
      // проверка, что если пользователь неправильно ввёл название города и из функции GetData() вернулась строка '404', то мы ничего не возвращаем из функции getFlag()
      if(data == '404') {
        return
      } else {
        return  data.url
      }
    }
    
    // главная функция
    async function getWeather(city) {
      const response = await GetData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=12b4534afa0341b20cc5034a7fbbfaf8`)

      // проверка, что если пользователь неправильно ввёл название города и из функции GetData() вернулась строка '404', то мы возвращаем из функции getWeather() строку '404'
      if(response == '404') {
        return '404'
      } else if(response == 'fetchFail') {
        return 'fetchFail'
      } else {
        // поскольку из функции GetData() сюда возвращается обычный объект ответа response, то здесь мы применяем к нему метод json()
        const data = await response.json()

        // передаём полученные данные по названию страны в функцию флага
        const flag = await getFlag(data.sys.country)

        // возравщаем объект с данными о погоде и url с флагом нужной страны
        return { 'data': data, 'flag': flag }
      }
    }

    return getWeather(cityName)
 };

