export function displayLocation(data) {
    const cityName = data.name;
    const cityCountry = data.sys.country;
    const temp = data.main.temp 
    const minTemp = data.main.temp_min
    const maxTemp = data.main.temp_max
    const pressure = data.main.pressure
    const humidity = data.main.humidity
    const windSpeed = data.wind.speed 
    const windDeg = data.wind.deg
    const weatherDescrition = data.weather[0].description
    const icon = data.weather[0].icon

    let unit = '°K'
    const switcher = document.querySelector('[data-temperature-switcher]')
    if (switcher.checked) { unit = '°C'}
       
    let warningMessage = ''

    if (minTemp == maxTemp) {
        warningMessage = 'min and max temperatures may be inaccurate for some locations'
    }

    const item = document.createElement('li');
    item.classList.add('list-item', 'shadow-sm', 'justify-content-between', 'align-items-center', 'p-2');
    const content = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="">
    <div class="flex-grow-1">
        <h1 class="fs-2 fw-bold" data-temperature>${temp}${unit}</h1>
        <p class="list-items--p2" data-temperature>Min: ${minTemp}${unit}</p>
        <p class="list-items--p2" data-temperature>Max: ${maxTemp}${unit}</p>        
        <p class="list-items--p3">${warningMessage}</p>        
    </div>
     <div class=" flex-grow-1 m-2">
         <p class="list-items--p">${cityName}, ${cityCountry}</p>
         <p class="list-items--p2">${weatherDescrition}</p>
     </div>
     <div class="flex-grow-1 m-2">
         <p class="list-items--p2">Pressure: ${pressure} hPa</p>
         <p class="list-items--p2">Humidity: ${humidity}%</p>
     </div>
     <div class="flex-grow-1 m-2">
         <p class="list-items--p2">Wind Speed: ${windSpeed} m/s</p>
        <p class="list-items--p2">Wind Direction: ${windDeg} degrees</p>
     </div>
     <div class="ms-2">
         <button type="button" class="btn-close p-3" aria-label="Close" data-delete-button></button>
    </div>`

    item.innerHTML = content;
    item.dataset.city = cityName
    const list = document.querySelector('[data-locations-list]')
    list.appendChild(item);

    const deleteButton = document.querySelectorAll('[data-delete-button]')

    deleteButton.forEach(button => {
        button.addEventListener('click', event => {
            const li = event.target.parentNode.parentNode
            deleteLocation(li)
        })
    })
}

function deleteLocation (location) {
    location.remove()
    const city = location.dataset.city.toLowerCase()
    const storageData = JSON.parse(localStorage.getItem('Locations'))
    storageData.forEach(data => {
        if (data === city) {
        const index = storageData.indexOf(data)
        storageData.splice(index, 1);
        localStorage.setItem('Locations', JSON.stringify(storageData))
    }        
    })
}

