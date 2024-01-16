import { PubSub } from './pubsub';
import { Weather } from './weather';

export const UI = (() => {
  const load = async () => {
    const currentWeather = await Weather.weatherData;
    const dataConfig = { celcius: true, imperial: false };

    PubSub.emit('load-weather-data', currentWeather, dataConfig);

    // console.log(currentWeather);
  };

  return { load };
})();
