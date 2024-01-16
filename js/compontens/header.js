export const Header = (() => {
  const appContainer = document.getElementById('app');

  const load = () => {
    const header = document.createElement('header');
    const template = `
        <section>
          <h1 id="city-name"></h1>
          <h2 id="city-region"></h2>
          <p id="city-date"></p>
        </section>
        <section>
          <h1 id="temp"></h1>
          <h2 id="feelslike"></h2>
        </section>
    `;
    header.innerHTML = template;

    appContainer.appendChild(header);
  };

  const loadContent = (weatherData, dataconfig) => {
    load();

    const { current, location } = weatherData;
    const { ćelcius, imperial } = dataconfig;

    const { name, region, localtime } = location;
    const { temp_c, feelslike_c } = current;

    const cityName = document.getElementById('city-name');
    const cityRegion = document.getElementById('city-region');
    const cityDate = document.getElementById('city-date');
    const temp = document.getElementById('temp');
    const feelslike = document.getElementById('feelslike');

    // cityName.innerText = name;
    // cityRegion.innerText = region;
    // cityDate.innerText = localtime;
    // temp.innerText = temp_c;
    // feelslike.innerText = feelslike_c;

    // console.log(current);
  };

  return { loadContent };
})();
