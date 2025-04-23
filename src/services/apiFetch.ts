  // это функция по работе с фетч get-запроса. Функция возвращает в чистом виде ответ response, поскольку для получения погоды информация приходит в json-формате, а в функции с флагом - нет. поэтому обе эти функции будут по-своему дальше работать с response

const GetData = async (url: string) => {
  try {
    const response = await fetch(url)

    if (response.status == 404) {
      return '404'
    }
    
    if(!response.ok) throw new Error('Возникла ошибка в получении данных через fetch')

    return response
  } catch (error) {
    console.error(error)
    return 'fetchFail'
  }
}

export default GetData