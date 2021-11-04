import React, { useEffect, useState } from "react";
import { Table, Message, Label, Button } from "semantic-ui-react";
import { map } from "lodash";
import firebase from "../../utils/firebase";

import "./TeacherSchedule.scss";
const db = firebase.firestore(firebase);

export const TeacherSchedule = (props) => {
  const [Materia, setMateria] = useState("");
  const [Periodo01, setPeriodo01] = useState("Periodo No Asignado-1");
  const [Periodo02, setPeriodo02] = useState("Periodo No Asignado-2");
  const [Periodo03, setPeriodo03] = useState("Periodo No Asignado-3");
  const [Periodo04, setPeriodo04] = useState("Periodo No Asignado-4");
  const [Periodo05, setPeriodo05] = useState("Periodo No Asignado-5");
  const [Periodo06, setPeriodo06] = useState("Periodo No Asignado-6");
  const [Periodo07, setPeriodo07] = useState("Periodo No Asignado-7");
  const [Periodo08, setPeriodo08] = useState("Periodo No Asignado-8");
  const [Periodo09, setPeriodo09] = useState("Periodo No Asignado-9");
  const [Periodo10, setPeriodo10] = useState("Periodo No Asignado-10");
  const [Periodo11, setPeriodo11] = useState("Periodo No Asignado-11");
  const [Periodo12, setPeriodo12] = useState("Periodo No Asignado-12");
  const [Periodo13, setPeriodo13] = useState("Periodo No Asignado-13");
  const [Periodo14, setPeriodo14] = useState("Periodo No Asignado-14");
  const [Periodo15, setPeriodo15] = useState("Periodo No Asignado-15");
  const [Periodo16, setPeriodo16] = useState("Periodo No Asignado-16");
  const [Periodo17, setPeriodo17] = useState("Periodo No Asignado-17");
  const [Periodo18, setPeriodo18] = useState("Periodo No Asignado-18");
  const [Periodo19, setPeriodo19] = useState("Periodo No Asignado-19");
  const [Periodo20, setPeriodo20] = useState("Periodo No Asignado-20");
  const [Periodo21, setPeriodo21] = useState("Periodo No Asignado-21");
  const [Periodo22, setPeriodo22] = useState("Periodo No Asignado-22");
  const [Periodo23, setPeriodo23] = useState("Periodo No Asignado-23");
  const [Periodo24, setPeriodo24] = useState("Periodo No Asignado-24");
  const [Periodo25, setPeriodo25] = useState("Periodo No Asignado-25");
  const [Periodo26, setPeriodo26] = useState("Periodo No Asignado-26");
  const [Periodo27, setPeriodo27] = useState("Periodo No Asignado-27");
  const [Periodo28, setPeriodo28] = useState("Periodo No Asignado-28");
  const [Periodo29, setPeriodo29] = useState("Periodo No Asignado-29");
  const [Periodo30, setPeriodo30] = useState("Periodo No Asignado-30");
  const [Periodo31, setPeriodo31] = useState("Periodo No Asignado-31");
  const [Periodo32, setPeriodo32] = useState("Periodo No Asignado-32");
  const [Periodo33, setPeriodo33] = useState("Periodo No Asignado-33");
  const [Periodo34, setPeriodo34] = useState("Periodo No Asignado-34");
  const [Periodo35, setPeriodo35] = useState("Periodo No Asignado-35");
  const [Periodo36, setPeriodo36] = useState("Periodo No Asignado-36");
  const [Periodo37, setPeriodo37] = useState("Periodo No Asignado-37");
  const [Periodo38, setPeriodo38] = useState("Periodo No Asignado-38");
  const [Periodo39, setPeriodo39] = useState("Periodo No Asignado-39");
  const [Periodo40, setPeriodo40] = useState("Periodo No Asignado-40");
  const [Periodo41, setPeriodo41] = useState("Periodo No Asignado-41");
  const [Periodo42, setPeriodo42] = useState("Periodo No Asignado-42");
  const [DatosHorarioGG, setDatosHorarioGG] = useState([]);
  const [CursoGG, setCursoGG] = useState([]);
  const [ParaleloGG, setParaleloGG] = useState([]);
  const { user } = props;
  useEffect(() => {
    db.collection("school_material")
      .doc(user.subjectId)
      .get()
      .then((doc) => {
        setMateria(doc.data());
      });
  }, []);
  const ActualizarDatos = () => {
    db.collection("classRooms")
      .where("subjectsAsig", "==", true)
      .get()
      .then((response) => {
        const list_horarios = [];
        const list_cursos = [];
        const list_paralelo = [];
        map(response.docs, (horarios23) => {
          const data = horarios23.data();
          list_horarios.push(data.schedules);
          list_cursos.push(data.grade);
          list_paralelo.push(data.parallel);
        });
        setDatosHorarioGG(list_horarios);
        setParaleloGG(list_paralelo);
        setCursoGG(list_cursos);
      });
    for (var j = 0; j < DatosHorarioGG.length; j++) {
      //LUNES
      if (DatosHorarioGG[j].dia01.periodo01.idTeac == user.accountId) {
        setPeriodo01(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia01.periodo02.idTeac == user.accountId) {
        setPeriodo02(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia01.periodo03.idTeac == user.accountId) {
        setPeriodo03(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia01.periodo04.idTeac == user.accountId) {
        setPeriodo04(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia01.periodo05.idTeac == user.accountId) {
        setPeriodo05(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia01.periodo06.idTeac == user.accountId) {
        setPeriodo06(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia01.periodo07.idTeac == user.accountId) {
        setPeriodo07(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }

      //martes
      if (DatosHorarioGG[j].dia02.periodo09.idTeac == user.accountId) {
        setPeriodo09(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia02.periodo10.idTeac == user.accountId) {
        setPeriodo10(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia02.periodo11.idTeac == user.accountId) {
        setPeriodo11(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia02.periodo12.idTeac == user.accountId) {
        setPeriodo12(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia02.periodo13.idTeac == user.accountId) {
        setPeriodo13(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia02.periodo14.idTeac == user.accountId) {
        setPeriodo14(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia02.periodo15.idTeac == user.accountId) {
        setPeriodo15(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      //miercoles
      if (DatosHorarioGG[j].dia03.periodo17.idTeac == user.accountId) {
        setPeriodo17(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia03.periodo18.idTeac == user.accountId) {
        setPeriodo18(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia03.periodo19.idTeac == user.accountId) {
        setPeriodo19(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia03.periodo20.idTeac == user.accountId) {
        setPeriodo20(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia03.periodo21.idTeac == user.accountId) {
        setPeriodo21(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia03.periodo22.idTeac == user.accountId) {
        setPeriodo22(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia03.periodo23.idTeac == user.accountId) {
        setPeriodo23(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      //jueves
      if (DatosHorarioGG[j].dia04.periodo25.idTeac == user.accountId) {
        setPeriodo25(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia04.periodo26.idTeac == user.accountId) {
      }
      setPeriodo26(
        Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
      );
      if (DatosHorarioGG[j].dia04.periodo27.idTeac == user.accountId) {
        setPeriodo27(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia04.periodo28.idTeac == user.accountId) {
        setPeriodo28(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia04.periodo29.idTeac == user.accountId) {
        setPeriodo29(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia04.periodo30.idTeac == user.accountId) {
        setPeriodo30(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia04.periodo31.idTeac == user.accountId) {
        setPeriodo31(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      //viernes
      if (DatosHorarioGG[j].dia05.periodo33.idTeac == user.accountId) {
        setPeriodo33(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia05.periodo34.idTeac == user.accountId) {
        setPeriodo34(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia05.periodo35.idTeac == user.accountId) {
        setPeriodo35(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia05.periodo36.idTeac == user.accountId) {
        setPeriodo36(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia05.periodo37.idTeac == user.accountId) {
        setPeriodo37(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia05.periodo38.idTeac == user.accountId) {
        setPeriodo38(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      if (DatosHorarioGG[j].dia05.periodo39.idTeac == user.accountId) {
        setPeriodo39(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
      //sabado
      if (DatosHorarioGG[j].dia06.periodo41.idTeac == user.accountId) {
        setPeriodo41(
          Materia.name_matter + "-" + CursoGG[j] + "-" + ParaleloGG[j]
        );
      }
    }
  };
  return (
    <div className="teacher-schedule">
      <div className="message">
        <Message className="fond-message">
          <Message.Header>
            <center>
              <h3>Academia - Horario Asignado</h3>
            </center>
          </Message.Header>
        </Message>
      </div>
      <div className="materia-label-teacher">
        <Button onClick={() => ActualizarDatos()}>MOSTRAR</Button>
        <Label className="materia-label-teacher0" size="big" color="purple">
          Nivel Academico:{Materia.educationLevel}
        </Label>
        <Label className="materia-label-teacher0" size="big" color="purple">
          Materia:{Materia.name_matter}
        </Label>
      </div>
      <div className="table">
        <Table inverted celled padded striped className="list-teacher-schedule">
          <Table.Header>
            <Table.Row className="list-teacher-schedule__status-available">
              <Table.HeaderCell>Hrs</Table.HeaderCell>
              <Table.HeaderCell>Lunes</Table.HeaderCell>
              <Table.HeaderCell>Martes</Table.HeaderCell>
              <Table.HeaderCell>Miercoles</Table.HeaderCell>
              <Table.HeaderCell>Jueves</Table.HeaderCell>
              <Table.HeaderCell>Viernes</Table.HeaderCell>
              <Table.HeaderCell>Sabado</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row className="list-teacher-schedule__status-available">
              <Table.Cell textAlign="center">14:00</Table.Cell>
              <Table.Cell> {Periodo01} </Table.Cell>
              <Table.Cell> {Periodo09}</Table.Cell>
              <Table.Cell> {Periodo17}</Table.Cell>
              <Table.Cell> {Periodo25}</Table.Cell>
              <Table.Cell> {Periodo33}</Table.Cell>
              <Table.Cell> {Periodo41}</Table.Cell>
            </Table.Row>
            <Table.Row className="list-teacher-schedule__status-available">
              <Table.Cell textAlign="center">14:45</Table.Cell>
              <Table.Cell> {Periodo02} </Table.Cell>
              <Table.Cell> {Periodo10}</Table.Cell>
              <Table.Cell> {Periodo18}</Table.Cell>
              <Table.Cell> {Periodo26}</Table.Cell>
              <Table.Cell> {Periodo34}</Table.Cell>
              <Table.Cell> {Periodo42}</Table.Cell>
            </Table.Row>
            <Table.Row className="list-teacher-schedule__status-available">
              <Table.Cell textAlign="center">15:30</Table.Cell>
              <Table.Cell> {Periodo03} </Table.Cell>
              <Table.Cell> {Periodo11}</Table.Cell>
              <Table.Cell> {Periodo19}</Table.Cell>
              <Table.Cell> {Periodo27}</Table.Cell>
              <Table.Cell> {Periodo35}</Table.Cell>
              <Table.Cell> Periodo No Asignado</Table.Cell>
            </Table.Row>
            <Table.Row className="list-teacher-schedule__status-available">
              <Table.Cell textAlign="center">16:15</Table.Cell>
              <Table.Cell> {Periodo04} </Table.Cell>
              <Table.Cell> {Periodo12} </Table.Cell>
              <Table.Cell> {Periodo20} </Table.Cell>
              <Table.Cell> {Periodo28} </Table.Cell>
              <Table.Cell> {Periodo36} </Table.Cell>
              <Table.Cell> Periodo No Asignado</Table.Cell>
            </Table.Row>
            <Table.Row className="list-teacher-schedule__status-available">
              <Table.Cell textAlign="center">17:00</Table.Cell>
              <Table.Cell> {Periodo05} </Table.Cell>
              <Table.Cell> {Periodo13}</Table.Cell>
              <Table.Cell> {Periodo21}</Table.Cell>
              <Table.Cell> {Periodo29}</Table.Cell>
              <Table.Cell> {Periodo37}</Table.Cell>
              <Table.Cell> Periodo No Asignado</Table.Cell>
            </Table.Row>
            <Table.Row className="list-teacher-schedule__status-available">
              <Table.Cell textAlign="center">17:45</Table.Cell>
              <Table.Cell> {Periodo06} </Table.Cell>
              <Table.Cell> {Periodo14}</Table.Cell>
              <Table.Cell> {Periodo22}</Table.Cell>
              <Table.Cell> {Periodo30}</Table.Cell>
              <Table.Cell> {Periodo38}</Table.Cell>
              <Table.Cell> Periodo No Asignado</Table.Cell>
            </Table.Row>
            <Table.Row className="list-teacher-schedule__status-available">
              <Table.Cell textAlign="center">18:30</Table.Cell>
              <Table.Cell> {Periodo07} </Table.Cell>
              <Table.Cell> {Periodo15}</Table.Cell>
              <Table.Cell> {Periodo23}</Table.Cell>
              <Table.Cell> {Periodo31}</Table.Cell>
              <Table.Cell> {Periodo39}</Table.Cell>
              <Table.Cell> Periodo No Asignado</Table.Cell>
            </Table.Row>
            <Table.Row className="list-teacher-schedule__status-available">
              <Table.Cell textAlign="center">19:15</Table.Cell>
              <Table.Cell> Periodo No Asignado </Table.Cell>
              <Table.Cell> Periodo No Asignado</Table.Cell>
              <Table.Cell> Periodo No Asignado</Table.Cell>
              <Table.Cell> Periodo No Asignado</Table.Cell>
              <Table.Cell> Periodo No Asignado</Table.Cell>
              <Table.Cell> Periodo No Asignado</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
