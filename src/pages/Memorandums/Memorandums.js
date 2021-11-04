import React, { useEffect, useState } from "react";
import {
  Message,
  Table,
  Button,
  Form,
  Input,
  Icon,
  Modal,
  Header,
} from "semantic-ui-react";
import { toast, Zoom } from "react-toastify";
import firebase from "../../utils/firebase";
import { map } from "lodash";
import { MemorandumComp } from "../../components/MemorandumComp/MemorandumComp";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import imgLogoColegio from "./../../../src/assets/img/logo-school.jpg";
import moment from "moment";

import "./Memorandums.scss";

const db = firebase.firestore(firebase);

export default function Memorandums(props) {
  const fecha = new Date();
  const dateH = moment(fecha).format("DD-MM-YYYY");
  const [memorandum, setmemorandum] = useState([]);
  const [updateId, setUpdateId] = useState("");
  const [open2, setOpen2] = React.useState(false);
  const [IdMemo, setIdMemo] = useState("");
  const [DataFiltro, setDataFiltro] = useState("");
  /*AGREGAR UNA LICENCIA*/
  const addMemorandum = (dataMemorandum) => {
    const { id_teacher, description, type_memorandum, date_assigned } =
      dataMemorandum;
    if (updateId == "") {
      if (
        id_teacher !== "" &&
        description !== "" &&
        type_memorandum !== "" &&
        date_assigned !== ""
      ) {
        const dateH2 = moment(date_assigned).format("DD-MM-YYYY");
        db.collection("memorandum")
          .doc()
          .set({
            id_teacher: id_teacher,
            description: description,
            type_memorandum: type_memorandum,
            date_assigned: date_assigned,
          })
          .then(() => {
            var doc = new jsPDF();
            doc.addImage(imgLogoColegio, "JPEG", 15, 13, 50, 50);
            doc.text("UNIDAD EDUCATIVA PRIVADA", 80, 30);
            doc.text("AVE MARIA GESTION 2021", 85, 40);
            doc.text("CARTA DE MEMORANDUM", 75, 50);
            doc.text("Asunto memorandum de tipo " + type_memorandum, 80, 90);
            doc.text("La Paz " + dateH, 10, 100);
            doc.text("Director. ", 10, 110);
            doc.text(
              "Por la presente carta le hago conocer que el dia " +
                dateH +
                " se otorgo un me-",
              10,
              120
            );
            doc.text(
              "morandum al profesor con C.I. " + id_teacher + ".",
              10,
              130
            );
            doc.text(
              "Por lo que se le llamo la atencion el dia " + dateH2 + ".",
              10,
              140
            );
            doc.text(description, 10, 150);
            doc.text("..................................", 80, 200);
            doc.text("Unidad Educativa Boliviana Ave Maria ", 64, 210);
            doc.save("P" + dateH2 + id_teacher + ".pdf");
            toast.success("Memorandum Registrado", {
              transition: Zoom,
            });
          });
      } else {
        toast.warning("Faltan Datos Revise!", {
          transition: Zoom,
        });
      }
    } else {
      const dateH2 = moment(date_assigned).format("DD-MM-YYYY");
      db.collection("memorandum")
        .doc(updateId)
        .update({
          id_teacher: id_teacher,
          description: description,
          type_memorandum: type_memorandum,
          date_assigned: date_assigned,
        })
        .then(() => {
          var doc = new jsPDF();
          doc.addImage(imgLogoColegio, "JPEG", 15, 13, 50, 50);
          doc.text("UNIDAD EDUCATIVA PRIVADA", 80, 30);
          doc.text("AVE MARIA GESTION 2021", 85, 40);
          doc.text("CARTA DE MEMORANDUM", 75, 50);
          doc.text("Asunto memorandum de tipo " + type_memorandum, 80, 90);
          doc.text("La Paz " + dateH, 10, 100);
          doc.text("Director. ", 10, 110);
          doc.text(
            "Por la presente carta le hago conocer que el dia " +
              dateH +
              " se otorgo un me-",
            10,
            120
          );
          doc.text(
            "morandum al profesor con C.I. " + id_teacher + ".",
            10,
            130
          );
          doc.text(
            "Por lo que se le llamo la atencion el dia " + dateH2 + ".",
            10,
            140
          );
          doc.text(description, 10, 150);
          doc.text("..................................", 80, 200);
          doc.text("Unidad Educativa Boliviana Ave Maria ", 64, 210);
          doc.save("P" + dateH2 + id_teacher + ".pdf");
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
      .orderBy("date_assigned", "desc")
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
    if (open2 == false) {
      setOpen2(true);
      setIdMemo(id);
    } else {
      setOpen2(false);
      db.collection("memorandum").doc(IdMemo).delete();
      toast.error("Memorandum Eliminada", {
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
    db.collection("memorandum")
      .where("date_assigned", "==", DataFiltro)
      .onSnapshot((querySnapshot) => {
        const dataLic = [];
        querySnapshot.forEach((doc) => {
          dataLic.push({ ...doc.data(), id: doc.id });
        });
        setmemorandum(dataLic);
      });
  };

  const AllMemos = () => {
    db.collection("memorandum")
      .orderBy("date_assigned", "desc")
      .onSnapshot((querySnapshot) => {
        const dataLic = [];
        querySnapshot.forEach((doc) => {
          dataLic.push({ ...doc.data(), id: doc.id });
        });
        setmemorandum(dataLic);
      });
  };
  let cont = 1;

  return (
    <div className="memorandums">
      <div className="message">
        <Message className="fond-message">
          <Message.Header>
            <h3>Gestion de Memorandums - Unidad Educativa Ave Maria</h3>
          </Message.Header>
        </Message>
      </div>
      <div className="form-memorandums">
        <MemorandumComp AddorEdit={addMemorandum} updateId={updateId} />
      </div>
      <div className="message">
        <Message className="fond-message">
          <Message.Header>
            <center>
              <h3>Lista de Memorandums - Unidad Educativa Ave Maria</h3>
            </center>
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
          <Button type="submit" icon="book" onClick={AllMemos}></Button>
        </Input>
      </Form.Field>
      <div className="table">
        <Table inverted celled padded striped className="list-memorandum">
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
              <Table.Row
                key={memo.id}
                className="list-memorandum__status-available"
              >
                <Table.Cell>{cont++}</Table.Cell>
                <Table.Cell>{memo.id}</Table.Cell>
                <Table.Cell>{memo.id_teacher}</Table.Cell>
                <Table.Cell>{memo.date_assigned}</Table.Cell>
                <Table.Cell>{memo.type_memorandum}</Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <Button
                      color={"orange"}
                      onClick={() => setUpdateId(memo.id)}
                    >
                      Modificar
                    </Button>
                    <Button.Or text="O" />
                    <Button
                      negative
                      onClick={() => onDeleteMemorandum(memo.id)}
                    >
                      Eliminar
                    </Button>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

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
              Esta seguro que usted quiere eliminar este memorandum recuerde que
              no hay vuelta atras.
            </h3>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color="red" inverted onClick={() => setOpen2(false)}>
              <Icon name="remove" /> No
            </Button>
            <Button color="green" inverted onClick={onDeleteMemorandum}>
              <Icon name="checkmark" /> Si
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    </div>
  );
}
