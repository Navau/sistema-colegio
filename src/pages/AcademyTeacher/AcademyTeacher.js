import React from "react";
<<<<<<< HEAD
import { Message } from "semantic-ui-react";
import { TableCpurseParallel } from "../../components/TableCourseParallel/TableCpurseParallel";
import { TeacherSchedule } from "../../components/TeacherSchedule/TeacherSchedule";
import { Tab } from "semantic-ui-react";
import "./AcademyTeacher.scss";

export default function AcademyTeacher(props) {
  const { user } = props;
  const panes = [
    {
      menuItem: { key: "men1", icon: "book", content: "Cursos Asignados" },
      render: () => (
        <Tab.Pane className="container-pestaña">
          <TableCpurseParallel user={user} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: "men2",
        icon: "clipboard outline",
        content: "Horario Asignado",
      },
      render: () => (
        <Tab.Pane className="container-pestaña">
          <TeacherSchedule user={user} />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <div className="academy">
      <div className="message">
        <Message className="fond-message">
          <Message.Header>
            <h3>Academia - Unidad Educativa Ave Maria</h3>
          </Message.Header>
        </Message>
      </div>
      <Tab panes={panes} />
    </div>
  );
}
/*
<div className="message">
        <Message className="fond-message">
          <Message.Header>
=======
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
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
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
<<<<<<< HEAD
        <TeacherSchedule />
      </div>
*/
=======
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
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
