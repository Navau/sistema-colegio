import React from "react";

import ListStudentsReports from "../../components/ReportsComponents/ListStudentsReports";
import HeaderReport from "../../components/ReportsComponents/HeaderReport";

import "./Reports.scss";

export default function Reports() {
  return (
    <div className="reports">
      <div className="reports__header-students">
        <HeaderReport title="Reportes" />
      </div>
      <div className="reports__table-list-students">
        <ListStudentsReports />
      </div>
    </div>
  );
}
