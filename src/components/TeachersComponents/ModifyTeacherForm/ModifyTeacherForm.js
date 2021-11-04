import React, { useState, useEffect, useCallback } from "react";
import { Form, Image, Icon } from "semantic-ui-react";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useDropzone } from "react-dropzone";
import { toast, Zoom } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { map, size } from "lodash-es";

import SliderForm from "../../Sliders/SliderForm";
import LoadingForm from "../../Loadings/LoadingForm";
import firebase from "../../../utils/firebase";
import { removeArrayDuplicatesObjectOrderByValue } from "../../../utils/arrayFunctions";
import { validateEmail } from "../../../utils/validations";

import "firebase/firestore";
import "firebase/storage";

import TeacherDefault from "../../../assets/img/teacher.png";
import PdfImage from "../../../assets/img/pdfImage.png";

import "./ModifyTeacherForm.scss";

const db = firebase.firestore(firebase);

export default function ModifyTeacherForm(props) {
  const {
    teacher,
    setSliderRef,
    setActiveSlide,
    isLoadingInfo,
    setIsLoadingInfo,
    setUpdateData,
    onClose,
  } = props;

  //DOCUMENTS OF USEEFFECT, QUERY TO DATABASE
  const [photoTeacher, setPhotoTeacher] = useState(null);
  const [carnetTeacher, setCarnetTeacher] = useState(null);
  const [birthCertificateTeacher, setBirthCertificateTeacher] = useState(null);

  //INFO OF USEEFFECT, QUERY TO DATABASE
  const [subjectInfo, setSubjectInfo] = useState({});
  const [accountInfo, setAccountInfo] = useState({});

  //FILES
  const [file, setFile] = useState(null);
  const [fileCarnet, setFileCarnet] = useState(null);
  const [fileBirthCertificate, setFileBirthCertificate] = useState(null);

  //FORMS
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState(defaultValueFormError());
  const [formDataModify, setFormDataModify] = useState(
    defaultValueFormModify()
  );

  const [showPassword, setShowPassword] = useState(false);
  const [errorFinal, setErrorFinal] = useState(false);
  const [errorFinalText, setErrorFinalText] = useState("");

  //DATES
  const [startDate, setStartDate] = useState(null);

  //LOADINGS
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoadingSubjectList, setIsLoadingSubjectList] = useState(false);

  //LISTS-DROPDOWN
  const [subjectList, setSubjectList] = useState([]);

  //STATE OF IDs
  const [idSubjectState, setIdSubjectState] = useState(null);

  console.log("INFO_TEACHER", teacher);
  // console.log("INFO_SUBJECT", subjectInfo);
  // console.log("INFO_ACCOUNT", accountInfo);
  // console.log("PHOTO_TEACHER", photoTeacher);
  // console.log("CARNET_TEACHER", carnetTeacher);
  // console.log("CERTIFICADO_TEACHER", birthCertificateTeacher);
  // console.log("RUDE_STUDENT", rudeStudent);
  // console.log("CARNET_TUTOR", carnetTutor);
  // console.log("CERTIFICADO_TUTOR", birthCertificateTutor);

  console.log("FORM_DATA", formData);
  console.log("FORM_DATA_MODIFY", formDataModify);

  // console.log("CARNET TUTOR: ", fileCarnetTutor);
  // console.log("CERTIFICADO TUTOR: ", fileBirthCertificateTutor);

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

  useEffect(() => {
    (async () => {
      setIsLoadingInfo(true);
      try {
        var accountIdForTeacher = teacher.accountId;
        var subjectInfoAux = null;
        var accountsInfoAux = null;
        //PHOTO
        if (teacher.filePhotoId) {
          const filePhotoTeacher = teacher.filePhotoId;
          await firebase
            .storage()
            .ref(`photoTeachers/${filePhotoTeacher}`)
            .getDownloadURL()
            .then((response) => {
              setPhotoTeacher(response);
            })
            .catch((err) => {
              toast.error(
                "Hubo un error al buscar la foto de perfil del profesor",
                {
                  transition: Zoom,
                }
              );
            });
        }

        //CARNET
        if (teacher.fileCarnetId) {
          const fileCarnetTeacher = teacher.fileCarnetId;
          await firebase
            .storage()
            .ref(`carnetTeachers/${fileCarnetTeacher}`)
            .getDownloadURL()
            .then((response) => {
              setCarnetTeacher(response);
            })
            .catch((err) => {
              toast.error("Hubo un error al buscar el carnet del profesor", {
                transition: Zoom,
              });
            });
        }

        //BIRTH_CERTIFICATE
        if (teacher.fileBirthCertificateId) {
          const fileBirthCertificateTeacher = teacher.fileBirthCertificateId;
          await firebase
            .storage()
            .ref(`birthCertificateTeachers/${fileBirthCertificateTeacher}`)
            .getDownloadURL()
            .then((response) => {
              setBirthCertificateTeacher(response);
            })
            .catch((err) => {
              toast.error(
                "Hubo un error al buscar el certificado de nacimiento del profesor",
                {
                  transition: Zoom,
                }
              );
            });
        }

        //SUBJECT
        await db
          .collection("school_material")
          .doc(teacher.subjectId)
          .get()
          .then((response) => {
            subjectInfoAux = response.data();
            onSelectLevelEducation(response.data().educationLevel);
            setSubjectInfo(response.data());
          })
          .catch((err) => {
            toast.error(
              "La Materia del Profesor no existe o hubo un error de conexión!!",
              {
                transition: Zoom,
              }
            );
          });

        //ACCOUNTS
        await db
          .collection("accounts")
          .doc(accountIdForTeacher)
          .get()
          .then((response) => {
            accountsInfoAux = response.data();
            setAccountInfo(response.data());
          })
          .catch((err) => {
            toast.error(
              "La cuenta del profesor no existe o hubo un error de conexión!!",
              {
                transition: Zoom,
              }
            );
          });

        await setFormData(
          defaultValueForm(teacher, subjectInfoAux, accountsInfoAux)
        );
        await setStartDate(dateBirthFormat(teacher.dateBirth.seconds));
      } catch {
        toast.error("Hubo un problema al traer la informacion del profesor", {
          transition: Zoom,
        });
      } finally {
        setIsLoadingInfo(false);
      }
    })();
  }, []);

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

  const validateInfoTeacher = (
    valueIndex1,
    valueIndex2,
    valueIndexResult,
    form,
    initial,
    result
  ) => {
    if (valueIndex1 === "genre") {
      if (
        form[valueIndex1] !== initial[valueIndex2] &&
        form[valueIndex1] != ""
      ) {
        result[valueIndexResult] = form[valueIndex1];
      }
    } else {
      if (
        form[valueIndex1] != initial[valueIndex2] &&
        form[valueIndex1] != ""
      ) {
        result[valueIndexResult] = form[valueIndex1];
      }
    }
  };

  const validateInfoTeacherFragmentCode = (
    formDataModify,
    initialFormAuxStudentInfo,
    changeFormAuxStudentInfo
  ) => {
    validateInfoTeacher(
      "firstName",
      "firstName",
      "firstName",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoTeacher(
      "secondName",
      "secondName",
      "secondName",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoTeacher(
      "fatherLastName",
      "fatherLastName",
      "fatherLastName",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoTeacher(
      "motherLastName",
      "motherLastName",
      "motherLastName",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoTeacher(
      "dateBirth",
      "dateBirth",
      "dateBirth",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoTeacher(
      "personalPhone",
      "personalPhone",
      "personalPhone",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoTeacher(
      "landPhone",
      "landPhone",
      "landPhone",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoTeacher(
      "age",
      "age",
      "age",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoTeacher(
      "country",
      "country",
      "country",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoTeacher(
      "departament",
      "departament",
      "departament",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoTeacher(
      "genre",
      "genre",
      "gender",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoTeacher(
      "email",
      "email",
      "email",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoTeacher(
      "address",
      "address",
      "address",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoTeacher(
      "height",
      "height",
      "height",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoTeacher(
      "weight",
      "weight",
      "weight",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoTeacher(
      "typeStudent",
      "typeStudent",
      "typeStudent",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
  };

  const validateInfoAccount = (
    valueIndex1,
    valueIndex2,
    valueIndexResult,
    form,
    initial,
    result
  ) => {
    if (form[valueIndex1] != initial[valueIndex2] && form[valueIndex1] != "") {
      result[valueIndexResult] = form[valueIndex1];
    }
  };

  const validateInfoAccountFragmentCode = (
    formDataModify,
    initialFormAuxAccountInfo,
    changeFormAuxAccountInfo
  ) => {
    validateInfoAccount(
      "userName",
      "userName",
      "userName",
      formDataModify,
      initialFormAuxAccountInfo,
      changeFormAuxAccountInfo
    );
    validateInfoAccount(
      "password",
      "password",
      "password",
      formDataModify,
      initialFormAuxAccountInfo,
      changeFormAuxAccountInfo
    );
    validateInfoAccount(
      "statusAccount",
      "statusAccount",
      "status",
      formDataModify,
      initialFormAuxAccountInfo,
      changeFormAuxAccountInfo
    );
  };

  const uploadPhotoTeacher = (fileName) => {
    if (fileName === "") {
      fileName = uuidv4();
    }
    const ref = firebase.storage().ref().child(`photoTeachers/${fileName}`);
    return ref.put(file);
  };
  const uploadCarnetTeacher = (fileName) => {
    if (fileName === "") {
      fileName = uuidv4();
    }
    const ref = firebase.storage().ref().child(`carnetTeachers/${fileName}`);
    return ref.put(fileCarnet);
  };
  const uploadBirthCertificateTeacher = (fileName) => {
    if (fileName === "") {
      fileName = uuidv4();
    }
    const ref = firebase
      .storage()
      .ref()
      .child(`birthCertificateTeachers/${fileName}`);
    return ref.put(fileBirthCertificate);
  };

  const onSubmit = () => {
    setFormError({});
    let textErrorFinalAux = "";
    let errorsAux = {};
    let formOkAux = true;

    //INFORMACION PERSONAL
    if (!photoTeacher) {
      formOkAux = false;
      errorsAux.photoStudent = true;
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
    if (formData.genre !== true) {
      if (formData.genre !== false) {
        formOkAux = false;
        errorsAux.genre = true;
        textErrorFinalAux += "*El Género del Profesor es erróneo.\n";
      }
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
      errorsAux.grade = true;
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
      // const classRoomIdAuxNew = classRoomId;
      const subjectIdAuxOld = teacher.subjectId;
      const accountIdAux = teacher.accountId;
      const fileNamePhoto =
        teacher.filePhotoId !== "" ? teacher.filePhotoId : uuidv4();
      const fileNameCarnet =
        teacher.fileCarnetId !== "" ? teacher.fileCarnetId : uuidv4();
      const fileNameBirthCertificate =
        teacher.fileBirthCertificateId !== ""
          ? teacher.fileBirthCertificateId
          : uuidv4();
      var changeFormAuxTeacherInfo = {};
      var changeFormAuxAccountInfo = {};

      var initialFormAuxTeacherInfo = {
        firstName: teacher.firstName,
        secondName: teacher.secondName,
        fatherLastName: teacher.fatherLastName,
        motherLastName: teacher.motherLastName,
        dateBirth: teacher.dateBirth,
        personalPhone: teacher.personalPhone,
        landPhone: teacher.landPhone,
        age: teacher.age,
        country: teacher.country,
        departament: teacher.departament,
        genre: teacher.gender,
        weight: teacher.weight,
        height: teacher.height,
        email: teacher.email,
        address: teacher.address,
      };

      var initialFormAuxAccountInfo = {
        userName: accountInfo.userName,
        password: accountInfo.password,
        statusAccount: accountInfo.status,
      };

      validateInfoTeacherFragmentCode(
        formDataModify,
        initialFormAuxTeacherInfo,
        changeFormAuxTeacherInfo
      );

      validateInfoAccountFragmentCode(
        formDataModify,
        initialFormAuxAccountInfo,
        changeFormAuxAccountInfo
      );

      if (idSubjectState && idSubjectState != subjectIdAuxOld) {
        changeFormAuxTeacherInfo.subject = idSubjectState;
      }
      if (file) {
        changeFormAuxTeacherInfo.filePhotoId = fileNamePhoto;
      }
      if (fileCarnet) {
        changeFormAuxTeacherInfo.fileCarnetId = fileNameCarnet;
      }
      if (fileBirthCertificate) {
        changeFormAuxTeacherInfo.fileBirthCertificateId =
          fileNameBirthCertificate;
      }

      (async () => {
        try {
          setIsLoadingButton(true);
          if (Object.keys(changeFormAuxTeacherInfo).length !== 0) {
            toast.info("Modificando datos del Profesor...", {
              transition: Zoom,
            });
            await db
              .collection("teachers")
              .doc(teacher.id)
              .update(changeFormAuxTeacherInfo)
              .then((response) => {})
              .catch(() => {
                toast.error(
                  "Hubo un error al Modificar los datos del Profesor",
                  {
                    transition: Zoom,
                  }
                );
              });
          } else {
            toast.info("No hubo cambios en la información del Profesor.", {
              transition: Zoom,
            });
          }

          if (Object.keys(changeFormAuxAccountInfo).length !== 0) {
            toast.info("Modificando datos de la Cuenta...", {
              transition: Zoom,
            });

            await db
              .collection("accounts")
              .doc(accountIdAux)
              .update(changeFormAuxAccountInfo)
              .then((response) => {})
              .catch(() => {
                toast.error(
                  "Hubo un error al Modificar los datos del Profesor",
                  {
                    transition: Zoom,
                  }
                );
              });
          } else {
            toast.info("No hubo cambios en la información de la Cuenta.", {
              transition: Zoom,
            });
          }
          file &&
            (await uploadPhotoTeacher(fileNamePhoto)
              .then((response) => {})
              .catch((err) => {
                toast.error(
                  "La foto del Profesor no pudo subirse correctamente.",
                  {
                    transition: Zoom,
                  }
                );
              }));

          fileCarnet &&
            (await uploadCarnetTeacher(fileNameCarnet)
              .then((response) => {})
              .catch((err) => {
                toast.error(
                  "El carnet del Profesor no pudo subirse correctamente.",
                  {
                    transition: Zoom,
                  }
                );
              }));

          fileBirthCertificate &&
            (await uploadBirthCertificateTeacher(fileNameBirthCertificate)
              .then((response) => {})
              .catch((err) => {
                toast.error(
                  "El certificado de nacimiento del Profesor no pudo subirse correctamente.",
                  {
                    transition: Zoom,
                  }
                );
              }));
          if (
            Object.keys(changeFormAuxTeacherInfo).length !== 0 ||
            Object.keys(changeFormAuxAccountInfo).length !== 0 ||
            file ||
            fileCarnet ||
            fileBirthCertificate
          ) {
            toast.success("Los datos fueron actualizados con éxito", {
              transition: Zoom,
            });
          }
        } finally {
          setIsLoadingButton(false);
          setUpdateData(true);
          onClose();
        }
      })();
    }
  };

  const onChange = (e) => {
    setFormDataModify({
      ...formDataModify,
      [e.target.name]: e.target.value,
    });
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

  const dateBirthFormat = (date) => {
    const dateMiliseconds = date * 1000;
    const dateResult = new Date(dateMiliseconds);
    return moment(dateResult).format();
  };

  const dateBirthFormatTimeStamp = (date) => {
    return new Date(date);
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
  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (isLoadingInfo) {
    return <LoadingForm />;
  }

  return (
    <SliderForm setSliderRef={setSliderRef} setActiveSlide={setActiveSlide}>
      <Form
        className="modify-teacher-form"
        size="small"
        onChange={onChange}
        onSubmit={onSubmit}
        key="1"
      >
        <Form.Group className="teacher-photo">
          <div {...getRootProps()} className="photo-hover" />
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
                value={formData.carnet}
                error={formError.carnet}
                fluid
                disabled
                label="Carnet de Identidad"
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
            <Form.Field>
              <Form.Input
                type="text"
                name="firstName"
                placeholder="Primer Nombre"
                value={formData.firstName}
                error={formError.firstName}
                fluid
                label="Primer Nombre"
                icon={
                  formDataModify.firstName ? (
                    <Icon name="user" style={{ opacity: 1 }} />
                  ) : (
                    <Icon name="user" />
                  )
                }
                iconPosition="left"
                onChange={(e) => {
                  onChangeClearError(e);
                  const value = formData;
                  value.firstName = e.target.value;
                  setFormData(value);
                }}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                type="text"
                name="secondName"
                placeholder="Segundo Nombre"
                value={formData.secondName}
                error={formError.secondName}
                fluid
                label="Segundo Nombre (Opcional)"
                icon={
                  formDataModify.secondName ? (
                    <Icon name="user" style={{ opacity: 1 }} />
                  ) : (
                    <Icon name="user" />
                  )
                }
                iconPosition="left"
                onChange={(e) => {
                  onChangeClearError(e);
                  const value = formData;
                  value.secondName = e.target.value;
                  setFormData(value);
                }}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <Form.Input
                type="text"
                name="fatherLastName"
                placeholder="Apellido Paterno"
                value={formData.fatherLastName}
                error={formError.fatherLastName}
                fluid
                label="Apellido Paterno"
                icon={
                  formDataModify.fatherLastName ? (
                    <Icon name="user" style={{ opacity: 1 }} />
                  ) : (
                    <Icon name="user" />
                  )
                }
                iconPosition="left"
                onChange={(e) => {
                  onChangeClearError(e);
                  const value = formData;
                  value.fatherLastName = e.target.value;
                  setFormData(value);
                }}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                type="text"
                name="motherLastName"
                placeholder="Apellido Materno"
                value={formData.motherLastName}
                error={formError.motherLastName}
                fluid
                label="Apellido Materno"
                icon={
                  formDataModify.motherLastName ? (
                    <Icon name="user" style={{ opacity: 1 }} />
                  ) : (
                    <Icon name="user" />
                  )
                }
                iconPosition="left"
                onChange={(e) => {
                  onChangeClearError(e);
                  const value = formData;
                  value.motherLastName = e.target.value;
                  setFormData(value);
                }}
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
                {formDataModify.dateBirth ? (
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
                      setFormData({
                        ...formData,
                        dateBirth: dateBirthFormatTimeStamp(date),
                        age: calcAge(date),
                      });
                      setFormDataModify({
                        ...formDataModify,
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
                value={formData.personalPhone}
                error={formError.personalPhone}
                fluid
                label="Teléfono Celular"
                icon={
                  formDataModify.personalPhone ? (
                    <Icon name="mobile" style={{ opacity: 1 }} />
                  ) : (
                    <Icon name="mobile" />
                  )
                }
                iconPosition="left"
                onChange={(e) => {
                  onChangeClearError(e);
                  const value = formData;
                  value.personalPhone = e.target.value;
                  setFormData(value);
                }}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                type="number"
                min={0}
                step="false"
                name="landPhone"
                placeholder="Teléfono Fijo"
                value={formData.landPhone}
                error={formError.landPhone}
                fluid
                label="Teléfono Fijo (Opcional)"
                icon={
                  formDataModify.landPhone ? (
                    <Icon name="phone" style={{ opacity: 1 }} />
                  ) : (
                    <Icon name="phone" />
                  )
                }
                iconPosition="left"
                onChange={(e) => {
                  onChangeClearError(e);
                  const value = formData;
                  value.landPhone = e.target.value;
                  setFormData(value);
                }}
              />
            </Form.Field>
          </Form.Group>
        </div>
      </Form>
      <Form
        className="modify-teacher-form-2"
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
                value={formData.age}
                error={formError.age}
                fluid
                label="Edad (Años)"
                icon={
                  formDataModify.age ? (
                    <Icon name="calendar alternate" style={{ opacity: 1 }} />
                  ) : (
                    <Icon name="calendar alternate" />
                  )
                }
                iconPosition="left"
                onChange={(e) => {
                  onChangeClearError(e);
                  const value = formData;
                  value.age = e.target.value;
                  setFormData(value);
                }}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                type="text"
                name="country"
                placeholder="País"
                value={formData.country}
                error={formError.country}
                fluid
                label="País de Residencia"
                icon={
                  formDataModify.country ? (
                    <Icon name="font awesome flag" style={{ opacity: 1 }} />
                  ) : (
                    <Icon name="font awesome flag" />
                  )
                }
                iconPosition="left"
                onChange={(e) => {
                  onChangeClearError(e);
                  const value = formData;
                  value.country = e.target.value;
                  setFormData(value);
                }}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                type="text"
                name="departament"
                placeholder="Departamento"
                value={formData.departament}
                error={formError.departament}
                fluid
                label="Departamento de Residencia"
                icon={
                  formDataModify.departament ? (
                    <Icon name="font awesome flag" style={{ opacity: 1 }} />
                  ) : (
                    <Icon name="font awesome flag" />
                  )
                }
                iconPosition="left"
                onChange={(e) => {
                  onChangeClearError(e);
                  const value = formData;
                  value.departament = e.target.value;
                  setFormData(value);
                }}
              />
            </Form.Field>
            <Form.Field className="select-dropdown-special-field">
              {formDataModify.genre ? (
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
                value={
                  formData.genre == true || formData.genre == "male"
                    ? "male"
                    : formData.genre == false || formData.genre == "female"
                    ? "female"
                    : null
                }
                error={formError.genre}
                fluid
                label="Género"
                options={genres}
                onChange={(e, data) => {
                  const value = formData;
                  const value2 = formDataModify;
                  if (data.value === "male") {
                    value.genre = true;
                    value2.genre = true;
                  } else if (data.value === "female") {
                    value.genre = false;
                    value2.genre = false;
                  } else {
                    value.genre = null;
                    value2.genre = null;
                  }

                  setFormData(value);
                  setFormDataModify(value2);
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
                value={formData.weight}
                error={formError.weight}
                fluid
                label="Peso (Opcional)"
                icon={
                  formDataModify.weight ? (
                    <Icon name="weight" style={{ opacity: 1 }} />
                  ) : (
                    <Icon name="weight" />
                  )
                }
                iconPosition="left"
                onChange={(e) => {
                  onChangeClearError(e);
                  const value = formData;
                  value.weight = e.target.value;
                  setFormData(value);
                }}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                type="number"
                name="height"
                placeholder="Altura"
                value={formData.height}
                error={formError.height}
                fluid
                label="Altura (Opcional)"
                icon={
                  formDataModify.height ? (
                    <Icon
                      name="arrows alternate vertical"
                      style={{ opacity: 1 }}
                    />
                  ) : (
                    <Icon name="arrows alternate vertical" />
                  )
                }
                iconPosition="left"
                onChange={(e) => {
                  onChangeClearError(e);
                  const value = formData;
                  value.height = e.target.value;
                  setFormData(value);
                }}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                type="text"
                name="email"
                placeholder="Correo Electrónico"
                value={formData.email}
                error={formError.email}
                fluid
                label="Correo Electrónico (Opcional)"
                icon={
                  formDataModify.email ? (
                    <Icon name="at" style={{ opacity: 1 }} />
                  ) : (
                    <Icon name="at" />
                  )
                }
                iconPosition="left"
                onChange={(e) => {
                  onChangeClearError(e);
                  const value = formData;
                  value.email = e.target.value;
                  setFormData(value);
                }}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <Form.Input
                type="text"
                name="address"
                placeholder="Dirección"
                value={formData.address}
                error={formError.address}
                fluid
                label="Dirección"
                icon={
                  formDataModify.address ? (
                    <Icon name="map marker alternate" style={{ opacity: 1 }} />
                  ) : (
                    <Icon name="map marker alternate" />
                  )
                }
                iconPosition="left"
                onChange={(e) => {
                  onChangeClearError(e);
                  const value = formData;
                  value.address = e.target.value;
                  setFormData(value);
                }}
              />
            </Form.Field>
          </Form.Group>
        </div>
      </Form>
      <Form
        className="modify-teacher-form-3"
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
              {formDataModify.educationLevel ? (
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
                scrolling
                options={educationLevel}
                value={
                  formData.educationLevel == "Secundaria"
                    ? "Secundaria"
                    : "Primaria"
                }
                onChange={(e, data) => {
                  onSelectLevelEducation(data.value);
                  const value = formData;
                  value.educationLevel = data.value;
                  setFormData(value);

                  const value2 = formDataModify;
                  value2.educationLevel = data.value;
                  setFormDataModify(value2);
                  setFormError({ ...formError, educationLevel: false });
                }}
                error={formError.educationLevel}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field className="select-dropdown-special-field">
              {formDataModify.subject ? (
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
                lazyLoad
                scrolling
                options={subjectList}
                loading={isLoadingSubjectList}
                className="dropdown-special"
                defaultValue={formData.subject}
                onChange={(e, data) => {
                  const value = formData;
                  value.subject = data.value;
                  setFormData(value);

                  const value2 = formDataModify;
                  value2.subject = data.value;
                  setFormDataModify(value2);
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
                value={formData.userName}
                error={formError.userName}
                fluid
                label="Nombre de Usuario (Para la aplicación movíl)"
                icon={
                  formDataModify.userName ? (
                    <Icon name="user" style={{ opacity: 1 }} />
                  ) : (
                    <Icon name="user" />
                  )
                }
                iconPosition="left"
                onChange={(e) => {
                  onChangeClearError(e);
                  const value = formData;
                  value.userName = e.target.value;
                  // value[e.target.name] = e.target.value;
                  setFormData(value);
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
                value={formData.password}
                error={formError.password}
                fluid
                label="Contraseña"
                iconPosition="left"
                icon={
                  formDataModify.password ? (
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
                  const value = formData;
                  value.password = e.target.value;
                  // value[e.target.name] = e.target.value;
                  setFormData(value);
                }}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field className="select-dropdown-special-field">
              {formDataModify.statusAccount ? (
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
                defaultValue={formData.statusAccount}
                onChange={(e, data) => {
                  const value = formData;
                  value.statusAccount = data.value;
                  setFormData(value);

                  const value2 = formDataModify;
                  value2.statusAccount = data.value;
                  setFormDataModify(value2);
                  setFormError({ ...formError, statusAccount: false });
                }}
                error={formError.statusAccount}
              />
            </Form.Field>
          </Form.Group>
        </div>
      </Form>
      <Form
        className="modify-teacher-form-4"
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
              carnetTeacher={carnetTeacher}
              setCarnetTeacher={setCarnetTeacher}
              fileCarnet={fileCarnet}
              setFileCarnet={setFileCarnet}
            />
            <RenderDropzoneBirthCertificate
              birthCertificateTeacher={birthCertificateTeacher}
              setBirthCertificateTeacher={setBirthCertificateTeacher}
              fileBirthCertificate={fileBirthCertificate}
              setFileBirthCertificate={setFileBirthCertificate}
            />
          </Form.Group>
        </div>
      </Form>
      <Form
        className="modify-teacher-form-5"
        size="small"
        onChange={onChange}
        onSubmit={onSubmit}
        key="5"
      >
        <div className="teacher-inputs-5">
          <Form.Group className="button-group-form">
            <Form.Button positive loading={isLoadingButton}>
              MODIFICAR PROFESOR
            </Form.Button>
            {errorFinal && <p>{errorFinalText}</p>}
          </Form.Group>
        </div>
      </Form>
    </SliderForm>
  );
}

//FORM
function defaultValueForm(teacher, subjectInfo, accountInfo) {
  return {
    carnet: teacher.id,
    firstName: teacher.firstName,
    secondName: teacher.secondName,
    fatherLastName: teacher.fatherLastName,
    motherLastName: teacher.motherLastName,
    dateBirth: teacher.dateBirth,
    personalPhone: teacher.personalPhone,
    landPhone: teacher.landPhone,
    age: teacher.age,
    country: teacher.country,
    departament: teacher.departament,
    genre: teacher.gender,
    weight: teacher.weight,
    height: teacher.height,
    email: teacher.email,
    address: teacher.address,

    educationLevel: subjectInfo.educationLevel,
    subject: teacher.subjectId,

    userName: accountInfo.userName,
    password: accountInfo.password,
    statusAccount: accountInfo.status,
  };
}

function defaultValueFormModify() {
  return {
    carnet: "",
    firstName: "",
    secondName: "",
    fatherLastName: "",
    motherLastName: "",
    dateBirth: "",
    personalPhone: "",
    landPhone: "",
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
    carnet: false,
    firstName: false,
    secondName: false,
    fatherLastName: false,
    motherLastName: false,
    dateBirth: false,
    personalPhone: false,
    landPhone: false,
    age: false,
    country: false,
    departament: false,
    genre: false,
    weight: false,
    height: false,
    email: false,
    address: false,

    educationLevel: false,
    subject: false,

    userName: false,
    password: false,
    statusAccount: false,
  };
}

//TEACHER
function RenderDropzoneCarnet(props) {
  const { carnetTeacher, setCarnetTeacher, fileCarnet, setFileCarnet } = props;

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileCarnet(file);
    setCarnetTeacher(URL.createObjectURL(file));
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
        <div {...getRootProps()} className="documents-hover" />
        <Form.Field className="field-teacher-document">
          <div
            {...getRootProps()}
            className="document"
            style={{ backgroundImage: `url(${carnetTeacher})` }}
          />
          <input {...getInputProps()} />
          {!carnetTeacher && <Image src={PdfImage} />}
        </Form.Field>
      </div>
      <h4>{fileCarnet && fileCarnet.name}</h4>
    </div>
  );
}

function RenderDropzoneBirthCertificate(props) {
  const {
    birthCertificateTeacher,
    setBirthCertificateTeacher,
    fileBirthCertificate,
    setFileBirthCertificate,
  } = props;

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileBirthCertificate(file);
    setBirthCertificateTeacher(URL.createObjectURL(file));
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
        <div {...getRootProps()} className="documents-hover" />
        <Form.Field className="field-teacher-document">
          <div
            {...getRootProps()}
            className="document"
            style={{ backgroundImage: `url(${birthCertificateTeacher})` }}
          />
          <input {...getInputProps()} />
          {!birthCertificateTeacher && <Image src={PdfImage} />}
        </Form.Field>
      </div>
      <h4>{fileBirthCertificate && fileBirthCertificate.name}</h4>
    </div>
  );
}
