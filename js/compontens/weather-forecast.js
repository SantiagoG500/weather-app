export const WeatherForecast = (() => {
  const appContainer = document.getElementById('app');
  const load = () => {
    const forecastSection = document.createElement('section');

    const template = `
        <h2></h2>
        <p></p>
    `;

    forecastSection.innerHTML = template;

    appContainer.appendChild(forecastSection);
  };

  const loadContent = (weatherData, dataconfig) => {
    load();
    // console.log({ weatherData, dataconfig });
  };

  return { loadContent };
})();
