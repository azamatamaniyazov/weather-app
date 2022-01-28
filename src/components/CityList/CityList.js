import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./cityList.css";

const cities = [
  { id: 829959, name: "Ходжейли" },
  { id: 601349, name: "Кегейли" },
  { id: 829955, name: "Кунград" },
  { id: 829960, name: "Чимбай" },
  { id: 601294, name: "Нукус" },
  { id: 829964, name: "Шуманай" },
  { id: 601306, name: "Канлыкул" },
  { id: 829962, name: "Muynaq" },
  { id: 829930, name: "Nukus tuman" },
  { id: 1512699, name: "taxta" },
  { id: 1513733, name: "Qoraozak" },
  { id: 1538221, name: "Beruniy" },
  { id: 1538222, name: "Tortkol" },
  { id: 1538224, name: "Mangit" },
];

function CityList({ getCityId }) {
  const [selectedId, setSelectedId] = useState(null);

  const onSelectCity = (e) => {
    setSelectedId(e.target.getAttribute("data-id"));
  };

  useEffect(() => {
    getCityId(selectedId);
  }, [selectedId]);

  const items = cities.map((elem, i) => {
    return (
      <li key={i} className="city-list__item">
        <Link
          to={`/${elem.name}`}
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
