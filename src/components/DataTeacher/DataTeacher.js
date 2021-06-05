import { React, useState, useEffect } from "react";
import {
  Button,
  Card,
  Image,
  Segment,
  Header,
  SegmentGroup,
  Icon,
  Modal,
  Input,
} from "semantic-ui-react";
import DefaultUserImage from "../../assets/img/student.png";

import { map } from "lodash";
import "./styl.css";
import firebase from "../../utils/firebase";

const db = firebase.firestore(firebase);

export default function DataTeacher(props) {
  const { user, accountValue } = props;
  const [open, setOpen] = useState(false);
  console.log(user);
  console.log(accountValue);
  return (
    <>
      <div className="card-teacher">
        <Card>
          <Image
            className="card-perfil-teacher"
            src={DefaultUserImage}
            wrapped
            ui={false}
          />
          <Card.Header textAlign={"center"} className="hed">
            <p>
              Lic.{" "}
              {user.firstName +
                " " +
                user.secondName +
                " " +
                user.fatherLastName +
                " " +
                user.motherLastName}
            </p>
          </Card.Header>
          <Card.Meta textAlign={"center"} className="hed">
            U.E Ave Maria
          </Card.Meta>
        </Card>
      </div>
      <div className="content-form-data-user">
        <Header as="h5" attached="top">
          Nombre
        </Header>
        <Segment attached>{user.firstName + " " + user.secondName}</Segment>
        <Header as="h5" attached>
          Apellidos
        </Header>
        <Segment attached>
          {user.fatherLastName + " " + user.motherLastName}
        </Segment>
        <Header as="h5" attached>
          Usuario
        </Header>
        <Segment attached>{accountValue}</Segment>
      </div>
      <div className="content-form-data-user2">
        <SegmentGroup>
          <Header as="h5" attached>
            Pais - Departamento
          </Header>
          <Segment attached>
            {user.country + " - - " + user.departament}
          </Segment>
          <Header as="h5" attached>
            Celular
          </Header>
          <Segment attached>
            {accountValue == "Profesor" ? user.personalPhone : user.cellphone}
          </Segment>
        </SegmentGroup>
      </div>
      <Modal
        className="modal-modf-cell-perfil"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button positive className="boton-mof-cell-perfil">
            <Icon name="circle" />
            Modificar Celular
          </Button>
        }
      >
        <Modal.Header>Unidad Educativa Ave Maria</Modal.Header>
        <Modal.Content className="fondo-mof-cel-perfil">
          <Modal.Description>
            <Header>Modifique su Celular</Header>
            <Input placeholder="Celular" />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            content="Cambiar Celular"
            labelPosition="right"
            icon="checkmark"
            onClick={() => setOpen(false)}
            positive
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}
