import { map } from "lodash";
<<<<<<< HEAD
import React, { useState } from "react";
import {
  Form,
  Dropdown,
  Button,
  Input,
  Table,
  Modal,
  Icon,
  Header,
} from "semantic-ui-react";
=======
import React, { useEffect, useState } from "react";
import { Form, Message, Button, Input, Table } from "semantic-ui-react";
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
import firebase from "../../utils/firebase";

import "./style-addMaterial.css";
const db = firebase.firestore(firebase);
export const AddMaterial = (props) => {
<<<<<<< HEAD
  const academic_level = [
    { key: "1", value: "Primaria", text: "Primaria" },
    { key: "2", value: "Secundaria", text: "Secundaria" },
  ];
=======
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
  const { persons, addMater, onDelete } = props;
  //Capturar Informacion de Inputs
  const initialStateValues = {
    id_matter: "",
    name_matter: "",
    workload: "",
  };
  const [values, setValues] = useState(initialStateValues);
<<<<<<< HEAD
  const [open2, setOpen2] = useState(false);
  const [idDocument, setIdDocument] = useState(null);
  const [acdeValue, setAcdeValue] = useState("");
=======
  const [idDocument, setIdDocument] = useState(null);
  //const [state, setstate] = useState(initialState)
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    setOpen2(false);
    addMater(values, idDocument, acdeValue);
    setValues({ ...initialStateValues });
    setIdDocument("");
=======
    addMater(values, idDocument);
    setValues({ ...initialStateValues });
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
  };

  const getById = (id) => {
    db.collection("school_material")
      .where("id_matter", "==", id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
<<<<<<< HEAD
          setValues({ ...doc.data() });
        });
=======
          // doc.data() is never undefined for query doc snapshots
          setValues({ ...doc.data() });
        });
        //console.log(querySnapshot.docs[0].id);
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
        setIdDocument(querySnapshot.docs[0].id);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
  const ExtraccionData = (id) => {
<<<<<<< HEAD
=======
    //console.log(id);
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
    if (id === "") {
      setValues({ ...initialStateValues });
    } else {
      getById(id);
    }
  };
<<<<<<< HEAD
  return (
    <>
      <Form className="add-subject-form">
        <div className="div-id_curso">
          <Dropdown
            placeholder="Nivel Academico"
            fluid
            selection
            options={academic_level}
            onChange={(e, data) => {
              setAcdeValue(data.value);
            }}
          />
          <br></br>
          <label className="modal-titulos-add-material">I.D. Materia</label>
=======

  return (
    <>
      <Form>
        <div className="div-id_curso">
          <label className="modal-titulos-add-material">I.D. Materia</label>
          <br></br>
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
          <Input
            placeholder="I.D. Materia"
            name="id_matter"
            fluid={true}
            onChange={handleInputChange}
            value={values.id_matter}
          />
          <br></br>
          <label className="modal-titulos-add-material">Materia</label>
          <br></br>
          <Input
            placeholder="Materia"
            name="name_matter"
            fluid={true}
            onChange={handleInputChange}
            value={values.name_matter}
          />
          <br></br>
          <label className="modal-titulos-add-material">Carga Horaria</label>
          <br></br>
          <Input
            placeholder="Carga Horaria"
            name="workload"
            fluid={true}
            onChange={handleInputChange}
            value={values.workload}
          />
<<<<<<< HEAD
          <p></p>
          <Button type="submit" color="orange" onClick={() => setOpen2(true)}>
=======
          <br></br>
          <Button type="submit" color="orange" onClick={handleSubmit}>
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
            Guardar
          </Button>
        </div>
      </Form>
      <div className="tabla-materias">
        <Table inverted celled selectable padded striped>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell>I.D.</Table.HeaderCell>
              <Table.HeaderCell>Materia</Table.HeaderCell>
<<<<<<< HEAD
              <Table.HeaderCell>Nivel Academico</Table.HeaderCell>
=======
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
              <Table.HeaderCell>CargaHoraria</Table.HeaderCell>
              <Table.HeaderCell>Opciones</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(persons, (person) => (
              <Table.Row textAlign="center" key={person.id_matter}>
                <Table.Cell>{person.id_matter}</Table.Cell>
                <Table.Cell>{person.name_matter}</Table.Cell>
<<<<<<< HEAD
                <Table.Cell>{person.educationLevel}</Table.Cell>
=======
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
                <Table.Cell>{person.workload}</Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <Button
                      color={"orange"}
                      onClick={() => ExtraccionData(person.id_matter)}
                    >
                      Modificar
                    </Button>
                    <Button.Or text="O" />
                    <Button negative onClick={() => onDelete(person.id_matter)}>
                      Eliminar
                    </Button>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
<<<<<<< HEAD
      <Modal
        basic
        onClose={() => setOpen2(false)}
        onOpen={() => setOpen2(true)}
        open={open2}
        size="small"
      >
        <Header icon>
          <Icon name="trash alternate outline" />
          <h1>Unidad Educativa Ave Maria</h1>
        </Header>
        <Modal.Content>
          <h3>
            Esta seguro que usted quiere ralizar este accion recuerde que puede
            haber errores revise una ves mas.
          </h3>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={() => setOpen2(false)}>
            <Icon name="remove" /> No
          </Button>
          <Button color="green" inverted onClick={handleSubmit}>
            <Icon name="checkmark" /> Si
          </Button>
        </Modal.Actions>
      </Modal>
=======
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
    </>
  );
};
