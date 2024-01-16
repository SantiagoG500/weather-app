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
      }&days=7`,
    hourlyForecast: (city) =>
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${
        city ? city : 'london'
      }&hours=24`,
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
      console.log(error);
    }

    return weatherData;
  };
  const getForecast = async (city, dailyData) => {
    try {
      let response;
      if (dailyData) response = await fetch(API_REQUESTS.dailyForecast(city));
      else response = await fetch(API_REQUESTS.hourlyForecast(city));

      return response.json();
    } catch (error) {
      console.log(error);
    }
  };
  const searchCity = async (city) => {
    try {
      const response = await fetch(API_REQUESTS.search(city));
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    weatherData,
    utils: {
      searchCity,
      getForecast,
      getcurrentWeather,
    },
  };
})();
