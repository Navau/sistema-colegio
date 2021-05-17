import React from "react";
import BackgroundSchool from "../../assets/img/background-school.jpg";
import LogoSchool from "../../assets/img/logo-school.jpg";

import { Dimmer, Loader } from "semantic-ui-react";

import "./Loading.scss";

export default function Loading() {
  return (
    <div
      className="loading"
      style={{ backgroundImage: `url(${BackgroundSchool})` }}
    >
      <Dimmer active>
        <Loader size="massive">Cargando...</Loader>
      </Dimmer>
    </div>
  );
}
