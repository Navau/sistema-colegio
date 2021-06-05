import React, { useState } from "react";
import LoginForm from "../../components/LoginForm";
import BackgroundSchool from "../../assets/img/background-school.jpg";
import LogoSchool from "../../assets/img/logo-school.jpg";

import "./Auth.scss";

export default function Auth(props) {
  const { setUser, setParams } = props;
  const [selectedForm, setSelectedForm] = useState("login");
  const handlerForm = () => {
    switch (selectedForm) {
      case "login":
        return (
          <LoginForm
            setSelectedForm={setSelectedForm}
            setUser={setUser}
            setParams={setParams}
          />
        );
    }
  };

  return (
    <div
      className="auth"
      style={{ backgroundImage: `url(${BackgroundSchool})` }}
    >
      <div className="auth__bg-dark" />
      <div className="auth__box">
        <div className="auth__box__logo">
          <img src={LogoSchool} alt="Logo Ave Maria" />
          <div>
            <h1>Ave María</h1>
            <h2>Sistema de Gestión</h2>
          </div>
        </div>
        {handlerForm()}
      </div>
    </div>
  );
}
