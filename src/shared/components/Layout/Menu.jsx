import React from "react";

const Menu = () => {
  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <nav>
          <div id="menu" className="collapse navbar-collapse">
            <ul>
              <li className="menu-item">
                <a href="#">iPhone</a>
              </li>
              <li className="menu-item">
                <a href="#">Samsung</a>
              </li>
              <li className="menu-item">
                <a href="#">HTC</a>
              </li>
              <li className="menu-item">
                <a href="#">Nokia</a>
              </li>
              <li className="menu-item">
                <a href="#">Sony</a>
              </li>
              <li className="menu-item">
                <a href="#">Blackberry</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
