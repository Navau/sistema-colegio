import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import {
  Message,
  Table,
  Button,
  Form,
  Input,
  Image,
  Modal,
  Icon,
  Header,
} from "semantic-ui-react";
import { toast, Zoom } from "react-toastify";
import firebase from "../../utils/firebase";
import { map } from "lodash";
import "./Notices.scss";
=======
import { Message, Table, Button, Form, Input } from "semantic-ui-react";
import { toast, Zoom } from "react-toastify";
import firebase from "../../utils/firebase";
import { map } from "lodash";
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
import { NoticiasComp } from "../../components/NoticiasComp/NoticiasComp";

const db = firebase.firestore(firebase);

<<<<<<< HEAD
export default function Notices(props) {
  const [noticias, setNoticias] = useState([]);
  const [updateId, setUpdateId] = useState("");
  const [open2, setOpen2] = React.useState(false);
  const [paht, setPaht] = useState("");
  const [IdAviso, setIdAviso] = useState("");
  const [DataFiltro, setDataFiltro] = useState("");
=======
export const Notices = () => {
  const [licencias, setLicencias] = useState([]);
  const [updateId, setUpdateId] = useState("");
  const [pathImgF, setPathImgF] = useState("");

>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
  /*AGREGAR UNA LICENCIA*/
  const addNews = (dataNews, fileValue, fileValueOn) => {
    const { Datos, date_news } = dataNews;
    if (updateId === "") {
      const storaref = firebase.storage().ref(fileValue);
      const task = storaref.put(fileValueOn);
<<<<<<< HEAD
      task.on("state_changed", () => {
        task.snapshot.ref.getDownloadURL().then((url) => {
          setPaht(url);
          db.collection("News")
            .doc()
            .set({
              Datos: Datos,
              Img: url,
              date_news: date_news,
            })
            .then(() => {
              toast.success("Noticia Registrada", {
                transition: Zoom,
              });
            });
        });
      });
=======
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
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
    } else {
      db.collection("News")
        .doc(updateId)
        .update({
          Datos: Datos,
<<<<<<< HEAD
          date_news: date_news,
        })
        .then(() => {
          setUpdateId("");
          toast.info("Aviso Actualizado", {
            transition: Zoom,
          });
=======
          Img: pathImgF,
          date_news: date_news,
        })
        .then(() => {
          toast.info("Aviso Actualizado", {
            transition: Zoom,
          });
          setUpdateId("");
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
        });
    }
  };
  /**LLENAR DATOS A LA TABLA */
  useEffect(() => {
<<<<<<< HEAD
    db.collection("News")
      .orderBy("date_news", "asc")
      .onSnapshot((querySnapshot) => {
        const dataNews = [];
        querySnapshot.forEach((doc) => {
          dataNews.push({ ...doc.data(), id: doc.id });
        });
        setNoticias(dataNews);
      });
  }, []);
  /**ELIMINAR LICENCIA */
  const onDeleteNoticia = (id) => {
    if (open2 == false) {
      setOpen2(true);
      setIdAviso(id);
    } else {
      setOpen2(false);
      db.collection("News").doc(IdAviso).delete();
      toast.error("Aviso Eliminada", {
=======
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
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
        transition: Zoom,
      });
    }
  };
<<<<<<< HEAD

  const handleDataFiltro = (e) => {
    const { value } = e.target;
    setDataFiltro(value);
  };
  const dataSearch = () => {
    console.log(DataFiltro);
    db.collection("News")
      .where("date_news", "==", DataFiltro)
      .onSnapshot((querySnapshot) => {
        const dataNews = [];
        querySnapshot.forEach((doc) => {
          dataNews.push({ ...doc.data(), id: doc.id });
        });
        setNoticias(dataNews);
      });
  };

  const AllNews = () => {
    db.collection("News")
      .orderBy("date_news", "asc")
      .onSnapshot((querySnapshot) => {
        const dataNews = [];
        querySnapshot.forEach((doc) => {
          dataNews.push({ ...doc.data(), id: doc.id });
        });
        setNoticias(dataNews);
      });
  };
  let cont = 1;
  return (
    <div className="notices">
      <div className="message">
        <Message className="fond-message">
          <Message.Header>
            <h3>Gestion de Avisos - Unidad Educativa Ave Maria</h3>
          </Message.Header>
        </Message>
      </div>
      <div className="form-notices">
        <NoticiasComp AddorEdit={addNews} updateId={updateId} />
      </div>
      <div className="message">
        <Message className="fond-message">
          <Message.Header>
            <h3>Lista de Noticias - Unidad Educativa Ave Maria</h3>
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
          <Button type="submit" icon="book" onClick={AllNews}></Button>
        </Input>
      </Form.Field>
      <div className="table">
        <Table inverted celled padded striped className="list-notices">
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
            {map(noticias, (notic) => (
              <Table.Row
                key={notic.id}
                className="list-notices__status-available"
              >
                <Table.Cell>{cont++}</Table.Cell>
                <Table.Cell>
                  <center>
                    <Image src={notic.Img} size="small" />
                  </center>
                </Table.Cell>
                <Table.Cell>{notic.id}</Table.Cell>
                <Table.Cell>{notic.date_news}</Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <Button
                      color={"orange"}
                      onClick={() => setUpdateId(notic.id)}
                    >
                      Modificar
                    </Button>
                    <Button.Or text="O" />
                    <Button negative onClick={() => onDeleteNoticia(notic.id)}>
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
            Esta seguro que usted quiere eliminar este aviso recuerde que no hay
            vuelta atras.
          </h3>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={() => setOpen2(false)}>
            <Icon name="remove" /> No
          </Button>
          <Button color="green" inverted onClick={onDeleteNoticia}>
            <Icon name="checkmark" /> Si
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
=======
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
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
