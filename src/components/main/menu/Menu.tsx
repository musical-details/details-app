import React from "react";
import "./Menu.scss";
import Logo from "../logo/Logo";
import GradientHeader from "../../shared/gradient-header/gradient-header";
import UserBar from "../user-bar/user-bar";
import { BrowserRouter, NavLink, Link } from "react-router-dom";
import TopBarContainer from "../top-bar/top-bar";

const Menu: React.FC = () => {
  return (
    <div className="menu">
      <div className="user-bar-wrapper">
        <TopBarContainer />
      </div>

      <div className="menu-content">
        <div>
          <div className="menu-content-items">
            <div className="logo-wrapper">
              <Logo />
            </div>
            <div className="header-wrapper">
              <GradientHeader icon="" text="Menu" />
            </div>

            
              <ul className="options">
                <div>
                  <NavLink activeClassName="selected" to="/home">
                    <li>
                      <span>Home</span>
                    </li>
                  </NavLink>
                  <NavLink activeClassName="selected" to="/my-profile">
                    <li>
                      <span>My profile</span>
                    </li>
                  </NavLink>
                  <NavLink activeClassName="selected" to="/rate">
                    <li>
                      <span>Rate new Track</span>
                    </li>
                  </NavLink>
                </div>
              </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
