<<<<<<< HEAD
import { React, useState } from "react";
=======
import { React, useState, useEffect } from "react";
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
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
<<<<<<< HEAD
import { toast, Zoom } from "react-toastify";
import DefaultUserImage from "../../assets/img/student.png";
import "./DataTeacher.scss";
=======
import DefaultUserImage from "../../assets/img/student.png";

import { map } from "lodash";
import "./styl.css";
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
import firebase from "../../utils/firebase";

const db = firebase.firestore(firebase);

export default function DataTeacher(props) {
<<<<<<< HEAD
  const [newCell, setnewCell] = useState("");
  const { user, accountValue } = props;
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  console.log(accountValue.typeUser);

  const onSubmitChangeCellPhone = (e) => {
    setOpen2(false);
    setOpen(false);
    if (accountValue.typeUser == "Profesor") {
      db.collection("teachers")
        .doc(user.accountId)
        .update({
          personalPhone: newCell,
        })
        .then(() => {
          toast.update("Celular Modificado Correctamente", {
            transition: Zoom,
          });
          window.location.reload();
        });
    } else if (
      accountValue.typeUser == "Secretario" ||
      accountValue.typeUser == "Director"
    ) {
      console.log("TEST");
      db.collection("admins")
        .doc(user.accountId)
        .update({
          cellphone: newCell,
        })
        .then(() => {
          toast.update("Celular Modificado Correctamente", {
            transition: Zoom,
          });
          window.location.reload();
        });
    }
  };
  const handleInputChange = (e) => {
    const { value } = e.target;
    setnewCell(value);
  };

  return (
    <>
      <div className="data">
        <div className="card">
          <Card>
            <Image
              className="card-perfil"
              src={DefaultUserImage}
              wrapped
              ui={false}
            />
            <Card.Header textAlign={"center"} className="card-header">
              <div>
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
              </div>
            </Card.Header>
            <Card.Meta textAlign={"center"} className="card-meta">
              <h5>U.E Ave Maria</h5>
            </Card.Meta>
          </Card>
        </div>
        <div className="content-form-data-user">
          <Header as="h5" attached="top">
            Nombre
          </Header>
          <Segment attached content>
            {user.firstName + " " + user.secondName}
          </Segment>
          <Header as="h5" attached>
            Apellidos
          </Header>
          <Segment attached>
            {user.fatherLastName + " " + user.motherLastName}
          </Segment>
          <Header as="h5" attached>
            Usuario
          </Header>
          <Segment attached>{accountValue.typeUser}</Segment>
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
              {accountValue.typeUser == "Profesor"
                ? user.personalPhone
                : user.cellphone}
            </Segment>
          </SegmentGroup>
        </div>
      </div>
      <div className="change-phone">
        <Modal
          size="mini"
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
          <Modal.Header className="cabeza-modal">
            Unidad Educativa Ave Maria
          </Modal.Header>
          <Modal.Content className="fondo-mof-cel-perfil">
            <Modal.Description>
              <Header className="titulo-modal-mod-cel">
                <h2>Modifique su Celular</h2>
              </Header>
              <Input
                placeholder="Celular"
                name="cell"
                value={newCell.cell}
                onChange={handleInputChange}
              />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions className="botoon-opti-modal">
            <Button color="black" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              content="Cambiar Celular"
              labelPosition="right"
              icon="checkmark"
              onClick={() => {
                setOpen2(true);
              }}
              positive
            />
          </Modal.Actions>
        </Modal>
        <div>
          <Modal
            basic
            onClose={() => setOpen2(false)}
            onOpen={() => setOpen2(true)}
            open={open2}
            size="small"
            className="modal-confirm"
          >
            <Header icon>
              <Icon name="hourglass four" />
              <h1>Unidad Educativa Ave Maria</h1>
            </Header>
            <Modal.Content>
              <h3>
                Esta seguro que usted quiere modificar su numero telefonico
                recuerde que puede haber errores revise los datos la licencia
                una vez mas.
              </h3>
            </Modal.Content>
            <Modal.Actions>
              <Button
                basic
                color="red"
                inverted
                onClick={() => setOpen2(false)}
              >
                <Icon name="remove" /> No
              </Button>
              <Button color="green" inverted onClick={onSubmitChangeCellPhone}>
                <Icon name="checkmark" /> Si
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      </div>
    </>
  );
}

//   return (
//     <>
//NOS QUEDAMOS AQUI
=======
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
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
