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

import StudentDefault from "../../../assets/img/student.png";
import PdfImage from "../../../assets/img/pdfImage.png";

import "./ModifyStudentForm.scss";

const db = firebase.firestore(firebase);

export default function ModifyStudentForm(props) {
  const {
    student,
    setSliderRef,
    setActiveSlide,
    isLoadingInfo,
    setIsLoadingInfo,
    setUpdateData,
    onClose,
  } = props;

  //DOCUMENTS OF USEEFFECT, QUERY TO DATABASE
  const [photoStudent, setPhotoStudent] = useState(null);
  const [carnetStudent, setCarnetStudent] = useState(null);
  const [rudeStudent, setRudeStudent] = useState(null);
  const [birthCertificateStudent, setBirthCertificateStudent] = useState(null);

  const [birthCertificateTutor, setBirthCertificateTutor] = useState(null);
  const [carnetTutor, setCarnetTutor] = useState(null);

  //INFO OF USEEFFECT, QUERY TO DATABASE
  const [classRoomInfo, setClassRoomInfo] = useState({});
  const [tutorInfo, setTutorInfo] = useState({});
  const [accountInfo, setAccountInfo] = useState({});

  //FILES
  const [file, setFile] = useState(null);
  const [fileRude, setFileRude] = useState(null);
  const [fileCarnet, setFileCarnet] = useState(null);
  const [fileCarnetTutor, setFileCarnetTutor] = useState(null);
  const [fileBirthCertificate, setFileBirthCertificate] = useState(null);
  const [fileBirthCertificateTutor, setFileBirthCertificateTutor] =
    useState(null);

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
  const [startDateTutor, setStartDateTutor] = useState(null);

  //LOADINGS
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoadingGradeList, setIsLoadingGradeList] = useState(false);
  const [isLoadingParallelList, setIsLoadingParallelList] = useState(false);

  //LISTS-DROPDOWN
  const [gradeList, setGradeList] = useState([]);
  const [parallelList, setParallelList] = useState([]);
  const [parallelListAux, setParallelListAux] = useState([]);

  //STATE OF IDs
  const [classRoomId, setClassRoomId] = useState(null);
  const [educationLevelState, setEducationLevelState] = useState(null);

  // console.log("INFO_STUDENT", student);
  // console.log("INFO_TUTOR", tutorInfo);
  // console.log("INFO_CLASSROOM", classRoomInfo);
  // console.log("INFO_ACCOUNT", accountInfo);
  // console.log("PHOTO_STUDENT", photoStudent);
  // console.log("CARNET_STUDENT", carnetStudent);
  // console.log("CERTIFICADO_STUDENT", birthCertificateStudent);
  // console.log("RUDE_STUDENT", rudeStudent);
  // console.log("CARNET_TUTOR", carnetTutor);
  // console.log("CERTIFICADO_TUTOR", birthCertificateTutor);

  // console.log("FORM_DATA", formData);
  // console.log("FORM_DATA_MODIFY", formDataModify);

  // console.log("CARNET TUTOR: ", fileCarnetTutor);
  // console.log("CERTIFICADO TUTOR: ", fileBirthCertificateTutor);

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
          const arrayParallelsAux = [];
          arrayParallels.push({
            key: 0,
            value: null,
            text: "Eliga una opción",
          });
          arrayParallelsAux.push({
            key: 0,
            value: null,
            text: "Eliga una opción",
          });
          map(response?.docs, (parallel) => {
            const data = parallel.data();
            if (data.currentState != "No Disponible") {
              arrayParallels.push({
                key: parallel.id,
                value: data.parallel,
                text: "Paralelo " + data.parallel,
              });
              arrayParallelsAux.push({
                key: parallel.id,
                value: parallel.id,
                text: "Paralelo " + data.parallel,
              });
            }
          });
          setParallelListAux(arrayParallelsAux);
          setParallelList(arrayParallels);
        })
        .catch((err) => {})
        .finally(() => {
          setIsLoadingParallelList(false);
        });
    }
  };
  const onSelectParallel = (parallel) => {
    const parallelAux = parallel;
    let parallelAuxOutput = null;
    map(parallelList, (item) => {
      if (item.value == parallelAux && parallelAux != FormData.classRoomId) {
        parallelAuxOutput = item.key;
      }
    });
    setClassRoomId(parallelAuxOutput);
  };

  useEffect(() => {
    (async () => {
      setIsLoadingInfo(true);
      try {
        var accountIdForTutor = null;
        var dateBirthTutorAux = null;
        var tutorInfoAux = null;
        var classRoomInfoAux = null;
        var accountsInfoAux = null;
        //PHOTO
        if (student.filePhotoId) {
          const filePhotoStudent = student.filePhotoId;
          await firebase
            .storage()
            .ref(`photoStudents/${filePhotoStudent}`)
            .getDownloadURL()
            .then((response) => {
              setPhotoStudent(response);
            })
            .catch((err) => {
              toast.error(
                "Hubo un error al buscar la foto de perfil del estudiante",
                {
                  transition: Zoom,
                }
              );
            });
        }

        //RUDE
        if (student.fileRudeId) {
          const fileRudeStudent = student.fileRudeId;
          await firebase
            .storage()
            .ref(`rudeStudents/${fileRudeStudent}`)
            .getDownloadURL()
            .then((response) => {
              setRudeStudent(response);
            })
            .catch((err) => {
              toast.error("Hubo un error al buscar el rude del estudiante", {
                transition: Zoom,
              });
            });
        }

        //CARNET
        if (student.fileCarnetId) {
          const fileCarnetStudent = student.fileCarnetId;
          await firebase
            .storage()
            .ref(`carnetStudents/${fileCarnetStudent}`)
            .getDownloadURL()
            .then((response) => {
              setCarnetStudent(response);
            })
            .catch((err) => {
              toast.error("Hubo un error al buscar el carnet del estudiante", {
                transition: Zoom,
              });
            });
        }

        //BIRTH_CERTIFICATE
        if (student.fileBirthCertificateId) {
          const fileBirthCertificateStudent = student.fileBirthCertificateId;
          await firebase
            .storage()
            .ref(`birthCertificateStudents/${fileBirthCertificateStudent}`)
            .getDownloadURL()
            .then((response) => {
              setBirthCertificateStudent(response);
            })
            .catch((err) => {
              toast.error(
                "Hubo un error al buscar el certificado de nacimiento del estudiante",
                {
                  transition: Zoom,
                }
              );
            });
        }

        //TUTOR
        await db
          .collection("tutorsStudents")
          .doc(student.tutorId)
          .get()
          .then((responseTutor) => {
            accountIdForTutor = responseTutor.data().accountId;
            dateBirthTutorAux = responseTutor.data().dateBirth.seconds;
            tutorInfoAux = responseTutor.data();
            setTutorInfo(responseTutor.data());

            //DOCUMENTS TUTOR
            //BIRTH_CERTIFICATE
            if (responseTutor.data().fileBirthCertificateId) {
              const fileBirthCertificateStudent =
                responseTutor.data().fileBirthCertificateId;
              firebase
                .storage()
                .ref(`birthCertificateTutors/${fileBirthCertificateStudent}`)
                .getDownloadURL()
                .then((response) => {
                  setBirthCertificateTutor(response);
                })
                .catch((err) => {
                  toast.error(
                    "Hubo un error al buscar el certificado de nacimiento del tutor",
                    {
                      transition: Zoom,
                    }
                  );
                });
            }

            //CARNET
            if (responseTutor.data().fileCarnetId) {
              const fileCarnetStudent = responseTutor.data().fileCarnetId;
              firebase
                .storage()
                .ref(`carnetTutors/${fileCarnetStudent}`)
                .getDownloadURL()
                .then((response) => {
                  setCarnetTutor(response);
                })
                .catch((err) => {
                  toast.error(
                    "Hubo un error al buscar el carnet del estudiante",
                    {
                      transition: Zoom,
                    }
                  );
                });
            }
          })
          .catch((err) => {
            toast.error(
              "El tutor del estudiante que usted busca no existe o hubo un error de conexión!!",
              {
                transition: Zoom,
              }
            );
          });

        //CLASSROOM
        await db
          .collection("classRooms")
          .doc(student.classRoomId)
          .get()
          .then((response) => {
            classRoomInfoAux = response.data();
            setClassRoomInfo(response.data());
            onSelectLevelEducation(response.data().educationLevel);
            onSelectGradeClassRoom(
              response.data().grade,
              response.data().educationLevel
            );
          })
          .catch((err) => {
            toast.error(
              "El curso del estudiante que usted busca no existe o hubo un error de conexión!!",
              {
                transition: Zoom,
              }
            );
          });

        //ACCOUNTS
        await db
          .collection("accounts")
          .doc(accountIdForTutor)
          .get()
          .then((response) => {
            accountsInfoAux = response.data();
            setAccountInfo(response.data());
          })
          .catch((err) => {
            toast.error(
              "El curso del estudiante que usted busca no existe o hubo un error de conexión!!",
              {
                transition: Zoom,
              }
            );
          });

        await setFormData(
          defaultValueForm(
            student,
            tutorInfoAux,
            classRoomInfoAux,
            accountsInfoAux
          )
        );
        await setStartDate(dateBirthFormat(student.dateBirth.seconds));
        await setStartDateTutor(dateBirthFormat(dateBirthTutorAux));
      } catch {
        toast.error("Hubo un problema al traer la informacion del estudiante", {
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
    setPhotoStudent(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onKeyboard: true,
    onDrop,
  });

  const validateInfoStudent = (
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

  const validateInfoStudentFragmentCode = (
    formDataModify,
    initialFormAuxStudentInfo,
    changeFormAuxStudentInfo
  ) => {
    validateInfoStudent(
      "firstName",
      "firstName",
      "firstName",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoStudent(
      "secondName",
      "secondName",
      "secondName",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoStudent(
      "fatherLastName",
      "fatherLastName",
      "fatherLastName",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoStudent(
      "motherLastName",
      "motherLastName",
      "motherLastName",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoStudent(
      "dateBirth",
      "dateBirth",
      "dateBirth",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoStudent(
      "personalPhone",
      "personalPhone",
      "personalPhone",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoStudent(
      "landPhone",
      "landPhone",
      "landPhone",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoStudent(
      "age",
      "age",
      "age",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoStudent(
      "country",
      "country",
      "country",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoStudent(
      "departament",
      "departament",
      "departament",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoStudent(
      "genre",
      "genre",
      "gender",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoStudent(
      "email",
      "email",
      "email",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoStudent(
      "address",
      "address",
      "address",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoStudent(
      "height",
      "height",
      "height",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoStudent(
      "weight",
      "weight",
      "weight",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
    validateInfoStudent(
      "typeStudent",
      "typeStudent",
      "typeStudent",
      formDataModify,
      initialFormAuxStudentInfo,
      changeFormAuxStudentInfo
    );
  };

  const validateInfoTutor = (
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

  const validateInfoTutorFragmentCode = (
    formDataModify,
    initialFormAuxTutorInfo,
    changeFormAuxTutorInfo
  ) => {
    validateInfoTutor(
      "namesTutor",
      "namesTutor",
      "names",
      formDataModify,
      initialFormAuxTutorInfo,
      changeFormAuxTutorInfo
    );
    validateInfoTutor(
      "lastNamesTutor",
      "lastNamesTutor",
      "lastNames",
      formDataModify,
      initialFormAuxTutorInfo,
      changeFormAuxTutorInfo
    );
    validateInfoTutor(
      "rolTutor",
      "rolTutor",
      "role",
      formDataModify,
      initialFormAuxTutorInfo,
      changeFormAuxTutorInfo
    );
    validateInfoTutor(
      "jobTutor",
      "jobTutor",
      "job",
      formDataModify,
      initialFormAuxTutorInfo,
      changeFormAuxTutorInfo
    );
    validateInfoTutor(
      "emailTutor",
      "emailTutor",
      "email",
      formDataModify,
      initialFormAuxTutorInfo,
      changeFormAuxTutorInfo
    );
    validateInfoTutor(
      "dateBirthTutor",
      "dateBirthTutor",
      "dateBirth",
      formDataModify,
      initialFormAuxTutorInfo,
      changeFormAuxTutorInfo
    );
    validateInfoTutor(
      "ageTutor",
      "ageTutor",
      "age",
      formDataModify,
      initialFormAuxTutorInfo,
      changeFormAuxTutorInfo
    );
    validateInfoTutor(
      "addressTutor",
      "addressTutor",
      "address",
      formDataModify,
      initialFormAuxTutorInfo,
      changeFormAuxTutorInfo
    );
    validateInfoTutor(
      "personalPhoneTutor",
      "personalPhoneTutor",
      "personalPhone",
      formDataModify,
      initialFormAuxTutorInfo,
      changeFormAuxTutorInfo
    );
    validateInfoTutor(
      "landPhoneTutor",
      "landPhoneTutor",
      "landPhone",
      formDataModify,
      initialFormAuxTutorInfo,
      changeFormAuxTutorInfo
    );
    validateInfoTutor(
      "countryTutor",
      "countryTutor",
      "country",
      formDataModify,
      initialFormAuxTutorInfo,
      changeFormAuxTutorInfo
    );
    validateInfoTutor(
      "departamentTutor",
      "departamentTutor",
      "departament",
      formDataModify,
      initialFormAuxTutorInfo,
      changeFormAuxTutorInfo
    );
  };

  const validateInfoClassRoom = (
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

  const validateInfoClassRoomFragmentCode = (
    formDataModify,
    initialFormAuxClassRoomInfo,
    changeFormAuxClassRoomInfo
  ) => {
    validateInfoClassRoom(
      "educationLevel",
      "educationLevel",
      "educationLevel",
      formDataModify,
      initialFormAuxClassRoomInfo,
      changeFormAuxClassRoomInfo
    );
    validateInfoClassRoom(
      "grade",
      "grade",
      "grade",
      formDataModify,
      initialFormAuxClassRoomInfo,
      changeFormAuxClassRoomInfo
    );
    validateInfoClassRoom(
      "parallel",
      "parallel",
      "parallel",
      formDataModify,
      initialFormAuxClassRoomInfo,
      changeFormAuxClassRoomInfo
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

  const onSubmit = () => {
    setFormError({});
    let textErrorFinalAux = "";
    let errorsAux = {};
    let formOkAux = true;

    //INFORMACION PERSONAL
    if (!photoStudent) {
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
    if (formData.genre !== true) {
      if (formData.genre !== false) {
        formOkAux = false;
        errorsAux.genre = true;
        textErrorFinalAux += "*El Género del Estudiante es erróneo.\n";
      }
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
      const classRoomIdAuxOld = student.classRoomId;
      // const classRoomIdAuxNew = classRoomId;
      const tutorIdAux = student.tutorId;
      const accountIdAux = tutorInfo.accountId;
      const fileNamePhoto =
        student.filePhotoId !== "" ? student.filePhotoId : uuidv4();
      const fileNameRude =
        student.fileRudeId !== "" ? student.fileRudeId : uuidv4();
      const fileNameCarnet =
        student.fileCarnetId !== "" ? student.fileCarnetId : uuidv4();
      const fileNameBirthCertificate =
        student.fileBirthCertificateId !== ""
          ? student.fileBirthCertificateId
          : uuidv4();
      const fileNameCarnetTutor =
        tutorInfo.fileCarnetId !== "" ? tutorInfo.fileCarnetId : uuidv4();
      const fileNameBirthCertificateTutor =
        tutorInfo.fileBirthCertificateId !== ""
          ? tutorInfo.fileBirthCertificateId
          : uuidv4();
      var changeFormAuxStudentInfo = {};
      var changeFormAuxTutorInfo = {};
      var changeFormAuxClassRoomInfo = {};
      var changeFormAuxAccountInfo = {};

      var initialFormAuxStudentInfo = {
        firstName: student.firstName,
        secondName: student.secondName,
        fatherLastName: student.fatherLastName,
        motherLastName: student.motherLastName,
        dateBirth: student.dateBirth,
        personalPhone: student.personalPhone,
        landPhone: student.landPhone,
        age: student.age,
        country: student.country,
        departament: student.departament,
        genre: student.gender,
        weight: student.weight,
        height: student.height,
        email: student.email,
        address: student.address,
        typeStudent: student.typeStudent,
      };

      var initialFormAuxTutorInfo = {
        namesTutor: tutorInfo.names,
        lastNamesTutor: tutorInfo.lastNames,
        rolTutor: tutorInfo.role,
        emailTutor: tutorInfo.email,
        dateBirthTutor: tutorInfo.dateBirth,
        ageTutor: tutorInfo.age,
        addressTutor: tutorInfo.address,
        personalPhoneTutor: tutorInfo.personalPhone,
        landPhoneTutor: tutorInfo.landPhone,
        countryTutor: tutorInfo.country,
        departamentTutor: tutorInfo.departament,
      };

      // var initialFormAuxClassRoomInfo = {
      //   educationLevel: classRoomInfo.educationLevel,
      //   grade: classRoomInfo.grade,
      //   parallel: classRoomInfo.parallel,
      // };

      var initialFormAuxAccountInfo = {
        userName: accountInfo.userName,
        password: accountInfo.password,
        statusAccount: accountInfo.status,
      };

      validateInfoStudentFragmentCode(
        formDataModify,
        initialFormAuxStudentInfo,
        changeFormAuxStudentInfo
      );

      validateInfoTutorFragmentCode(
        formDataModify,
        initialFormAuxTutorInfo,
        changeFormAuxTutorInfo
      );

      validateInfoAccountFragmentCode(
        formDataModify,
        initialFormAuxAccountInfo,
        changeFormAuxAccountInfo
      );

      if (classRoomId && classRoomId != classRoomIdAuxOld) {
        changeFormAuxStudentInfo.classRoomId = classRoomId;
      }
      if (file) {
        changeFormAuxStudentInfo.filePhotoId = fileNamePhoto;
      }
      if (fileRude) {
        changeFormAuxStudentInfo.fileRudeId = fileNameRude;
      }
      if (fileCarnet) {
        changeFormAuxStudentInfo.fileCarnetId = fileNameCarnet;
      }
      if (fileBirthCertificate) {
        changeFormAuxStudentInfo.fileBirthCertificateId =
          fileNameBirthCertificate;
      }
      if (fileCarnetTutor) {
        changeFormAuxTutorInfo.fileCarnetId = fileNameCarnetTutor;
      }
      if (fileBirthCertificateTutor) {
        changeFormAuxTutorInfo.fileBirthCertificateId =
          fileNameBirthCertificateTutor;
      }

      (async () => {
        try {
          setIsLoadingButton(true);
          if (Object.keys(changeFormAuxStudentInfo).length !== 0) {
            toast.info("Modificando datos del Estudiante...", {
              transition: Zoom,
            });
            await db
              .collection("students")
              .doc(student.id)
              .update(changeFormAuxStudentInfo)
              .then((response) => {})
              .catch(() => {
                toast.error(
                  "Hubo un error al Modificar los datos del Estudiante",
                  {
                    transition: Zoom,
                  }
                );
              });
          } else {
            toast.info("No hubo cambios en la información del Estudiante.", {
              transition: Zoom,
            });
          }

          if (Object.keys(changeFormAuxTutorInfo).length !== 0) {
            toast.info("Modificando datos del Tutor...", {
              transition: Zoom,
            });

            await db
              .collection("tutorsStudents")
              .doc(tutorIdAux)
              .update(changeFormAuxTutorInfo)
              .then((response) => {})
              .catch(() => {
                toast.error("Hubo un error al Modificar los datos del Tutor", {
                  transition: Zoom,
                });
              });
          } else {
            toast.info("No hubo cambios en la información del Tutor.", {
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
                toast.error("Hubo un error al Modificar los datos del Tutor", {
                  transition: Zoom,
                });
              });
          } else {
            toast.info("No hubo cambios en la información de la Cuenta.", {
              transition: Zoom,
            });
          }
          file &&
            (await uploadPhotoStudent(fileNamePhoto)
              .then((response) => {})
              .catch((err) => {
                toast.error(
                  "La foto del estudiante no pudo subirse correctamente.",
                  {
                    transition: Zoom,
                  }
                );
              }));

          fileRude &&
            (await uploadRudeStudent(fileNameRude)
              .then((response) => {})
              .catch((err) => {
                toast.error(
                  "El Rude del estudiante no pudo subirse correctamente.",
                  {
                    transition: Zoom,
                  }
                );
              }));

          fileCarnet &&
            (await uploadCarnetStudent(fileNameCarnet)
              .then((response) => {})
              .catch((err) => {
                toast.error(
                  "El carnet del estudiante no pudo subirse correctamente.",
                  {
                    transition: Zoom,
                  }
                );
              }));

          fileBirthCertificate &&
            (await uploadBirthCertificateStudent(fileNameBirthCertificate)
              .then((response) => {})
              .catch((err) => {
                toast.error(
                  "El certificado de nacimiento del estudiante no pudo subirse correctamente.",
                  {
                    transition: Zoom,
                  }
                );
              }));
          fileCarnetTutor &&
            (await uploadCarnetTutor(fileNameCarnetTutor)
              .then((response) => {})
              .catch((err) => {
                toast.error(
                  "El carnet del tutor no pudo subirse correctamente.",
                  {
                    transition: Zoom,
                  }
                );
              }));

          fileBirthCertificateTutor &&
            (await uploadBirthCertificateTutor(fileNameBirthCertificateTutor)
              .then((response) => {})
              .catch((err) => {
                toast.error(
                  "El certificado de nacimiento del tutor no pudo subirse correctamente.",
                  {
                    transition: Zoom,
                  }
                );
              }));
          if (
            Object.keys(changeFormAuxStudentInfo).length !== 0 ||
            Object.keys(changeFormAuxTutorInfo).length !== 0 ||
            Object.keys(changeFormAuxAccountInfo).length !== 0 ||
            file ||
            fileRude ||
            fileBirthCertificate ||
            fileCarnetTutor ||
            fileBirthCertificateTutor
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
  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (isLoadingInfo) {
    return <LoadingForm />;
  }

  return (
    <SliderForm setSliderRef={setSliderRef} setActiveSlide={setActiveSlide}>
      <Form
        className="modify-student-form"
        size="small"
        onChange={onChange}
        onSubmit={onSubmit}
        key="1"
      >
        <Form.Group className="student-photo">
          <div {...getRootProps()} className="photo-hover" />
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
        className="modify-student-form-2"
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
        className="modify-student-form-3"
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
                value={formData.carnetTutor}
                error={formError.carnetTutor}
                disabled
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
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                type="text"
                name="namesTutor"
                placeholder="Nombres (Tutor)"
                value={formData.namesTutor}
                error={formError.namesTutor}
                fluid
                label="Nombres (Tutor)"
                icon={
                  formDataModify.namesTutor ? (
                    <Icon name="user" style={{ opacity: 1 }} />
                  ) : (
                    <Icon name="user" />
                  )
                }
                iconPosition="left"
                onChange={(e) => {
                  onChangeClearError(e);
                  const value = formData;
                  value.namesTutor = e.target.value;
                  setFormData(value);
                }}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                type="text"
                name="lastNamesTutor"
                placeholder="Apellidos (Tutor)"
                value={formData.lastNamesTutor}
                error={formError.lastNamesTutor}
                fluid
                label="Apellidos (Tutor)"
                icon={
                  formDataModify.lastNamesTutor ? (
                    <Icon name="user" style={{ opacity: 1 }} />
                  ) : (
                    <Icon name="user" />
                  )
                }
                iconPosition="left"
                onChange={(e) => {
                  onChangeClearError(e);
                  const value = formData;
                  value.lastNamesTutor = e.target.value;
                  setFormData(value);
                }}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                type="text"
                name="rolTutor"
                placeholder="Rol (Tutor)"
                value={formData.rolTutor}
                error={formError.rolTutor}
                fluid
                label="Rol (Ejemplo: Padre)"
                icon={
                  formDataModify.rolTutor ? (
                    <Icon name="user secret" style={{ opacity: 1 }} />
                  ) : (
                    <Icon name="user secret" />
                  )
                }
                iconPosition="left"
                onChange={(e) => {
                  onChangeClearError(e);
                  const value = formData;
                  value.rolTutor = e.target.value;
                  setFormData(value);
                }}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <Form.Input
                type="text"
                name="jobTutor"
                placeholder="Ocupación (Tutor)"
                value={formData.jobTutor}
                error={formError.jobTutor}
                fluid
                label="Ocupación (Tutor)"
                icon={
                  formDataModify.jobTutor ? (
                    <Icon name="briefcase" style={{ opacity: 1 }} />
                  ) : (
                    <Icon name="briefcase" />
                  )
                }
                iconPosition="left"
                onChange={(e) => {
                  onChangeClearError(e);
                  const value = formData;
                  value.jobTutor = e.target.value;
                  setFormData(value);
                }}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                type="text"
                name="emailTutor"
                placeholder="Correo Electrónico (Tutor)"
                value={formData.emailTutor}
                error={formError.emailTutor}
                fluid
                label="Correo Electrónico (Tutor) (Opcional)"
                icon={
                  formDataModify.emailTutor ? (
                    <Icon name="at" style={{ opacity: 1 }} />
                  ) : (
                    <Icon name="at" />
                  )
                }
                iconPosition="left"
                onChange={(e) => {
                  onChangeClearError(e);
                  const value = formData;
                  value.emailTutor = e.target.value;
                  setFormData(value);
                }}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                type="text"
                error={formError.dateBirthTutor}
                fluid
                label="Fecha de Nacimiento (Tutor)"
              >
                {formDataModify.dateBirthTutor ? (
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
                      setFormData({
                        ...formData,
                        dateBirthTutor: dateBirthFormatTimeStamp(date),
                        ageTutor: calcAge(date),
                      });
                      setFormDataModify({
                        ...formDataModify,
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
                value={formData.age}
                error={formError.ageTutor}
                fluid
                label="Edad (Años) (Tutor)"
                icon={
                  formDataModify.ageTutor ? (
                    <Icon name="calendar alternate" style={{ opacity: 1 }} />
                  ) : (
                    <Icon name="calendar alternate" />
                  )
                }
                iconPosition="left"
                onChange={(e) => {
                  onChangeClearError(e);
                  const value = formData;
                  value.ageTutor = e.target.value;
                  setFormData(value);
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
                value={formData.addressTutor}
                error={formError.addressTutor}
                fluid
                label="Dirección de Residencia"
                icon={
                  formDataModify.addressTutor ? (
                    <Icon name="map marker alternate" style={{ opacity: 1 }} />
                  ) : (
                    <Icon name="map marker alternate" />
                  )
                }
                iconPosition="left"
                onChange={(e) => {
                  onChangeClearError(e);
                  const value = formData;
                  value.addressTutor = e.target.value;
                  setFormData(value);
                }}
              />
            </Form.Field>
          </Form.Group>
        </div>
      </Form>
      <Form
        className="modify-student-form-4"
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
                value={formData.personalPhoneTutor}
                error={formError.personalPhoneTutor}
                fluid
                label="Teléfono Celular (Tutor)"
                icon={
                  formDataModify.personalPhoneTutor ? (
                    <Icon name="mobile" style={{ opacity: 1 }} />
                  ) : (
                    <Icon name="mobile" />
                  )
                }
                iconPosition="left"
                onChange={(e) => {
                  onChangeClearError(e);
                  const value = formData;
                  value.personalPhoneTutor = e.target.value;
                  setFormData(value);
                }}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                type="number"
                min={0}
                step="false"
                name="landPhoneTutor"
                placeholder="Teléfono Fijo"
                value={formData.landPhoneTutor}
                error={formError.landPhoneTutor}
                fluid
                label="Teléfono Fijo  (Tutor) (Opcional)"
                icon={
                  formDataModify.landPhoneTutor ? (
                    <Icon name="phone" style={{ opacity: 1 }} />
                  ) : (
                    <Icon name="phone" />
                  )
                }
                iconPosition="left"
                onChange={(e) => {
                  onChangeClearError(e);
                  const value = formData;
                  value.landPhoneTutor = e.target.value;
                  setFormData(value);
                }}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                type="text"
                name="countryTutor"
                placeholder="País"
                value={formData.countryTutor}
                error={formError.countryTutor}
                fluid
                label="País de Residencia (Tutor)"
                icon={
                  formDataModify.countryTutor ? (
                    <Icon name="font awesome flag" style={{ opacity: 1 }} />
                  ) : (
                    <Icon name="font awesome flag" />
                  )
                }
                iconPosition="left"
                onChange={(e) => {
                  onChangeClearError(e);
                  const value = formData;
                  value.countryTutor = e.target.value;
                  setFormData(value);
                }}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                type="text"
                name="departamentTutor"
                placeholder="Departamento"
                value={formData.departamentTutor}
                error={formError.departamentTutor}
                fluid
                label="Departamento de Residencia (Tutor)"
                icon={
                  formDataModify.departamentTutor ? (
                    <Icon name="font awesome flag" style={{ opacity: 1 }} />
                  ) : (
                    <Icon name="font awesome flag" />
                  )
                }
                iconPosition="left"
                onChange={(e) => {
                  onChangeClearError(e);
                  const value = formData;
                  value.departamentTutor = e.target.value;
                  setFormData(value);
                }}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group className="student-documents">
            <RenderDropzoneCarnetTutor
              carnetTutor={carnetTutor}
              setCarnetTutor={setCarnetTutor}
              fileCarnetTutor={fileCarnetTutor}
              setFileCarnetTutor={setFileCarnetTutor}
            />
            <RenderDropzoneBirthCertificateTutor
              birthCertificateTutor={birthCertificateTutor}
              setBirthCertificateTutor={setBirthCertificateTutor}
              fileBirthCertificateTutor={fileBirthCertificateTutor}
              setFileBirthCertificateTutor={setFileBirthCertificateTutor}
            />
          </Form.Group>
        </div>
      </Form>
      <Form
        className="modify-student-form-5"
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
              {formDataModify.educationLevel ? (
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
              {formDataModify.grade ? (
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
                defaultValue={formData.grade}
                onChange={(e, data) => {
                  onSelectGradeClassRoom(data.value, educationLevelState);
                  const value = formData;
                  value.grade = data.value;
                  setFormData(value);

                  const value2 = formDataModify;
                  value2.grade = data.value;
                  setFormDataModify(value2);
                  setFormError({ ...formError, grade: false });
                }}
                error={formError.grade}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field className="select-dropdown-special-field">
              {formDataModify.parallel ? (
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
                defaultValue={formData.parallel}
                onChange={(e, data) => {
                  onSelectParallel(data.value);
                  const value = formData;
                  value.parallel = data.value;
                  setFormData(value);

                  const value2 = formDataModify;
                  value2.parallel = data.value;
                  setFormDataModify(value2);
                  setFormError({ ...formError, parallel: false });
                }}
                error={formError.parallel}
              />
            </Form.Field>
            <Form.Field className="select-dropdown-special-field">
              {formDataModify.typeStudent ? (
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
                defaultValue={formData.typeStudent}
                onChange={(e, data) => {
                  const value = formData;
                  value.typeStudent = data.value;
                  setFormData(value);

                  const value2 = formDataModify;
                  value2.typeStudent = data.value;
                  setFormDataModify(value2);
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
                options={statusAccountStudent}
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
              rudeStudent={rudeStudent}
              setRudeStudent={setRudeStudent}
              fileRude={fileRude}
              setFileRude={setFileRude}
            />
            <RenderDropzoneCarnet
              carnetStudent={carnetStudent}
              setCarnetStudent={setCarnetStudent}
              fileCarnet={fileCarnet}
              setFileCarnet={setFileCarnet}
            />
            <RenderDropzoneBirthCertificate
              birthCertificateStudent={birthCertificateStudent}
              setBirthCertificateStudent={setBirthCertificateStudent}
              fileBirthCertificate={fileBirthCertificate}
              setFileBirthCertificate={setFileBirthCertificate}
            />
          </Form.Group>
        </div>
      </Form>
      <Form
        className="modify-student-form-7"
        size="small"
        onChange={onChange}
        onSubmit={onSubmit}
        key="7"
      >
        <div className="student-inputs-7">
          <Form.Group className="button-group-form">
            <Form.Button positive loading={isLoadingButton}>
              MODIFICAR ESTUDIANTE
            </Form.Button>
            {errorFinal && <p>{errorFinalText}</p>}
          </Form.Group>
        </div>
      </Form>
    </SliderForm>
  );
}

//FORM
function defaultValueForm(student, tutorInfo, classRoomInfo, accountInfo) {
  return {
    carnet: student.id,
    firstName: student.firstName,
    secondName: student.secondName,
    fatherLastName: student.fatherLastName,
    motherLastName: student.motherLastName,
    dateBirth: student.dateBirth,
    personalPhone: student.personalPhone,
    landPhone: student.landPhone,
    age: student.age,
    country: student.country,
    departament: student.departament,
    genre: student.gender,
    weight: student.weight,
    height: student.height,
    email: student.email,
    address: student.address,
    educationLevel: classRoomInfo.educationLevel,
    grade: classRoomInfo.grade,
    parallel: classRoomInfo.parallel,
    typeStudent: student.typeStudent,
    userName: accountInfo.userName,
    password: accountInfo.password,
    statusAccount: accountInfo.status,
    carnetTutor: tutorInfo.id,
    namesTutor: tutorInfo.names,
    lastNamesTutor: tutorInfo.lastNames,
    rolTutor: tutorInfo.role,
    jobTutor: tutorInfo.job,
    emailTutor: tutorInfo.email,
    dateBirthTutor: tutorInfo.dateBirth,
    ageTutor: tutorInfo.age,
    addressTutor: tutorInfo.address,
    personalPhoneTutor: tutorInfo.personalPhone,
    landPhoneTutor: tutorInfo.landPhone,
    countryTutor: tutorInfo.country,
    departamentTutor: tutorInfo.departament,
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
    firstName: "",
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
    landPhoneTutor: "",
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
    landPhoneTutor: false,
    countryTutor: false,
    departamentTutor: false,
  };
}

//STUDENT
function RenderDropzoneRude(props) {
  const { rudeStudent, setRudeStudent, fileRude, setFileRude } = props;

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileRude(file);
    setRudeStudent(URL.createObjectURL(file));
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
        <div {...getRootProps()} className="documents-hover" />
        <Form.Field className="field-student-document">
          <div
            {...getRootProps()}
            className="document"
            style={{ backgroundImage: `url(${rudeStudent})` }}
          />
          <input {...getInputProps()} />
          {!rudeStudent && <Image src={PdfImage} />}
        </Form.Field>
      </div>
      <h4>{fileRude && fileRude.name}</h4>
    </div>
  );
}

function RenderDropzoneCarnet(props) {
  const { carnetStudent, setCarnetStudent, fileCarnet, setFileCarnet } = props;

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileCarnet(file);
    setCarnetStudent(URL.createObjectURL(file));
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
        <Form.Field className="field-student-document">
          <div
            {...getRootProps()}
            className="document"
            style={{ backgroundImage: `url(${carnetStudent})` }}
          />
          <input {...getInputProps()} />
          {!carnetStudent && <Image src={PdfImage} />}
        </Form.Field>
      </div>
      <h4>{fileCarnet && fileCarnet.name}</h4>
    </div>
  );
}

function RenderDropzoneBirthCertificate(props) {
  const {
    birthCertificateStudent,
    setBirthCertificateStudent,
    fileBirthCertificate,
    setFileBirthCertificate,
  } = props;

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileBirthCertificate(file);
    setBirthCertificateStudent(URL.createObjectURL(file));
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
        <Form.Field className="field-student-document">
          <div
            {...getRootProps()}
            className="document"
            style={{ backgroundImage: `url(${birthCertificateStudent})` }}
          />
          <input {...getInputProps()} />
          {!birthCertificateStudent && <Image src={PdfImage} />}
        </Form.Field>
      </div>
      <h4>{fileBirthCertificate && fileBirthCertificate.name}</h4>
    </div>
  );
}

//TUTOR
function RenderDropzoneCarnetTutor(props) {
  const { carnetTutor, setCarnetTutor, fileCarnetTutor, setFileCarnetTutor } =
    props;

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileCarnetTutor(file);
    setCarnetTutor(URL.createObjectURL(file));
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
        <Form.Field className="field-student-document">
          <div
            {...getRootProps()}
            className="document"
            style={{ backgroundImage: `url(${carnetTutor})` }}
          />
          <input {...getInputProps()} />
          {!carnetTutor && <Image src={PdfImage} />}
        </Form.Field>
      </div>
      <h4>{fileCarnetTutor && fileCarnetTutor.name}</h4>
    </div>
  );
}

function RenderDropzoneBirthCertificateTutor(props) {
  const {
    birthCertificateTutor,
    setBirthCertificateTutor,
    fileBirthCertificateTutor,
    setFileBirthCertificateTutor,
  } = props;

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileBirthCertificateTutor(file);
    setBirthCertificateTutor(URL.createObjectURL(file));
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
        <Form.Field className="field-student-document">
          <div
            {...getRootProps()}
            className="document"
            style={{ backgroundImage: `url(${birthCertificateTutor})` }}
          />
          <input {...getInputProps()} />
          {!birthCertificateTutor && <Image src={PdfImage} />}
        </Form.Field>
      </div>
      <h4>{fileBirthCertificateTutor && fileBirthCertificateTutor.name}</h4>
    </div>
  );
}
