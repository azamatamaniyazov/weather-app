import { useState, useEffect } from "react";
import WeatherServices from "../../../services/WeatherServices";
import DateServices from "../../../services/DateServices";

import "./leftBlock.css";

function LeftBlock({ cityId }) {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    onRequest();
  }, [cityId]);

  const { getCurrentWeather } = WeatherServices();
  const { getCurrentDate, transformSunTime, transformTimeIcon } =
    DateServices();
  const { today } = getCurrentDate();

  const onRequest = () => {
    if (cityId) {
      getCurrentWeather(cityId).then((res) => setWeatherData(res));
    }
  };

  const {
    name,
    description,
    temp,
    feels,
    sunrise,
    sunset,
    pressure,
    humidity,
    wind,
    icon,
  } = weatherData;
  return (
    <div className="left-block">
      <h3 className="block__title">{name}</h3>
      <div className="current-day">
        Сегодня, <span>{today}</span>
      </div>
      <div className="current-forecast">
        <span className="forecast__icon">
          <img
            src={`http://openweathermap.org/img/wn/${transformTimeIcon(
              icon
            )}@2x.png`}
            alt=""
          />
          {/* <i className="wi wi-day-sunny"></i> */}
        </span>
        <span className="forecast__temp">{temp}&#176;</span>
        <span className="forecast__temp feels-like">{feels}&#176;</span>
      </div>
      <div className="current-forecast-desc">{description}</div>
      <div className="current-forecast-details">
        <div className="left-details">
          <p>Влажность: {humidity}</p>
          <p>Ветер: {wind}</p>
          <p>Давление: {pressure}</p>
        </div>
        <div className="right-details">
          <p>Восход: {transformSunTime(sunrise)}</p>
          <p>Закат: {transformSunTime(sunset)}</p>
        </div>
      </div>
    </div>
  );
}

export default LeftBlock;
