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

import StudentDefault from "../../../assets/img/student.png";
import PdfImage from "../../../assets/img/pdfImage.png";

import "./AddStudentForm.scss";

const db = firebase.firestore(firebase);

export default function AddStudentForm(props) {
  const { setSliderRef, setActiveSlide, setUpdateData, onClose } = props;

  //FILES
  const [photoStudent, setPhotoStudent] = useState(null);
  const [file, setFile] = useState(null);
  const [urlDocRude, setUrlDocRude] = useState(null);
  const [fileRude, setFileRude] = useState(null);
  const [urlDocCarnet, setUrlDocCarnet] = useState(null);
  const [fileCarnet, setFileCarnet] = useState(null);
  const [urlDocCarnetTutor, setUrlDocCarnetTutor] = useState(null);
  const [fileCarnetTutor, setFileCarnetTutor] = useState(null);
  const [urlDocBirthCertificate, setUrlDocBirthCertificate] = useState(null);
  const [fileBirthCertificate, setFileBirthCertificate] = useState(null);
  const [urlDocBirthCertificateTutor, setUrlDocBirthCertificateTutor] =
    useState(null);
  const [fileBirthCertificateTutor, setFileBirthCertificateTutor] =
    useState(null);

  //DATES
  const [startDate, setStartDate] = useState(null);
  const [startDateTutor, setStartDateTutor] = useState(null);

  //FORMS
  const [formData, setFormData] = useState(defaultValueForm());
  const [formError, setFormError] = useState(defaultValueFormError());
  const [showPassword, setShowPassword] = useState(false);
  const [errorFinal, setErrorFinal] = useState(false);
  const [errorFinalText, setErrorFinalText] = useState("");


  //FORMS AUTOCOMPLETE INPUTS
  const [ageStudent, setAgeStudent] = useState(null);
  const [ageTutor, setAgeTutor] = useState(null);
  const [userNameState, setUserNameState] = useState(null);
  const [passwordState, setPasswordState] = useState(null);

  //LOADINGS
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoadingGradeList, setIsLoadingGradeList] = useState(false);
  const [isLoadingParallelList, setIsLoadingParallelList] = useState(false);

  //LISTS-DROPDOWN
  const [gradeList, setGradeList] = useState([]);
  const [parallelList, setParallelList] = useState([]);

  //STATE OF IDs
  const [classRoomId, setclassRoomId] = useState(null);
  const [educationLevelState, setEducationLevelState] = useState(null);

  const onSelectLevelEducation = (educationLevel) => {
    if (educationLevel) {
      setIsLoadingGradeList(true);
      db.collection("classRooms")
        .where("educationLevel", "==", educationLevel)
        .get()
        .then((response) => {
          const arrayClassRooms = [];
          arrayClassRooms.push({
            key: 0,
            value: null,
            text: "Eliga una opción",
          });
          map(response?.docs, (classRoom, index) => {
            const data = classRoom.data();
            if (data.currentState != "No Disponible") {
              arrayClassRooms.push({
                key: index + 1,
                value: data.grade,
                text: data.grade + " º " + educationLevel,
              });
            }
          });
          const arrayClassRoomsFilter = removeArrayDuplicatesObjectOrderByValue(
            arrayClassRooms,
            "text"
          );
          setEducationLevelState(educationLevel);
          setGradeList(arrayClassRoomsFilter);
        })
        .catch((err) => {})
        .finally(() => {
          setIsLoadingGradeList(false);
        });
    }
  };

  const onSelectGradeClassRoom = (grade, educationLevel) => {
    if (grade && educationLevel) {
      setIsLoadingParallelList(true);
      db.collection("classRooms")
        .where("grade", "==", grade)
        .where("educationLevel", "==", educationLevel)
        .get()
        .then((response) => {
          const arrayParallels = [];
          arrayParallels.push({
            key: 0,
            value: null,
            text: "Eliga una opción",
          });
          map(response?.docs, (parallel) => {
            const data = parallel.data();
            if (data.currentState != "No Disponible") {
              arrayParallels.push({
                key: parallel.id,
                value: parallel.id,
                text: "Paralelo " + data.parallel,
              });
            }
          });
          setParallelList(arrayParallels);
        })
        .catch((err) => {})
        .finally(() => {
          setIsLoadingParallelList(false);
        });
    }
  };

  const onSelectParallel = (parallel) => {
    setclassRoomId(parallel);
  };

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    setPhotoStudent(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onKeyboard: true,
    onDrop,
  });

  const uploadPhotoStudent = (fileName) => {
    const ref = firebase.storage().ref().child(`photoStudents/${fileName}`);
    return ref.put(file);
  };
  const uploadRudeStudent = (fileName) => {
    const ref = firebase.storage().ref().child(`rudeStudents/${fileName}`);
    return ref.put(fileRude);
  };
  const uploadCarnetStudent = (fileName) => {
    const ref = firebase.storage().ref().child(`carnetStudents/${fileName}`);
    return ref.put(fileCarnet);
  };
  const uploadBirthCertificateStudent = (fileName) => {
    const ref = firebase
      .storage()
      .ref()
      .child(`birthCertificateStudents/${fileName}`);
    return ref.put(fileBirthCertificate);
  };
  const uploadCarnetTutor = (fileName) => {
    const ref = firebase.storage().ref().child(`carnetTutors/${fileName}`);
    return ref.put(fileCarnetTutor);
  };
  const uploadBirthCertificateTutor = (fileName) => {
    const ref = firebase
      .storage()
      .ref()
      .child(`birthCertificateTutors/${fileName}`);
    return ref.put(fileBirthCertificateTutor);
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

  const typeStudent = [
    { key: "1", value: null, text: "Eliga una opción" },
    { key: "2", value: "Antiguo", text: "Antiguo" },
    { key: "3", value: "Nuevo", text: "Nuevo" },
    { key: "4", value: "Intercambio", text: "Intercambio" },
  ];

  const statusAccountStudent = [
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
      errorsAux.photoStudent = true;
      textErrorFinalAux += "*La foto del Estudiante es errónea.\n";
    }
    if (!formData.carnet || formData.carnet.length < 6) {
      formOkAux = false;
      errorsAux.carnet = true;
      textErrorFinalAux +=
        "*El Carnet de Identidad del Estudiante es erróneo.\n";
    }
    if (!formData.firstName) {
      formOkAux = false;
      errorsAux.firstName = true;
      textErrorFinalAux += "*El Primer Nombre del Estudiante es erróneo.\n";
    }
    if (!formData.fatherLastName) {
      formOkAux = false;
      errorsAux.fatherLastName = true;
      textErrorFinalAux += "*El Apellido Paterno del Estudiante es erróneo.\n";
    }
    if (!formData.motherLastName) {
      formOkAux = false;
      errorsAux.motherLastName = true;
      textErrorFinalAux += "*El Apellido Materno del Estudiante es erróneo.\n";
    }
    if (!formData.dateBirth) {
      formOkAux = false;
      errorsAux.dateBirth = true;
      textErrorFinalAux +=
        "*La Fecha de Nacimiento del Estudiante es erróneo.\n";
    }
    if (!formData.personalPhone) {
      formOkAux = false;
      errorsAux.personalPhone = true;
      textErrorFinalAux += "*El Teléfono Personal del Estudiante es erróneo.\n";
    }
    //INFORMACION ADICIONAL
    if (!formData.age) {
      formOkAux = false;
      errorsAux.age = true;
      textErrorFinalAux += "*La Edad del Estudiante es erróneo.\n";
    }
    if (!formData.country) {
      formOkAux = false;
      errorsAux.country = true;
      textErrorFinalAux +=
        "*El Pais de Residencia del Estudiante es erróneo.\n";
    }
    if (!formData.departament) {
      formOkAux = false;
      errorsAux.departament = true;
      textErrorFinalAux +=
        "*El Departamento de Residencia del Estudiante es erróneo.\n";
    }
    if (!formData.genre) {
      formOkAux = false;
      errorsAux.genre = true;
      textErrorFinalAux += "*El Género del Estudiante es erróneo.\n";
    }
    if (!formData.address) {
      formOkAux = false;
      errorsAux.address = true;
      textErrorFinalAux +=
        "*La Dirección de Residencia del Estudiante es erróneo.\n";
    }
    if (formData.email) {
      if (!validateEmail(formData.email)) {
        formOkAux = false;
        errorsAux.email = true;
        textErrorFinalAux +=
          "*El Correo Eléctronico del Estudiante es erróneo.\n";
      }
    }

    //INFORMACION ACADEMICA
    if (!formData.educationLevel) {
      formOkAux = false;
      errorsAux.educationLevel = true;
      textErrorFinalAux +=
        "*El Nivel de Educación del Estudiante es erróneo.\n";
    }
    if (!formData.grade) {
      formOkAux = false;
      errorsAux.grade = true;
      textErrorFinalAux += "*El Grado del Curso del Estudiante es erróneo.\n";
    }
    if (!formData.parallel) {
      formOkAux = false;
      errorsAux.parallel = true;
      textErrorFinalAux += "*El Grado del Curso del Estudiante es erróneo.\n";
    }
    if (!formData.typeStudent) {
      formOkAux = false;
      errorsAux.typeStudent = true;
      textErrorFinalAux +=
        "*El Tipo de Estudiante del Estudiante es erróneo.\n";
    }
    if (!formData.userName) {
      formOkAux = false;
      errorsAux.userName = true;
      textErrorFinalAux += "*El Nombre de Usuario del Estudiante es erróneo.\n";
    }
    if (!formData.password) {
      formOkAux = false;
      errorsAux.password = true;
      textErrorFinalAux +=
        "*La Contraseña de la Cuenta del Estudiante es erróneo.\n";
    }
    if (!formData.statusAccount) {
      formOkAux = false;
      errorsAux.statusAccount = true;
      textErrorFinalAux +=
        "*El Estado de la Cuenta del Estudiante es erróneo.\n";
    }

    //INFORMACION DEL TUTOR
    if (!formData.carnetTutor || formData.carnet.length < 6) {
      formOkAux = false;
      errorsAux.carnetTutor = true;
      textErrorFinalAux += "*El Carnet de Identidad del Tutor es erróneo.\n";
    }
    if (!formData.namesTutor) {
      formOkAux = false;
      errorsAux.namesTutor = true;
      textErrorFinalAux += "*Los Nombres del Tutor son erróneos.\n";
    }
    if (!formData.lastNamesTutor) {
      formOkAux = false;
      errorsAux.lastNamesTutor = true;
      textErrorFinalAux += "*Los Apellidos del Tutor es erróneos.\n";
    }
    if (!formData.rolTutor) {
      formOkAux = false;
      errorsAux.rolTutor = true;
      textErrorFinalAux += "*El Rol del Tutor es erróneo.\n";
    }
    if (!formData.jobTutor) {
      formOkAux = false;
      errorsAux.jobTutor = true;
      textErrorFinalAux += "*La Ocupación del Tutor es erróneo.\n";
    }
    if (!formData.dateBirthTutor) {
      formOkAux = false;
      errorsAux.dateBirthTutor = true;
      textErrorFinalAux += "*La Fecha de Nacimiento del Tutor es erróneo.\n";
    }
    if (!formData.ageTutor) {
      formOkAux = false;
      errorsAux.ageTutor = true;
      textErrorFinalAux += "*La Edad del Tutor es erróneo.\n";
    }
    if (formData.emailTutor) {
      if (!validateEmail(formData.emailTutor)) {
        formOkAux = false;
        errorsAux.emailTutor = true;
        textErrorFinalAux += "*El Correo Eléctronico del Tutor es erróneo.\n";
      }
    }
    if (!formData.addressTutor) {
      formOkAux = false;
      errorsAux.addressTutor = true;
      textErrorFinalAux +=
        "*La Dirección de Residencia del Tutor es erróneo.\n";
    }
    if (!formData.personalPhoneTutor) {
      formOkAux = false;
      errorsAux.personalPhoneTutor = true;
      textErrorFinalAux += "*El Telefono Personal del Tutor es erróneo.\n";
    }
    if (!formData.countryTutor) {
      formOkAux = false;
      errorsAux.countryTutor = true;
      textErrorFinalAux += "*El País de Residencia del Tutor es erróneo.\n";
    }
    if (!formData.departamentTutor) {
      formOkAux = false;
      errorsAux.departamentTutor = true;
      textErrorFinalAux +=
        "*El Departamento de Residencia del Tutor es erróneo.\n";
    }
    setFormError(errorsAux);
    setErrorFinalText(textErrorFinalAux);
    setErrorFinal(!formOkAux);
    if (formOkAux) {
      toast.info("Registrando al Estudiante...", {
        transition: Zoom,
      });
      setIsLoadingButton(true);
      const fileNamePhoto = uuidv4();
      const fileNameRude = uuidv4();
      const fileNameCarnet = uuidv4();
      const fileNameBirthCertificate = uuidv4();
      const fileNameCarnetTutor = uuidv4();
      const fileNameBirthCertificateTutor = uuidv4();

      db.collection("students")
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
          typeStudent: formData.typeStudent,
          studentStatus: "Disponible",
          filePhotoId: fileNamePhoto,
          fileRudeId: fileRude ? fileNameRude : "",
          fileCarnetId: fileCarnet ? fileNameCarnet : "",
          fileBirthCertificateId: fileBirthCertificate
            ? fileNameBirthCertificate
            : "",
          classRoomId: classRoomId,
          tutorId: formData.carnetTutor,
        })
        .then(() => {
          toast.info("Registrando al Tutor del Estudiante...", {
            transition: Zoom,
          });
          db.collection("tutorsStudents")
            .doc(formData.carnetTutor)
            .set({
              id: formData.carnetTutor,
              names: formData.namesTutor,
              lastNames: formData.lastNamesTutor,
              role: formData.rolTutor,
              job: formData.jobTutor,
              email: formData.emailTutor ? formData.emailTutor : "",
              address: formData.addressTutor,
              age: parseInt(formData.ageTutor),
              dateBirth: formData.dateBirthTutor,
              personalPhone: formData.personalPhoneTutor,
              landPhone: formData.landLineTutor ? formData.landLineTutor : "",
              country: formData.countryTutor,
              departament: formData.departamentTutor,
              fileCarnetId: fileCarnetTutor ? fileNameCarnetTutor : "",
              fileBirthCertificateId: fileBirthCertificateTutor
                ? fileNameBirthCertificateTutor
                : "",
              accountId: formData.carnetTutor,
            })
            .then(() => {
              toast.info("Creando cuenta del Estudiante...", {
                transition: Zoom,
              });
              db.collection("accounts")
                .doc(formData.carnetTutor)
                .set({
                  userName: formData.userName,
                  password: formData.password,
                  status: formData.statusAccount,
                  creationDate: moment().format("MMMM Do YYYY, HH:mm:ss"),
                  typeUser: "Tutor",
                })
                .then(() => {
                  toast.warn(
                    "Guardando Documentos y Fotos del Estudiante. Este proceso puede tardar, porfavor espere...",
                    {
                      transition: Zoom,
                    }
                  );
                  uploadPhotoStudent(fileNamePhoto).then(() => {
                    //STUDENTS
                    (async () => {
                      try {
                        fileCarnet &&
                          (await uploadCarnetStudent(fileNameCarnet));
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
                        fileRude && (await uploadRudeStudent(fileNameRude));
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
                          (await uploadBirthCertificateStudent(
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

                    //TUTORS
                    (async () => {
                      try {
                        fileCarnetTutor &&
                          (await uploadCarnetTutor(fileNameCarnetTutor));
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
                        fileBirthCertificateTutor &&
                          (await uploadBirthCertificateTutor(
                            fileNameBirthCertificateTutor
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
                    toast.success("El Estudiante fue registrado con éxito", {
                      transition: Zoom,
                    });
                    setUpdateData(true);
                    onClose();
                  });
                });
            });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error al Registrar al Estudiante");
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

  const dateBirthFormatTimeStamp = (date) => {
    return new Date(date);
  };

  return (
    <>
      <SliderForm setSliderRef={setSliderRef} setActiveSlide={setActiveSlide}>
        <Form
          className="add-student-form"
          size="small"
          onChange={onChange}
          onSubmit={onSubmit}
          key="1"
        >
          <Form.Group className="student-photo">
            {!file && <div {...getRootProps()} className="photo-hover" />}
            <Form.Field
              className="field-student-photo"
              error={formError.photoStudent}
            >
              <div
                {...getRootProps()}
                className="photo"
                style={{ backgroundImage: `url(${photoStudent})` }}
              />
              <input {...getInputProps()} />
              {!photoStudent && <Image src={StudentDefault} />}
            </Form.Field>
          </Form.Group>
          <div className="student-inputs">
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
                        setStartDate(date);
                        setFormError({ ...formError, dateBirth: false });
                        setAgeStudent(calcAge(date));
                        setFormData({
                          ...formData,
                          dateBirth: dateBirthFormatTimeStamp(date),
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
          className="add-student-form-2"
          size="small"
          onChange={onChange}
          onSubmit={onSubmit}
          key="2"
        >
          <div className="student-inputs-2">
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
                  value={ageStudent}
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
                    setAgeStudent(e.target.value);
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
          className="add-student-form-3"
          size="small"
          onChange={onChange}
          onSubmit={onSubmit}
          key="3"
        >
          <div className="student-inputs-3">
            <Form.Group>
              <h2>INFORMACION DEL TUTOR</h2>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Form.Input
                  type="number"
                  min={0}
                  name="carnetTutor"
                  placeholder="Carnet de Identidad"
                  error={formError.carnetTutor}
                  fluid
                  label="Carnet de Identidad (Tutor)"
                  icon={
                    formData.carnetTutor ? (
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
                  name="namesTutor"
                  placeholder="Nombres (Tutor)"
                  error={formError.namesTutor}
                  fluid
                  label="Nombres (Tutor)"
                  icon={
                    formData.namesTutor ? (
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
                  name="lastNamesTutor"
                  placeholder="Apellidos (Tutor)"
                  error={formError.lastNamesTutor}
                  fluid
                  label="Apellidos (Tutor)"
                  icon={
                    formData.lastNamesTutor ? (
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
                  name="rolTutor"
                  placeholder="Rol (Tutor)"
                  error={formError.rolTutor}
                  fluid
                  label="Rol (Ejemplo: Padre)"
                  icon={
                    formData.rolTutor ? (
                      <Icon name="user secret" style={{ opacity: 1 }} />
                    ) : (
                      <Icon name="user secret" />
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
                  name="jobTutor"
                  placeholder="Ocupación (Tutor)"
                  error={formError.jobTutor}
                  fluid
                  label="Ocupación (Tutor)"
                  icon={
                    formData.jobTutor ? (
                      <Icon name="briefcase" style={{ opacity: 1 }} />
                    ) : (
                      <Icon name="briefcase" />
                    )
                  }
                  iconPosition="left"
                  onChange={onChangeClearError}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  type="text"
                  name="emailTutor"
                  placeholder="Correo Electrónico (Tutor)"
                  error={formError.emailTutor}
                  fluid
                  label="Correo Electrónico (Tutor) (Opcional)"
                  icon={
                    formData.emailTutor ? (
                      <Icon name="at" style={{ opacity: 1 }} />
                    ) : (
                      <Icon name="at" />
                    )
                  }
                  iconPosition="left"
                  onChange={onChangeClearError}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  type="text"
                  error={formError.dateBirthTutor}
                  fluid
                  label="Fecha de Nacimiento (Tutor)"
                >
                  {formData.dateBirthTutor ? (
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
                      value={startDateTutor}
                      onChange={(date) => {
                        setStartDateTutor(date);
                        setFormError({ ...formError, dateBirthTutor: false });
                        setAgeTutor(calcAge(date));
                        setFormData({
                          ...formData,
                          dateBirthTutor: dateBirthFormatTimeStamp(date),
                          ageTutor: calcAge(date),
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
                  min={1}
                  max={100}
                  name="ageTutor"
                  placeholder="Edad (Años)"
                  value={ageTutor}
                  error={formError.ageTutor}
                  fluid
                  label="Edad (Años) (Tutor)"
                  icon={
                    formData.ageTutor ? (
                      <Icon name="calendar alternate" style={{ opacity: 1 }} />
                    ) : (
                      <Icon name="calendar alternate" />
                    )
                  }
                  iconPosition="left"
                  onChange={(e) => {
                    setAgeTutor(e.target.value);
                    onChangeClearError(e);
                  }}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Form.Input
                  type="text"
                  name="addressTutor"
                  placeholder="Dirección (Tutor)"
                  error={formError.addressTutor}
                  fluid
                  label="Dirección de Residencia"
                  icon={
                    formData.addressTutor ? (
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
          className="add-student-form-4"
          size="small"
          onChange={onChange}
          onSubmit={onSubmit}
          key="4"
        >
          <div className="student-inputs-4">
            <Form.Group>
              <h2>INFORMACION DEL TUTOR</h2>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Form.Input
                  type="number"
                  min={0}
                  step="false"
                  name="personalPhoneTutor"
                  placeholder="Teléfono Celular"
                  error={formError.personalPhoneTutor}
                  fluid
                  label="Teléfono Celular (Tutor)"
                  icon={
                    formData.personalPhoneTutor ? (
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
                  name="landLineTutor"
                  placeholder="Teléfono Fijo"
                  error={formError.landLineTutor}
                  fluid
                  label="Teléfono Fijo  (Tutor) (Opcional)"
                  icon={
                    formData.landLineTutor ? (
                      <Icon name="phone" style={{ opacity: 1 }} />
                    ) : (
                      <Icon name="phone" />
                    )
                  }
                  iconPosition="left"
                  onChange={onChangeClearError}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  type="text"
                  name="countryTutor"
                  placeholder="País"
                  error={formError.countryTutor}
                  fluid
                  label="País de Residencia (Tutor)"
                  icon={
                    formData.countryTutor ? (
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
                  name="departamentTutor"
                  placeholder="Departamento"
                  error={formError.departamentTutor}
                  fluid
                  label="Departamento de Residencia (Tutor)"
                  icon={
                    formData.departamentTutor ? (
                      <Icon name="font awesome flag" style={{ opacity: 1 }} />
                    ) : (
                      <Icon name="font awesome flag" />
                    )
                  }
                  iconPosition="left"
                  onChange={onChangeClearError}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group className="student-documents">
              <RenderDropzoneCarnetTutor
                urlDocCarnetTutor={urlDocCarnetTutor}
                setUrlDocCarnetTutor={setUrlDocCarnetTutor}
                fileCarnetTutor={fileCarnetTutor}
                setFileCarnetTutor={setFileCarnetTutor}
              />
              <RenderDropzoneBirthCertificateTutor
                urlDocBirthCertificateTutor={urlDocBirthCertificateTutor}
                setUrlDocBirthCertificateTutor={setUrlDocBirthCertificateTutor}
                fileBirthCertificateTutor={fileBirthCertificateTutor}
                setFileBirthCertificateTutor={setFileBirthCertificateTutor}
              />
            </Form.Group>
          </div>
        </Form>
        <Form
          className="add-student-form-5"
          size="small"
          onChange={onChange}
          onSubmit={onSubmit}
          key="5"
        >
          <div className="student-inputs-5">
            <Form.Group>
              <h2>INFORMACION ACADEMICA</h2>
            </Form.Group>
            <Form.Group>
              <Form.Field className="select-dropdown-special-field">
                {formData.educationLevel ? (
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
                  name="educationLevel"
                  placeholder="Nivel de Educación"
                  search
                  fluid
                  label="Nivel de Educación"
                  selection
                  lazyLoad
                  scrolling
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
                {formData.grade ? (
                  <Icon
                    name="sitemap"
                    style={{ opacity: 1 }}
                    className="icon-special-select-dropdown"
                  />
                ) : (
                  <Icon
                    name="sitemap"
                    style={{ opacity: 0.42 }}
                    className="icon-special-select-dropdown"
                  />
                )}
                <Form.Dropdown
                  placeholder="Grado del Curso"
                  name="grade"
                  search
                  fluid
                  label="Grado del Curso"
                  selection
                  lazyLoad
                  scrolling
                  options={gradeList}
                  loading={isLoadingGradeList}
                  onChange={(e, data) => {
                    setFormData({ ...formData, grade: data.value });
                    onSelectGradeClassRoom(data.value, educationLevelState);
                    setFormError({ ...formError, grade: false });
                  }}
                  error={formError.grade}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field className="select-dropdown-special-field">
                {formData.parallel ? (
                  <Icon
                    name="code branch"
                    style={{ opacity: 1 }}
                    className="icon-special-select-dropdown"
                  />
                ) : (
                  <Icon
                    name="code branch"
                    style={{ opacity: 0.42 }}
                    className="icon-special-select-dropdown"
                  />
                )}
                <Form.Dropdown
                  placeholder="Paralelo"
                  name="parallel"
                  search
                  fluid
                  label="Paralelo"
                  selection
                  lazyLoad
                  scrolling
                  options={parallelList}
                  className="dropdown-special"
                  onChange={(e, data) => {
                    setFormData({ ...formData, parallel: data.value });
                    setFormError({ ...formError, parallel: false });
                    onSelectParallel(data.value);
                  }}
                  error={formError.parallel}
                />
              </Form.Field>
              <Form.Field className="select-dropdown-special-field">
                {formData.typeStudent ? (
                  <Icon
                    name="student"
                    style={{ opacity: 1 }}
                    className="icon-special-select-dropdown"
                  />
                ) : (
                  <Icon
                    name="student"
                    style={{ opacity: 0.42 }}
                    className="icon-special-select-dropdown"
                  />
                )}
                <Form.Dropdown
                  placeholder="Tipo de Estudiante"
                  name="typeStudent"
                  search
                  fluid
                  label="Tipo de Estudiante"
                  selection
                  lazyLoad
                  options={typeStudent}
                  loading={isLoadingParallelList}
                  className="dropdown-special"
                  onChange={(e, data) => {
                    setFormData({ ...formData, typeStudent: data.value });
                    setFormError({ ...formError, typeStudent: false });
                  }}
                  error={formError.typeStudent}
                />
              </Form.Field>
            </Form.Group>
          </div>
          <div className="student-inputs-5">
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
                  value={passwordState}
                  error={formError.password}
                  fluid
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
                    setUserNameState(e.target.value);
                    onChangeClearError(e);
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
                  options={statusAccountStudent}
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
          className="add-student-form-6"
          size="small"
          onChange={onChange}
          onSubmit={onSubmit}
          key="6"
        >
          <div className="student-inputs-6">
            <Form.Group>
              <h2>INFORMACION DOCUMENTAL DEL ESTUDIANTE</h2>
            </Form.Group>
            <Form.Group className="student-documents">
              <RenderDropzoneRude
                urlDocRude={urlDocRude}
                setUrlDocRude={setUrlDocRude}
                fileRude={fileRude}
                setFileRude={setFileRude}
              />
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
          className="add-student-form-7"
          size="small"
          onChange={onChange}
          onSubmit={onSubmit}
          key="7"
        >
          <div className="student-inputs-7">
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
    firstName: "",
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
    grade: "",
    parallel: "",
    typeStudent: "",
    userName: "",
    password: "",
    statusAccount: "",
    carnetTutor: "",
    namesTutor: "",
    lastNamesTutor: "",
    rolTutor: "",
    jobTutor: "",
    emailTutor: "",
    dateBirthTutor: "",
    ageTutor: "",
    addressTutor: "",
    personalPhoneTutor: "",
    landLineTutor: "",
    countryTutor: "",
    departamentTutor: "",
  };
}

function defaultValueFormError() {
  return {
    photoStudent: false,
    carnet: false,
    firstName: false,
    secondName: false,
    fatherLastName: false,
    motherLastName: false,
    dateBirth: false,
    personalPhone: false,
    firstName: false,
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
    typeStudent: false,
    userName: false,
    password: false,
    statusAccount: false,
    carnetTutor: false,
    namesTutor: false,
    lastNamesTutor: false,
    rolTutor: false,
    jobTutor: false,
    emailTutor: false,
    dateBirthTutor: false,
    ageTutor: false,
    addressTutor: false,
    personalPhoneTutor: false,
    landLineTutor: false,
    countryTutor: false,
    departamentTutor: false,
  };
}

//STUDENT
function RenderDropzoneRude(props) {
  const { urlDocRude, setUrlDocRude, fileRude, setFileRude } = props;

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileRude(file);
    setUrlDocRude(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf, image/jpeg, image/png",
    onKeyboard: true,
    onDrop,
  });

  return (
    <div className="content-main-dropzone">
      <h3>
        Rude estudiantil (Opcional)<br></br> Imagen o PDF
      </h3>
      <div className="content-dropzone-document">
        {!fileRude && <div {...getRootProps()} className="documents-hover" />}
        <Form.Field className="field-student-document">
          <div
            {...getRootProps()}
            className="document"
            style={{ backgroundImage: `url(${urlDocRude})` }}
          />
          <input {...getInputProps()} />
          {!urlDocRude && <Image src={PdfImage} />}
        </Form.Field>
      </div>
      <h4>{fileRude && fileRude.name}</h4>
    </div>
  );
}

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
        <Form.Field className="field-student-document">
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
        <Form.Field className="field-student-document">
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

//TUTOR
function RenderDropzoneCarnetTutor(props) {
  const {
    urlDocCarnetTutor,
    setUrlDocCarnetTutor,
    fileCarnetTutor,
    setFileCarnetTutor,
  } = props;

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileCarnetTutor(file);
    setUrlDocCarnetTutor(URL.createObjectURL(file));
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
        {!fileCarnetTutor && (
          <div {...getRootProps()} className="documents-hover" />
        )}
        <Form.Field className="field-student-document">
          <div
            {...getRootProps()}
            className="document"
            style={{ backgroundImage: `url(${urlDocCarnetTutor})` }}
          />
          <input {...getInputProps()} />
          {!urlDocCarnetTutor && <Image src={PdfImage} />}
        </Form.Field>
      </div>
      <h4>{fileCarnetTutor && fileCarnetTutor.name}</h4>
    </div>
  );
}

function RenderDropzoneBirthCertificateTutor(props) {
  const {
    urlDocBirthCertificateTutor,
    setUrlDocBirthCertificateTutor,
    fileBirthCertificateTutor,
    setFileBirthCertificateTutor,
  } = props;

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileBirthCertificateTutor(file);
    setUrlDocBirthCertificateTutor(URL.createObjectURL(file));
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
        {!fileBirthCertificateTutor && (
          <div {...getRootProps()} className="documents-hover" />
        )}
        <Form.Field className="field-student-document">
          <div
            {...getRootProps()}
            className="document"
            style={{ backgroundImage: `url(${urlDocBirthCertificateTutor})` }}
          />
          <input {...getInputProps()} />
          {!urlDocBirthCertificateTutor && <Image src={PdfImage} />}
        </Form.Field>
      </div>
      <h4>{fileBirthCertificateTutor && fileBirthCertificateTutor.name}</h4>
    </div>
  );
}
