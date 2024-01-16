export const PubSub = (() => {
  const events = {};
  // this determines the default data presentation
  // const DEFAULT_DATA_CONFIG = {
  //   dataInCelcius: true,
  //   dataImperialUnits: false,
  // };

  const on = (eventName, fn) => {
    events[eventName] = events[eventName] || [];
    events[eventName].push(fn);
  };
  const off = (eventName, fn) => {
    if (events[eventName]) {
      for (const event of events[eventName]) {
        const fnIndex = events[eventName].indexOf(event);

        if (event === fn) return events[eventName].splice(fnIndex, 1);
      }
    }
  };

  const emit = (
    eventName,
    weatherData,
    dataConfig = { dataInCelcius: true, dataImperialUnits: false }
  ) => {
    // const config = dataConfig ? dataConfig : DEFAULT_DATA_CONFIG;
    const config = dataConfig;

    if (events[eventName]) {
      for (const fn of events[eventName]) fn(weatherData, config);
    }
  };
  const showEvents = () => console.log(events);

  return { on, off, emit, showEvents };
})();
