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
        <div className="current-forecast__temp">
          <img
            className="forecast__icon"
            src={`http://openweathermap.org/img/wn/${transformTimeIcon(
              icon
            )}@2x.png`}
            alt=""
          />
          <span className="forecast__temp">{temp}&#176;</span>
          <div className="forecast__info">
            <div className="forecast__desc">{description}</div>
            <div className="forecast__feels-temp">
              <span>Ощущается:</span>
              <span>{feels}&#176;</span>
            </div>
          </div>
        </div>

        <div className="current-forecast__details">
          <div className="details__item">
            <span>Влажность:</span> <span>{humidity}</span>
          </div>
          <div className="details__item">
            <span>Ветер:</span> <span>{wind}</span>
          </div>
          <div className="details__item">
            <span>Давление:</span> <span>{pressure}</span>
          </div>
          <div className="details__item">
            <span>Восход:</span> <span>{transformSunTime(sunrise)}</span>
          </div>
          <div className="details__item">
            <span>Закат:</span> <span>{transformSunTime(sunset)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftBlock;
