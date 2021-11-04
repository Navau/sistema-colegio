import React from "react";
import { Loader } from "semantic-ui-react";

import "./LoadingForm.scss";

export default function LoadingForm() {
  return (
    <div className="loading-form">
      <Loader size="massive">Cargando...</Loader>
    </div>
  );
}
