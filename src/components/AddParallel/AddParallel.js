import { map } from "lodash";
import React, { useState } from "react";
import { Form, Dropdown, Button, Input, Table } from "semantic-ui-react";
import firebase from "../../utils/firebase";

import "./style-addParallel.css";
const db = firebase.firestore(firebase);
const academic_level = [
  { key: "1", value: "Primaria", text: "Primaria" },
  { key: "2", value: "Secundaria", text: "Secundaria" },
];
export const AddParallel = (props) => {
  const { persons2 } = props;
  //Capturar Informacion de Inputs
  const initialStateValues = {
    id_matter: "",
    name_matter: "",
    workload: "",
  };
  const [values, setValues] = useState(initialStateValues);
  const [idDocument, setIdDocument] = useState(null);
  const [acdeValue, setAcdeValue] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //addMater(values, idDocument, acdeValue);
    setValues({ ...initialStateValues });
  };

  console.log(acdeValue);
  const getById = (id) => {
    db.collection("school_material")
      .where("id_matter", "==", id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setValues({ ...doc.data() });
        });
        setIdDocument(querySnapshot.docs[0].id);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
  const ExtraccionData = (id) => {
    if (id === "") {
      setValues({ ...initialStateValues });
    } else {
      getById(id);
    }
  };
  console.log(persons2);
  return (
    <>
      <Form className="add-parallel-form">
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
          <label className="modal-titulos-add-material">Curso</label>
          <br></br>
          <Input
            placeholder="Curso"
            name="name_matter"
            fluid={true}
            onChange={handleInputChange}
            value={values.name_matter}
          />
          <br></br>
          <label className="modal-titulos-add-material">Paralelo</label>
          <br></br>
          <Input
            placeholder="Paralelo"
            name="workload"
            fluid={true}
            onChange={handleInputChange}
            value={values.workload}
          />
          <p></p>
          <Button type="submit" color="orange" onClick={handleSubmit}>
            Guardar
          </Button>
        </div>
      </Form>
      <div className="tabla-materias">
        <Table inverted celled selectable padded striped>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell>Paralelo</Table.HeaderCell>
              <Table.HeaderCell>Nivel Academico</Table.HeaderCell>
              <Table.HeaderCell>Curso</Table.HeaderCell>
              <Table.HeaderCell>Opciones</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(persons2, (person) => (
              <Table.Row textAlign="center" key={person.id}>
                <Table.Cell>{person.parallel}</Table.Cell>
                <Table.Cell>{person.educationLevel}</Table.Cell>
                <Table.Cell>{person.grade}</Table.Cell>

                <Table.Cell>
                  <Button.Group>
                    <Button
                      color={"orange"}
                      onClick={() => ExtraccionData(person.id_matter)}
                    >
                      Modificar
                    </Button>
                    <Button.Or text="O" />
                    <Button negative>Eliminar</Button>
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
