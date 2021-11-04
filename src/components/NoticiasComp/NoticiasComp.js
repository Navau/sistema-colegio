import moment from "moment";
import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { Form, Button, Image, Modal, Header, Icon } from "semantic-ui-react";
import firebase from "../../utils/firebase";
import "./NoticiasComp.scss";
=======
import { Form, Button, Image } from "semantic-ui-react";
import firebase from "../../utils/firebase";
import "./style-noticiasCom.css";
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e

const db = firebase.firestore(firebase);

export const NoticiasComp = (props) => {
  const { AddorEdit, updateId } = props;
  const fecha = new Date();
  const dateH = moment(fecha).format("YYYY-MM-DD");
<<<<<<< HEAD
  const [open, setOpen] = React.useState(false);
=======
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
  const initialValuesNews = {
    Datos: "",
    date_news: "",
  };
  const [dataNews, setDataNews] = useState(initialValuesNews);
  const [banner, setBanner] = useState("");
  const [fileValue, setFileValue] = useState(null);
  const [fileValueOn, setFileValueOn] = useState(null);
  const imgDefault = "https://react.semantic-ui.com/images/wireframe/image.png";

  const handleImg = (e) => {
    const file = e.target.files[0];
    console.log(URL.createObjectURL(file));
    const ur = URL.createObjectURL(file);
    const af = "/photoNews/" + file.name;
    setBanner(ur);
    setFileValue(af);
    setFileValueOn(file);
  };
  const handleDataNews = (e) => {
    const { name, value } = e.target;
    setDataNews({ ...dataNews, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    setOpen(false);
    AddorEdit(dataNews, fileValue, fileValueOn);
    setDataNews({ ...initialValuesNews });
    document.getElementById("inputFilePhoto").value = "";
  };
  const getLicenceId = (id) => {
    db.collection("News")
=======
    AddorEdit(dataNews, fileValue, fileValueOn);
    setDataNews({ ...initialValuesNews });
  };
  const getLicenceId = (id) => {
    db.collection("student_license")
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
      .doc(id)
      .get()
      .then((response) => {
        setDataNews({ ...response.data() });
      });
  };
  useEffect(() => {
<<<<<<< HEAD
    if (updateId == "") {
=======
    if (updateId === "") {
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
      setDataNews({ ...initialValuesNews });
    } else {
      getLicenceId(updateId);
    }
  }, [updateId]);

  return (
    <>
      <Form className="form-news-secre">
        <Form.Group widths="equal">
          <Form.Field>
            <label className="label-news">Fecha Inicio Licencia</label>
            <Form.Input
              fluid
              type="date"
              min={dateH}
              value={dataNews.date_news}
              name="date_news"
              onChange={handleDataNews}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label className="label-news">Razon</label>
          <Form.TextArea
            placeholder="Aviso....."
            name="Datos"
            value={dataNews.Datos}
            onChange={handleDataNews}
          />
        </Form.Field>
        <Form.Field>
          <label className="label-news">Suba su imagen</label>
<<<<<<< HEAD
          <input type="file" onChange={handleImg} id="inputFilePhoto"></input>
        </Form.Field>
        <Button.Group>
          <Button
            positive
            onClick={() => {
              setOpen(true);
            }}
          >
            {updateId == "" ? "Enviar Noticia" : "Actualizar Noticia"}
=======
          <input type="file" onChange={handleImg}></input>
        </Form.Field>
        <Button.Group>
          <Button positive onClick={handleSubmit}>
            {updateId === "" ? "Enviar Noticia" : "Actualizar Noticia"}
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
          </Button>
        </Button.Group>
      </Form>
      <div className="baner-aviso">
        <Image src={banner} size="medium" />
<<<<<<< HEAD
        {!banner && <Image size="medium" src={imgDefault} />}
      </div>
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
=======
        {!banner && <Image src={imgDefault} />}
      </div>
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
    </>
  );
};
