import { useState, useEffect } from "react";
import { map } from "lodash";
import { Icon, Input, Button, Table, Dropdown } from "semantic-ui-react";
import "./styl.css";
import firebase from "../../utils/firebase";
const course_options = [
  { key: "af2", value: "af2", text: "1 Secundaria" },
  { key: "af7", value: "af7", text: "3 Secundaria" },
  { key: "af8", value: "af8", text: "5 Secundaria" },
];
const db = firebase.firestore(firebase);
export const UpRatings = () => {
  const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [trimestre, setTrimestre] = useState([]);
  useEffect(() => {
    db.collection("trimesters")
      .get()
      .then((response) => {
        const trimestreAux = [];
        map(response.docs, (trimestre, index) => {
          const data = trimestre.data();
          trimestreAux.push({
            key: index,
            value: data.numberTrimester,
            text: data.numberTrimester + "Trimestre",
          });
        });
        setTrimestre(trimestreAux);
      });
  }, []);
  return (
    <>
      <div className="options-calification-class">
        <Dropdown
          className="list-drop"
          placeholder="Seleccione Grado"
          fluid
          search
          selection
          options={course_options}
        />
        <Dropdown
          className="list-drop3"
          placeholder="Seleccione Trimestre"
          fluid
          search
          selection
          options={trimestre}
        />
        <div className="button-calification">
          <Button positive>
            <Icon name="circle" />
            Subir Calificaciones
          </Button>
          <Button negative>
            <Icon name="cancel" />
            Cancelar Calificaciones
          </Button>
        </div>
      </div>
      <div className="table-calification-student">
        <Table
          inverted
          celled
          selectable
          padded
          striped
          className="tabla-notas"
        >
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell>NombreApellido.</Table.HeaderCell>
              <Table.HeaderCell>Asistencia</Table.HeaderCell>
              <Table.HeaderCell>Practicas</Table.HeaderCell>
              <Table.HeaderCell>Examen</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {num.map(() => (
              <RenderStudent />
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

function RenderStudent() {
  return (
    <Table.Row textAlign="center" className="lista-notas">
      <Table.Cell>Student 1</Table.Cell>
      <Table.Cell>
        <Input className="input-calification"></Input>/100
      </Table.Cell>
      <Table.Cell>
        <Input className="input-calification"></Input>/100
      </Table.Cell>
      <Table.Cell>
        <Input className="input-calification"></Input>/100
      </Table.Cell>
    </Table.Row>
  );
}
