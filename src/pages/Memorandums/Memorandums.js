import React, { useEffect, useState } from "react";
import { Message, Table, Button, Form, Input } from "semantic-ui-react";
import { toast, Zoom } from "react-toastify";
import firebase from "../../utils/firebase";
import { map } from "lodash";
import { MemorandumComp } from "../../components/MemorandumComp/MemorandumComp";

const db = firebase.firestore(firebase);
export const Memorandums = () => {
  const [memorandum, setmemorandum] = useState([]);
  const [updateId, setUpdateId] = useState("");
  /*AGREGAR UNA LICENCIA*/
  const addMemorandum = (dataMemorandum) => {
    const { id_teacher, description, type_memorandum, date_assigned } =
      dataMemorandum;
    if (updateId === "") {
      db.collection("memorandum")
        .doc()
        .set({
          id_teacher: id_teacher,
          description: description,
          type_memorandum: type_memorandum,
          date_assigned: date_assigned,
        })
        .then(() => {
          toast.success("Memorandum Registrado", {
            transition: Zoom,
          });
        });
    } else {
      db.collection("memorandum")
        .doc(updateId)
        .update({
          id_teacher: id_teacher,
          description: description,
          type_memorandum: type_memorandum,
          date_assigned: date_assigned,
        })
        .then(() => {
          toast.info("Memorandum Actualizado", {
            transition: Zoom,
          });
          setUpdateId("");
        });
    }
  };
  /**LLENAR DATOS A LA TABLA */
  useEffect(() => {
    db.collection("memorandum")
      .orderBy("date_assigned", "asc")
      .onSnapshot((querySnapshot) => {
        const dataLic = [];
        querySnapshot.forEach((doc) => {
          dataLic.push({ ...doc.data(), id: doc.id });
        });
        setmemorandum(dataLic);
      });
  }, []);
  /**ELIMINAR LICENCIA */
  const onDeleteMemorandum = (id) => {
    if (window.confirm("Esta seguro de eliminar este memorandum")) {
      db.collection("memorandum").doc(id).delete();
      toast.error("Memorandum Eliminada", {
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
              <h3>Gestion de Memorandums - Unidad Educativa Ave Maria</h3>
            </center>
          </Message.Header>
        </Message>
      </div>
      <div className="form-memorandum">
        <MemorandumComp AddorEdit={addMemorandum} updateId={updateId} />
      </div>
      <h2 className="titulo-lista-memorandum">LISTA DE MEMORANDUMS</h2>
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
        className="tabla-info-memorandum-teacher"
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nro</Table.HeaderCell>
            <Table.HeaderCell>ID Memorandum</Table.HeaderCell>
            <Table.HeaderCell>C.I. Profesor</Table.HeaderCell>
            <Table.HeaderCell>Fecha</Table.HeaderCell>
            <Table.HeaderCell>Tipo Memorandum</Table.HeaderCell>
            <Table.HeaderCell>Opciones</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {map(memorandum, (memo) => (
            <Table.Row key={memo.id}>
              <Table.Cell>{cont++}</Table.Cell>
              <Table.Cell>{memo.id}</Table.Cell>
              <Table.Cell>{memo.id_teacher}</Table.Cell>
              <Table.Cell>{memo.date_assigned}</Table.Cell>
              <Table.Cell>{memo.type_memorandum}</Table.Cell>
              <Table.Cell>
                <Button.Group>
                  <Button color={"orange"} onClick={() => setUpdateId(memo.id)}>
                    Modificar
                  </Button>
                  <Button.Or text="O" />
                  <Button negative onClick={() => onDeleteMemorandum(memo.id)}>
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
