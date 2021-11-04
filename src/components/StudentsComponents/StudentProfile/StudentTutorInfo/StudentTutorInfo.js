import React from "react";
import { Divider, Header, Grid, Label, Icon } from "semantic-ui-react";
import moment from "moment";
import "moment/locale/es";
import { Image } from "antd";

import "./StudentTutorInfo.scss";

export default function StudentTutorInfo(props) {
  const { tutorInfo } = props;

  const dateBirthFormat = (date) => {
    const dateMiliseconds = date * 1000;
    const dateResult = new Date(dateMiliseconds);
    return moment(dateResult).format("D [de] MMMM [de] YYYY");
  };

  if (!tutorInfo) {
    return <h1>CARGANDO....</h1>;
  }

  return (
    <div className="student-tutor-info">
      <Divider section />
      <Header as="h2">Información del Tutor</Header>
      <div className="student-info__labels">
        <Grid relaxed>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="address card" />
                  C.I.
                </Label>
                <Label>{tutorInfo.id}</Label>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="calendar alternate" />
                  Edad
                </Label>
                <Label>{tutorInfo.age} años</Label>
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
                <Label>{tutorInfo.names}</Label>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="user" />
                  Apellidos
                </Label>
                <Label>{tutorInfo.lastNames}</Label>
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
                <Label>{tutorInfo.personalPhone}</Label>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="phone" />
                  Teléfono
                </Label>
                <Label>{tutorInfo.landPhone}</Label>
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
                <Label>{dateBirthFormat(tutorInfo?.dateBirth?.seconds)}</Label>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="briefcase" />
                  Ocupación
                </Label>
                <Label>{tutorInfo.job}</Label>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid relaxed>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="user secret" />
                  Rol
                </Label>
                <Label>{tutorInfo.role}</Label>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="at" />
                  Correo Electrónico
                </Label>
                <Label>{tutorInfo.email}</Label>
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
                  País
                </Label>
                <Label>{tutorInfo.country}</Label>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Label as="a">
                  <Icon name="font awesome flag" />
                  Departamento
                </Label>
                <Label>{tutorInfo.departament}</Label>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid relaxed>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={16}>
              <div>
                <Label as="a">
                  <Icon name="map marker alternate" />
                  Direccion
                </Label>
                <Label>{tutorInfo.address}</Label>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
}
