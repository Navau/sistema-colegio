import React from "react";
import { Divider, Header, Grid, Label, Icon } from "semantic-ui-react";
import moment from "moment";
import "moment/locale/es";
import { Image } from "antd";

import "./TeacherInfo.scss";

export default function TeacherInfo(props) {
  const { teacherInfoState, photoTeacher } = props;

  const dateBirthFormat = (date) => {
    const dateMiliseconds = date * 1000;
    const dateResult = new Date(dateMiliseconds);
    return moment(dateResult).format("D [de] MMMM [de] YYYY");
  };

  return (
    <div className="teacher-info">
      <Divider section />
      <Header as="h2">Información Personal del Profesor</Header>
      <div className="teacher-info__photo-teacher">
        <Image.PreviewGroup>
          <Image
            alt={`${teacherInfoState.firstName} ${teacherInfoState.secondName}`}
            src={photoTeacher}
          />
        </Image.PreviewGroup>
      </div>
      <div className="teacher-info__labels">
        <Grid relaxed>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="address card" />
                  C.I.
                </Label>
                <Label>{teacherInfoState.id}</Label>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="calendar alternate" />
                  Edad
                </Label>
                <Label>{teacherInfoState.age} años</Label>
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
                  {teacherInfoState.firstName} {teacherInfoState.secondName}
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
                  {teacherInfoState.fatherLastName}{" "}
                  {teacherInfoState.motherLastName}
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
                <Label>{teacherInfoState.personalPhone}</Label>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="phone" />
                  Teléfono
                </Label>
                <Label>{teacherInfoState.landPhone}</Label>
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
                  {dateBirthFormat(teacherInfoState?.dateBirth?.seconds)}
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
                  {teacherInfoState.gender === true
                    ? "Masculino"
                    : teacherInfoState.gender === false
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
                <Label>{teacherInfoState.weight}</Label>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="arrows alternate vertical" />
                  Altura (m)
                </Label>
                <Label>{teacherInfoState.height}</Label>
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
                <Label>{teacherInfoState.email}</Label>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="font awesome flag" />
                  País
                </Label>
                <Label>{teacherInfoState.country}</Label>
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
                <Label>{teacherInfoState.departament}</Label>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="map marker alternate" />
                  Direccion
                </Label>
                <Label>{teacherInfoState.address}</Label>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
}
