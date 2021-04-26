<h1 align="center">
   Nice Weather 
</h1>

[![Generic badge](https://img.shields.io/badge/Status:-Concluded-<COLOR>.svg)](https://shields.io/)

<h4 align="center">This is a current weather webapp that consumes data from <a href="https://openweathermap.org/api">Open Weather API</a>. It returns your current location's weather data and allows you to search for other places around the world.</h4>
<h5 align="center">For forecast weather data, check my React project <a href="https://github.com/mateusasferreira/forecast-weather-app/">here.</a></h5>

### ⚙️ Functionalities
- Access current location 
- Search for other location's data
- Save and delete search parameters through local storage


### 🔧 Tecnologies
The bulk of this project was developed with Vanilla-Javascript and [Bootstrap](https://getbootstrap.com/).

## 💻 Getting started

### Requirements

In order to run this locally, you'll need both [Node.Js](https://nodejs.org/en/) and [Browser-Sync](https://browsersync.io/).


#### To run a local server: 
After installing both Node and Browser-sync, create a script in your package.json: 
```
(...),
"scripts": {
(...),
"start": "browser-sync start --server --files . --port 5000 --startPath ./index.html"
}
```
Then run the following command in your project directory through terminal: 
```
npm start
```
