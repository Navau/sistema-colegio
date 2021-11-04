import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { Menu, Icon, Dropdown } from "semantic-ui-react";
=======
import { Menu, Icon, MenuHeader } from "semantic-ui-react";
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
import { Link, withRouter } from "react-router-dom";
import TopLogo from "../../components/TopLogo";
import "./MenuLeft.scss";
import "./menu-style.css";

function MenuLeft(props) {
<<<<<<< HEAD
  const { location, showHideMenu, userAccount } = props;
=======
  const { location, user } = props;
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  const handlerMenu = (e, menu) => {
    setActiveMenu(menu.to);
  };
  return (
    <>
<<<<<<< HEAD
      {userAccount.typeUser === "Director" ||
      userAccount.typeUser === "Secretario" ? (
        <Menu className="menu-left" vertical>
          <Menu.Item as={Link} to="/" onClick={handlerMenu} header>
            <TopLogo />
          </Menu.Item>
          {showHideMenu === 3 && <h1>{userAccount.typeUser}</h1>}
          <Menu.Item
            as={Link}
            to="/"
            active={activeMenu === "/"}
            onClick={handlerMenu}
            className={showHideMenu == 1 && "show-hide-menu-width-1"}
          >
            Perfil <Icon name="home" />
          </Menu.Item>
          <Dropdown
            item
            text="Gestion de Usuarios"
            icon="users"
            className={
              activeMenu === "/teachers-management"
                ? "dropdown-active-option" +
                  (showHideMenu == 1 && " show-hide-menu-dropdown-width-1")
                : activeMenu === "/students-management"
                ? "dropdown-active-option" +
                  (showHideMenu == 1 && " show-hide-menu-dropdown-width-1")
                : "dropdown-option" +
                  (showHideMenu == 1 && " show-hide-menu-dropdown-width-1")
            }
          >
            <Dropdown.Menu>
              <Menu.Item
                as={Link}
                to="/teachers-management"
                active={activeMenu === "/teachers-management"}
                onClick={handlerMenu}
              >
                Gestión de Profesores <Icon name="book" />
              </Menu.Item>
              <Menu.Item
                as={Link}
                to="/students-management"
                active={activeMenu === "/students-management"}
                onClick={handlerMenu}
              >
                Gestión de Estudiantes <Icon name="student" />
              </Menu.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown
            item
            text="Gestion de Notificaciones"
            icon="paper plane"
            className={
              activeMenu === "/licences"
                ? "dropdown-active-option" +
                  (showHideMenu == 1 && " show-hide-menu-dropdown-width-1")
                : activeMenu === "/memorandums"
                ? "dropdown-active-option" +
                  (showHideMenu == 1 && " show-hide-menu-dropdown-width-1")
                : activeMenu === "/notices"
                ? "dropdown-active-option" +
                  (showHideMenu == 1 && " show-hide-menu-dropdown-width-1")
                : "dropdown-option" +
                  (showHideMenu == 1 && " show-hide-menu-dropdown-width-1")
            }
          >
            <Dropdown.Menu>
              <Menu.Item
                as={Link}
                to="/licences"
                active={activeMenu === "/licences"}
                onClick={handlerMenu}
              >
                Licencias <Icon name="handshake" />
              </Menu.Item>
              <Menu.Item
                as={Link}
                to="/memorandums"
                active={activeMenu === "/memorandums"}
                onClick={handlerMenu}
              >
                Memorandums <Icon name="keyboard" />
              </Menu.Item>
              <Menu.Item
                as={Link}
                to="/notices"
                active={activeMenu === "/bullhorn"}
                onClick={handlerMenu}
              >
                Noticias <Icon name="book" />
              </Menu.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown
            item
            text="Gestion de Horarios y Calificaciones"
            icon="balance"
            className={
              activeMenu === "/qualification-management"
                ? "dropdown-active-option" +
                  (showHideMenu == 1 && " show-hide-menu-dropdown-width-1")
                : activeMenu === "/schedules-management"
                ? "dropdown-active-option" +
                  (showHideMenu == 1 && " show-hide-menu-dropdown-width-1")
                : "dropdown-option" +
                  (showHideMenu == 1 && " show-hide-menu-dropdown-width-1")
            }
          >
            <Dropdown.Menu>
              <Menu.Item
                as={Link}
                to="/qualification-management"
                active={activeMenu === "/qualification-management"}
                onClick={handlerMenu}
              >
                Calificaciones <Icon name="unordered list" />
              </Menu.Item>
              <Menu.Item
                as={Link}
                to="/schedules-management"
                active={activeMenu === "/schedules-management"}
                onClick={handlerMenu}
              >
                Horarios <Icon name="leanpub" />
              </Menu.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
      ) : userAccount.typeUser === "Profesor" ? (
        <Menu className="menu-left" vertical>
          <Menu.Item as={Link} to="/" onClick={handlerMenu} header>
            <TopLogo />
          </Menu.Item>
          {showHideMenu === 3 && <h1>{userAccount.typeUser}</h1>}
          <Menu.Item
            as={Link}
            to="/"
            active={activeMenu === "/"}
            onClick={handlerMenu}
            className={showHideMenu == 1 && "show-hide-menu-width-1"}
          >
            Perfil <Icon name="home" />
          </Menu.Item>
          <Dropdown
            item
            text="Control del Estudiante"
            icon="flipboard"
            className={
              activeMenu === "/assistance-management"
                ? "dropdown-active-option" +
                  (showHideMenu == 1 && " show-hide-menu-dropdown-width-1")
                : activeMenu === "/reports"
                ? "dropdown-active-option" +
                  (showHideMenu == 1 && " show-hide-menu-dropdown-width-1")
                : "dropdown-option" +
                  (showHideMenu == 1 && " show-hide-menu-dropdown-width-1")
            }
          >
            <Dropdown.Menu>
              <Menu.Item
                as={Link}
                to="/assistance-management"
                active={activeMenu === "/assistance-management"}
                onClick={handlerMenu}
              >
                Gestión de Asistencia <Icon name="clipboard list" />
              </Menu.Item>
              <Menu.Item
                as={Link}
                to="/reports"
                active={activeMenu === "/reports"}
                onClick={handlerMenu}
              >
                Reportes <Icon name="address book" />
              </Menu.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown
            item
            text="Gestion de Horarios y Calificaciones"
            icon="balance"
            className={
              activeMenu === "/ratings-student"
                ? "dropdown-active-option" +
                  (showHideMenu == 1 && " show-hide-menu-dropdown-width-1")
                : activeMenu === "/academy-teacher"
                ? "dropdown-active-option" +
                  (showHideMenu == 1 && " show-hide-menu-dropdown-width-1")
                : "dropdown-option" +
                  (showHideMenu == 1 && " show-hide-menu-dropdown-width-1")
            }
          >
            <Dropdown.Menu>
              <Menu.Item
                as={Link}
                to="/ratings-student"
                active={activeMenu === "/ratings-student"}
                onClick={handlerMenu}
              >
                Calificaciones <Icon name="unordered list" />
              </Menu.Item>
              <Menu.Item
                as={Link}
                to="/academy-teacher"
                active={activeMenu === "/academy-teacher"}
                onClick={handlerMenu}
              >
                Academia <Icon name="leanpub" />
              </Menu.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
      ) : null}
=======
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
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
    </>
  );
}
export default withRouter(MenuLeft);
