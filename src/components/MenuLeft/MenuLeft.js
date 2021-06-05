import React, { useState, useEffect } from "react";
import { Menu, Icon, MenuHeader } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import TopLogo from "../../components/TopLogo";
import "./MenuLeft.scss";
import "./menu-style.css";

function MenuLeft(props) {
  const { location, user } = props;
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const handlerMenu = (e, menu) => {
    setActiveMenu(menu.to);
  };
  return (
    <>
      <Menu className="menu-left" vertical>
        <MenuHeader className="titulo-menus">DIRECTOR</MenuHeader>
        <Menu.Item as={Link} to="/" onClick={handlerMenu} header>
          <TopLogo />
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/"
          //active={activeMenu === "/"}
          onClick={handlerMenu}
        >
          Inicio <Icon name="home" />
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/perfil-teacher"
          active={activeMenu === "/perfil-teacher"}
          onClick={handlerMenu}
        >
          Perfil <Icon name="calendar alternate outline" />
        </Menu.Item>
        <MenuHeader className="SUB-DIV-MENUS">
          <p className="p-titulo-menu">Gestion de Horarios y Calificaciones</p>
        </MenuHeader>
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
