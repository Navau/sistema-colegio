import React, { useState, useEffect } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import TopLogo from "../../components/TopLogo";

import "./MenuLeft.scss";

function MenuLeft(props) {
  const { location } = props;

  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const handlerMenu = (e, menu) => {
    setActiveMenu(menu.to);
  };

  return (
    <>
      <Menu className="menu-left" vertical>
        <Menu.Item as={Link} to="/" onClick={handlerMenu} header>
          <TopLogo />
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/"
          active={activeMenu === "/"}
          onClick={handlerMenu}
        >
          Inicio <Icon name="home" />
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/students-management"
          active={activeMenu === "/students-management"}
          onClick={handlerMenu}
        >
          Gestión de Estudiantes <Icon name="student" />
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/teachers-management"
          active={activeMenu === "/teachers-management"}
          onClick={handlerMenu}
        >
          Gestión de Profesores <Icon name="users" />
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/qualification-management"
          active={activeMenu === "/qualification-management"}
          onClick={handlerMenu}
        >
          Gestión de Calificaciones <Icon name="book" />
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/schedules-management"
          active={activeMenu === "/schedules-management"}
          onClick={handlerMenu}
        >
          Gestión de Horarios <Icon name="calendar alternate outline" />
        </Menu.Item>
      </Menu>
    </>
  );
}

export default withRouter(MenuLeft);
