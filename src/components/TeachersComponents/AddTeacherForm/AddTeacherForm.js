import React, { useState, useEffect, useCallback } from "react";
import { Form, Image, Icon } from "semantic-ui-react";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useDropzone } from "react-dropzone";
import { toast, Zoom } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { map } from "lodash-es";

import SliderForm from "../../Sliders/SliderForm";
import firebase from "../../../utils/firebase";
import { removeArrayDuplicatesObjectOrderByValue } from "../../../utils/arrayFunctions";
import { validateEmail } from "../../../utils/validations";

import "firebase/firestore";
import "firebase/storage";

import TeacherDefault from "../../../assets/img/teacher.png";
import PdfImage from "../../../assets/img/pdfImage.png";

import "./AddTeacherForm.scss";

const db = firebase.firestore(firebase);

export default function AddTeacherForm(props) {
  const { setSliderRef, setActiveSlide, setUpdateData, onClose } = props;

  //FILES
  const [photoTeacher, setPhotoTeacher] = useState(null);
  const [file, setFile] = useState(null);
  const [urlDocCarnet, setUrlDocCarnet] = useState(null);
  const [fileCarnet, setFileCarnet] = useState(null);
  const [urlDocBirthCertificate, setUrlDocBirthCertificate] = useState(null);
  const [fileBirthCertificate, setFileBirthCertificate] = useState(null);

  //DATES
  const [startDate, setStartDate] = useState(null);

  //FORMS
  const [formData, setFormData] = useState(defaultValueForm());
  const [formError, setFormError] = useState(defaultValueFormError());
  const [showPassword, setShowPassword] = useState(false);
  const [errorFinal, setErrorFinal] = useState(false);
  const [errorFinalText, setErrorFinalText] = useState("");

  //FORMS AUTOCOMPLETE INPUTS
  const [ageTeacher, setAgeTeacher] = useState(null);
  const [userNameState, setUserNameState] = useState(null);
  const [passwordState, setPasswordState] = useState(null);

  //LOADINGS
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoadingSubjectList, setIsLoadingSubjectList] = useState(false);

  //LISTS-DROPDOWN
  const [subjectList, setSubjectList] = useState([]);

  //STATE OF ID
  const [idSubjectState, setIdSubjectState] = useState(null);

  const onSelectLevelEducation = (educationLevel) => {
    if (educationLevel) {
      setIsLoadingSubjectList(true);
      db.collection("school_material")
        .where("educationLevel", "==", educationLevel)
        .get()
        .then((response) => {
          const arraySubjects = [];
          arraySubjects.push({
            key: 0,
            value: null,
            text: "Eliga una opción",
          });
          map(response?.docs, (subject, index) => {
            const data = subject.data();
            arraySubjects.push({
              key: index + 1,
              value: subject.id,
              text: "Materia de " + data.name_matter,
            });
          });

          const arraySubjectsFilter = removeArrayDuplicatesObjectOrderByValue(
            arraySubjects,
            "text"
          );
          setSubjectList(arraySubjectsFilter);
        })
        .catch((err) => {})
        .finally(() => {
          setIsLoadingSubjectList(false);
        });
    }
  };

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    setPhotoTeacher(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onKeyboard: true,
    onDrop,
  });

  const uploadPhotoTeacher = (fileName) => {
    const ref = firebase.storage().ref().child(`photoTeachers/${fileName}`);
    return ref.put(file);
  };
  const uploadCarnetTeacher = (fileName) => {
    const ref = firebase.storage().ref().child(`carnetTeachers/${fileName}`);
    return ref.put(fileCarnet);
  };
  const uploadBirthCertificateTeacher = (fileName) => {
    const ref = firebase
      .storage()
      .ref()
      .child(`birthCertificateTeachers/${fileName}`);
    return ref.put(fileBirthCertificate);
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const genres = [
    { key: "1", value: null, text: "Eliga una opción" },
    { key: "2", value: "male", text: "Masculino" },
    { key: "3", value: "female", text: "Femenino" },
  ];

  const educationLevel = [
    { key: "1", value: null, text: "Eliga una opción" },
    { key: "2", value: "Secundaria", text: "Secundaria" },
    { key: "3", value: "Primaria", text: "Primaria" },
  ];

  const statusAccountTeacher = [
    { key: "1", value: null, text: "Eliga una opción" },
    { key: "2", value: "Disponible", text: "Disponible" },
    { key: "3", value: "Bloqueado", text: "Bloqueado" },
  ];

  const onSubmit = () => {
    setFormError({});
    let textErrorFinalAux = "";
    let errorsAux = {};
    let formOkAux = true;
    //INFORMACION PERSONAL
    if (!file) {
      formOkAux = false;
      errorsAux.photoTeacher = true;
      textErrorFinalAux += "*La foto del Profesor es errónea.\n";
    }
    if (!formData.carnet || formData.carnet.length < 6) {
      formOkAux = false;
      errorsAux.carnet = true;
      textErrorFinalAux += "*El Carnet de Identidad del Profesor es erróneo.\n";
    }
    if (!formData.firstName) {
      formOkAux = false;
      errorsAux.firstName = true;
      textErrorFinalAux += "*El Primer Nombre del Profesor es erróneo.\n";
    }
    if (!formData.fatherLastName) {
      formOkAux = false;
      errorsAux.fatherLastName = true;
      textErrorFinalAux += "*El Apellido Paterno del Profesor es erróneo.\n";
    }
    if (!formData.motherLastName) {
      formOkAux = false;
      errorsAux.motherLastName = true;
      textErrorFinalAux += "*El Apellido Materno del Profesor es erróneo.\n";
    }
    if (!formData.dateBirth) {
      formOkAux = false;
      errorsAux.dateBirth = true;
      textErrorFinalAux += "*La Fecha de Nacimiento del Profesor es erróneo.\n";
    }
    if (!formData.personalPhone) {
      formOkAux = false;
      errorsAux.personalPhone = true;
      textErrorFinalAux += "*El Teléfono Personal del Profesor es erróneo.\n";
    }
    //INFORMACION ADICIONAL
    if (!formData.age) {
      formOkAux = false;
      errorsAux.age = true;
      textErrorFinalAux += "*La Edad del Profesor es erróneo.\n";
    }
    if (!formData.country) {
      formOkAux = false;
      errorsAux.country = true;
      textErrorFinalAux += "*El Pais de Residencia del Profesor es erróneo.\n";
    }
    if (!formData.departament) {
      formOkAux = false;
      errorsAux.departament = true;
      textErrorFinalAux +=
        "*El Departamento de Residencia del Profesor es erróneo.\n";
    }
    if (!formData.genre) {
      formOkAux = false;
      errorsAux.genre = true;
      textErrorFinalAux += "*El Género del Profesor es erróneo.\n";
    }
    if (!formData.address) {
      formOkAux = false;
      errorsAux.address = true;
      textErrorFinalAux +=
        "*La Dirección de Residencia del Profesor es erróneo.\n";
    }
    if (formData.email) {
      if (!validateEmail(formData.email)) {
        formOkAux = false;
        errorsAux.email = true;
        textErrorFinalAux +=
          "*El Correo Eléctronico del Profesor es erróneo.\n";
      }
    }

    //INFORMACION ACADEMICA
    if (!formData.educationLevel) {
      formOkAux = false;
      errorsAux.educationLevel = true;
      textErrorFinalAux += "*El Nivel de Educación del Profesor es erróneo.\n";
    }
    if (!formData.subject) {
      formOkAux = false;
      errorsAux.subject = true;
      textErrorFinalAux += "*La Materia del Profesor es erróneo.\n";
    }
    if (!formData.userName) {
      formOkAux = false;
      errorsAux.userName = true;
      textErrorFinalAux += "*El Nombre de Usuario del Profesor es erróneo.\n";
    }
    if (!formData.password) {
      formOkAux = false;
      errorsAux.password = true;
      textErrorFinalAux +=
        "*La Contraseña de la Cuenta del Profesor es erróneo.\n";
    }
    if (!formData.statusAccount) {
      formOkAux = false;
      errorsAux.statusAccount = true;
      textErrorFinalAux += "*El Estado de la Cuenta del Profesor es erróneo.\n";
    }

    setFormError(errorsAux);
    setErrorFinalText(textErrorFinalAux);
    setErrorFinal(!formOkAux);
    if (formOkAux) {
      toast.info("Registrando al Profesor...", {
        transition: Zoom,
      });
      setIsLoadingButton(true);
      const fileNamePhoto = uuidv4();
      const fileNameCarnet = uuidv4();
      const fileNameBirthCertificate = uuidv4();

      db.collection("teachers")
        .doc(formData.carnet)
        .set({
          firstName: formData.firstName,
          secondName: formData.secondName ? formData.secondName : "",
          fatherLastName: formData.fatherLastName,
          motherLastName: formData.motherLastName,
          dateBirth: formData.dateBirth,
          age: parseInt(formData.age),
          personalPhone: formData.personalPhone,
          landPhone: formData.landLine ? formData.landLine : "0",
          address: formData.address,
          gender: formData.genre == "male" ? true : false,
          weight: formData.weight ? formData.weight : "0",
          height: formData.height ? formData.height : "0",
          email: formData.email ? formData.email : "",
          country: formData.country,
          departament: formData.departament,
          educationLevel: formData.educationLevel,
          teacherStatus: "Disponible",
          filePhotoId: fileNamePhoto,
          fileCarnetId: fileCarnet ? fileNameCarnet : "",
          fileBirthCertificateId: fileBirthCertificate
            ? fileNameBirthCertificate
            : "",
          accountId: formData.carnet,
          subjectId: idSubjectState,
        })
        .then(() => {
          toast.info("Creando cuenta del Profesor...", {
            transition: Zoom,
          });
          db.collection("accounts")
            .doc(formData.carnet)
            .set({
              userName: formData.userName,
              password: formData.password,
              status: formData.statusAccount,
              creationDate: moment().format("MMMM Do YYYY, HH:mm:ss"),
              typeUser: "Profesor",
            })
            .then(() => {
              toast.warn(
                "Guardando Documentos y Fotos del Profesor. Este proceso puede tardar, porfavor espere...",
                {
                  transition: Zoom,
                }
              );
              uploadPhotoTeacher(fileNamePhoto).then(() => {
                //TeacherS
                (async () => {
                  try {
                    fileCarnet && (await uploadCarnetTeacher(fileNameCarnet));
                  } catch (err) {
                    toast.error(
                      "Los archivos y fotos no pudieron subirse a la nube",
                      {
                        transition: Zoom,
                      }
                    );
                  }
                })();
                (async () => {
                  try {
                    fileBirthCertificate &&
                      (await uploadBirthCertificateTeacher(
                        fileNameBirthCertificate
                      ));
                  } catch (err) {
                    toast.error(
                      "Los archivos y fotos no pudieron subirse a la nube",
                      {
                        transition: Zoom,
                      }
                    );
                  }
                })();
                toast.success("El Profesor fue registrado con éxito", {
                  transition: Zoom,
                });
              });
            });
          setUpdateData(true);
          onClose();
        })
        .catch((err) => {
          toast.error("Error al Registrar al Profesor");
        })
        .finally(() => {
          setIsLoadingButton(false);
        });
    }
  };

  const onChangeClearError = (e) => {
    setFormError({ ...formError, [e.target.name]: false });
  };

  const calcAge = (date) => {
    const currentDate = moment().set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    return currentDate.diff(date, "years");
  };
  return (
    <>
      <SliderForm setSliderRef={setSliderRef} setActiveSlide={setActiveSlide}>
        <Form
          className="add-teacher-form"
          size="small"
          onChange={onChange}
          onSubmit={onSubmit}
          key="1"
        >
          <Form.Group className="teacher-photo">
            {!file && <div {...getRootProps()} className="photo-hover" />}
            <Form.Field
              className="field-teacher-photo"
              error={formError.photoTeacher}
            >
              <div
                {...getRootProps()}
                className="photo"
                style={{ backgroundImage: `url(${photoTeacher})` }}
              />
              <input {...getInputProps()} />
              {!photoTeacher && <Image src={TeacherDefault} />}
            </Form.Field>
          </Form.Group>
          <div className="teacher-inputs">
            <Form.Group>
              <h2>INFORMACION PERSONAL</h2>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Form.Input
                  type="number"
                  min={0}
                  step="false"
                  name="carnet"
                  placeholder="Carnet de Identidad"
                  error={formError.carnet}
                  fluid
                  label="Carnet de Identidad"
                  icon={
                    formData.carnet ? (
                      <Icon name="address card" style={{ opacity: 1 }} />
                    ) : (
                      <Icon name="address card" />
                    )
                  }
                  iconPosition="left"
                  onChange={(e) => {
                    onChangeClearError(e);
                    const data = formData;
                    data.userName = e.target.value;
                    data.password = e.target.value;
                    setFormData(data);
                    setUserNameState(e.target.value);
                    setPasswordState(e.target.value);
                  }}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  type="text"
                  name="firstName"
                  placeholder="Primer Nombre"
                  error={formError.firstName}
                  fluid
                  label="Primer Nombre"
                  icon={
                    formData.firstName ? (
                      <Icon name="user" style={{ opacity: 1 }} />
                    ) : (
                      <Icon name="user" />
                    )
                  }
                  iconPosition="left"
                  onChange={onChangeClearError}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  type="text"
                  name="secondName"
                  placeholder="Segundo Nombre"
                  error={formError.secondName}
                  fluid
                  label="Segundo Nombre (Opcional)"
                  icon={
                    formData.secondName ? (
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
                <Form.Input
                  type="text"
                  name="fatherLastName"
                  placeholder="Apellido Paterno"
                  error={formError.fatherLastName}
                  fluid
                  label="Apellido Paterno"
                  icon={
                    formData.fatherLastName ? (
                      <Icon name="user" style={{ opacity: 1 }} />
                    ) : (
                      <Icon name="user" />
                    )
                  }
                  iconPosition="left"
                  onChange={onChangeClearError}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  type="text"
                  name="motherLastName"
                  placeholder="Apellido Materno"
                  error={formError.motherLastName}
                  fluid
                  label="Apellido Materno"
                  icon={
                    formData.motherLastName ? (
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
                <Form.Input
                  type="text"
                  error={formError.dateBirth}
                  fluid
                  label="Fecha de Nacimiento"
                >
                  {formData.dateBirth ? (
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
                  <MuiPickersUtilsProvider
                    libInstance={moment}
                    utils={MomentUtils}
                  >
                    <DatePicker
                      variant="inline"
                      value={startDate}
                      onChange={(date) => {
                        setFormData({
                          ...formData,
                          dateBirth: date,
                        });
                        setStartDate(date);
                        setFormError({ ...formError, dateBirth: false });
                        setAgeTeacher(calcAge(date));
                        setFormData({
                          ...formData,
                          dateBirth: moment(date).format("LL"),
                          age: calcAge(date),
                        });
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
              <Form.Field>
                <Form.Input
                  type="number"
                  min={0}
                  step="false"
                  name="personalPhone"
                  placeholder="Teléfono Celular"
                  error={formError.personalPhone}
                  fluid
                  label="Teléfono Celular"
                  icon={
                    formData.personalPhone ? (
                      <Icon name="mobile" style={{ opacity: 1 }} />
                    ) : (
                      <Icon name="mobile" />
                    )
                  }
                  iconPosition="left"
                  onChange={onChangeClearError}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  type="number"
                  min={0}
                  step="false"
                  name="landLine"
                  placeholder="Teléfono Fijo"
                  error={formError.landLine}
                  fluid
                  label="Teléfono Fijo (Opcional)"
                  icon={
                    formData.landLine ? (
                      <Icon name="phone" style={{ opacity: 1 }} />
                    ) : (
                      <Icon name="phone" />
                    )
                  }
                  iconPosition="left"
                  onChange={onChangeClearError}
                />
              </Form.Field>
            </Form.Group>
          </div>
        </Form>
        <Form
          className="add-teacher-form-2"
          size="small"
          onChange={onChange}
          onSubmit={onSubmit}
          key="2"
        >
          <div className="teacher-inputs-2">
            <Form.Group>
              <h2>INFORMACION PERSONAL</h2>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Form.Input
                  type="number"
                  min={1}
                  max={100}
                  name="age"
                  placeholder="Edad (Años)"
                  value={ageTeacher}
                  error={formError.age}
                  fluid
                  label="Edad (Años)"
                  icon={
                    formData.age ? (
                      <Icon name="calendar alternate" style={{ opacity: 1 }} />
                    ) : (
                      <Icon name="calendar alternate" />
                    )
                  }
                  iconPosition="left"
                  onChange={(e) => {
                    setAgeTeacher(e.target.value);
                    onChangeClearError(e);
                  }}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  type="text"
                  name="country"
                  placeholder="País"
                  error={formError.country}
                  fluid
                  label="País de Residencia"
                  icon={
                    formData.country ? (
                      <Icon name="font awesome flag" style={{ opacity: 1 }} />
                    ) : (
                      <Icon name="font awesome flag" />
                    )
                  }
                  iconPosition="left"
                  onChange={onChangeClearError}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  type="text"
                  name="departament"
                  placeholder="Departamento"
                  error={formError.departament}
                  fluid
                  label="Departamento de Residencia"
                  icon={
                    formData.departament ? (
                      <Icon name="font awesome flag" style={{ opacity: 1 }} />
                    ) : (
                      <Icon name="font awesome flag" />
                    )
                  }
                  iconPosition="left"
                  onChange={onChangeClearError}
                />
              </Form.Field>
              <Form.Field className="select-dropdown-special-field">
                {formData.genre ? (
                  <Icon
                    name="venus mars"
                    style={{ opacity: 1 }}
                    className="icon-special-select-dropdown"
                  />
                ) : (
                  <Icon
                    name="venus mars"
                    style={{ opacity: 0.42 }}
                    className="icon-special-select-dropdown"
                  />
                )}
                <Form.Select
                  name="gender"
                  placeholder="Género"
                  error={formError.genre}
                  fluid
                  label="Género"
                  options={genres}
                  onChange={(e, data) => {
                    setFormData({ ...formData, genre: data.value });
                    setFormError({ ...formError, genre: false });
                  }}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Form.Input
                  type="number"
                  name="weight"
                  placeholder="Peso"
                  error={formError.weight}
                  fluid
                  label="Peso (Opcional)"
                  icon={
                    formData.weight ? (
                      <Icon name="weight" style={{ opacity: 1 }} />
                    ) : (
                      <Icon name="weight" />
                    )
                  }
                  iconPosition="left"
                  onChange={onChangeClearError}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  type="number"
                  name="height"
                  placeholder="Altura"
                  error={formError.height}
                  fluid
                  label="Altura (Opcional)"
                  icon={
                    formData.height ? (
                      <Icon
                        name="arrows alternate vertical"
                        style={{ opacity: 1 }}
                      />
                    ) : (
                      <Icon name="arrows alternate vertical" />
                    )
                  }
                  iconPosition="left"
                  onChange={onChangeClearError}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  type="text"
                  name="email"
                  placeholder="Correo Electrónico"
                  error={formError.email}
                  fluid
                  label="Correo Electrónico (Opcional)"
                  icon={
                    formData.email ? (
                      <Icon name="at" style={{ opacity: 1 }} />
                    ) : (
                      <Icon name="at" />
                    )
                  }
                  iconPosition="left"
                  onChange={onChangeClearError}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Form.Input
                  type="text"
                  name="address"
                  placeholder="Dirección"
                  error={formError.address}
                  fluid
                  label="Dirección"
                  icon={
                    formData.address ? (
                      <Icon
                        name="map marker alternate"
                        style={{ opacity: 1 }}
                      />
                    ) : (
                      <Icon name="map marker alternate" />
                    )
                  }
                  iconPosition="left"
                  onChange={onChangeClearError}
                />
              </Form.Field>
            </Form.Group>
          </div>
        </Form>
        <Form
          className="add-teacher-form-3"
          size="small"
          onChange={onChange}
          onSubmit={onSubmit}
          key="3"
        >
          <div className="teacher-inputs-3">
            <Form.Group>
              <h2>INFORMACION ACADEMICA</h2>
            </Form.Group>
            <Form.Group>
              <Form.Field className="select-dropdown-special-field">
                {formData.educationLevel ? (
                  <Icon
                    name="users"
                    style={{ opacity: 1 }}
                    className="icon-special-select-dropdown-2"
                  />
                ) : (
                  <Icon
                    name="users"
                    style={{ opacity: 0.42 }}
                    className="icon-special-select-dropdown-2"
                  />
                )}
                <Form.Dropdown
                  name="educationLevel"
                  placeholder="Nivel de Educación"
                  search
                  fluid
                  label="Nivel de Educación"
                  selection
                  lazyLoad
                  options={educationLevel}
                  onChange={(e, data) => {
                    setFormData({ ...formData, educationLevel: data.value });
                    onSelectLevelEducation(data.value);
                    setFormError({ ...formError, educationLevel: false });
                  }}
                  error={formError.educationLevel}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field className="select-dropdown-special-field">
                {formData.subject ? (
                  <Icon
                    name="cube"
                    style={{ opacity: 1 }}
                    className="icon-special-select-dropdown-2"
                  />
                ) : (
                  <Icon
                    name="cube"
                    style={{ opacity: 0.42 }}
                    className="icon-special-select-dropdown-2"
                  />
                )}
                <Form.Dropdown
                  placeholder="Asignación de Materia"
                  name="subject"
                  search
                  fluid
                  label="Asignación de Materia"
                  selection
                  lazyLoads
                  scrolling
                  options={subjectList}
                  loading={isLoadingSubjectList}
                  className="dropdown-special"
                  onChange={(e, data) => {
                    setFormData({ ...formData, subject: data.value });
                    setFormError({ ...formError, subject: false });
                    setIdSubjectState(data.value);
                  }}
                  error={formError.subject}
                />
              </Form.Field>
            </Form.Group>
          </div>
          <div className="teacher-inputs-3">
            <Form.Group>
              <h2>INFORMACION DE USUARIO</h2>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Form.Input
                  type="text"
                  name="userName"
                  placeholder="Nombre de Usuario"
                  value={userNameState}
                  error={formError.userName}
                  fluid
                  label="Nombre de Usuario (Para la aplicación movíl)"
                  icon={
                    formData.userName ? (
                      <Icon name="user" style={{ opacity: 1 }} />
                    ) : (
                      <Icon name="user" />
                    )
                  }
                  iconPosition="left"
                  onChange={(e) => {
                    setUserNameState(e.target.value);
                    onChangeClearError(e);
                  }}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Form.Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña"
                  error={formError.password}
                  fluid
                  value={passwordState}
                  label="Contraseña"
                  iconPosition="left"
                  icon={
                    formData.password ? (
                      <Icon
                        name={showPassword ? "eye slash outline" : "eye"}
                        link
                        style={{ opacity: 1 }}
                        onClick={handlerShowPassword}
                      />
                    ) : (
                      <Icon
                        name={showPassword ? "eye slash outline" : "eye"}
                        link
                        onClick={handlerShowPassword}
                      />
                    )
                  }
                  onChange={(e) => {
                    onChangeClearError(e);
                    setPasswordState(e.target.value);
                  }}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field className="select-dropdown-special-field">
                {formData.statusAccount ? (
                  <Icon
                    name="cogs"
                    style={{ opacity: 1 }}
                    className="icon-special-select-dropdown"
                  />
                ) : (
                  <Icon
                    name="cogs"
                    style={{ opacity: 0.42 }}
                    className="icon-special-select-dropdown"
                  />
                )}
                <Form.Dropdown
                  placeholder="Estado de la Cuenta"
                  name="statusAccount"
                  search
                  fluid
                  label="Estado de la Cuenta"
                  selection
                  lazyLoad
                  options={statusAccountTeacher}
                  className="dropdown-special"
                  onChange={(e, data) => {
                    setFormData({ ...formData, statusAccount: data.value });
                    setFormError({ ...formError, statusAccount: false });
                  }}
                  error={formError.statusAccount}
                />
              </Form.Field>
            </Form.Group>
          </div>
        </Form>
        <Form
          className="add-teacher-form-4"
          size="small"
          onChange={onChange}
          onSubmit={onSubmit}
          key="4"
        >
          <div className="teacher-inputs-4">
            <Form.Group>
              <h2>INFORMACION DOCUMENTAL DEL PROFESOR</h2>
            </Form.Group>
            <Form.Group className="teacher-documents">
              <RenderDropzoneCarnet
                urlDocCarnet={urlDocCarnet}
                setUrlDocCarnet={setUrlDocCarnet}
                fileCarnet={fileCarnet}
                setFileCarnet={setFileCarnet}
              />
              <RenderDropzoneBirthCertificate
                urlDocBirthCertificate={urlDocBirthCertificate}
                setUrlDocBirthCertificate={setUrlDocBirthCertificate}
                fileBirthCertificate={fileBirthCertificate}
                setFileBirthCertificate={setFileBirthCertificate}
              />
            </Form.Group>
          </div>
        </Form>
        <Form
          className="add-teacher-form-5"
          size="small"
          onChange={onChange}
          onSubmit={onSubmit}
          key="5"
        >
          <div className="teacher-inputs-5">
            <Form.Group className="button-group-form">
              <Form.Button positive loading={isLoadingButton}>
                REGISTRAR ESTUDIANTE
              </Form.Button>
              {errorFinal && <p>{errorFinalText}</p>}
            </Form.Group>
          </div>
        </Form>
      </SliderForm>
    </>
  );
}

//FORM
function defaultValueForm() {
  return {
    carnet: "",
    firstName: "",
    secondName: "",
    fatherLastName: "",
    motherLastName: "",
    dateBirth: "",
    personalPhone: "",
    landLine: "",
    age: "",
    country: "",
    departament: "",
    genre: "",
    weight: "",
    height: "",
    email: "",
    address: "",
    educationLevel: "",
    subject: "",
    userName: "",
    password: "",
    statusAccount: "",
  };
}

function defaultValueFormError() {
  return {
    photoTeacher: false,
    carnet: false,
    firstName: false,
    secondName: false,
    fatherLastName: false,
    motherLastName: false,
    dateBirth: false,
    personalPhone: false,
    landLine: false,
    age: false,
    country: false,
    departament: false,
    genre: false,
    weight: false,
    height: false,
    email: false,
    address: false,
    educationLevel: false,
    grade: false,
    parallel: false,
    typeTeacher: false,
    userName: false,
    password: false,
    statusAccount: false,
  };
}

//Teacher
function RenderDropzoneCarnet(props) {
  const { urlDocCarnet, setUrlDocCarnet, fileCarnet, setFileCarnet } = props;

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileCarnet(file);
    setUrlDocCarnet(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf, image/jpeg, image/png",
    onKeyboard: true,
    onDrop,
  });

  return (
    <div className="content-main-dropzone">
      <h3>
        Carnet Fotocopia (Opcional)<br></br> Imagen o PDF
      </h3>
      <div className="content-dropzone-document">
        {!fileCarnet && <div {...getRootProps()} className="documents-hover" />}
        <Form.Field className="field-teacher-document">
          <div
            {...getRootProps()}
            className="document"
            style={{ backgroundImage: `url(${urlDocCarnet})` }}
          />
          <input {...getInputProps()} />
          {!urlDocCarnet && <Image src={PdfImage} />}
        </Form.Field>
      </div>
      <h4>{fileCarnet && fileCarnet.name}</h4>
    </div>
  );
}

function RenderDropzoneBirthCertificate(props) {
  const {
    urlDocBirthCertificate,
    setUrlDocBirthCertificate,
    fileBirthCertificate,
    setFileBirthCertificate,
  } = props;

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileBirthCertificate(file);
    setUrlDocBirthCertificate(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf, image/jpeg, image/png",
    onKeyboard: true,
    onDrop,
  });

  return (
    <div className="content-main-dropzone">
      <h3>
        Certificado de Nacimiento (Opcional)<br></br> Imagen o PDF
      </h3>
      <div className="content-dropzone-document">
        {!fileBirthCertificate && (
          <div {...getRootProps()} className="documents-hover" />
        )}
        <Form.Field className="field-teacher-document">
          <div
            {...getRootProps()}
            className="document"
            style={{ backgroundImage: `url(${urlDocBirthCertificate})` }}
          />
          <input {...getInputProps()} />
          {!urlDocBirthCertificate && <Image src={PdfImage} />}
        </Form.Field>
      </div>
      <h4>{fileBirthCertificate && fileBirthCertificate.name}</h4>
    </div>
  );
}
