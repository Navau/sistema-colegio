import React, { Component, useState } from "react";
import { Form, Dropdown, Button, Label } from "semantic-ui-react";
import "./style.css";
import { map } from "lodash";
import firebase from "../../utils/firebase";
import { removeArrayDuplicatesObjectOrderByValue } from "../../utils/arrayFunctions";

const db = firebase.firestore(firebase);
export const AddSchedule = () => {
  const [gradeList, setGradeList] = useState([]);

  const onSelectGradeAcademy = (academyLevel) => {
    console.log(academyLevel);
    if (academyLevel) {
      db.collection("classRooms")
        .where("educationLevel", "==", academyLevel)
        .get()
        .then((response) => {
          const arrayClassRooms = [];
          map(response.docs, (classRoom, index) => {
            const data = classRoom.data();
            if (data.currentState !== "No Disponible") {
              arrayClassRooms.push({
                key: index,
                value: data.grade,
                text: data.grade + " " + academyLevel,
              });
            }
          });
          const ArrayClassRomsFilter = removeArrayDuplicatesObjectOrderByValue(
            arrayClassRooms,
            "text"
          );
          setGradeList(ArrayClassRomsFilter);
        });
    }
  };

  const countryOptions = [
    { key: "af", value: "af", text: "Afghanistan" },
    { key: "ax", value: "ax", text: "Aland Islands" },
    { key: "al", value: "al", text: "Albania" },
    { key: "dz", value: "dz", text: "Algeria" },
    { key: "as", value: "as", text: "American Samoa" },
    { key: "ad", value: "ad", text: "Andorra" },
    { key: "ao", value: "ao", text: "Angola" },
    { key: "ai", value: "ai", text: "Anguilla" },
    { key: "ag", value: "ag", text: "Antigua" },
    { key: "ar", value: "ar", text: "Argentina" },
    { key: "am", value: "am", text: "Armenia" },
    { key: "aw", value: "aw", text: "Aruba" },
    { key: "au", value: "au", text: "Australia" },
    { key: "at", value: "at", text: "Austria" },
    { key: "az", value: "az", text: "Azerbaijan" },
    { key: "bs", value: "bs", text: "Bahamas" },
    { key: "bh", value: "bh", text: "Bahrain" },
    { key: "bd", value: "bd", text: "Bangladesh" },
    { key: "bb", value: "bb", text: "Barbados" },
    { key: "by", value: "by", text: "Belarus" },
    { key: "be", value: "be", text: "Belgium" },
    { key: "bz", value: "bz", text: "Belize" },
    { key: "bj", value: "bj", text: "Benin" },
  ];
  const academic_level = [
    { key: "1", value: "Primaria", text: "Primaria" },
    { key: "2", value: "Secundaria", text: "Secundaria" },
  ];
  const academic_grade_secundary = [
    { key: "1", value: "ps", text: "1 Secundaria" },
    { key: "2", value: "ss", text: "2 Secundaria" },
    { key: "3", value: "ts", text: "3 Secundaria" },
    { key: "4", value: "cs", text: "4 Secundaria" },
    { key: "5", value: "qs", text: "5 Secundaria" },
    { key: "6", value: "ses", text: "6 Secundaria" },
  ];
  const academic_grade_primary = [
    { key: "pp", value: "pp", text: "1 Primaria" },
    { key: "sp", value: "sp", text: "2 Primaria" },
    { key: "tp", value: "tp", text: "3 Primaria" },
    { key: "cp", value: "cp", text: "4 Primaria" },
    { key: "qp", value: "qp", text: "5 Primaria" },
  ];
  const days = [
    { key: "lunes", value: "lunes", text: "Lunes" },
    { key: "martes", value: "martes", text: "Martes" },
    { key: "miercoles", value: "miercoles", text: "Miercoles" },
    { key: "jueves", value: "jueves", text: "Jueves" },
    { key: "viernes", value: "viernes", text: "Viernes" },
    { key: "sabado", value: "sabado", text: "Sabado" },
  ];
  const period = [
    { key: "p1", value: "p1", text: "Perido 1 y 2" },
    { key: "p2", value: "p2", text: "Perido 3 y 4" },
    { key: "p3", value: "p3", text: "Perido 5 y 6" },
    { key: "p4", value: "p4", text: "Periodo 7 y 8" },
    { key: "p5", value: "p5", text: "Periodo 7" },
  ];

  return (
    <div className="add-schedule">
      <Form className="Loko">
        <div className="">
          <Form.Group>
            <Dropdown
              className="joto"
              placeholder="Nivel Academico"
              selection
              options={academic_level}
              onChange={(e, data) => {
                console.log(data.value);
                onSelectGradeAcademy(data.value);
              }}
            />
            <Dropdown
              className="joto2"
              placeholder="Curso"
              selection
              options={gradeList}
            />
            <Dropdown
              placeholder="Paralelo"
              selection
              options={academic_grade_secundary}
            />
          </Form.Group>
        </div>

        <Form.Group>
          <Dropdown
            className="joto3"
            placeholder="Materia"
            selection
            options={period}
          />
          <Dropdown
            className="joto3"
            placeholder="Dia"
            selection
            options={days}
          />
          <Form.Input placeholder="Hra Incial" width={2} />
          <Form.Input placeholder="Hra Final" width={2} />
        </Form.Group>
        <Dropdown placeholder="Profesor" selection options={period} />
      </Form>
    </div>
  );
};
