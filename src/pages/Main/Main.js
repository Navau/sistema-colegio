import React, { useEffect, useState } from "react";
import Home from "../../components/MainComponents/Home";
import Activities from "../../components/MainComponents/Activities";
import Contact from "../../components/MainComponents/Contact";
import Personalities from "../../components/MainComponents/Personalities";

//Components
import MenuTop from "../../components/MenuTop";

import "./Main.scss";

export default function Main(props) {
  const { setPage } = props;
  return (
    <div className="main">
      <div className="menu">
        <MenuTop setPage={setPage} />
      </div>
      <div className="home">
        <Home />
      </div>
      <div className="personalities">
        <Personalities />
      </div>
      <div className="activities">
        <Activities />
      </div>
      <div className="contact">
        <Contact />
      </div>
    </div>
  );
}
