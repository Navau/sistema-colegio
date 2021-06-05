import React from "react";
import { Icon, Image } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import DefaultUserImage from "../../assets/img/user.png";

import "./TopBar.scss";

export default function TopBar(props) {
  const { user } = props;
  const logout = () => {
    localStorage.clear();
    window.location.reload(true);
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
            {user.firstName + " " + user.secondName}
          </Link>
          <Icon name="power off" onClick={logout} />
        </div>
      </div>
      <div className="top-bar__help"></div>
    </>
  );
}
