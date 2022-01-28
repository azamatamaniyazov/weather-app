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
            <div className="logo">
              <img src={logo} alt="logo" />
              <span>Погода</span>
            </div>
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
