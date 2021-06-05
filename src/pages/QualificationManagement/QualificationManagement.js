import { map } from "lodash";
import React, { useState, useEffect } from "react";
import { Button, Form, Dropdown, Message } from "semantic-ui-react";
import { TableCalification } from "../../components/TableCalification/TableCalification";
import { removeArrayDuplicatesObjectOrderByValue } from "../../utils/arrayFunctions";
import firebase from "../../utils/firebase";
import "./QualificationManagement.scss";
import "./styl.css";

const db = firebase.firestore(firebase);

const academic_level = [
  { key: "1", value: "Primaria", text: "Primaria" },
  { key: "2", value: "Secundaria", text: "Secundaria" },
];
export default function QualificationManagement() {
  const [gradeList, setGradeList] = useState([]);
  const [materialList, setMaterialList] = useState([]);
  const [trimestre, setTrimestre] = useState([]);
  const onSelectLevelAcademic = (academicLevel) => {
    if (academicLevel) {
      db.collection("classRooms")
        .where("educationLevel", "==", academicLevel)
        .get()
        .then((response) => {
          const arrayClassRooms = [];
          map(response.docs, (classRoom, index) => {
            const data = classRoom.data();
            if (data.currentState !== "No Disponible") {
              arrayClassRooms.push({
                key: index,
                value: data.grade,
                text: data.grade + " " + data.parallel + " " + academicLevel,
              });
            }
          });
          setGradeList(arrayClassRooms);
        });
    }
  };

  useEffect(() => {
    db.collection("school_material")
      .get()
      .then((response) => {
        const materialAux = [];
        map(response.docs, (material, index) => {
          const data = material.data();
          materialAux.push({
            key: index,
            value: data.name_matter,
            text: data.name_matter,
          });
        });
        setMaterialList(materialAux);
      });
  }, []);

  useEffect(() => {
    db.collection("trimesters")
      .get()
      .then((response) => {
        const trimestreAux = [];
        map(response.docs, (trimestre, index) => {
          const data = trimestre.data();
          trimestreAux.push({
            key: index,
            value: data.numberTrimester,
            text: data.numberTrimester + "Trimestre",
          });
        });
        setTrimestre(trimestreAux);
      });
  }, []);

  return (
    <>
      <div className="fondo-pag">
        <div className="message">
          <Message className="fond-message">
            <Message.Header>
              <center>
                <h3>Ver Calificaciones - Unidad Educativa Ave Maria</h3>
              </center>
            </Message.Header>
          </Message>
        </div>
        <div className="filtrar-calification">
          <Form className="contenido-from-verNotas">
            <Form.Group unstackable widths={2}>
              <Dropdown
                className="data-select"
                placeholder="Nivel Academico"
                fluid
                search
                selection
                options={academic_level}
                onChange={(e, data) => {
                  onSelectLevelAcademic(data.value);
                }}
              />
              <Dropdown
                className="data-select"
                placeholder="Curso"
                fluid
                search
                selection
                options={gradeList}
              />
            </Form.Group>
            <Form.Group widths={2}>
              <Dropdown
                className="data-select2"
                placeholder="Profesor"
                fluid
                search
                selection
                options={academic_level}
              />
              <Dropdown
                className="data-select2"
                placeholder="Materia"
                fluid
                search
                selection
                options={materialList}
              />
              <Dropdown
                className="data-select2"
                placeholder="Trimestre"
                fluid
                search
                selection
                options={trimestre}
              />
            </Form.Group>
            <Button type="submit">Buscar</Button>
          </Form>
        </div>
        <div className="table-Calification">
          <TableCalification />
        </div>
      </div>
    </>
  );
}
