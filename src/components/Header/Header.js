import { Link } from "react-router-dom";

import logo from "../../images/sun-logo.png";
import russ from "../../images/russ.png";
import uzb from "../../images/uzb.png";

import "./header.css";

function Header() {
  return (
    <div>
      <header>
        <div className="container">
          <div className="header__inner">
            <Link to="/weather-app" className="logo">
              <img src={logo} alt="logo" />
              <span>AzaamWeather</span>
            </Link>
            <div className="lang">
              <div className="lang__wrapper">
                <img src={russ} alt="russ" />
                <span>рус</span>
              </div>
              <div className="lang__wrapper">
                <img src={uzb} alt="uzb" />
                <span>узб</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
