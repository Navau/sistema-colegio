import React, { useState, useEffect } from "react";
import {
  Divider,
  Header,
  Grid,
  Label,
  Icon,
  Table,
  Button,
} from "semantic-ui-react";
import { Image } from "antd";

import "./StudentAcademyInfo.scss";
import { map, size } from "lodash";

import firebase from "../../../../utils/firebase";

import "firebase/storage";
import "firebase/firestore";

const db = firebase.firestore(firebase);

export default function StudentAcademyInfo(props) {
  const { classRoomInfo, subjects, qualifications } = props;
  const [qualificationSubject, setQualificationSubject] = useState(null);

  if (!classRoomInfo || !subjects) {
    return <h1>Cargando....</h1>;
  }

  const onSelectQualification = (idSubject) => {
    if (qualifications) {
      let qualificationSubjectAux = {};
      map(qualifications[0], (item, index) => {
        if (idSubject == index) {
          qualificationSubjectAux = item;
        }
      });
      setQualificationSubject(qualificationSubjectAux);
    }
  };

  return (
    <div className="student-academy-info">
      <Divider section />
      <Header as="h2">Información Académica del Estudiante</Header>
      <div className="student-academy-info__info">
        <Grid relaxed stretched>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <RenderClassRoom classRoomInfo={classRoomInfo} />
            </Grid.Column>

            <Grid.Column mobile={16} tablet={8} computer={8}>
              <RenderQualification
                qualificationSubject={qualificationSubject}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column
              mobile={16}
              tablet={16}
              computer={16}
              stretched
              className="render-subjects"
            >
              <RenderSubjects
                classRoomInfo={classRoomInfo}
                subjects={subjects}
                onSelectQualification={onSelectQualification}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
}

function RenderClassRoom(props) {
  const { classRoomInfo } = props;

  return (
    <div className="classroom">
      <Header as="h2">Curso del Estudiante</Header>
      <div>
        <Label as="a">
          <Icon name="users" />
          Curso
        </Label>
        <Label>
          {classRoomInfo.grade}º '{classRoomInfo.parallel}'
        </Label>
      </div>
      <div>
        <Label as="a">
          <Icon name="student" />
          Nivel de Educación
        </Label>
        <Label>{classRoomInfo.educationLevel}</Label>
      </div>
    </div>
  );
}

function RenderSubjects(props) {
  const { classRoomInfo, subjects, onSelectQualification } = props;

  return (
    <div className="subjects">
      <Header as="h2">Materias</Header>
      <div className="table">
        <Table
          inverted
          selectable
          size="large"
          className="list-subjects"
          celled
        >
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell>Nombre de la Materia</Table.HeaderCell>
              <Table.HeaderCell>Nota</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {map(subjects, (item, index) => (
            <Table.Body key={index}>
              <Table.Row textAlign="center">
                <Table.Cell>{item.name_matter}</Table.Cell>
                <Table.Cell>
                  <Table.Cell collapsing>
                    <Button
                      inverted
                      color="blue"
                      onClick={() => onSelectQualification(item.id_matter)}
                    >
                      Ver Nota
                    </Button>
                  </Table.Cell>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      </div>
    </div>
  );
}

function RenderQualification(props) {
  const { qualificationSubject } = props;
  const [qualifications, setQualifications] = useState({});

  useEffect(() => {
    let objectAux = {};
    map(qualificationSubject, (item, index) => {
      objectAux[index] = item;
    });
    setQualifications(objectAux);
  }, [qualificationSubject]);

  if (
    !qualifications.qualification1 ||
    !qualifications.qualification2 ||
    !qualifications.qualification3
  ) {
    return (
      <div className="qualifications">
        <Header as="h2">Calificación</Header>
        <h1>Sin datos</h1>
      </div>
    );
  }

  return (
    <div className="qualifications">
      <Header as="h2">Calificación</Header>
      <Grid relaxed>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <div>
              <Label as="a">
                <Icon name="clipboard list" />
                1º Nota
              </Label>
              <Label>{qualifications?.qualification1}</Label>
            </div>
            <div>
              <Label as="a">
                <Icon name="clipboard list" />
                2º Nota
              </Label>
              <Label>{qualifications?.qualification2}</Label>
            </div>
            <div>
              <Label as="a">
                <Icon name="clipboard list" />
                3º Nota
              </Label>
              <Label>{qualifications?.qualification3}</Label>
            </div>
            <div>
              <Label as="a">
                <Icon name="clipboard list" />
                Promedio
              </Label>
              <Label>
                {(
                  (parseInt(qualifications?.qualification1) +
                    parseInt(qualifications?.qualification2) +
                    parseInt(qualifications?.qualification3)) /
                  3
                ).toFixed(2)}
              </Label>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
