import React, { useState, useEffect } from "react";
import { Menu, Icon, MenuHeader } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import TopLogo from "../../components/TopLogo";
import "./../MenuLeft/MenuLeft.scss";

function MenuLeftSecretary(props) {
  const { location, user } = props;
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const handlerMenu = (e, menu) => {
    setActiveMenu(menu.to);
  };
  return (
    <>
      <Menu className="menu-left" vertical>
        <MenuHeader className="titulo-menus">SECRETARIA</MenuHeader>
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
          <p className="p-titulo-menu">Gestion de Notificaciones</p>
        </MenuHeader>
        <Menu.Item
          as={Link}
          to="/licencias"
          active={activeMenu === "/licencias"}
          onClick={handlerMenu}
        >
          Licencias <Icon name="calendar alternate outline" />
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/memorandums"
          active={activeMenu === "/memorandums"}
          onClick={handlerMenu}
        >
          Memorandums <Icon name="calendar alternate outline" />
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/avisos"
          active={activeMenu === "/avisos"}
          onClick={handlerMenu}
        >
          Avisos <Icon name="calendar alternate outline" />
        </Menu.Item>
      </Menu>
    </>
  );
}
export default withRouter(MenuLeftSecretary);
