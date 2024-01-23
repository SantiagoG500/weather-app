import { formatCurrentWeather } from '../functions/format-weather-data';

export const Header = (() => {
  const appContainer = document.getElementById('app');

  const load = () => {
    const header = document.createElement('header');
    header.classList.add('main-header');
    header.id = 'main-header';
    const template = `
        <section class="main-header__search">
          <div>
            <input type="search" id="search-bar"/>
            <button data-action="search">Search</button>
          </div>
          <div>
            <button id="toggle-degrees" data-action="toggle-degrees"></button>
            <button id="toggle-units" data-action="toggle-units"></button>
          </div>
        </section>

        <section class="main-header__city-details">
          <h1 id="city-name"></h1>
          <h2 id="city-region"></h2>
          <p id="city-date"></p>
        </section>
        
        <section class="main-header__condition">
          <h1 id="condition"></h1>
          <img id="condition-img" alt="condition img">
          <h1 id="temp"></h1>
        </section>

        <section class="main-header__weather-details">
          <h2 id="feelslike"></h2>
          <h2 id="humidity"></h2>
          <h2 id="wind"></h2>
        </section>
    `;
    header.innerHTML = template;

    appContainer.appendChild(header);
  };

  const loadContent = (weatherData, dataconfig) => {
    // console.log(weatherData);
    const { celcius, imperial } = dataconfig;
    const { name, region, localtime } = weatherData.location;
    const data = formatCurrentWeather(weatherData, dataconfig);
    const {
      temp,
      feelslike,
      gust,
      precip,
      pressure,
      vis,
      wind,
      humidity,
      condition,
    } = data;

    const mainHeader = document.getElementById('main-header');
    const cityNameTag = document.getElementById('city-name');
    const cityRegionTag = document.getElementById('city-region');
    const cityDateTag = document.getElementById('city-date');
    const tempTag = document.getElementById('temp');
    const feelslikeTag = document.getElementById('feelslike');
    const humidityTag = document.getElementById('humidity');
    const windSpeedTag = document.getElementById('wind');
    const conditionTag = document.getElementById('condition');
    const conditionImgTag = document.getElementById('condition-img');

    const degreesButton = document.getElementById('toggle-degrees');
    const unitsButton = document.getElementById('toggle-units');

    mainHeader.dataset.currentCity = name;

    cityNameTag.innerText = name;
    cityRegionTag.innerText = region;
    cityDateTag.innerText = localtime;
    tempTag.innerText = temp;
    feelslikeTag.innerText = `Feels like: ${feelslike}`;
    humidityTag.innerText = `Humidity: ${humidity}`;
    windSpeedTag.innerText = `Wind Speed: ${wind}`;
    conditionTag.innerText = condition.text;
    conditionImgTag.src = condition.icon;

    if (imperial) {
      unitsButton.innerText = 'Metric units';
      unitsButton.dataset.info = 'imperial';
    } else {
      unitsButton.innerText = 'Imperial units';
      unitsButton.dataset.info = 'metric';
    }

    if (celcius) {
      degreesButton.innerText = 'Fahrenheit';
      degreesButton.dataset.info = 'celcius';
    } else {
      degreesButton.innerText = 'Celcius';
      degreesButton.dataset.info = 'fahrenheit';
    }
  };

  return { loadContent, load };
})();
