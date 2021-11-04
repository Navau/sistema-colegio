import React from "react";
import { Loader } from "semantic-ui-react";

import "./LoadingTable.scss";

export default function LoadingTable() {
  return (
    <div className="loading-table">
      <Loader size="massive">Cargando...</Loader>
    </div>
  );
}
