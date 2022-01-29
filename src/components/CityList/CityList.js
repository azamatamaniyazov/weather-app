import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./cityList.css";

const cities = [
  { id: 601294, name: "Нукус" },
  { id: 829959, name: "Ходжейли" },
  { id: 601349, name: "Кегейли" },
  { id: 829955, name: "Кунград" },
  { id: 829960, name: "Чимбай" },
  { id: 829964, name: "Шуманай" },
  { id: 601306, name: "Канлыкуль" },
  { id: 829962, name: "Муйнак" },
  { id: 829930, name: "Нукус район" },
  { id: 1512699, name: "Тахтакупыр" },
  { id: 1513733, name: "Караузяк" },
  { id: 1538221, name: "Беруний" },
  { id: 1538222, name: "Турткуль" },
  { id: 1538224, name: "Мангит" },
];

function CityList({ getCityId }) {
  const [selectedId, setSelectedId] = useState(
    +sessionStorage.getItem("cityId")
  );

  const onSelectCity = (e) => {
    setSelectedId(e.target.getAttribute("data-id"));
  };

  useEffect(() => {
    sessionStorage.setItem("cityId", selectedId);
    getCityId(+sessionStorage.getItem("cityId"));
  }, [selectedId]);

  const items = cities.map((elem, i) => {
    return (
      <li key={i} className="city-list__item">
        <Link
          to={`/weather-app/${elem.name}`}
          onClick={onSelectCity}
          className="city-list__link"
          data-id={elem.id}
        >
          {elem.name}
        </Link>
      </li>
    );
  });

  return (
    <div>
      <ul className="city-list">{items}</ul>
    </div>
  );
}

export default CityList;
