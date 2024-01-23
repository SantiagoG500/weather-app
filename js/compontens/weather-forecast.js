import {
  formatDailyForecast,
  formatHourlyforecast,
} from '../functions/format-weather-data';

export const WeatherForecast = (() => {
  const appContainer = document.getElementById('app');
  const load = () => {
    const forecastContainer = document.createElement('section');

    const dailyForecastDiv = document.createElement('div');
    const hourlyForecastDiv = document.createElement('div');

    dailyForecastDiv.classList.add('daily-forecast-div');
    dailyForecastDiv.id = 'daily-forecast';
    hourlyForecastDiv.classList.add('hourly-forecast-div');
    hourlyForecastDiv.id = 'hourly-forecast';

    forecastContainer.appendChild(dailyForecastDiv);
    forecastContainer.appendChild(hourlyForecastDiv);

    appContainer.appendChild(forecastContainer);
  };

  const loadContent = ({ dailyForecast, hourlyForecast }, dataconfig) => {
    loadHourlyForecast(hourlyForecast, dataconfig);
    loadDailyForecast(dailyForecast, dataconfig);
  };

  const loadHourlyForecast = (forecastData, dataconfig) => {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const data = formatHourlyforecast(forecastData, dataconfig);

    const fragment = document.createDocumentFragment();
    for (const forecast of data) {
      const { condition, temp, wind, hour, humidity } = forecast;

      const forecastItem = document.createElement('div');
      forecastItem.classList.add('hourly-forecast-div__elemnet');

      const template = `
        <span>${hour}</span>
        <img src="${condition.icon}" alt="weather icon">
        <p>${temp}</p>
        <p>${humidity}</p>
        <p>${wind}</p>

      `;
      forecastItem.innerHTML = template;

      fragment.appendChild(forecastItem);
    }

    hourlyForecastDiv.innerHTML = '';
    hourlyForecastDiv.appendChild(fragment);
  };
  const loadDailyForecast = (forecastData, dataconfig) => {
    const dailyForecastDiv = document.getElementById('daily-forecast');
    const data = formatDailyForecast(forecastData, dataconfig);

    const fragment = document.createDocumentFragment();

    for (const day of data) {
      const { date, avg_temp, condition } = day;
      const forecastItem = document.createElement('div');
      forecastItem.classList.add('daily-forecast-div__element');

      const template = `
        <h3>${date}</h3>
        <h2>${avg_temp}</h2>
        <img src="${condition.icon}" alt="weather icon"2/>
      `;
      forecastItem.innerHTML = template;
      fragment.appendChild(forecastItem);
    }

    dailyForecastDiv.innerHTML = '';
    dailyForecastDiv.appendChild(fragment);
  };

  return { loadContent, load };
})();
