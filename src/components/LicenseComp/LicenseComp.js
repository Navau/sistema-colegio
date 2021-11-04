import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast, Zoom } from "react-toastify";
import {
  Form,
  Label,
  Dropdown,
  Button,
  Input,
  Modal,
  Header,
  Icon,
} from "semantic-ui-react";
import firebase from "../../utils/firebase";
import "./LicenseComp.scss";
const db = firebase.firestore(firebase);

const typeLicen = [
  { key: "01", text: "Licencia Medica", value: "Licencia Medica" },
  { key: "02", text: "Licencia Familiar", value: "Licencia Familiar" },
  { key: "03", text: "Licencia Academica", value: "Licencia Academica" },
  { key: "04", text: "Quitar", value: "" },
];
export const LicenseComp = (props) => {
  const fecha = new Date();
  const dateH = moment(fecha).format("YYYY-MM-DD");
  const [open, setOpen] = React.useState(false);
  const [TipoLice, setTipoLice] = useState("");
  const [Cursoo, setCursoo] = useState("");
  const initialValuesLicences = {
    id_student: "",
    description: "",
    date_start: "",
    date_end: "",
  };
  const [dataLicences, setDataLicences] = useState(initialValuesLicences);
  const [dataEst, setDataStudent] = useState([]);
  const [DataClassRoom, setDataClassRoom] = useState([]);
  //const [dataClass, setDataClass] = useState([]);
  const { AddorEdit, updateId } = props;
  /**LLENAR DATOS A UN OBJETO */
  const handleDataLicences = (e) => {
    const { name, value } = e.target;
    setDataLicences({ ...dataLicences, [name]: value });
  };
  /**EVENTO PARA MANDAR DATOS */
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    const newLicen = { ...dataLicences, type_license: TipoLice };
    AddorEdit(newLicen);
    setDataLicences({ ...initialValuesLicences });
  };
  /**capturar datos ESTUDIANTE */
  const handleSubmitEst = (e) => {
    e.preventDefault();
    if (dataLicences.id_student) {
      db.collection("students")
        .doc(dataLicences.id_student)
        .get()
        .then((response) => {
          if (response.data()) {
            setDataStudent({ ...response.data(), id: response.id });
          } else {
            toast.error("Usuario No encontrado", {
              transition: Zoom,
            });
          }
        });
      if (dataEst) {
        db.collection("classRooms")
          .doc(dataEst.classRoomId)
          .get()
          .then((res) => {
            setDataClassRoom(res.data());
          });
        if (DataClassRoom) {
          const aaaa =
            (DataClassRoom.grade == undefined ? "N" : DataClassRoom.grade) +
            "to" +
            (DataClassRoom.parallel == undefined
              ? "N"
              : DataClassRoom.parallel) +
            " " +
            (DataClassRoom.educationLevel == undefined
              ? "N"
              : DataClassRoom.educationLevel);
          setCursoo(aaaa);
        }
        //console.log(aaaa);
      }
    } else {
      toast.error("Usuario No encontrado", {
        transition: Zoom,
      });
      setDataLicences({ ...initialValuesLicences });
    }
  };
  /**MODIFCAR CAPTURA EL ID  */
  const getLicenceId = (id) => {
    db.collection("student_license")
      .doc(id)
      .get()
      .then((response) => {
        setDataLicences({ ...response.data() });
      });
  };
  /**CAMBIA EL ESTADO PARA MODIFICAR O AGREGAR */
  useEffect(() => {
    if (updateId === "") {
      setDataLicences({ ...initialValuesLicences });
    } else {
      getLicenceId(updateId);
    }
  }, [updateId]);
  return (
    <>
      <Form className="form-licences-secre">
        <Form.Group widths="equal">
          <Form.Field>
            <label className="label-formita">C.I. Estudiante</label>
            <Input
              type="text"
              placeholder="C.I. Estudiante"
              value={dataLicences.id_student}
              onChange={handleDataLicences}
              name="id_student"
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
            <label className="label-formita">Tipo Licencia</label>
            <Dropdown
              placeholder="Tipo Licencia"
              fluid
              selection
              options={typeLicen}
              onChange={(e, data) => {
                setTipoLice(data.value);
              }}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label className="label-formita">Fecha Inicio Licencia</label>
            <Form.Input
              fluid
              type="date"
              min={dateH}
              value={dataLicences.date_start}
              name="date_start"
              onChange={handleDataLicences}
            />
          </Form.Field>
          <Form.Field>
            <label className="label-formita">Fecha Fin Licencia</label>
            <Form.Input
              fluid
              type="date"
              name="date_end"
              min={dateH}
              value={dataLicences.date_end}
              onChange={handleDataLicences}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label className="label-formita">Razon</label>
          <Form.TextArea
            placeholder="Escriba....."
            name="description"
            value={dataLicences.description}
            onChange={handleDataLicences}
          />
        </Form.Field>
        <Button.Group>
          <Button
            positive
            onClick={() => {
              setOpen(true);
            }}
          >
            {updateId === "" ? "Conceder Licencia" : "Actualizar Licencia"}
          </Button>
        </Button.Group>
      </Form>
      <Label.Group size="large" className="info-student-license">
        <h2 className="titulo-info-estuden-h2">Datos Estudiante</h2>
        <Label className="label-licenicas-info">C.I.</Label>
        <Label className="label-licenicas-info2">
          {dataEst.id == undefined ? "No" : dataEst.id}
        </Label>
        <br></br>
        <Label className="label-licenicas-info">Nombre</Label>
        <Label className="label-licenicas-info2">
          {dataEst.firstName == undefined
            ? "No"
            : dataEst.firstName + " " + dataEst.secondName == undefined
            ? "No"
            : dataEst.firstName + " " + dataEst.secondName}
        </Label>
        <br></br>
        <Label className="label-licenicas-info">Apellidos</Label>
        <Label className="label-licenicas-info2">
          {dataEst.fatherLastName == undefined
            ? "No"
            : dataEst.fatherLastName + " " + dataEst.motherLastName == undefined
            ? "No"
            : dataEst.fatherLastName + " " + dataEst.motherLastName}
        </Label>
        <br></br>
        <Label className="label-licenicas-info">Celular</Label>
        <Label className="label-licenicas-info2">
          {dataEst.personalPhone == undefined ? "No" : dataEst.personalPhone}
        </Label>
        <br></br>
        <Label className="label-licenicas-info">Curso</Label>
        <Label className="label-licenicas-info2">
          {Cursoo == "" ? "No" : Cursoo == undefined ? "No" : Cursoo}
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
              puede haber errores revise los datos la licencia una vez mas.
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
    </>
  );
};
