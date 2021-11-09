import React, { useState, useEffect } from "react";
import { Table, Icon, TableCell, List } from "semantic-ui-react";
import { map } from "lodash";
import moment from "moment";
import firebase from "../../utils/firebase";

import ListPersons from "../../components/Persons/ListPersons";
import HeaderPersons from "../../components/Persons/HeaderPersons";

import "firebase/firestore";

import "./StudentsManagement.scss";

const db = firebase.firestore(firebase);

export default function StudentsManagement(props) {
  const { user } = props;
  const [persons, setPersons] = useState([]);

  console.log(persons);

  useEffect(() => {
    db.collection("students")
      .get()
      .then((response) => {
        const personsArrayAux = [];
        map(response.docs, (student) => {
          const studentAux = student.data();
          personsArrayAux.push(studentAux);
        });
        setPersons(personsArrayAux);
      });
  }, []);

  return (
    <div className="students-management">
      <div className="students-management__header-students">
        <HeaderPersons />
      </div>
      <div className="students-management__table-list-students">
        <ListPersons persons={persons} />
      </div>
    </div>
  );
}
