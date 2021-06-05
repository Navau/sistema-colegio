import React, { useEffect, useState } from "react";
import { Message, Table, Button, Form, Input } from "semantic-ui-react";
import { LicenseComp } from "../../components/LicenseComp/LicenseComp";
import "./estyl-licences.css";
import { toast, Zoom } from "react-toastify";
import firebase from "../../utils/firebase";
import { map } from "lodash";

const db = firebase.firestore(firebase);

export const Licenses = () => {
  const [licencias, setLicencias] = useState([]);
  const [updateId, setUpdateId] = useState("");
  /*AGREGAR UNA LICENCIA*/
  const addLicense = (dataLicences) => {
    const { id_student, description, type_license, date_start, date_end } =
      dataLicences;
    if (updateId === "") {
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
          toast.success("Licencia Registrada", {
            transition: Zoom,
          });
        });
    } else {
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
      .orderBy("date_start", "asc")
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
    if (window.confirm("Esta seguro de eliminar esta licencia")) {
      db.collection("student_license").doc(id).delete();
      toast.error("Licencia Eliminada", {
        transition: Zoom,
      });
    }
  };
  let cont = 1;
  return (
    <>
      <div className="message">
        <Message className="fond-message">
          <Message.Header>
            <center>
              <h3>Gestion de Licencias - Unidad Educativa Ave Maria</h3>
            </center>
          </Message.Header>
        </Message>
      </div>
      <div className="form-licencias">
        <LicenseComp AddorEdit={addLicense} updateId={updateId} />
      </div>
      <h2 className="titulo-lista-licencias">LISTA DE LICENCIAS</h2>
      <Form.Field className="input-filtro-info">
        <Input type="text" placeholder="Buscar...">
          <input />
          <Button type="submit" icon="search"></Button>
        </Input>
      </Form.Field>
      <Table
        celled
        inverted
        selectable
        className="tabla-info-licences-estudiante"
      >
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
            <Table.Row key={licen.id}>
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
    </>
  );
};
