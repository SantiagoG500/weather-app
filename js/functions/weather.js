export const Weather = (() => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_REQUESTS = {
    currentWeather: (city) =>
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${
        city ? city : 'london'
      }`,
    dailyForecast: (city) =>
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${
        city ? city : 'london'
      }&days=3`,
    hourlyForecast: (city) =>
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${
        city ? city : 'london'
      }&hours=12`,
    search: (city) =>
      `http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${
        city ? city : 'london'
      }`,
  };
  let weatherData = fetch(API_REQUESTS.currentWeather()).then((res) =>
    res.json()
  );

  const getcurrentWeather = async (city) => {
    try {
      const response = await fetch(API_REQUESTS.currentWeather(city));
      weatherData = response.json();
    } catch (error) {
      return error;
    }

    return weatherData;
  };

  const getDailyForecast = async (city) => {
    try {
      const response = await fetch(API_REQUESTS.dailyForecast(city));
      const resJSON = response.json();

      return resJSON;
    } catch (error) {
      return error;
    }
  };
  const gethourlyForecast = async (city) => {
    try {
      const response = await fetch(API_REQUESTS.hourlyForecast(city));
      const resJSON = response.json();

      return resJSON;
    } catch (error) {
      return error;
    }
  };

  const searchCity = async (city) => {
    try {
      const response = await fetch(API_REQUESTS.search(city));
      const resJSON = response.json();

      return resJSON;
    } catch (error) {
      return error;
    }
  };

  return {
    weatherData,
    utils: {
      searchCity,
      getDailyForecast,
      gethourlyForecast,
      getcurrentWeather,
    },
  };
})();
