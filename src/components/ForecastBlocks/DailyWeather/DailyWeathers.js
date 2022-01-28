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
    dayTimeTemps: { dmax, dmin },
    nightTimeTemps: { nmax, nmin },
  } = dailyWeather;

  const items = days.map((item, i) => {
    return (
      <div key={i} className="daily-weather">
        <div className="date">
          <p>{item}</p>
          <p className="sub">{datemonth[i]}</p>
        </div>
        <div className="info by-day">
          <h4 className="info__title">Днём</h4>
          <img
            className="info__icon"
            src="http://openweathermap.org/img/wn/10d@2x.png"
            alt=""
          />
          <div className="info__temp">
            <span>{dmax[i]}&#176;</span>
            <span className="sub">/ {dmin[i]}&#176;</span>
            <p className="info__desc">переменная облачность</p>
          </div>
        </div>
        <div className="info by-day">
          <h4 className="info__title">Вечером</h4>
          <img
            className="info__icon"
            src="http://openweathermap.org/img/wn/10d@2x.png"
            alt=""
          />
          <div className="info__temp">
            <span>{nmax[i]}&#176;</span>
            <span className="sub">/ {nmin[i]}&#176;</span>
            <p className="info__desc">облачно с прояснениями</p>
          </div>
        </div>
      </div>
    );
  });

  return <div>{items}</div>;
};

export default DailyWeathers;
