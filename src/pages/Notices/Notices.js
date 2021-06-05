import React, { useEffect, useState } from "react";
import { Message, Table, Button, Form, Input } from "semantic-ui-react";
import { toast, Zoom } from "react-toastify";
import firebase from "../../utils/firebase";
import { map } from "lodash";
import { NoticiasComp } from "../../components/NoticiasComp/NoticiasComp";

const db = firebase.firestore(firebase);

export const Notices = () => {
  const [licencias, setLicencias] = useState([]);
  const [updateId, setUpdateId] = useState("");
  const [pathImgF, setPathImgF] = useState("");

  /*AGREGAR UNA LICENCIA*/
  const addNews = (dataNews, fileValue, fileValueOn) => {
    const { Datos, date_news } = dataNews;
    if (updateId === "") {
      const storaref = firebase.storage().ref(fileValue);
      const task = storaref.put(fileValueOn);
      task.on(
        "state_changed",
        (snapshot) => {
          let percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(percentage);
        },
        (error) => {
          console.log("Error Img", error.message);
        },
        () => {
          task.snapshot.ref.getDownloadURL().then((url) => {
            db.collection("News")
              .doc()
              .set({
                Datos: Datos,
                Img: url,
                date_news: date_news,
              })
              .then(() => {
                toast.success("Licencia Registrada", {
                  transition: Zoom,
                });
              });
          });
        }
      );
      /*
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
        });*/
    } else {
      db.collection("News")
        .doc(updateId)
        .update({
          Datos: Datos,
          Img: pathImgF,
          date_news: date_news,
        })
        .then(() => {
          toast.info("Aviso Actualizado", {
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
              <h3>Gestion de Avisos - Unidad Educativa Ave Maria</h3>
            </center>
          </Message.Header>
        </Message>
      </div>
      <div className="form-news">
        <NoticiasComp AddorEdit={addNews} updateId={updateId} />
      </div>
      <h2 className="titulo-lista-avisos">LISTA DE AVISOS</h2>
      <Form.Field className="input-filtro-info">
        <Input type="text" placeholder="Buscar...">
          <input />
          <Button type="submit" icon="search"></Button>
        </Input>
      </Form.Field>
      <Table celled inverted selectable className="tabla-info-avisos">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nro</Table.HeaderCell>
            <Table.HeaderCell>Imagen</Table.HeaderCell>
            <Table.HeaderCell>ID Aviso</Table.HeaderCell>
            <Table.HeaderCell>Fecha</Table.HeaderCell>
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
