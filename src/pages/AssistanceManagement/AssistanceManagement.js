import React, { useState, useEffect } from "react";

import Calendar from "../../components/AssistanceComponents/Calendar";
import ListStudentsAssistance from "../../components/AssistanceComponents/ListStudentsAssistance";
import HeaderAssistance from "../../components/AssistanceComponents/HeaderAssistance";
import FooterAssistance from "../../components/AssistanceComponents/FooterAssistance";

import "./AssistanceManagement.scss";

export default function AssistanceManagement(props) {
  const [viewList, setViewList] = useState(null);
  const [students, setStudents] = useState(null);

  return (
    <div className="assistance-management">
      <HeaderAssistance setViewList={setViewList} />
      {viewList ? (
        <ListStudentsAssistance
          viewList={viewList}
          students={students}
          setStudents={setStudents}
        />
      ) : (
        <Calendar setViewList={setViewList} />
      )}
    </div>
  );
}
