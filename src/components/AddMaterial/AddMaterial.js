import { map } from "lodash";
import React, { useEffect, useState } from "react";
import { Form, Message, Button, Input, Table } from "semantic-ui-react";
import firebase from "../../utils/firebase";

import "./style-addMaterial.css";
const db = firebase.firestore(firebase);
export const AddMaterial = (props) => {
  const { persons, addMater, onDelete } = props;
  //Capturar Informacion de Inputs
  const initialStateValues = {
    id_matter: "",
    name_matter: "",
    workload: "",
  };
  const [values, setValues] = useState(initialStateValues);
  const [idDocument, setIdDocument] = useState(null);
  //const [state, setstate] = useState(initialState)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addMater(values, idDocument);
    setValues({ ...initialStateValues });
  };

  const getById = (id) => {
    db.collection("school_material")
      .where("id_matter", "==", id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setValues({ ...doc.data() });
        });
        //console.log(querySnapshot.docs[0].id);
        setIdDocument(querySnapshot.docs[0].id);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
  const ExtraccionData = (id) => {
    //console.log(id);
    if (id === "") {
      setValues({ ...initialStateValues });
    } else {
      getById(id);
    }
  };

  return (
    <>
      <Form>
        <div className="div-id_curso">
          <label className="modal-titulos-add-material">I.D. Materia</label>
          <br></br>
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
          <br></br>
          <Button type="submit" color="orange" onClick={handleSubmit}>
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
              <Table.HeaderCell>CargaHoraria</Table.HeaderCell>
              <Table.HeaderCell>Opciones</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(persons, (person) => (
              <Table.Row textAlign="center" key={person.id_matter}>
                <Table.Cell>{person.id_matter}</Table.Cell>
                <Table.Cell>{person.name_matter}</Table.Cell>
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
    </>
  );
};
