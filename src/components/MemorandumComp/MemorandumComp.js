import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast, Zoom } from "react-toastify";
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
    date_assigned: "",
  };
  const [dataMemorandum, setDataMemorandum] = useState(initialValuesMemorandum);
  const [dataTeacher, setDataTeacher] = useState([]);
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
            <Form.Input
              fluid
              placeholder="Tipo Memorandums"
              name="type_memorandum"
              value={dataMemorandum.type_memorandum}
              onChange={handleDataMemorandum}
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
          <Button positive onClick={handleSubmit}>
            {updateId === "" ? "Conceder Memorandum" : "Actualizar Memorandum"}
          </Button>
        </Button.Group>
      </Form>
      <Label.Group size="large" className="info-teacher-memorandum">
        <h2>Datos Profesor</h2>
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
        <Label className="label-memorandum-info2">asf</Label>
      </Label.Group>
    </>
  );
};
