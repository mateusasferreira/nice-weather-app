import {getWeatherbyCity} from './getWeather.js'
import {getWeatherbyGeolocation} from './getWeather.js'
import {displayLocation} from './displayLocation.js'

const button = document.querySelector('[data-search-button]');
const input = document.querySelector('[data-search-input]');
const switcher = document.querySelector('[data-temperature-switcher]')


window.addEventListener('load',  function() {
    // for firefox
    switcher.checked = false
    
    //checks is geolocation is enabled, and if true it gets the weather for the current location 
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude
            const lon = position.coords.longitude
            getWeatherbyGeolocation(lat, lon)
            .then(data => displayLocation(data))
        })    
    } else {alert('Couldn\'t find current location')}
    
    const storageItems = JSON.parse(localStorage.getItem('Locations') || "[]") 
    storageItems.forEach(item => { 
        getWeatherbyCity(item)
        .then(data => displayLocation(data))        
    });
})

document.addEventListener('keydown', e => {
    if(e.key == "Enter"){
      button.click();
    }
});

button.addEventListener('click', ()=> {
    const previousLocations = JSON.parse(localStorage.getItem('Locations') || "[]") ; 
    const value = input.value.toLowerCase().trim();
    const unit = () => {
        
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
    
    input.value = '' 
   
    const storageData = [...previousLocations, value]
    localStorage.setItem('Locations', JSON.stringify(storageData));
    
})



