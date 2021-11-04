import React, { useEffect, useState } from "react";
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
import { NoticiasComp } from "../../components/NoticiasComp/NoticiasComp";

const db = firebase.firestore(firebase);

export default function Notices(props) {
  const [noticias, setNoticias] = useState([]);
  const [updateId, setUpdateId] = useState("");
  const [open2, setOpen2] = React.useState(false);
  const [paht, setPaht] = useState("");
  const [IdAviso, setIdAviso] = useState("");
  const [DataFiltro, setDataFiltro] = useState("");
  /*AGREGAR UNA LICENCIA*/
  const addNews = (dataNews, fileValue, fileValueOn) => {
    const { Datos, date_news } = dataNews;
    if (updateId === "") {
      const storaref = firebase.storage().ref(fileValue);
      const task = storaref.put(fileValueOn);
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
    } else {
      db.collection("News")
        .doc(updateId)
        .update({
          Datos: Datos,
          date_news: date_news,
        })
        .then(() => {
          setUpdateId("");
          toast.info("Aviso Actualizado", {
            transition: Zoom,
          });
        });
    }
  };
  /**LLENAR DATOS A LA TABLA */
  useEffect(() => {
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
