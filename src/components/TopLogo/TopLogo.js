import React from "react";
import { Image } from "semantic-ui-react";
import LogoSchool from "../../assets/img/logo-school.jpg";

import "./TopLogo.scss";

export default function TopLogo() {
  return (
    <div className="top-logo">
      <Image src={LogoSchool} size="tiny" circular />
    </div>
  );
}
