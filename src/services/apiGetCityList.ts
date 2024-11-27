
import cityListJSON from "../../public/citylist.json"

export interface City { // интерфейс объектов, из которых состоит итоговый массив CityList
  name: string,
  country: string
}

export interface CityFromListJSON { // интерфейс объектов, из которых состоит массив, получаемый через JSON
  id: number,
  name: string,
  state: string,
  country: string,
  coord: {
    lon: number,
    lat: number
  }
}

export const apiGetCityList = async () => {
  const CityList: City[] = [] 
  const data: CityFromListJSON[] = cityListJSON as CityFromListJSON[] // вручную привели импортируемый JSON к нужному типу с помощью "as"

  data.forEach((item) => {
    CityList.push({
      'name': item.name,
      'country': item.country
    })
  })

  return CityList
}


