// Destructures the API response and build a new obj acording to the user preferences
export const formatCurrentWeather = (weatherData, dataConfig) => {
  const { celcius, imperial } = dataConfig;
  const { current } = weatherData;

  const { feelslike_c, temp_c, feelslike_f, temp_f, humidity, condition } =
    current;
  const { gust_kph, precip_mm, pressure_mb, vis_km, wind_kph } = current;
  const { gust_mph, precip_in, pressure_in, vis_miles, wind_mph } = current;

  const templates = {
    degrees: (n) => (celcius ? `${n}° C` : `${n}° F`),
    distance: (n) => (imperial ? `${n} Miles` : `${n}° Km`),
    distancePh: (n) => (imperial ? `${n} Mph` : `${n} Kph`),
    height: (n) => (imperial ? `${n} In` : `${n} Mm`),
    pressure: (n) => (imperial ? `${n} In` : `${n} Mb`),
    percent: (n) => `${n}%`,
  };

  let data = {
    temp: celcius ? templates.degrees(temp_c) : templates.degrees(temp_f),
    feelslike: celcius
      ? templates.degrees(feelslike_c)
      : templates.degrees(feelslike_f),
    gust: imperial
      ? templates.distancePh(gust_mph)
      : templates.distancePh(gust_kph),
    precip: imperial
      ? templates.height(precip_in)
      : templates.height(precip_mm),
    pressure: imperial
      ? templates.pressure(pressure_in)
      : templates.pressure(pressure_mb),
    vis: imperial ? templates.distance(vis_miles) : templates.distance(vis_km),
    wind: imperial
      ? templates.distancePh(wind_mph)
      : templates.distancePh(wind_kph),
    humidity: templates.percent(humidity),
    condition,
  };

  // console.log(weatherData);

  return data;
};

export const formatDailyForecast = (forecastData, dataconfig) => {
  const { celcius, imperial } = dataconfig;
  const { forecast } = forecastData;
  const { forecastday } = forecast;
  const { day } = forecastday;

  const data = forecastday.map((forecastDay) => {
    const { date, day } = forecastDay;
    const { avgtemp_c, avgtemp_f, condition } = day;

    const dayOptions = {
      weekday: 'long',
    };

    const formatedDate = new Date(date).toLocaleDateString('en-US', dayOptions);

    return {
      date: formatedDate,
      avg_temp: celcius ? `${avgtemp_c} °C` : `${avgtemp_f} °F`,
      condition,
    };
  });

  return data;
};
export const formatHourlyforecast = (forecastData, dataconfig) => {
  const { celcius, imperial } = dataconfig;

  const { location } = forecastData;
  const { localtime } = location;

  const { forecast } = forecastData;
  const { forecastday } = forecast;

  const day = forecastday.pop();
  const { hour } = day;

  const currentTime = new Date(localtime).getTime();
  const data = hour.map((hour) => {
    const {
      condition,
      feelslike_c,
      feelslike_f,
      temp_c,
      temp_f,
      humidity,
      wind_kph,
      wind_mph,
    } = hour;

    const hourOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };

    const formatedHour = new Date(hour.time).toLocaleTimeString(
      'en-US',
      hourOptions
    );

    const data = {
      hour: formatedHour,
      condition,
      feelslike: celcius ? `${feelslike_c} °C` : `${feelslike_f} °F`,
      temp: celcius ? `${temp_c} °C` : `${temp_f} °F`,
      humidity: `${humidity}%`,
      wind: imperial ? `${wind_mph} Mph` : `${wind_kph} Kph`,
    };

    return data;
  });

  return data;
};
