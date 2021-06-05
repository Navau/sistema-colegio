import moment from "moment";
import React, { useEffect, useState } from "react";
import { Form, Button, Image } from "semantic-ui-react";
import firebase from "../../utils/firebase";
import "./style-noticiasCom.css";

const db = firebase.firestore(firebase);

export const NoticiasComp = (props) => {
  const { AddorEdit, updateId } = props;
  const fecha = new Date();
  const dateH = moment(fecha).format("YYYY-MM-DD");
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
    AddorEdit(dataNews, fileValue, fileValueOn);
    setDataNews({ ...initialValuesNews });
  };
  const getLicenceId = (id) => {
    db.collection("student_license")
      .doc(id)
      .get()
      .then((response) => {
        setDataNews({ ...response.data() });
      });
  };
  useEffect(() => {
    if (updateId === "") {
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
          <input type="file" onChange={handleImg}></input>
        </Form.Field>
        <Button.Group>
          <Button positive onClick={handleSubmit}>
            {updateId === "" ? "Enviar Noticia" : "Actualizar Noticia"}
          </Button>
        </Button.Group>
      </Form>
      <div className="baner-aviso">
        <Image src={banner} size="medium" />
        {!banner && <Image src={imgDefault} />}
      </div>
    </>
  );
};
