import React from "react";
import "./Menu.scss";
import Logo from "../logo/Logo";
import GradientHeader from "../../shared/gradient-header/gradient-header";
import UserBar from "../user-bar/user-bar";

const Menu: React.FC = () => {
  return (
    <div className="menu">
      <div className="user-bar-wrapper">
        <UserBar />
      </div>
      <div className="menu-content">
        <div>
          <div>
            <div className="logo-wrapper">
              <Logo />
            </div>
            <div className="header-wrapper">
              <GradientHeader icon="" text="Menu" />
            </div>

            <div>
              <ul className="options">
                <li>
                  <span>Home</span>
                </li>
                <li>
                  <span>My Profile</span>
                </li>
                <li className="selected">
                  <div>
                    <div>
                      <span>Rate new Track</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
