import React, { useState, useEffect } from "react";
import { Form, Icon } from "semantic-ui-react";
import { map } from "lodash-es";
import { toast, Zoom } from "react-toastify";

import MomentUtils from "@date-io/moment";
import moment from "moment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import LoadingForm from "../../Loadings/LoadingForm";

import firebase from "../../../utils/firebase";

import "firebase/firestore";
import "./AddReportForm.scss";

const db = firebase.firestore(firebase);

export default function AddReportForm(props) {
  const { setIsLoadingInfo, isLoadingInfo, onClose, student, setUpdateData } =
    props;

  //DATES
  const [startDate, setStartDate] = useState(moment());

  //FORMS
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [formData, setFormData] = useState(defaultValueForm(student));
  const [formError, setFormError] = useState(defaultValueFormError());
  const [errorFinalText, setErrorFinalText] = useState("");
  const [errorFinal, setErrorFinal] = useState(false);
  const [idStudents, setIdStudents] = useState([]);

  useEffect(() => {
    if (!student) {
      setIsLoadingInfo(true);
      db.collection("students")
        .get()
        .then((response) => {
          const arrayIdsAux = [];
          map(response.docs, (item) => {
            arrayIdsAux.push({
              key: item.id,
              value: item.id,
              text: item.id,
            });
          });
          setIdStudents(arrayIdsAux);
        })
        .finally(() => {
          setIsLoadingInfo(false);
        });
    }
  }, []);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    setFormError({});
    let textErrorFinalAux = "";
    let errorsAux = {};
    let formOkAux = true;

    if (!formData.carnet || formData.carnet.length < 6) {
      formOkAux = false;
      errorsAux.carnet = true;
      textErrorFinalAux +=
        "*El Carnet de Identidad del Estudiante es erróneo.\n";
    }
    if (!formData.date) {
      formOkAux = false;
      errorsAux.date = true;
      textErrorFinalAux += "*La Fecha de Creación del Reporte es erróneo.\n";
    }
    if (!formData.name) {
      formOkAux = false;
      errorsAux.name = true;
      textErrorFinalAux += "*El Nombre del Reporte es erróneo.\n";
    }
    if (!formData.info) {
      formOkAux = false;
      errorsAux.info = true;
      textErrorFinalAux += "*La Información del Reporte es erróneo.\n";
    }
    setFormError(errorsAux);
    setErrorFinal(!formOkAux);
    setErrorFinalText(textErrorFinalAux);
    if (formOkAux) {
      setIsLoadingButton(true);
      db.collection("reports")
        .add({
          idStudent: formData.carnet,
          name: formData.name,
          info: formData.info,
          creationDate: dateFormatTimeStamp(formData.date),
        })
        .then(() => {
          toast.success("El Reporte fue creado con éxito.", {
            transition: Zoom,
          });
          onClose();
        })
        .catch(() => {
          toast.error("Hubo un error al crear el reporte a un estudiante.", {
            transition: Zoom,
          });
        })
        .finally(() => setIsLoadingButton(false));
    }
  };

  const onChangeClearError = (e) => {
    setFormError({ ...formError, [e.target.name]: false });
  };

  const dateFormatTimeStamp = (date) => {
    return new Date(date);
  };

  if (isLoadingInfo) {
    return <LoadingForm />;
  }

  return (
    <Form
      className="add-report-form"
      size="small"
      onChange={onChange}
      onSubmit={onSubmit}
      key="1"
    >
      <div className="report-inputs">
        <Form.Group>
          <h2>GENERACIÓN DE REPORTE</h2>
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <Form.Input
              type="text"
              error={formError.date}
              fluid
              label="Fecha de Creación"
            >
              {formData.date ? (
                <Icon
                  name="calendar alternate"
                  style={{ opacity: 1 }}
                  className="icon-special"
                />
              ) : (
                <Icon
                  name="calendar alternate"
                  style={{ opacity: 0.42 }}
                  className="icon-special"
                />
              )}
              <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                <DatePicker
                  variant="inline"
                  value={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setFormError({ ...formError, dateBirth: false });
                    const data = formData;
                    data.date = date;
                    setFormData(data);
                  }}
                  maxDate={moment()}
                  animateYearScrolling
                  lang="en-US"
                  openTo="year"
                  format="DD/MM/YYYY"
                  views={["year", "month", "date"]}
                  size="small"
                  autoOk
                />
              </MuiPickersUtilsProvider>
            </Form.Input>
          </Form.Field>
          {!student ? (
            <Form.Field className="select-dropdown-special-field">
              {formData.carnet ? (
                <Icon
                  name="users"
                  style={{ opacity: 1 }}
                  className="icon-special-select-dropdown"
                />
              ) : (
                <Icon
                  name="users"
                  style={{ opacity: 0.42 }}
                  className="icon-special-select-dropdown"
                />
              )}
              <Form.Dropdown
                name="carnet"
                placeholder="Carnet de Estudiante"
                search
                fluid
                label="Carnet de Estudiante"
                selection
                lazyLoad
                scrolling
                options={idStudents}
                onChange={(e, data) => {
                  setFormData({ ...formData, carnet: data.value });
                  // onSelectLevelEducation(data.value);
                  setFormError({ ...formError, carnet: false });
                }}
                error={formError.carnet}
              />
            </Form.Field>
          ) : (
            <Form.Field>
              <Form.Input
                type="number"
                min={0}
                step="false"
                value={formData.carnet}
                error={formError.carnet}
                fluid
                disabled
                label="Carnet de Estudiante"
                icon={
                  formData.carnet ? (
                    <Icon name="address card" style={{ opacity: 1 }} />
                  ) : (
                    <Icon name="address card" />
                  )
                }
                iconPosition="left"
              />
            </Form.Field>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <Form.Input
              type="text"
              name="name"
              placeholder="Nombre del Reporte"
              error={formError.name}
              fluid
              label="Nombre del Reporte"
              icon={
                formData.name ? (
                  <Icon name="user" style={{ opacity: 1 }} />
                ) : (
                  <Icon name="user" />
                )
              }
              iconPosition="left"
              onChange={onChangeClearError}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <Form.TextArea
              rows="3"
              name="info"
              placeholder="Información del Reporte"
              error={formError.info}
              fluid
              label="Información del Reporte"
              onChange={onChangeClearError}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group className="button-group-form">
          <Form.Button loading={isLoadingButton}>REGISTRAR REPORTE</Form.Button>
          {errorFinal && <p>{errorFinalText}</p>}
        </Form.Group>
      </div>
    </Form>
  );
}
//FORM
function defaultValueForm(student) {
  return {
    carnet: student ? student.id : "",
    name: "",
    info: "",
    date: new Date(),
  };
}

function defaultValueFormError() {
  return {
    carnet: false,
    name: false,
    info: false,
    date: false,
  };
}
