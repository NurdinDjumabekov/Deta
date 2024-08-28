import React from "react";
// import logout from "../../assets/icons/menu/logout.png";
import logout from "../../assets/images/logout.png";

import "./style.scss";

const LogOut = () => {
  return (
    <div className="logout">
      <button>
        <img src={logout} alt="logout" />
        <p>Выйти</p>
      </button>
    </div>
  );
};

export default LogOut;
