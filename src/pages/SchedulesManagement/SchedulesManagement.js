import React, { useState, useEffect } from "react";
import _ from "lodash";
import {
  Button,
  Icon,
  Table,
  Modal,
  Message,
  Dropdown,
  Header,
} from "semantic-ui-react";
import "./SchedulesManagement.scss";
import Enumerable from "linq";
import { map } from "lodash";
import firebase from "../../utils/firebase";
import { AddMaterial } from "../../components/AddMaterial/AddMaterial";
import { AddParallel } from "../../components/AddParallel/AddParallel";
import { removeArrayDuplicatesObjectOrderByValue } from "../../utils/arrayFunctions";
import { toast, Zoom } from "react-toastify";

const db = firebase.firestore(firebase);

export default function SchedulesManagement() {
  const academic_level = [
    { key: "1", value: "Primaria", text: "Primaria" },
    { key: "2", value: "Secundaria", text: "Secundaria" },
  ];

  const [open, setOpen] = React.useState(false);
  const [persons, setPersons] = useState([]);
  const [persons2, setPersons2] = useState([]);
  const [onChangeInfo, setOnChangeInfo] = useState(false);
  const [gradeList, setGradeList] = useState([]);
  const [teachersList, setTeacherList] = useState([]);
  const [MaterialList, setMaterialList] = useState([]);
  const [ValueDrop, setValueDrop] = useState("");
  //#region
  const [Periodo01, setPeriodo01] = useState("");
  const [Periodo02, setPeriodo02] = useState("");
  const [Periodo03, setPeriodo03] = useState("");
  const [Periodo04, setPeriodo04] = useState("");
  const [Periodo05, setPeriodo05] = useState("");
  const [Periodo06, setPeriodo06] = useState("");
  const [Periodo07, setPeriodo07] = useState("");
  const [Periodo08, setPeriodo08] = useState("");
  const [Periodo09, setPeriodo09] = useState("");
  const [Periodo10, setPeriodo10] = useState("");
  const [Periodo11, setPeriodo11] = useState("");
  const [Periodo12, setPeriodo12] = useState("");
  const [Periodo13, setPeriodo13] = useState("");
  const [Periodo14, setPeriodo14] = useState("");
  const [Periodo15, setPeriodo15] = useState("");
  const [Periodo16, setPeriodo16] = useState("");
  const [Periodo17, setPeriodo17] = useState("");
  const [Periodo18, setPeriodo18] = useState("");
  const [Periodo19, setPeriodo19] = useState("");
  const [Periodo20, setPeriodo20] = useState("");
  const [Periodo21, setPeriodo21] = useState("");
  const [Periodo22, setPeriodo22] = useState("");
  const [Periodo23, setPeriodo23] = useState("");
  const [Periodo24, setPeriodo24] = useState("");
  const [Periodo25, setPeriodo25] = useState("");
  const [Periodo26, setPeriodo26] = useState("");
  const [Periodo27, setPeriodo27] = useState("");
  const [Periodo28, setPeriodo28] = useState("");
  const [Periodo29, setPeriodo29] = useState("");
  const [Periodo30, setPeriodo30] = useState("");
  const [Periodo31, setPeriodo31] = useState("");
  const [Periodo32, setPeriodo32] = useState("");
  const [Periodo33, setPeriodo33] = useState("");
  const [Periodo34, setPeriodo34] = useState("");
  const [Periodo35, setPeriodo35] = useState("");
  const [Periodo36, setPeriodo36] = useState("");
  const [Periodo37, setPeriodo37] = useState("");
  const [Periodo38, setPeriodo38] = useState("");
  const [Periodo39, setPeriodo39] = useState("");
  const [Periodo40, setPeriodo40] = useState("");
  const [Periodo41, setPeriodo41] = useState("");
  const [Periodo42, setPeriodo42] = useState("");
  //#endregion
  const [curso, setCurso] = useState("");
  const [open2, setopen2] = useState(false);
  const [open3, setopen3] = useState(false);
  const [EducationLevess, setEducationLevess] = useState("");

  const [DatosHorarioGG, setDatosHorarioGG] = useState([]);

  useEffect(() => {
    db.collection("school_material")
      .orderBy("id_matter", "asc")
      .get()
      .then((response) => {
        const personsArrayAux = [];
        map(response.docs, (student) => {
          const studentAux = student.data();
          personsArrayAux.push(studentAux);
        });
        setPersons(personsArrayAux);
      })
      .finally(() => {
        setOnChangeInfo(false);
      });
  }, [onChangeInfo]);

  useEffect(() => {
    db.collection("classRooms")
      .orderBy("educationLevel", "asc")
      .get()
      .then((response2) => {
        const personsArrayAux2 = [];
        map(response2.docs, (student2) => {
          const studentAux2 = student2.data();
          personsArrayAux2.push({ ...studentAux2, id: student2.id });
        });
        setPersons2(personsArrayAux2);
      });
  }, []);

  /*Consuta para llenar drop*/
  const onSelectLevelAcademic = (academicLevel) => {
    if (academicLevel) {
      db.collection("classRooms")
        .where("educationLevel", "==", academicLevel)
        .get()
        .then((response) => {
          const arrayClassRooms = [];
          response.docs.forEach((doc) => {
            const dataCourse = { ...doc.data(), idMaterial: doc.id };
            if (dataCourse.currentState != "No Disponible") {
              if (dataCourse.subjectsAsig != true) {
                arrayClassRooms.push({
                  key: doc.id,
                  value: doc.id,
                  text:
                    dataCourse.grade +
                    " " +
                    dataCourse.parallel +
                    " " +
                    academicLevel,
                });
              }
            }
          });
          const ArrayClassRomsFilter = removeArrayDuplicatesObjectOrderByValue(
            arrayClassRooms,
            "text"
          );
          setGradeList(ArrayClassRomsFilter);
        });
    }
  };
  /*FUNCION PARA INSERTAR DATO*/
  const addMaterial_bd = (materialObjetc, id, acadeValue) => {
    const { id_matter, name_matter, workload } = materialObjetc;
    if (id) {
      if (id_matter && name_matter && workload) {
        db.collection("school_material")
          .doc(id)
          .update({
            id_matter: id_matter,
            name_matter: name_matter,
            workload: parseInt(workload),
            educationLevel: acadeValue,
          })
          .then(() => {
            toast.success("Datos Actualizados Correctamente", {
              transition: Zoom,
            });
          });
        setOnChangeInfo(true);
      }
      console.log("modificar");
    } else {
      console.log("agregar");
      if (id_matter && name_matter && workload) {
        db.collection("school_material")
          .doc()
          .set({
            id_matter: id_matter,
            name_matter: name_matter,
            workload: parseInt(workload),
            educationLevel: acadeValue,
          })
          .then(() => {
            toast.success("Datos Guardados Correctamente", {
              transition: Zoom,
            });
          });
        setOnChangeInfo(true);
      } else {
        toast.error("Alerta Datos Incompletos", {
          transition: Zoom,
        });
      }
    }
  };
  //Para eliminar
  const onDelete_db = (id) => {
    if (window.confirm("Estas Seguro de querer eliminar esta materia ????")) {
      db.collection("school_material")
        .where("id_matter", "==", id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs[0].ref.delete();
          setOnChangeInfo(true);
        });
      toast.error("Materia Eliminada Correctamente", {
        transition: Zoom,
      });
    }
  };
  useEffect(() => {
    db.collection("teachers")
      .get()
      .then((response) => {
        const list_teacherss = [];
        map(response.docs, (teach) => {
          const data = teach.data();
          list_teacherss.push(data);
        });
        setTeacherList(list_teacherss);
      });
    db.collection("school_material")
      .get()
      .then((response2) => {
        const list_materiall = [];
        response2.docs.forEach((doc) => {
          const idDoc = { ...doc.data(), id: doc.id };
          list_materiall.push(idDoc);
        });
        setMaterialList(list_materiall);
      });
  }, []);
  const horario = {
    dia01: {
      periodo01: Periodo01,
      periodo02: Periodo02,
      periodo03: Periodo03,
      periodo04: Periodo04,
      periodo05: Periodo05,
      periodo06: Periodo06,
      periodo07: Periodo07,
      periodo08: Periodo08,
    },
    dia02: {
      periodo09: Periodo09,
      periodo10: Periodo10,
      periodo11: Periodo11,
      periodo12: Periodo12,
      periodo13: Periodo13,
      periodo14: Periodo14,
      periodo15: Periodo15,
      periodo16: Periodo16,
    },
    dia03: {
      periodo17: Periodo17,
      periodo18: Periodo18,
      periodo19: Periodo19,
      periodo20: Periodo20,
      periodo21: Periodo21,
      periodo22: Periodo22,
      periodo23: Periodo23,
      periodo24: Periodo24,
    },

    dia04: {
      periodo25: Periodo25,
      periodo26: Periodo26,
      periodo27: Periodo27,
      periodo28: Periodo28,
      periodo29: Periodo29,
      periodo30: Periodo30,
      periodo31: Periodo31,
      periodo32: Periodo32,
    },

    dia05: {
      periodo33: Periodo33,
      periodo34: Periodo34,
      periodo35: Periodo35,
      periodo36: Periodo36,
      periodo37: Periodo37,
      periodo38: Periodo38,
      periodo39: Periodo39,
      periodo40: Periodo40,
    },

    dia06: {
      periodo41: Periodo41,
      periodo42: Periodo42,
    },
  };
  const ListTeacherss = [
    Periodo01.idTeac,
    Periodo02.idTeac,
    Periodo03.idTeac,
    Periodo04.idTeac,
    Periodo05.idTeac,
    Periodo06.idTeac,
    Periodo07.idTeac,
    Periodo08.idTeac,
    Periodo09.idTeac,
    Periodo10.idTeac,
    Periodo11.idTeac,
    Periodo12.idTeac,
    Periodo13.idTeac,
    Periodo14.idTeac,
    Periodo15.idTeac,
    Periodo16.idTeac,
    Periodo17.idTeac,
    Periodo18.idTeac,
    Periodo19.idTeac,
    Periodo20.idTeac,
    Periodo21.idTeac,
    Periodo22.idTeac,
    Periodo23.idTeac,
    Periodo24.idTeac,
    Periodo25.idTeac,
    Periodo26.idTeac,
    Periodo27.idTeac,
    Periodo28.idTeac,
    Periodo29.idTeac,
    Periodo30.idTeac,
    Periodo31.idTeac,
    Periodo32.idTeac,
    Periodo33.idTeac,
    Periodo34.idTeac,
    Periodo35.idTeac,
    Periodo36.idTeac,
    Periodo37.idTeac,
    Periodo38.idTeac,
    Periodo39.idTeac,
    Periodo40.idTeac,
    Periodo41.idTeac,
    Periodo42.idTeac,
  ];
  const daIner = Enumerable.from(MaterialList)
    .join(
      teachersList,
      (pk) => pk.id,
      (fk) => fk.subjectId,
      (left, right) => ({
        key: left.id,
        value: { idMa: left.id_matter, idTeac: right.accountId },
        text:
          left.name_matter +
          "\n(Lic." +
          right.firstName +
          " " +
          right.fatherLastName +
          ")",
      })
    )
    .toArray();

  const onhandleHorario = () => {
    if (
      Periodo01 &&
      Periodo02 &&
      Periodo03 &&
      Periodo04 &&
      Periodo05 &&
      Periodo06 &&
      Periodo07
    ) {
      if (
        Periodo09 &&
        Periodo10 &&
        Periodo11 &&
        Periodo12 &&
        Periodo13 &&
        Periodo14 &&
        Periodo15
      ) {
        if (
          Periodo17 &&
          Periodo18 &&
          Periodo19 &&
          Periodo20 &&
          Periodo21 &&
          Periodo22 &&
          Periodo23
        ) {
          if (
            Periodo25 &&
            Periodo26 &&
            Periodo27 &&
            Periodo28 &&
            Periodo29 &&
            Periodo30 &&
            Periodo31
          ) {
            if (
              Periodo33 &&
              Periodo34 &&
              Periodo35 &&
              Periodo36 &&
              Periodo38 &&
              Periodo39
            ) {
              setopen3(false);
              const datRaTeachers = [];
              const Filtro = Enumerable.from(ListTeacherss)
                .distinct()
                .toArray();
              Filtro.forEach((sd) => {
                if (sd != undefined) {
                  datRaTeachers.push(sd);
                }
              });
              db.collection("classRooms")
                .doc(curso)
                .update({
                  schedules: { ...horario },
                  subjectsAsig: true,
                  Teachers: datRaTeachers,
                })
                .then(() => {
                  toast.success("Horario Guardado Correctamente", {
                    transition: Zoom,
                  });
                });
              window.location.reload(true);
            } else {
              toast.error("Horario de Viernes no puede estar vacio", {
                transition: Zoom,
              });
            }
          } else {
            toast.error("Horario de Jueves no puede estar vacio", {
              transition: Zoom,
            });
          }
        } else {
          toast.error("Horario de Miercoles no puede estar vacio", {
            transition: Zoom,
          });
        }
      } else {
        toast.error("Horario de Martes no puede estar vacio", {
          transition: Zoom,
        });
      }
    } else {
      toast.error("Horario de Lunes no puede estar vacio", {
        transition: Zoom,
      });
    }
    /**/
    //#region
    /*setPeriodo01("");
    setPeriodo02("");
    setPeriodo03("");
    setPeriodo04("");
    setPeriodo05("");
    setPeriodo06("");
    setPeriodo07("");
    setPeriodo08("");
    setPeriodo09("");
    setPeriodo10("");
    setPeriodo11("");
    setPeriodo12("");
    setPeriodo13("");
    setPeriodo14("");
    setPeriodo15("");
    setPeriodo16("");
    setPeriodo17("");
    setPeriodo18("");
    setPeriodo19("");
    setPeriodo20("");
    setPeriodo21("");
    setPeriodo22("");
    setPeriodo23("");
    setPeriodo24("");
    setPeriodo25("");
    setPeriodo26("");
    setPeriodo27("");
    setPeriodo28("");
    setPeriodo29("");
    setPeriodo30("");
    setPeriodo31("");
    setPeriodo32("");
    setPeriodo33("");
    setPeriodo34("");
    setPeriodo35("");
    setPeriodo36("");
    setPeriodo37("");
    setPeriodo38("");
    setPeriodo39("");
    setPeriodo40("");
    setPeriodo41("");
    setPeriodo42("");*/
    //#endregion
  };

  const VerificarHorarioProfesor = () => {
    db.collection("classRooms")
      .where("subjectsAsig", "==", true)
      .get()
      .then((response) => {
        const list_horarios = [];
        map(response.docs, (horarios23) => {
          const data = horarios23.data();
          list_horarios.push(data.schedules);
        });
        setDatosHorarioGG(list_horarios);
      });
    const mensajeVerificacion = "Hay choque de periodos el dia Lunes:";
    const mensajeVerificacion2 = "Hay choque de periodos el dia Martes:";
    const mensajeVerificacion3 = "Hay choque de periodos el dia Miercoles:";
    const mensajeVerificacion4 = "Hay choque de periodos el dia Jueves:";
    const mensajeVerificacion5 = "Hay choque de periodos el dia Viernes:";
    const mensajeVerificacion6 = "Hay choque de periodos el dia Sabado:";
    let periosoM = "";
    let periosoM2 = "";
    let periosoM3 = "";
    let periosoM4 = "";
    let periosoM5 = "";
    let periosoM6 = "";
    if (
      Periodo01 &&
      Periodo02 &&
      Periodo03 &&
      Periodo04 &&
      Periodo05 &&
      Periodo06 &&
      Periodo07
    ) {
      if (
        Periodo09 &&
        Periodo10 &&
        Periodo11 &&
        Periodo12 &&
        Periodo13 &&
        Periodo14 &&
        Periodo15
      ) {
        if (
          Periodo17 &&
          Periodo18 &&
          Periodo19 &&
          Periodo20 &&
          Periodo21 &&
          Periodo22 &&
          Periodo23
        ) {
          if (
            Periodo25 &&
            Periodo26 &&
            Periodo27 &&
            Periodo28 &&
            Periodo29 &&
            Periodo30 &&
            Periodo31
          ) {
            if (
              Periodo33 &&
              Periodo34 &&
              Periodo35 &&
              Periodo36 &&
              Periodo38 &&
              Periodo39
            ) {
              /**asdasdasdasdsadasdasd */
              for (var j = 0; j < DatosHorarioGG.length; j++) {
                /*LUNES*/
                if (
                  DatosHorarioGG[j].dia01.periodo01.idTeac ==
                  horario.dia01.periodo01.idTeac
                ) {
                  periosoM = periosoM + "1-";
                }
                if (
                  DatosHorarioGG[j].dia01.periodo02.idTeac ==
                  horario.dia01.periodo02.idTeac
                ) {
                  periosoM = periosoM + "2-";
                }
                if (
                  DatosHorarioGG[j].dia01.periodo03.idTeac ==
                  horario.dia01.periodo03.idTeac
                ) {
                  periosoM = periosoM + "3-";
                }
                if (
                  DatosHorarioGG[j].dia01.periodo04.idTeac ==
                  horario.dia01.periodo04.idTeac
                ) {
                  periosoM = periosoM + "4-";
                }
                if (
                  DatosHorarioGG[j].dia01.periodo05.idTeac ==
                  horario.dia01.periodo05.idTeac
                ) {
                  periosoM = periosoM + "5-";
                }
                if (
                  DatosHorarioGG[j].dia01.periodo06.idTeac ==
                  horario.dia01.periodo06.idTeac
                ) {
                  periosoM = periosoM + "6-";
                }
                if (
                  DatosHorarioGG[j].dia01.periodo07.idTeac ==
                  horario.dia01.periodo07.idTeac
                ) {
                  periosoM = periosoM + "7-";
                }
                /**martes */
                if (
                  DatosHorarioGG[j].dia02.periodo09.idTeac ==
                  horario.dia02.periodo09.idTeac
                ) {
                  periosoM2 = periosoM2 + "9-";
                }
                if (
                  DatosHorarioGG[j].dia02.periodo10.idTeac ==
                  horario.dia02.periodo10.idTeac
                ) {
                  periosoM2 = periosoM2 + "10-";
                }
                if (
                  DatosHorarioGG[j].dia02.periodo11.idTeac ==
                  horario.dia02.periodo11.idTeac
                ) {
                  periosoM2 = periosoM2 + "11-";
                }
                if (
                  DatosHorarioGG[j].dia02.periodo12.idTeac ==
                  horario.dia02.periodo12.idTeac
                ) {
                  periosoM2 = periosoM2 + "12-";
                }
                if (
                  DatosHorarioGG[j].dia02.periodo13.idTeac ==
                  horario.dia02.periodo13.idTeac
                ) {
                  periosoM2 = periosoM2 + "13-";
                }
                if (
                  DatosHorarioGG[j].dia02.periodo14.idTeac ==
                  horario.dia02.periodo14.idTeac
                ) {
                  periosoM2 = periosoM2 + "14-";
                }
                if (
                  DatosHorarioGG[j].dia02.periodo15.idTeac ==
                  horario.dia02.periodo15.idTeac
                ) {
                  periosoM2 = periosoM2 + "15-";
                }
                /**miercoles */
                if (
                  DatosHorarioGG[j].dia03.periodo17.idTeac ==
                  horario.dia03.periodo17.idTeac
                ) {
                  periosoM3 = periosoM3 + "17-";
                }
                if (
                  DatosHorarioGG[j].dia03.periodo18.idTeac ==
                  horario.dia03.periodo18.idTeac
                ) {
                  periosoM3 = periosoM3 + "18-";
                }
                if (
                  DatosHorarioGG[j].dia03.periodo19.idTeac ==
                  horario.dia03.periodo19.idTeac
                ) {
                  periosoM3 = periosoM3 + "19-";
                }
                if (
                  DatosHorarioGG[j].dia03.periodo20.idTeac ==
                  horario.dia03.periodo20.idTeac
                ) {
                  periosoM3 = periosoM3 + "20-";
                }
                if (
                  DatosHorarioGG[j].dia03.periodo21.idTeac ==
                  horario.dia03.periodo21.idTeac
                ) {
                  periosoM3 = periosoM3 + "21-";
                }
                if (
                  DatosHorarioGG[j].dia03.periodo22.idTeac ==
                  horario.dia03.periodo22.idTeac
                ) {
                  periosoM3 = periosoM3 + "22-";
                }
                if (
                  DatosHorarioGG[j].dia03.periodo23.idTeac ==
                  horario.dia03.periodo23.idTeac
                ) {
                  periosoM3 = periosoM3 + "23-";
                }
                /**jueves */
                if (
                  DatosHorarioGG[j].dia04.periodo25.idTeac ==
                  horario.dia04.periodo25.idTeac
                ) {
                  periosoM4 = periosoM4 + "25-";
                }
                if (
                  DatosHorarioGG[j].dia04.periodo26.idTeac ==
                  horario.dia04.periodo26.idTeac
                ) {
                  periosoM4 = periosoM4 + "26-";
                }
                if (
                  DatosHorarioGG[j].dia04.periodo27.idTeac ==
                  horario.dia04.periodo27.idTeac
                ) {
                  periosoM4 = periosoM4 + "27-";
                }
                if (
                  DatosHorarioGG[j].dia04.periodo28.idTeac ==
                  horario.dia04.periodo28.idTeac
                ) {
                  periosoM4 = periosoM4 + "28-";
                }
                if (
                  DatosHorarioGG[j].dia04.periodo29.idTeac ==
                  horario.dia04.periodo29.idTeac
                ) {
                  periosoM4 = periosoM4 + "29-";
                }
                if (
                  DatosHorarioGG[j].dia04.periodo30.idTeac ==
                  horario.dia04.periodo30.idTeac
                ) {
                  periosoM4 = periosoM4 + "30-";
                }
                if (
                  DatosHorarioGG[j].dia04.periodo31.idTeac ==
                  horario.dia04.periodo31.idTeac
                ) {
                  periosoM4 = periosoM4 + "31-";
                }
                /**viernes */
                if (
                  DatosHorarioGG[j].dia05.periodo33.idTeac ==
                  horario.dia05.periodo33.idTeac
                ) {
                  periosoM5 = periosoM5 + "33-";
                }
                if (
                  DatosHorarioGG[j].dia05.periodo34.idTeac ==
                  horario.dia05.periodo34.idTeac
                ) {
                  periosoM5 = periosoM5 + "34-";
                }
                if (
                  DatosHorarioGG[j].dia05.periodo35.idTeac ==
                  horario.dia05.periodo35.idTeac
                ) {
                  periosoM5 = periosoM5 + "35-";
                }
                if (
                  DatosHorarioGG[j].dia05.periodo36.idTeac ==
                  horario.dia05.periodo36.idTeac
                ) {
                  periosoM5 = periosoM5 + "36-";
                }
                if (
                  DatosHorarioGG[j].dia05.periodo37.idTeac ==
                  horario.dia05.periodo37.idTeac
                ) {
                  periosoM5 = periosoM5 + "37-";
                }
                if (
                  DatosHorarioGG[j].dia05.periodo38.idTeac ==
                  horario.dia05.periodo38.idTeac
                ) {
                  periosoM5 = periosoM5 + "38-";
                }
                if (
                  DatosHorarioGG[j].dia05.periodo39.idTeac ==
                  horario.dia05.periodo39.idTeac
                ) {
                  periosoM5 = periosoM5 + "39-";
                }
                /**sabado */
                if (
                  DatosHorarioGG[j].dia06.periodo41.idTeac ==
                  horario.dia06.periodo41.idTeac
                ) {
                  periosoM6 = periosoM6 + "41-";
                }
              }
              if (periosoM == "") {
                if (periosoM2 == "") {
                  if (periosoM3 == "") {
                    if (periosoM4 == "") {
                      if (periosoM5 == "") {
                        if (periosoM6 == "") {
                          toast.success("HORARIO VERIFICADO", {
                            transition: Zoom,
                          });
                        } else {
                          toast.error(mensajeVerificacion6 + " " + periosoM6, {
                            transition: Zoom,
                          });
                        }
                      } else {
                        toast.error(mensajeVerificacion5 + " " + periosoM5, {
                          transition: Zoom,
                        });
                      }
                    } else {
                      toast.error(mensajeVerificacion4 + " " + periosoM4, {
                        transition: Zoom,
                      });
                    }
                  } else {
                    toast.error(mensajeVerificacion3 + " " + periosoM3, {
                      transition: Zoom,
                    });
                  }
                } else {
                  toast.error(mensajeVerificacion2 + " " + periosoM2, {
                    transition: Zoom,
                  });
                }
              } else {
                toast.error(mensajeVerificacion + " " + periosoM, {
                  transition: Zoom,
                });
              }
            } else {
              toast.error("Horario de Viernes no puede estar vacio", {
                transition: Zoom,
              });
            }
          } else {
            toast.error("Horario de Jueves no puede estar vacio", {
              transition: Zoom,
            });
          }
        } else {
          toast.error("Horario de Miercoles no puede estar vacio", {
            transition: Zoom,
          });
        }
      } else {
        toast.error("Horario de Martes no puede estar vacio", {
          transition: Zoom,
        });
      }
    } else {
      toast.error("Horario de Lunes no puede estar vacio", {
        transition: Zoom,
      });
    }
  };

  return (
    <div className="schedules-management">
      <div className="message">
        <Message className="fond-message">
          <Message.Header>
            <h3>Asignar Horario - Unidad Educativa Ave Maria</h3>
          </Message.Header>
        </Message>
      </div>
      <div className="button-managements2">
        <div className="botones_horario_lok">
          <Button color="orange" onClick={() => setopen3(true)}>
            <Icon name="cogs" />
            Agregar Horario
          </Button>
          <br></br>
          <br></br>
          <Button negative>
            <Icon name="delete" />
            Cancelar Horario
          </Button>
        </div>
        <Button
          positive
          onClick={() => {
            setOpen(true);
          }}
        >
          <Icon name="question circle" /> Materias
        </Button>
        <br></br>
        <br></br>
        <Button positive onClick={() => setopen2(true)}>
          <Icon name="question circle" /> Cursos
        </Button>
        <Button positive onClick={VerificarHorarioProfesor}>
          <Icon name="question circle" /> Verificar Cursos
        </Button>
      </div>
      <div className="class-dropdown">
        <Dropdown
          className="select-schedule"
          placeholder="Cursos"
          fluid
          search
          selection
          options={gradeList}
          onChange={(e, data) => {
            setCurso(data.value);
          }}
        />
        <Dropdown
          className="select-schedule"
          placeholder="Nivel Academico"
          fluid
          search
          selection
          options={academic_level}
          onChange={(e, data) => {
            onSelectLevelAcademic(data.value);
            setValueDrop(e.target.name);
            setEducationLevess(data.value);
          }}
        />
      </div>
      <div className="table">
        <Table inverted celled padded striped className="list-schedules">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Hrs</Table.HeaderCell>
              <Table.HeaderCell>Lunes</Table.HeaderCell>
              <Table.HeaderCell>Martes</Table.HeaderCell>
              <Table.HeaderCell>Miercoles</Table.HeaderCell>
              <Table.HeaderCell>Jueves</Table.HeaderCell>
              <Table.HeaderCell>Viernes</Table.HeaderCell>
              <Table.HeaderCell>Sabado</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row className="list-schedules__status-available">
              <Table.Cell textAlign="center">
                {EducationLevess == "Secundaria" ? "14:00" : "08:00"}
              </Table.Cell>
              <Table.Cell>
                1
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo01(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                9
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo09(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                17
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo17(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                25
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo25(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                33
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo33(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                41
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo41(data.value);
                  }}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>

          <Table.Body>
            <Table.Row className="list-schedules__status-available">
              <Table.Cell textAlign="center">
                {EducationLevess == "Secundaria" ? "14:45" : "08:45"}
              </Table.Cell>
              <Table.Cell>
                2
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo02(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                10
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo10(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                18
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo18(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                26
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo26(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                34
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo34(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                42
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo42(data.value);
                  }}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>

          <Table.Body>
            <Table.Row className="list-schedules__status-available">
              <Table.Cell textAlign="center">
                {EducationLevess == "Secundaria" ? "15:30" : "09:30"}
              </Table.Cell>
              <Table.Cell>
                3
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo03(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                11
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo11(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                19
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo19(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                27
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo27(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                35
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo35(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>

          <Table.Body>
            <Table.Row className="list-schedules__status-available">
              <Table.Cell textAlign="center">
                {EducationLevess == "Secundaria" ? "16:15" : "10:15"}
              </Table.Cell>
              <Table.Cell>
                4
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo04(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                12
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo12(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                20
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo20(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                28
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo28(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                36
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo36(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>

          <Table.Body>
            <Table.Row className="list-schedules__status-available">
              <Table.Cell textAlign="center">
                {EducationLevess == "Secundaria" ? "17:00" : "11:00"}
              </Table.Cell>
              <Table.Cell>
                5
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo05(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                13
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo13(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                21
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  name="perio"
                  onChange={(e, data) => {
                    setPeriodo21(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                29
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo29(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                37
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo37(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>

          <Table.Body>
            <Table.Row className="list-schedules__status-available">
              <Table.Cell textAlign="center">
                {EducationLevess == "Secundaria" ? "17:45" : "11:45"}
              </Table.Cell>
              <Table.Cell>
                6
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo06(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                14
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo14(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                22
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo22(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                30
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo30(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                38
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo38(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>

          <Table.Body>
            <Table.Row className="list-schedules__status-available">
              <Table.Cell textAlign="center">
                {EducationLevess == "Secundaria" ? "18:30" : "12:30"}
              </Table.Cell>
              <Table.Cell>
                7
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo07(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                15
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo15(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                23
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo23(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                31
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo31(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                39
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo39(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>

          <Table.Body>
            <Table.Row className="list-schedules__status-available">
              <Table.Cell textAlign="center">
                {EducationLevess == "Secundaria" ? "19:15" : "13:15"}
              </Table.Cell>
              <Table.Cell>
                8
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo08(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                16
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo16(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                24
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo24(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                32
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo32(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                40
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                  id="perio"
                  onChange={(e, data) => {
                    setPeriodo40(data.value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                <Dropdown
                  className="material-select"
                  placeholder="Materia"
                  fluid
                  search
                  selection
                  options={daIner}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        className="modal_add_material"
      >
        <Modal.Header className="fonfo">Materias - U.D. Ave Maria</Modal.Header>
        <Modal.Content className="content-modal">
          <Modal.Description>
            <AddMaterial
              persons={persons}
              addMater={addMaterial_bd}
              onDelete={onDelete_db}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions className="fono">
          <Button color="blue" onClick={() => setOpen(false)}>
            Atras
          </Button>
        </Modal.Actions>
      </Modal>
      <Modal
        onClose={() => setopen2(false)}
        onOpen={() => setopen2(true)}
        open={open2}
        className="modal_add_material"
      >
        <Modal.Header className="fonfo">Cursos - U.D. Ave Maria</Modal.Header>
        <Modal.Content className="content-modal">
          <Modal.Description>
            <AddParallel persons2={persons2} />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions className="fono">
          <Button color="blue" onClick={() => setopen2(false)}>
            Atras
          </Button>
        </Modal.Actions>
      </Modal>
      <br></br>
      <Modal
        basic
        onClose={() => setopen3(false)}
        onOpen={() => setopen3(true)}
        open={open3}
        size="small"
      >
        <Header icon>
          <Icon name="archive" />

          <h1> Unidad Educativa Ave Maria</h1>
        </Header>
        <Modal.Content>
          <h2>
            Esta seguro de agregar el horario para sus seguridad pasara por un
            ultimo filtro para validad los datos?
          </h2>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={() => setopen3(false)}>
            <Icon name="remove" /> No
          </Button>
          <Button color="green" inverted onClick={() => onhandleHorario()}>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
