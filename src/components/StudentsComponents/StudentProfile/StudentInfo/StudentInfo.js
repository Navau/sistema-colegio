import React from "react";
import { Divider, Header, Grid, Label, Icon } from "semantic-ui-react";
import moment from "moment";
import "moment/locale/es";
import { Image } from "antd";

import "./StudentInfo.scss";

export default function StudentInfo(props) {
  const { studentInfoState, photoStudent } = props;

  const dateBirthFormat = (date) => {
    const dateMiliseconds = date * 1000;
    const dateResult = new Date(dateMiliseconds);
    return moment(dateResult).format("D [de] MMMM [de] YYYY");
  };

  return (
    <div className="student-info">
      <Divider section />
      <Header as="h2">Información Personal del Estudiante</Header>
      <div className="student-info__photo-student">
        <Image.PreviewGroup>
          <Image
            alt={`${studentInfoState.firstName} ${studentInfoState.secondName}`}
            src={photoStudent}
          />
        </Image.PreviewGroup>
      </div>
      <div className="student-info__labels">
        <Grid relaxed>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="address card" />
                  C.I.
                </Label>
                <Label>{studentInfoState.id}</Label>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="calendar alternate" />
                  Edad
                </Label>
                <Label>{studentInfoState.age} años</Label>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid relaxed>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="user" />
                  Nombre
                </Label>
                <Label>
                  {studentInfoState.firstName} {studentInfoState.secondName}
                </Label>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="user" />
                  Apellidos
                </Label>
                <Label>
                  {studentInfoState.fatherLastName}{" "}
                  {studentInfoState.motherLastName}
                </Label>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid relaxed>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="mobile" />
                  Celular
                </Label>
                <Label>{studentInfoState.personalPhone}</Label>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="phone" />
                  Teléfono
                </Label>
                <Label>{studentInfoState.landPhone}</Label>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid relaxed>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="calendar alternate" />
                  Fecha de Nacimiento
                </Label>
                <Label>
                  {dateBirthFormat(studentInfoState?.dateBirth?.seconds)}
                </Label>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="venus mars" />
                  Género
                </Label>
                <Label>
                  {studentInfoState.gender == true
                    ? "Masculino"
                    : studentInfoState.gender == false
                    ? "Femenino"
                    : "Error"}
                </Label>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid relaxed>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="weight" />
                  Peso (Kg)
                </Label>
                <Label>{studentInfoState.weight}</Label>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="arrows alternate vertical" />
                  Altura (m)
                </Label>
                <Label>{studentInfoState.height}</Label>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid relaxed>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="at" />
                  Correo Electrónico
                </Label>
                <Label>{studentInfoState.email}</Label>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="font awesome flag" />
                  País
                </Label>
                <Label>{studentInfoState.country}</Label>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid relaxed>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="font awesome flag" />
                  Departamento
                </Label>
                <Label>{studentInfoState.departament}</Label>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="map marker alternate" />
                  Direccion
                </Label>
                <Label>{studentInfoState.address}</Label>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
}
