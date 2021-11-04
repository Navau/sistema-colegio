import React, { useState, useEffect } from "react";
import { map } from "lodash";

import HeaderTeacher from "../../components/TeachersComponents/HeaderTeacher";
import ListTeachers from "../../components/TeachersComponents/ListTeachers";
import LoadingPage from "../../components/Loadings/LoadingPage";

import "./TeachersManagement.scss";

import firebase from "../../utils/firebase";
import "firebase/firestore";

export default function TeachersManagement(props) {
  const { user } = props;
  const [teachers, setTeachers] = useState([]);
  const [teachersInfoExport, setTeachersInfoExport] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);
  //   db.collection("teachers")
  //     .get()
  //     .then((response) => {
  //       const teachersArrayAux = [];
  //       map(response.docs, (teacher) => {
  //         const teacherAux = teacher.data();
  //         teacherAux.id = teacher.id;
  //         teachersArrayAux.push(teacherAux);
  //       });
  //       setTeachers(teachersArrayAux);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  // if (isLoading) {
  //   return <LoadingPage />;
  // }

  return (
    <div className="teachers-management">
      <div className="teachers-management__header-teachers">
        <HeaderTeacher
          title="Gestión de Profesores"
          teachers={teachers}
          teachersInfoExport={teachersInfoExport}
        />
      </div>
      <div className="teachers-management__table-list-teachers">
        <ListTeachers
          teachers={teachers}
          setTeachers={setTeachers}
          isLoading={isLoading}
          setTeachersInfoExport={setTeachersInfoExport}
        />
      </div>
    </div>
  );
}
