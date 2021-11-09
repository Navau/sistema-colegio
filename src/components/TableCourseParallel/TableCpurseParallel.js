import React, { useEffect, useState } from "react";
import { Table, Button, Icon, Message } from "semantic-ui-react";
import { map } from "lodash";
import firebase from "../../utils/firebase";

import "./TableCourseParallel.scss";

const db = firebase.firestore(firebase);

export const TableCpurseParallel = (props) => {
  const { user } = props;
  const [DataCourse, setDataCourse] = useState([]);
  //console.log(user);
  useEffect(() => {
    db.collection("classRooms")
      .get()
      .then((reps) => {
        const course = [];
        map(reps.docs, (classR) => {
          const data2 = classR.data();
          if (data2.Teachers != undefined) {
            map(data2.Teachers, (item) => {
              if (item == user.accountId) {
                course.push({
                  grade: data2.grade,
                  parallel: data2.parallel,
                  nivel: data2.educationLevel,
                });
              }
            });
          }
        });
        setDataCourse(course);
      });
  }, []);
  let cont = 1;
  return (
    <div className="parallel">
      <div className="message">
        <Message className="fond-message">
          <Message.Header>
            <h3>Academia - Cursos Asignados</h3>
          </Message.Header>
        </Message>
      </div>
      <div className="table">
        <Table inverted celled padded striped className="list-course-parallel">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nro.</Table.HeaderCell>
              <Table.HeaderCell>Curso-Paralelo</Table.HeaderCell>
              <Table.HeaderCell>Descargar Plantilla</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {DataCourse.map((da, index) => (
              <Table.Row
                key={index}
                className="list-course-parallel__status-available"
              >
                <Table.Cell textAlign="center"> {cont++} </Table.Cell>
                <Table.Cell textAlign="center">
                  {da.grade + "to " + da.parallel + " de" + da.nivel}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Button positive>
                    <Icon name="arrow alternate circle down" />
                    Descargar Plantilla
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
