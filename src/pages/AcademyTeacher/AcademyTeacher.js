import React from "react";
import { Divider, Header, Dropdown, Message } from "semantic-ui-react";
import { AsigmentMaterial } from "../../components/AsigmentMaterial/AsigmentMaterial";
import { TableCpurseParallel } from "../../components/TableCourseParallel/TableCpurseParallel";
import { TeacherSchedule } from "../../components/TeacherSchedule/TeacherSchedule";
import "../QualificationManagement/styl.css";
import "./style.css";

const options = [
  { key: "m01", text: "1 A", value: "1 A" },
  { key: "m02", text: "3 B", value: "3 B" },
  { key: "m03", text: "5 E", value: "5 E" },
];

export const AcademyTeacher = () => {
  return (
    <>
      <div className="message">
        <Message className="fond-message">
          <Message.Header>
            <center>
              <h3>Academia - Unidad Educativa Ave Maria</h3>
            </center>
          </Message.Header>
        </Message>
      </div>
      <Header as="h2" textAlign={"center"} color="orange">
        Cursos - Paralelos
      </Header>
      <div className="TableCpurseParallel">
        <TableCpurseParallel />
      </div>

      <Divider section />

      <Header as="h2" textAlign={"center"} color="orange">
        Materias Asignadas
      </Header>
      <div className="AsigmentMaterial">
        <AsigmentMaterial />
      </div>

      <Divider section />

      <Header as="h2" textAlign={"center"} color="orange">
        Horario Asignado
      </Header>

      <div className="TeacherSchedule">
        <Dropdown
          className="material-select-academy"
          placeholder="Materia"
          fluid
          search
          selection
          options={options}
        />
        <TeacherSchedule />
      </div>
    </>
  );
};
