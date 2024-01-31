import { Header } from '../compontens/header';
import { NotificationComponent } from '../compontens/loading';
import { WeatherForecast } from '../compontens/weather-forecast';
import { PubSub } from './pubsub';
import { Weather } from './weather';

export const UI = (() => {
  const load = async () => {
    const dataConfig = { celcius: true, imperial: false };
    const currentWeather = await Weather.weatherData;
    const hourlyForecast = await Weather.utils.gethourlyForecast();
    const dailyForecast = await Weather.utils.getDailyForecast();
    Header.load();
    WeatherForecast.load();

    PubSub.emit('load-weather-data', currentWeather, dataConfig);
    PubSub.emit(
      'load-weather-forecast',
      { dailyForecast, hourlyForecast },
      dataConfig
    );

    NotificationComponent.load();
  };

  return { load };
})();
