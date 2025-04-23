
import cityListJSON from '@/citylist.json'

export interface City { // интерфейс объектов, из которых состоит итоговый массив CityList
  name: string,
  country: string
}

export interface CityFromListJSON { // интерфейс объектов, из которых состоит массив, получаемый через JSON
  n: string,
  c: string
}

export const apiGetCityList = async () => {
  const CityList: City[] = [] 
  const data: CityFromListJSON[] = cityListJSON as CityFromListJSON[] // вручную привели импортируемый JSON к нужному типу с помощью "as"

  data.forEach((item) => {
    CityList.push({
      'name': item.n,
      'country': item.c
    })
  })

  return CityList
}


