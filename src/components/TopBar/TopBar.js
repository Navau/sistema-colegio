import React from "react";
import { Icon, Image } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import DefaultUserImage from "../../assets/img/user.png";
import { toast, Zoom } from "react-toastify";
import { PARAMS } from "../../utils/constants";

import "./TopBar.scss";

function TopBar(props) {
  const { user, history, setShowHideMenu, showHideMenu, setPage } = props;
  const logout = () => {
    history.push("/");
    setPage("home");
    localStorage.removeItem(PARAMS);
    window.location.reload();
    toast("Cerrando Sesión...", { transition: Zoom });
  };

  const hideShowMenu = () => {
    setShowHideMenu(showHideMenu == 3 ? 1 : 3);
  };

  return (
    <>
      <div className="top-bar">
        <div className="top-bar__left">
          <Icon name="bars" onClick={hideShowMenu} />
        </div>
        <div className="top-bar__logout">
          <Link to="/">
            <Image src={DefaultUserImage} />
            {user?.firstName} {user?.fatherLastName}
          </Link>
          <Icon name="power off" onClick={logout} />
        </div>
      </div>
      <div className="top-bar__help"></div>
    </>
  );
}
export default withRouter(TopBar);
