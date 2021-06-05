import React, { useState, useEffect } from "react";
import _ from "lodash";
import {
  Button,
  Icon,
  Table,
  Modal,
  Message,
  Dropdown,
} from "semantic-ui-react";
import "./SchedulesManagement.scss";
import "./sty.css";
import { map } from "lodash";
import firebase from "../../utils/firebase";
import { AddMaterial } from "../../components/AddMaterial/AddMaterial";
import { removeArrayDuplicatesObjectOrderByValue } from "../../utils/arrayFunctions";
import { toast, Zoom } from "react-toastify";
const db = firebase.firestore(firebase);
export default function SchedulesManagement() {
  const options = [
    { key: "m01", text: "Matematica(Lic. Martines)", value: "matematica" },
    { key: "m02", text: "Literatura(Lic. Lopes)", value: "lenguaje" },
    { key: "m03", text: "Biologia(Lic. Calderon)", value: "biologia" },
    { key: "m04", text: "Fisica(Lic. Dias)", value: "fisica" },
    { key: "m05", text: "Quimica(Lic. Romero)", value: "quimica" },
    { key: "m06", text: "Edc.Musica(Lic. Lomas)", value: "musica" },
    { key: "m07", text: "Historia(Lic. Nuñes)", value: "historia" },
    { key: "m08", text: "Edc.Fisica(Lic. Padilla)", value: "ede. Fisica" },
    { key: "m09", text: "Geografia(Lic. Peres)", value: "geografia" },
    { key: "m10", text: "Ingles(Lic. Calle)", value: "ingles" },
    { key: "m11", text: "Quitar", value: "" },
    {
      key: "m12",
      text: "Art.Plasticas(Lic Martines)",
      value: "art. Plasticas",
    },
  ];
  const academic_level = [
    { key: "1", value: "Primaria", text: "Primaria" },
    { key: "2", value: "Secundaria", text: "Secundaria" },
  ];
  const [open, setOpen] = React.useState(false);
  const [persons, setPersons] = useState([]);
  const [onChangeInfo, setOnChangeInfo] = useState(false);
  const [gradeList, setGradeList] = useState([]);
  useEffect(() => {
    db.collection("school_material")
      .orderBy("id_matter", "asc")
      .get()
      .then((response) => {
        const personsArrayAux = [];
        map(response.docs, (student) => {
          const studentAux = student.data();
          personsArrayAux.push(studentAux);
        });
        setPersons(personsArrayAux);
      })
      .finally(() => {
        setOnChangeInfo(false);
      });
  }, [onChangeInfo]);
  /*Consuta para llenar drop*/
  const onSelectLevelAcademic = (academicLevel) => {
    if (academicLevel) {
      db.collection("classRooms")
        .where("educationLevel", "==", academicLevel)
        .get()
        .then((response) => {
          const arrayClassRooms = [];
          map(response.docs, (classRoom, index) => {
            const data = classRoom.data();
            if (data.currentState !== "No Disponible") {
              arrayClassRooms.push({
                key: index,
                value: data.grade,
                text: data.grade + " " + data.parallel + " " + academicLevel,
              });
            }
          });
          const ArrayClassRomsFilter = removeArrayDuplicatesObjectOrderByValue(
            arrayClassRooms,
            "text"
          );
          setGradeList(ArrayClassRomsFilter);
        });
    }
  };
  /*FUNCION PARA INSERTAR DATO*/
  const addMaterial_bd = (materialObjetc, id) => {
    const { id_matter, name_matter, workload } = materialObjetc;
    if (id_matter && name_matter && workload) {
      console.log("con datos");
      console.log(materialObjetc);
      db.collection("school_material")
        .doc(id)
        .set({
          id_matter: id_matter,
          name_matter: name_matter,
          workload: parseInt(workload),
        })
        .then(() => {
          toast.success("Datos Guardados Correctamente", {
            transition: Zoom,
          });
          setOnChangeInfo(true);
        });
    } else {
      console.log("sin datos");
      console.log(materialObjetc);
    }
  };
  //Para eliminar
  const onDelete_db = (id) => {
    if (window.confirm("Estas Seguro de querer eliminar esta materia ????")) {
      db.collection("school_material")
        .where("id_matter", "==", id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs[0].ref.delete();
          setOnChangeInfo(true);
        });
      toast.error("Materia Eliminada Correctamente", {
        transition: Zoom,
      });
    }
  };
  return (
    <>
      <div className="fondo-pag">
        <div className="message">
          <Message className="fond-message">
            <Message.Header>
              <center>
                <h3>Asignar Horario - Unidad Educativa Ave Maria</h3>
              </center>
            </Message.Header>
          </Message>
        </div>
        <div className="button-managements2">
          <Button color="orange">
            <Icon name="cogs" />
            Agregar Horario
          </Button>
          <Button negative>
            <Icon name="delete" />
            Cancelar Horario
          </Button>
          <Button
            positive
            onClick={() => {
              setOpen(true);
            }}
          >
            <Icon name="question circle" /> Materias
          </Button>
        </div>
        <div className="class-dropdown">
          <Dropdown
            className="select-schedule2"
            placeholder="Cursos"
            fluid
            search
            selection
            options={gradeList}
          />
          <Dropdown
            className="select-schedule"
            placeholder="Nivel Academico"
            fluid
            search
            selection
            options={academic_level}
            onChange={(e, data) => {
              onSelectLevelAcademic(data.value);
            }}
          />
        </div>
        <div className="table-schedule">
          <Table celled inverted selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Hrs</Table.HeaderCell>
                <Table.HeaderCell>Lunes</Table.HeaderCell>
                <Table.HeaderCell>Martes</Table.HeaderCell>
                <Table.HeaderCell>Miercoles</Table.HeaderCell>
                <Table.HeaderCell>Jueves</Table.HeaderCell>
                <Table.HeaderCell>Viernes</Table.HeaderCell>
                <Table.HeaderCell>Sabado</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="center">14:00</Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>

            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="center">14:45</Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>

            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="center">15:30</Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>

            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="center">16:15</Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>

            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="center">17:00</Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>

            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="center">17:45</Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>

            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="center">18:30</Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>

            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="center">19:15</Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    className="material-select"
                    placeholder="Materia"
                    fluid
                    search
                    selection
                    options={options}
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          className="modal_add_material"
          //trigger={<Button>Show Modal</Button>}
        >
          <Modal.Header className="fonfo">
            Materias - U.D. Ave Maria
          </Modal.Header>
          <Modal.Content className="content-modal">
            <Modal.Description>
              <AddMaterial
                persons={persons}
                addMater={addMaterial_bd}
                onDelete={onDelete_db}
              />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions className="fono">
            <Button color="blue" onClick={() => setOpen(false)}>
              Atras
            </Button>
          </Modal.Actions>
        </Modal>
        <br></br>
      </div>
    </>
  );
}
