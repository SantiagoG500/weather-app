import { Header } from './js/compontens/header';
import { WeatherForecast } from './js/compontens/weather-forecast';
import { PubSub } from './js/functions/pubsub';
import { UI } from './js/functions/ui';
import { Weather } from './js/functions/weather';
import { Listener } from './js/functions/listener';
import './style.css';

const loadApp = () => {
  PubSub.on('load-weather-data', Header.loadContent);
  PubSub.on('load-weather-forecast', WeatherForecast.loadContent);

  UI.load();
};
loadApp();
document.addEventListener('click', Listener);

// console.log(import.meta.env.VITE_API_KEY);
// import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))
