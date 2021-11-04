import React, { useState, useEffect } from "react";
import { map } from "lodash";
import firebase from "../../utils/firebase";

import ListStudents from "../../components/StudentsComponents/ListStudents";
import HeaderStudent from "../../components/StudentsComponents/HeaderStudent";
import LoadingPage from "../../components/Loadings/LoadingPage";

import "firebase/firestore";

import "./StudentsManagement.scss";

const db = firebase.firestore(firebase);

export default function StudentsManagement(props) {
  const { user } = props;
  const [students, setStudents] = useState([]);
  const [studentsInfoExport, setStudentsInfoExport] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updateData, setUpdateData] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);
  //   db.collection("students")
  //     .get()
  //     .then((response) => {
  //       const studentsArrayAux = [];
  //       map(response.docs, (student) => {
  //         const studentAux = student.data();
  //         studentAux.id = student.id;
  //         studentsArrayAux.push(studentAux);
  //       });
  //       setStudents(studentsArrayAux);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  // if (isLoading) {
  //   return <LoadingPage />;
  // }

  return (
    <div className="students-management">
      <div className="students-management__header-students">
        <HeaderStudent
          title="Gestión de Estudiantes"
          updateData={updateData}
          setUpdateData={setUpdateData}
          students={students}
          studentsInfoExport={studentsInfoExport}
        />
      </div>
      <div className="students-management__table-list-students">
        <ListStudents
          students={students}
          setStudents={setStudents}
          setStudentsInfoExport={setStudentsInfoExport}
          isLoading={isLoading}
          updateData={updateData}
          setUpdateData={setUpdateData}
        />
      </div>
    </div>
  );
}
