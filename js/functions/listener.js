import { NotificationComponent } from '../compontens/loading';
import { PubSub } from './pubsub';
import { Weather } from './weather';

export const Listener = (e) => {
  const target = e.target;
  const dataAction = target.dataset.action;

  if (!dataAction) return;

  if (ListenerActions[dataAction]) ListenerActions[dataAction](e);
  else return;
};

//  get weather info from both buttons. celcius and units
const ListenerActions = (() => {
  let weatherConfig = {};

  const search = async (e) => {
    NotificationComponent.load();

    const target = e.target;
    const input = document.getElementById('search-bar');
    const inputValue = input.value;

    if (!inputValue) return;

    let newWeatherData;
    let hourlyForecast;
    let dailyForecast;

    // refactor Weather functions to return an error ot print it out
    try {
      newWeatherData = await Weather.utils.getcurrentWeather(inputValue);
      hourlyForecast = await Weather.utils.gethourlyForecast(inputValue);
      dailyForecast = await Weather.utils.getDailyForecast(inputValue);
    } catch (error) {
      console.log(error);
    }

    PubSub.emit('load-weather-data', newWeatherData, {
      celcius: true,
      imperial: false,
    });

    PubSub.emit(
      'load-weather-forecast',
      { hourlyForecast, dailyForecast },
      {
        celcius: true,
        imperial: false,
      }
    );

    // console.log(newWeatherData, newForecastData);
  };
  const toggleUnits = async (e) => {
    const target = e.target;
    const dataInfo = target.dataset.info;

    if (dataInfo === 'metric') weatherConfig.imperial = true;
    else weatherConfig.imperial = false;

    const mainHeader = document.getElementById('main-header');
    const currentCity = mainHeader.dataset.currentCity;

    const weather = await Weather.utils.getcurrentWeather(currentCity);
    const dailyForecast = await Weather.utils.getDailyForecast(currentCity);
    const hourlyForecast = await Weather.utils.gethourlyForecast(currentCity);

    PubSub.emit('load-weather-data', weather, weatherConfig);
    PubSub.emit(
      'load-weather-forecast',
      { dailyForecast, hourlyForecast },
      weatherConfig
    );
  };
  const toggleDegrees = async (e) => {
    const target = e.target;
    const dataInfo = target.dataset.info;

    if (dataInfo === 'celcius') weatherConfig.celcius = false;
    else weatherConfig.celcius = true;

    const mainHeader = document.getElementById('main-header');
    const currentCity = mainHeader.dataset.currentCity;

    const weather = await Weather.utils.getcurrentWeather(currentCity);
    const dailyForecast = await Weather.utils.getDailyForecast(currentCity);
    const hourlyForecast = await Weather.utils.gethourlyForecast(currentCity);

    PubSub.emit('load-weather-data', weather, weatherConfig);
    PubSub.emit(
      'load-weather-forecast',
      { dailyForecast, hourlyForecast },
      weatherConfig
    );
  };
  return {
    search: search,
    'toggle-units': toggleUnits,
    'toggle-degrees': toggleDegrees,
  };
})();
