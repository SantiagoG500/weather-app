import './style.css';
import './css/media-queries.css';

import { Header } from './js/compontens/header';
import { WeatherForecast } from './js/compontens/weather-forecast';
import { PubSub } from './js/functions/pubsub';
import { UI } from './js/functions/ui';
import { Weather } from './js/functions/weather';
import { Listener } from './js/functions/listener';
import { NotificationComponent } from './js/compontens/notifications';

const loadApp = () => {
  PubSub.on('load-weather-data', Header.loadContent);
  PubSub.on('load-weather-forecast', WeatherForecast.loadContent);

  UI.load();
  NotificationComponent.load('default');
};
loadApp();
document.addEventListener('click', Listener);
