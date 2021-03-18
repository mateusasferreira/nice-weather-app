export function getWeatherbyCity (input) {    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=5930db5d44bec417fea8ad03d7d4747b`
    return fetch(url)
    .then(response => response.json())
}

export function getWeatherbyGeolocation (lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5930db5d44bec417fea8ad03d7d4747b`
    return fetch(url)
    .then(response => response.json())
}