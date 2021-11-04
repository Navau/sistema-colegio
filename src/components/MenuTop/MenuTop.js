import React from "react";
import { Menu } from "antd";

import Logo from "../../assets/img/logo-school.jpg";

import "./MenuTop.scss";

export default function MenuTop(props) {
  const { setPage } = props;
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <div
          className="menu-top__left__logo"
          style={{ backgroundImage: `url(${Logo})` }}
        />
        <h2>UNIDAD EDUCATIVA AVE MARÍA</h2>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[1]}
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key="1">Inicio</Menu.Item>
        <Menu.Item key="2">Personalidades</Menu.Item>
        <Menu.Item key="3">Actividades</Menu.Item>
        <Menu.Item key="4" onClick={() => setPage("system")}>
          Sistema
        </Menu.Item>
      </Menu>
    </div>
  );
}
