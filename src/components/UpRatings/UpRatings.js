import { useState, useEffect } from "react";
import { map } from "lodash";
import { Icon, Input, Button, Table, Dropdown, Label } from "semantic-ui-react";
import "./UpRatings.scss";
import firebase from "../../utils/firebase";
import Enumerable from "linq";
import { toast, Zoom } from "react-toastify";

const db = firebase.firestore(firebase);

export const UpRatings = (props) => {
  const { user } = props;
  const [trimestre, setTrimestre] = useState([]);
  const [DataCourse, setDataCourse] = useState([]);
  const [DataStudent, setDataStudent] = useState([]);
  const [PromNotas, setPromNotas] = useState([]);
  const [Materia, setMateria] = useState("");
  const [Trimestre2, setTrimestre2] = useState();
  const [DataCursoInd, setDataCursoInd] = useState("");
  const [open, setOpen] = useState(false);
  const [DATOcURSOcALIF, setDATOcURSOcALIF] = useState([]);
  let [inputCalification, setinputCalification] = useState([
    { asistencia: "", practicas: "", examen: "" },
  ]);

  useEffect(() => {
    db.collection("trimesters")
      .get()
      .then((response) => {
        const trimestreAux = [];
        map(response.docs, (trimestre, index) => {
          const data = trimestre.data();
          trimestreAux.push({
            key: index,
            value: data.numberTrimester,
            text: data.numberTrimester + "Trimestre",
          });
        });
        setTrimestre(trimestreAux);
      });
    db.collection("classRooms")
      .get()
      .then((reps) => {
        const course = [];
        const idClass = [];
        map(reps.docs, (classR) => {
          const data2 = classR.data();
          if (data2.Teachers != undefined) {
            map(data2.Teachers, (item, index) => {
              if (item == user.accountId) {
                course.push({
                  key: classR.id,
                  value: classR.id,
                  text:
                    data2.grade +
                    " " +
                    data2.parallel +
                    " " +
                    data2.educationLevel,
                });
                idClass.push(classR.id);
              }
            });
          }
        });
        setDataCourse(course);
      });
  }, []);
  useEffect(() => {
    db.collection("school_material")
      .doc(user.subjectId)
      .get()
      .then((doc) => {
        setMateria(doc.data());
      });
  }, []);
  const OnSheartStudents = (parrallel) => {
    if (parrallel) {
      db.collection("students")
        .where("classRoomId", "==", parrallel)
        .get()
        .then((resp2) => {
          const aux = [];
          map(resp2.docs, (da) => {
            const aux2 = da.data();
            aux.push({ ...aux2, id: da.id });
          });
          const res = Enumerable.from(aux)
            .orderBy((x) => x.fatherLastName)
            .toArray();
          setDataStudent(res);
          for (var i = 1; i <= aux.length; i++) {
            inputCalification = [
              ...inputCalification,
              { asistencia: "", practicas: "", examen: "" },
            ];
            const valor = [...inputCalification];
            valor.splice(1, 1);
            setinputCalification(valor);
          }
        });
      setPromNotas([]);
    }
  };
  const PormNotas = [];
  const OnSubmitQualification = async (e) => {
    let contador = 0;
    e.preventDefault();
    if (Trimestre2) {
      if (DataCursoInd) {
        for (var i = 0; i < inputCalification.length; i++) {
          if (
            inputCalification[i].asistencia &&
            inputCalification[i].practicas &&
            inputCalification[i].examen
          ) {
            contador++;
          }
        }
        if (contador == inputCalification.length) {
          if (Trimestre2 == 1) {
            const datita = [];
            for (var i = 0; i < inputCalification.length; i++) {
              datita.push({
                idStudent: DataStudent[i].id,
                subjects: [
                  {
                    [Materia.id_matter]: {
                      qualification1: parseInt(inputCalification[i].asistencia),
                      qualification2: parseInt(inputCalification[i].practicas),
                      qualification3: parseInt(inputCalification[i].examen),
                    },
                  },
                  {
                    [Materia.id_matter]: {
                      qualification1: 0,
                      qualification2: 0,
                      qualification3: 0,
                    },
                  },
                  {
                    [Materia.id_matter]: {
                      qualification1: 0,
                      qualification2: 0,
                      qualification3: 0,
                    },
                  },
                ],
              });
            }
            for (var j = 0; j < datita.length; j++) {
              db.collection("qualificationStudents").doc().set({
                idStudent: datita[j].idStudent,
                subjects: datita[j].subjects,
              });
            }
            toast.success(
              "Calificaciones Subidas " + Trimestre2 + " Trimestre",
              {
                transition: Zoom,
              }
            );
          }
          if (Trimestre2 == 2) {
            const aux5 = [];
            const aux6 = [];
            for (var g = 0; g < DataStudent.length; g++) {
              await db
                .collection("qualificationStudents")
                .where("idStudent", "==", DataStudent[g].id)
                .get()
                .then((resp2) => {
                  map(resp2.docs, (da) => {
                    const aux21 = da.data();
                    aux5.push({ ...aux21 });
                  });
                });
              await db
                .collection("qualificationStudents")
                .where("idStudent", "==", DataStudent[g].id)
                .get()
                .then((resp2) => {
                  map(resp2.docs, (da) => {
                    const aux21 = da.data();
                    aux6.push({ ...aux21, id: da.id });
                  });
                });
            }
            const datitoM = [];
            const idsss = Materia.id_matter;
            for (var j = 0; j < aux5.length; j++) {
              for (var d = 0; d < aux5.length; d++) {
                datitoM.push({
                  idStudent: DataStudent[d].id,
                  subjects: [
                    {
                      [Materia.id_matter]: {
                        qualification1:
                          aux5[j].subjects[d][idsss].qualification1,
                        qualification2:
                          aux5[j].subjects[d][idsss].qualification2,
                        qualification3:
                          aux5[j].subjects[d][idsss].qualification3,
                      },
                    },
                    {
                      [Materia.id_matter]: {
                        qualification1: parseInt(
                          inputCalification[d].asistencia
                        ),
                        qualification2: parseInt(
                          inputCalification[d].practicas
                        ),
                        qualification3: parseInt(inputCalification[d].examen),
                      },
                    },
                    {
                      [Materia.id_matter]: {
                        qualification1: 0,
                        qualification2: 0,
                        qualification3: 0,
                      },
                    },
                  ],
                });
              }
            }
            //console.log(datitoM);
            for (var t = 0; t < DataStudent.length; t++) {
              db.collection("qualificationStudents").doc(aux6[t].id).update({
                subjects: datitoM[t].subjects,
              });
            }
            toast.success("NOTAS SUBIDAS " + Trimestre2, {
              transition: Zoom,
            });
          }
          if (Trimestre2 == 3) {
            const aux5 = [];
            const aux6 = [];
            for (var g = 0; g < DataStudent.length; g++) {
              await db
                .collection("qualificationStudents")
                .where("idStudent", "==", DataStudent[g].id)
                .get()
                .then((resp2) => {
                  map(resp2.docs, (da) => {
                    const aux21 = da.data();
                    aux5.push({ ...aux21 });
                  });
                });
              await db
                .collection("qualificationStudents")
                .where("idStudent", "==", DataStudent[g].id)
                .get()
                .then((resp2) => {
                  map(resp2.docs, (da) => {
                    const aux21 = da.data();
                    aux6.push({ ...aux21, id: da.id });
                  });
                });
            }
            const datitoM = [];
            const idsss = Materia.id_matter;
            for (var j = 0; j < aux5.length; j++) {
              for (var d = 0; d < aux5.length; d++) {
                datitoM.push({
                  idStudent: DataStudent[d].id,
                  subjects: [
                    {
                      [Materia.id_matter]: {
                        qualification1:
                          aux5[j].subjects[d][idsss].qualification1,
                        qualification2:
                          aux5[j].subjects[d][idsss].qualification2,
                        qualification3:
                          aux5[j].subjects[d][idsss].qualification3,
                      },
                    },
                    {
                      [Materia.id_matter]: {
                        qualification1:
                          aux5[j].subjects[d][idsss].qualification1,
                        qualification2:
                          aux5[j].subjects[d][idsss].qualification2,
                        qualification3:
                          aux5[j].subjects[d][idsss].qualification3,
                      },
                    },
                    {
                      [Materia.id_matter]: {
                        qualification1: parseInt(
                          inputCalification[d].asistencia
                        ),
                        qualification2: parseInt(
                          inputCalification[d].practicas
                        ),
                        qualification3: parseInt(inputCalification[d].examen),
                      },
                    },
                  ],
                });
              }
            }
            for (var t = 0; t < DataStudent.length; t++) {
              db.collection("qualificationStudents").doc(aux6[t].id).update({
                subjects: datitoM[t].subjects,
              });
            }
            toast.success("NOTAS SUBIDAS " + Trimestre2, {
              transition: Zoom,
            });
          }
        } else {
          toast.warning("Peligro Datos incompletos ", {
            transition: Zoom,
          });
          return;
        }
      } else {
        toast.warning("Peligro no seleccionaste el curso ", {
          transition: Zoom,
        });
      }
    } else {
      toast.warning("Peligro no seleccionaste el trimestre ", {
        transition: Zoom,
      });
    }
    setinputCalification([{ asistencia: "", practicas: "", examen: "" }]);
    setOpen(false);
  };
  const OnSubmitQualification2 = (e) => {
    e.preventDefault();
    let suma = 0;
    let promedio = 0;
    for (var i = 0; i < inputCalification.length; i++) {
      suma = 0;
      promedio = 0;
      suma =
        parseInt(inputCalification[i].asistencia) +
        parseInt(inputCalification[i].practicas) +
        parseInt(inputCalification[i].examen);
      promedio = suma / 3;
      PormNotas.push(promedio.toFixed(2));
      setPromNotas(PormNotas);
    }
  };
  const handleChangeInput = (index, e) => {
    const datos = [...inputCalification];
    datos[index][e.target.name] = e.target.value;
    setinputCalification(datos);
  };
  const recargarPag = () => {
    window.location.reload(true);
  };
  return (
    <div className="up-ratings">
      <div className="inputs-dropdown">
        <Dropdown
          className="list-drop"
          placeholder="Seleccione Grado"
          fluid
          search
          selection
          options={DataCourse}
          onChange={(e, data) => {
            OnSheartStudents(data.value);
            setDataCursoInd(data.value);
          }}
        />
        <Dropdown
          className="list-drop3"
          placeholder="Seleccione Trimestre"
          fluid
          search
          selection
          options={trimestre}
          onChange={(e, data) => {
            setTrimestre2(data.value);
          }}
        />
      </div>

      <div className="button-calification">
        <Button positive onClick={OnSubmitQualification}>
          <Icon name="circle" />
          Subir Calificaciones
        </Button>
        <Button color="blue" onClick={OnSubmitQualification2}>
          <Icon name="calculator" />
          Calcular Calificaciones
        </Button>
        <Button negative onClick={recargarPag}>
          <Icon name="cancel" />
          Cancelar Calificaciones
        </Button>
      </div>
      <div className="table">
        <Table inverted celled selectable className="list-rating-students">
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell>Nro</Table.HeaderCell>
              <Table.HeaderCell>NombreApellido</Table.HeaderCell>
              <Table.HeaderCell>Examen-1</Table.HeaderCell>
              <Table.HeaderCell>Examen-2</Table.HeaderCell>
              <Table.HeaderCell>Examen-3</Table.HeaderCell>
              <Table.HeaderCell>Promedio</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {DataStudent.map((dar, index) => (
              <Table.Row
                textAlign="center"
                className="list-rating-students__status-available"
                key={dar.id}
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>
                  {dar.firstName +
                    " " +
                    dar.secondName +
                    " " +
                    dar.fatherLastName +
                    " " +
                    dar.motherLastName}
                </Table.Cell>
                <Table.Cell>
                  <Input
                    className="input-calification"
                    name="asistencia"
                    onChange={(e) => handleChangeInput(index, e)}
                  ></Input>
                  /100
                </Table.Cell>
                <Table.Cell>
                  <Input
                    className="input-calification"
                    name="practicas"
                    onChange={(e) => handleChangeInput(index, e)}
                  ></Input>
                  /100
                </Table.Cell>
                <Table.Cell>
                  <Input
                    className="input-calification"
                    name="examen"
                    onChange={(e) => handleChangeInput(index, e)}
                  ></Input>
                  /100
                </Table.Cell>
                {PromNotas[index] >= 51 ? (
                  <Table.Cell>
                    <Label color="green" key={dar.id}>
                      {PromNotas[index]}/100
                    </Label>
                  </Table.Cell>
                ) : (
                  <Table.Cell>
                    <Label color="red" key={dar.id}>
                      {PromNotas[index]}/100
                    </Label>
                  </Table.Cell>
                )}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
