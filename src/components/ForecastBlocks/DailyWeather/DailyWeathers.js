import { useState, useEffect } from "react";
import WeatherServices from "../../../services/WeatherServices";
import "./dailyWeathers.css";

function DailyWeathers({ cityId }) {
  const [dailyWeather, setDailyWeahter] = useState(null);

  const { getDailyWeather } = WeatherServices();
  useEffect(() => {
    onRequest();
  }, [cityId]);

  const onRequest = () => {
    if (cityId) {
      getDailyWeather(cityId).then((res) => onLoading(res));
    }
  };

  const onLoading = (res) => {
    if (res) {
      setDailyWeahter(res);
    }
  };

  return (
    <div>{dailyWeather ? <Forecast dailyWeather={dailyWeather} /> : null}</div>
  );
}

const Forecast = ({ dailyWeather }) => {
  const {
    dates: { days, datemonth },
    dayTimeForecasts: { dmax, dmin, dIcons, dDescriptions },
    nightTimeForecasts: { nmax, nmin, nIcons, nDescriptions },
  } = dailyWeather;

  const items = days.map((item, i) => {
    return (
      <div key={i} className="daily-weather">
        <div className="date">
          <p>{item}</p>
          <p className="sub">{datemonth[i]}</p>
        </div>
        <div className="info__wrapper">
          <div className="info daytime-info">
            <h4 className="info__title">Днём</h4>
            <div className="info__temp">
              <img
                className="temp__icon"
                src={`http://openweathermap.org/img/wn/${dIcons[i]}@2x.png`}
                alt=""
              />
              <div className="temp__val">
                <span>{dmax[i]}&#176;</span>
                <span className="sub">/ {dmin[i]}&#176;</span>
                <div className="temp__desc">{dDescriptions[i]}</div>
              </div>
            </div>
          </div>
          <div className="info nighttime-info">
            <h4 className="info__title">Вечером</h4>
            <div className="info__temp">
              <img
                className="temp__icon"
                src={`http://openweathermap.org/img/wn/${nIcons[i]}@2x.png`}
                alt=""
              />
              <div className="temp__val">
                <span>{nmax[i]}&#176;</span>
                <span className="sub">/ {nmin[i]}&#176;</span>
                <div className="temp__desc">{nDescriptions[i]}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return <div>{items}</div>;
};

export default DailyWeathers;
