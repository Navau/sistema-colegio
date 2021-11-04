import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast, Zoom } from "react-toastify";
<<<<<<< HEAD
import {
  Form,
  Label,
  Dropdown,
  Button,
  Input,
  Icon,
  Modal,
  Header,
} from "semantic-ui-react";
import firebase from "../../utils/firebase";
import "./MemorandumComp.scss";

const db = firebase.firestore(firebase);

const typesMmemos = [
  { key: "1", text: "Felicitacion", value: "Felicitacion" },
  { key: "2", text: "Asenso", value: "Asenso" },
  { key: "3", text: "Recordatorio", value: "Recordatorio" },
  { key: "4", text: "Despido", value: "Despido" },
  { key: "5", text: "Llamada de Atencion", value: "Llamada de Atencion" },
  { key: "6", text: "Cambio de Turno", value: "Cambio de Turno" },
  { key: "7", text: "Quitar", value: "" },
];

export const MemorandumComp = (props) => {
  const fecha = new Date();
  const dateH = moment(fecha).format("YYYY-MM-DD");
  const [open, setOpen] = React.useState(false);
  const [TipoMemo, setTipoMemo] = useState("");
  const [Materia, setMateria] = useState("");
  const initialValuesMemorandum = {
    id_teacher: "",
    description: "",
=======
import { Form, Label, Table, Button, Input, Icon } from "semantic-ui-react";
import firebase from "../../utils/firebase";
import "./style-MemorandumCom.css";
const db = firebase.firestore(firebase);

export const MemorandumComp = (props) => {
  const fecha = new Date();
  const dateH = moment(fecha).format("YYYY-MM-DD");
  const initialValuesMemorandum = {
    id_teacher: "",
    description: "",
    type_memorandum: "",
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
    date_assigned: "",
  };
  const [dataMemorandum, setDataMemorandum] = useState(initialValuesMemorandum);
  const [dataTeacher, setDataTeacher] = useState([]);
<<<<<<< HEAD
  const [dataMaterial, setdataMaterial] = useState([]);
=======
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
  //const [dataClass, setDataClass] = useState([]);
  const { AddorEdit, updateId } = props;
  /**LLENAR DATOS A UN OBJETO */
  const handleDataMemorandum = (e) => {
    const { name, value } = e.target;
    setDataMemorandum({ ...dataMemorandum, [name]: value });
  };
  /**EVENTO PARA MANDAR DATOS */
  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    setOpen(false);
    const dataNew = { ...dataMemorandum, type_memorandum: TipoMemo };
    AddorEdit(dataNew);
    //console.log(dataNew);
    setDataMemorandum({ ...initialValuesMemorandum });
  };
=======
    AddorEdit(dataMemorandum);
    setDataMemorandum({ ...initialValuesMemorandum });
  };
  /*const consultaClass = () => {
    db.collection("classRooms")
      .doc(dataTeacher.classRoomId)
      .get()
      .then((response) => {
        setDataClass(response.data());
      });
  };*/
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
  /**capturar datos ESTUDIANTE */
  const handleSubmitEst = (e) => {
    e.preventDefault();
    if (dataMemorandum.id_teacher) {
      db.collection("teachers")
        .doc(dataMemorandum.id_teacher)
        .get()
        .then((response) => {
          if (response.data()) {
            setDataTeacher({ ...response.data(), id: response.id });
          } else {
            toast.error("Usuario No encontrado", {
              transition: Zoom,
            });
          }
        });
<<<<<<< HEAD
      if (dataTeacher) {
        db.collection("school_material")
          .doc(dataTeacher.subjectId)
          .get()
          .then((res) => {
            setdataMaterial(res.data());
          });
        if (dataMaterial) {
          const bbbb =
            dataMaterial.name_matter == undefined
              ? "N"
              : dataMaterial.name_matter;
          setMateria(bbbb);
        }
      }
=======
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
    } else {
      toast.error("Usuario No encontrado", {
        transition: Zoom,
      });
      setDataMemorandum({ ...initialValuesMemorandum });
    }
  };
  /**MODIFCAR CAPTURA EL ID  */
  const getLicenceId = (id) => {
    db.collection("memorandum")
      .doc(id)
      .get()
      .then((response) => {
        setDataMemorandum({ ...response.data() });
      });
  };
  /**CAMBIA EL ESTADO PARA MODIFICAR O AGREGAR */
  useEffect(() => {
    if (updateId === "") {
      setDataMemorandum({ ...initialValuesMemorandum });
    } else {
      getLicenceId(updateId);
    }
  }, [updateId]);
<<<<<<< HEAD

  /*handleSubmit no te olvides es el que agrega todo*/
=======
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
  return (
    <>
      <Form className="form-memorandum-secre">
        <Form.Group widths="equal">
          <Form.Field>
            <label className="label-memorandum">C.I. Profesor</label>
            <Input
              type="text"
              placeholder="C.I. Profesor"
              value={dataMemorandum.id_teacher}
              onChange={handleDataMemorandum}
              name="id_teacher"
            >
              <input />
              <Button
                type="submit"
                icon="search"
                onClick={handleSubmitEst}
              ></Button>
            </Input>
          </Form.Field>
          <Form.Field>
            <label className="label-memorandum">Tipo Memorandums</label>
<<<<<<< HEAD
            <Dropdown
              placeholder="Tipo Memorandum"
              fluid
              selection
              options={typesMmemos}
              onChange={(e, data) => {
                setTipoMemo(data.value);
              }}
=======
            <Form.Input
              fluid
              placeholder="Tipo Memorandums"
              name="type_memorandum"
              value={dataMemorandum.type_memorandum}
              onChange={handleDataMemorandum}
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label className="label-memorandum">Fecha Memorandum</label>
            <Form.Input
              fluid
              type="date"
              min={dateH}
              value={dataMemorandum.date_assigned}
              name="date_assigned"
              onChange={handleDataMemorandum}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label className="label-memorandum">Razon</label>
          <Form.TextArea
            placeholder="Escriba....."
            name="description"
            value={dataMemorandum.description}
            onChange={handleDataMemorandum}
          />
        </Form.Field>
        <Button.Group>
<<<<<<< HEAD
          <Button
            positive
            onClick={() => {
              setOpen(true);
            }}
          >
=======
          <Button positive onClick={handleSubmit}>
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
            {updateId === "" ? "Conceder Memorandum" : "Actualizar Memorandum"}
          </Button>
        </Button.Group>
      </Form>
      <Label.Group size="large" className="info-teacher-memorandum">
<<<<<<< HEAD
        <h2 className="titulo-info-estuden-h2">Datos Profesor</h2>
=======
        <h2>Datos Profesor</h2>
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
        <Label className="label-memorandum-info">C.I.</Label>
        <Label className="label-memorandum-info2">
          {dataTeacher.id == undefined ? "No" : dataTeacher.id}
        </Label>
        <br></br>
        <Label className="label-memorandum-info">Nombre</Label>
        <Label className="label-memorandum-info2">
          {dataTeacher.firstName == undefined
            ? "No"
            : dataTeacher.firstName + " " + dataTeacher.secondName == undefined
            ? "No"
            : dataTeacher.firstName + " " + dataTeacher.secondName}
        </Label>
        <br></br>
        <Label className="label-memorandum-info">Apellidos</Label>
        <Label className="label-memorandum-info2">
          {dataTeacher.fatherLastName == undefined
            ? "No"
            : dataTeacher.fatherLastName + " " + dataTeacher.motherLastName ==
              undefined
            ? "No"
            : dataTeacher.fatherLastName + " " + dataTeacher.motherLastName}
        </Label>
        <br></br>
        <Label className="label-memorandum-info">Celular</Label>
        <Label className="label-memorandum-info2">
          {dataTeacher.personalPhone == undefined
            ? "No"
            : dataTeacher.personalPhone}
        </Label>
        <br></br>
        <Label className="label-memorandum-info">Materia</Label>
<<<<<<< HEAD
        <Label className="label-memorandum-info2">
          {Materia == "" ? "No" : Materia}
        </Label>
      </Label.Group>
      <div>
        <Modal
          basic
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          size="small"
        >
          <Header icon>
            <Icon name="hourglass four" />
            <h1>Unidad Educativa Ave Maria</h1>
          </Header>
          <Modal.Content>
            <h3>
              Esta seguro que usted quiere realizar esta operacion recuerde que
              puede haber errores revise los datos una vez mas.
            </h3>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color="red" inverted onClick={() => setOpen(false)}>
              <Icon name="remove" /> No
            </Button>
            <Button color="green" inverted onClick={handleSubmit}>
              <Icon name="checkmark" /> Si
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
=======
        <Label className="label-memorandum-info2">asf</Label>
      </Label.Group>
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
    </>
  );
};
