import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import CityList from "./components/CityList/CityList";
import Header from "./components/Header/Header";
import ForecastBlocks from "./components/ForecastBlocks/ForecastBlocks";

import "./App.css";

// "https://api.openweathermap.org/data/2.5/weather?q=Bukhara&lang=ru&units=metric&appid=968bf686befc7eb9525f00e78039278d"
function App() {
  const [cityId, setCityId] = useState(601294);
  const getCityId = (id) => {
    setCityId(id);
  };
  return (
    <div className="app">
      <Header />
      <div className="main">
        <div className="container">
          <CityList getCityId={getCityId} />
          <Routes>
            <Route
              path="/:cityName"
              element={<ForecastBlocks cityId={cityId} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
