import React from "react";

import { Dimmer, Loader } from "semantic-ui-react";

import "./LoadingTable.scss";
export default function LoadingTable() {
  return (
    <div className="loading-table">
      <Dimmer active>
        <Loader size="massive">Cargando...</Loader>
      </Dimmer>
    </div>
  );
}
