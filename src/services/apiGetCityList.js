
import cityListJSON from '/src/citylist.json'

export const apiGetCityList = async () => {

  const CityList = []

  const data = cityListJSON

  data.forEach(item => {
    CityList.push({
      'name': item.name,
      'country': item.country
    })
  })

  return CityList
}