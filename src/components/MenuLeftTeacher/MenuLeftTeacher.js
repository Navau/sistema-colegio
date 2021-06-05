import React, { useState, useEffect } from "react";
import { Menu, Icon, MenuHeader } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import TopLogo from "../../components/TopLogo";
import "./../MenuLeft/MenuLeft.scss";

function MenuLeftTeacher(props) {
  const { location, accountValue } = props;
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const handlerMenu = (e, menu) => {
    setActiveMenu(menu.to);
  };
  console.log(accountValue);
  return (
    <>
      <Menu className="menu-left" vertical>
        <MenuHeader className="titulo-menus">PROFESOR</MenuHeader>
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
          to="/academy-teacher"
          active={activeMenu === "/academy-teacher"}
          onClick={handlerMenu}
        >
          Academia <Icon name="book" />
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/ratings-student"
          active={activeMenu === "/ratings-student"}
          onClick={handlerMenu}
        >
          Calificaciones <Icon name="calendar alternate outline" />
        </Menu.Item>
      </Menu>
    </>
  );
}
export default withRouter(MenuLeftTeacher);
