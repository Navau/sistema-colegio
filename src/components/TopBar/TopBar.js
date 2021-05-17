import React from "react";
import { Icon, Image } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import DefaultUserImage from "../../assets/img/user.png";

import "./TopBar.scss";

export default function TopBar(props) {
  const { user } = props;
  const logout = () => {
    console.log("CERRANDO SESION...");
  };
  return (
    <>
      <div className="top-bar">
        <div className="top-bar__left">
          <Icon name="bars" />
        </div>
        <div className="top-bar__logout">
          <Link to="/">
            <Image src={DefaultUserImage} />
            {user.names}
          </Link>
          <Icon name="power off" onClick={logout} />
        </div>
      </div>
      <div className="top-bar__help"></div>
    </>
  );
}
