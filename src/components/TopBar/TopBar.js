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
<<<<<<< HEAD
    history.push("/");
    setPage("home");
    localStorage.removeItem(PARAMS);
    window.location.reload();
    toast("Cerrando Sesión...", { transition: Zoom });
=======
    localStorage.clear();
    window.location.reload(true);
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
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
<<<<<<< HEAD
            {user?.firstName} {user?.fatherLastName}
=======
            {user.firstName + " " + user.secondName}
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
          </Link>
          <Icon name="power off" onClick={logout} />
        </div>
      </div>
      <div className="top-bar__help"></div>
    </>
  );
}
export default withRouter(TopBar);
