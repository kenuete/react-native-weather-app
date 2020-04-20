const fetchGet = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            return json
        })
        .catch(error => {
            console.log(error)
        })
}

const fetchGetAsync = async (url) => {
    try {
        const response = await fetch(url)
        const json = await response.json()
        return json
    } catch (error) {
        console.error(error)
    }
}

export const fetchLocationId = (location) => {
    return fetchGetAsync('https://www.metaweather.com/api/location/search/?query=' + location)
}

export const fetchWeather = async (woeid) => {
    const { consolidated_weather } = await fetchGetAsync('https://www.metaweather.com/api/location/' + woeid)
    const { weather_state_name: weather, the_temp: temperature } = consolidated_weather[0]
    console.log('params', { weather, temperature })
    return { weather, temperature }
}