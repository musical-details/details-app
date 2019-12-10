import React from "react";
import "./Menu.scss";

const Menu: React.FC = () => {
  return (
    <div className="menu">
      <div>Logo</div>
      <div>Menu</div>
      <div>
        <ul>
          <li>Favourite Moments</li>
          <li>New Moments</li>
          <li>Add New Moments</li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
