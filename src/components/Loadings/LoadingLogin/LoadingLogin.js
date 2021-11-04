import React from "react";
import BackgroundSchool from "../../../assets/img/background-school.jpg";

import { Dimmer, Loader } from "semantic-ui-react";

import "./LoadingLogin.scss";

export default function LoadingLogin() {
  return (
    <div
      className="loading-login"
      style={{ backgroundImage: `url(${BackgroundSchool})` }}
    >
      <Dimmer active>
        <Loader size="massive">Cargando...</Loader>
      </Dimmer>
    </div>
  );
}
