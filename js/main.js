// browser-sync start --server --file . --host --port 5000 --startPath /index.html

import {getWeatherbyCity} from './getWeather.js'
import {getWeatherbyGeolocation} from './getWeather.js'
import {displayLocation} from './displayLocation.js'

const button = document.querySelector('[data-search-button]');
const input = document.querySelector('[data-search-input]');

window.addEventListener('load', () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude
            const lon = position.coords.longitude
            getWeatherbyGeolocation(lat, lon)
            .then(data => displayLocation(data))
        })    
    } else {alert('Couldn\'t find current location')}
})


button.addEventListener('click', ()=> {
    let valor = input.value
    const span = document.querySelector('[data-typeerror-message]')
    getWeatherbyCity(valor)
    .then(data => {
        try {
            displayLocation(data)
            span.classList.remove('error-message--active')
        } catch {            
            span.classList.add('error-message--active')
            }
    })    
    input.value = ''
})



