import React, { useEffect, useState } from "react";
import {
  Message,
  Table,
  Button,
  Form,
  Input,
  Modal,
  Header,
  Icon,
} from "semantic-ui-react";
import moment from "moment";
import { LicenseComp } from "../../components/LicenseComp/LicenseComp";
import { toast, Zoom } from "react-toastify";
import firebase from "../../utils/firebase";
import { map } from "lodash";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import imgLogoColegio from "./../../../src/assets/img/logo-school.jpg";

import "./Licences.scss";
const db = firebase.firestore(firebase);

export default function Licences(props) {
  const fecha = new Date();
  const dateH = moment(fecha).format("DD-MM-YYYY");
  const [licencias, setLicencias] = useState([]);
  const [updateId, setUpdateId] = useState("");
  const [open2, setOpen2] = React.useState(false);
  const [IdLicencia, setIdLicencia] = useState("");
  const [DataFiltro, setDataFiltro] = useState("");
  /*AGREGAR UNA LICENCIA*/
  const addLicense = (dataLicences) => {
    const { id_student, description, type_license, date_start, date_end } =
      dataLicences;
    if (updateId === "") {
      if (
        id_student !== "" &&
        description !== "" &&
        type_license !== "" &&
        date_start !== "" &&
        date_end !== ""
      ) {
        const dateH2 = moment(date_end).format("DD-MM-YYYY");
        db.collection("student_license")
          .doc()
          .set({
            id_student: id_student,
            description: description,
            type_license: type_license,
            date_start: date_start,
            date_end: date_end,
          })
          .then(() => {
            var doc = new jsPDF();
            doc.addImage(imgLogoColegio, "JPEG", 15, 13, 50, 50);
            doc.text("UNIDAD EDUCATIVA PRIVADA", 80, 30);
            doc.text("AVE MARIA GESTION 2021", 85, 40);
            doc.text("SOLICITUD DE LICENCIA ESTUDIANTIL", 75, 50);
            doc.text("Asunto solicitud de permiso " + type_license, 90, 90);
            doc.text("La Paz " + dateH, 10, 100);
            doc.text("Director. ", 10, 110);
            doc.text(
              "Por la presente carta le hago conocer que el dia " +
                dateH +
                " se otorgo un per-",
              10,
              120
            );
            doc.text(
              "miso estudiantil al estudiante con C.I. " + id_student + ".",
              10,
              130
            );
            doc.text(
              "Por lo que este tiene permiso hasta " +
                dateH2 +
                " para poder faltar a clases.",
              10,
              140
            );
            doc.text("..................................", 80, 200);
            doc.text("Unidad Educativa Boliviana Ave Maria ", 64, 210);
            doc.save(date_end + id_student + ".pdf");
            toast.success("Licencia Registrada", {
              transition: Zoom,
            });
          });
      } else {
        toast.warning("Faltan Datos Revise!", {
          transition: Zoom,
        });
      }
    } else {
      const dateH2 = moment(date_end).format("DD-MM-YYYY");
      db.collection("student_license")
        .doc(updateId)
        .update({
          id_student: id_student,
          description: description,
          type_license: type_license,
          date_start: date_start,
          date_end: date_end,
        })
        .then(() => {
          var doc = new jsPDF();
          doc.addImage(imgLogoColegio, "JPEG", 15, 13, 50, 50);
          doc.text("UNIDAD EDUCATIVA PRIVADA", 80, 30);
          doc.text("AVE MARIA GESTION 2021", 85, 40);
          doc.text("SOLICITUD DE LICENCIA ESTUDIANTIL", 75, 50);
          doc.text("Asunto solicitud de permiso " + type_license, 90, 90);
          doc.text("La Paz " + dateH, 10, 100);
          doc.text("Director. ", 10, 110);
          doc.text(
            "Por la presente carta le hago conocer que el dia " +
              dateH +
              " se otorgo un per-",
            10,
            120
          );
          doc.text(
            "miso estudiantil al estudiante con C.I. " + id_student + ".",
            10,
            130
          );
          doc.text(
            "Por lo que este tiene permiso hasta " +
              dateH2 +
              " para poder faltar a clases.",
            10,
            140
          );
          doc.text("..................................", 80, 200);
          doc.text("Unidad Educativa Boliviana Ave Maria ", 64, 210);
          doc.save(date_end + id_student + ".pdf");
          toast.info("Licencia Actualizada", {
            transition: Zoom,
          });
          setUpdateId("");
        });
    }
  };
  /**LLENAR DATOS A LA TABLA */
  useEffect(() => {
    db.collection("student_license")
      .orderBy("date_start", "desc")
      .onSnapshot((querySnapshot) => {
        const dataLic = [];
        querySnapshot.forEach((doc) => {
          dataLic.push({ ...doc.data(), id: doc.id });
        });
        setLicencias(dataLic);
      });
  }, []);
  /**ELIMINAR LICENCIA */
  const onDeleteLicencia = (id) => {
    if (open2 == false) {
      setOpen2(true);
      setIdLicencia(id);
    } else {
      setOpen2(false);
      db.collection("student_license").doc(IdLicencia).delete();
      toast.error("Licencia Eliminada", {
        transition: Zoom,
      });
    }
  };
  const handleDataFiltro = (e) => {
    const { value } = e.target;
    setDataFiltro(value);
  };
  const dataSearch = () => {
    console.log(DataFiltro);
    const dataLic = [];
    db.collection("student_license")
      .where("date_start", "==", DataFiltro)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          dataLic.push({ ...doc.data(), id: doc.id });
        });
        setLicencias(dataLic);
      });
  };
  const AllLicencias = () => {
    db.collection("student_license")
      .orderBy("date_start", "desc")
      .onSnapshot((querySnapshot) => {
        const dataLic = [];
        querySnapshot.forEach((doc) => {
          dataLic.push({ ...doc.data(), id: doc.id });
        });
        setLicencias(dataLic);
      });
  };
  let cont = 1;
  return (
    <div className="licences">
      <div className="message">
        <Message className="fond-message">
          <Message.Header>
            <h3>Gestion de Licencias - Unidad Educativa Ave Maria</h3>
          </Message.Header>
        </Message>
      </div>
      <div className="form-licences">
        <LicenseComp AddorEdit={addLicense} updateId={updateId} />
      </div>
      <div className="message">
        <Message className="fond-message">
          <Message.Header>
            <h3>Lista de Licencias - Unidad Educativa Ave Maria</h3>
          </Message.Header>
        </Message>
      </div>
      <Form.Field className="input-filtro-info">
        <Input
          type="date"
          placeholder="Buscar..."
          name="datoFiltro"
          onChange={handleDataFiltro}
        >
          <input />
          <Button type="submit" icon="search" onClick={dataSearch}></Button>
          <Button type="submit" icon="book" onClick={AllLicencias}></Button>
        </Input>
      </Form.Field>
      <div className="table">
        <Table inverted celled padded striped className="list-licences">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nro</Table.HeaderCell>
              <Table.HeaderCell>ID Licencia</Table.HeaderCell>
              <Table.HeaderCell>C.I. Estudiante</Table.HeaderCell>
              <Table.HeaderCell>Fecha</Table.HeaderCell>
              <Table.HeaderCell>Tipo Licencia</Table.HeaderCell>
              <Table.HeaderCell>Opciones</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(licencias, (licen) => (
              <Table.Row
                key={licen.id}
                className="list-licences__status-available"
              >
                <Table.Cell>{cont++}</Table.Cell>
                <Table.Cell>{licen.id}</Table.Cell>
                <Table.Cell>{licen.id_student}</Table.Cell>
                <Table.Cell>{licen.date_start}</Table.Cell>
                <Table.Cell>{licen.type_license}</Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <Button
                      color={"orange"}
                      onClick={() => setUpdateId(licen.id)}
                    >
                      Modificar
                    </Button>
                    <Button.Or text="O" />
                    <Button negative onClick={() => onDeleteLicencia(licen.id)}>
                      Eliminar
                    </Button>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
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
            Esta seguro que usted quiere eliminar esta licencia recuerde que no
            hay vuelta atras.
          </h3>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={() => setOpen2(false)}>
            <Icon name="remove" /> No
          </Button>
          <Button color="green" inverted onClick={onDeleteLicencia}>
            <Icon name="checkmark" /> Si
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
