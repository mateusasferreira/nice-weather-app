// browser-sync start --server --file . --host --port 5000 --startPath /index.html

import {getWeatherbyCity} from './getWeather.js'
import {getWeatherbyGeolocation} from './getWeather.js'
import {displayLocation} from './displayLocation.js'
// import {changeToCelcius} from './displayLocation.js'

const button = document.querySelector('[data-search-button]');
const input = document.querySelector('[data-search-input]');

window.addEventListener('load',  function() {
    if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude
            const lon = position.coords.longitude
            getWeatherbyGeolocation(lat, lon)
            .then(data => displayLocation(data))
        })    
    } else {alert('Couldn\'t find current location')}

    const storageItems = JSON.parse(localStorage.getItem('Locations')); 
    storageItems.forEach(item => { 
        getWeatherbyCity(item)
        .then(data => displayLocation(data))        
    });
})



button.addEventListener('click', ()=> {
    const previousLocations = JSON.parse(localStorage.getItem('Locations')) || []; 
    const value = input.value;
    const unit = () => {
    const switcher = document.querySelector('[data-temperature-switcher]')    
        let value 
        if (switcher.checked) {
            value = 'metric'
        } else {value = 'standard'}
        return value
    }
    const span = document.querySelector('[data-typeerror-message]')
    getWeatherbyCity(value, unit())
    .then(data => {
        try {
            displayLocation(data);                     
            span.classList.remove('error-message--active')            
        } catch {            
            span.classList.add('error-message--active')            
            }
    })   
    
    const storageData = [...previousLocations, value]
    localStorage.setItem('Locations', JSON.stringify(storageData));
    input.value = '' 
})



// switcher.addEventListener('click', (event) => {
//     if (event.target.checked) {
//         changeToCelcius()
//     }
// })


