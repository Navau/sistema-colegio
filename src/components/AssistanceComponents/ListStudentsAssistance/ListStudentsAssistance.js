import React, { useState, useEffect } from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import { Image } from "antd";
import { map } from "lodash";
import { Alert, Checkbox } from "antd";
import { toast, Zoom } from "react-toastify";
import moment from "moment";
import "moment/locale/es";

import LoadingTable from "../../Loadings/LoadingTable";
import firebase from "../../../utils/firebase";
import firebaseApp from "firebase/app";

import { removeArrayDuplicatesByIDStudent } from "../../../utils/arrayFunctions";

import "./ListStudentsAssistance.scss";

import "firebase/firestore";
import "firebase/storage";
import "firebase/app";

const arrayUnion = firebaseApp.firestore.FieldValue.arrayUnion;
const arrayRemove = firebaseApp.firestore.FieldValue.arrayRemove;

const db = firebase.firestore(firebase);

export default function ListStudentsAssistance(props) {
  const { viewList } = props;

  const [students, setStudents] = useState(null);

  const [updateData, setUpdateData] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [studentsAssistance, setStudentsAssistance] = useState([]);
  // console.log("studentsAssistance", studentsAssistance);
  // console.log("students", students);

  const dateBirthFormat = (date) => {
    const dateMiliseconds = date * 1000;
    const dateResult = new Date(dateMiliseconds);
    return moment(dateResult).format("D-MMMM-YYYY");
  };

  const onSubmit = () => {
    setIsLoadingButton(true);
    const assistanceAuxArray = studentsAssistance;
    const date = new Date(viewList);
    date.setHours(0, 0, 0, 0);
    map(assistanceAuxArray, (item, index) => {
      const itemAuxStudent = students[index].assistanceInfo;
      let variableAux = students[index].assistanceInfo?.dateInfo?.date;
      if (variableAux) {
        if (
          item.status !== itemAuxStudent.dateInfo.status ||
          item.license !== itemAuxStudent.dateInfo.license ||
          item.delay !== itemAuxStudent.dateInfo.delay
        ) {
          db.collection("assistance")
            .doc(itemAuxStudent.idAssistance)
            .update(
              "dates",
              arrayRemove({
                date: date,
                status: itemAuxStudent.dateInfo.status,
                license: itemAuxStudent.dateInfo.license,
                delay: itemAuxStudent.dateInfo.delay,
              }),
              "dates",
              arrayUnion({
                date: date,
                status: item.status,
                license: item.license,
                delay: item.delay,
              })
            )
            .then(() => {
              setUpdateData(true);
            })
            .finally(() => {
              setIsLoadingButton(false);
            });
        }
      } else {
        db.collection("assistance")
          .where("idStudent", "==", students[index].id)
          .get()
          .then((response) => {
            if (response?.docs[0]?.exists) {
              db.collection("assistance")
                .doc(itemAuxStudent.idAssistance)
                .update(
                  "dates",
                  arrayUnion({
                    date: date,
                    status: item.status,
                    license: item.license,
                    delay: item.delay,
                  })
                )
                .then(() => {
                  setUpdateData(true);
                })
                .finally(() => {
                  setIsLoadingButton(false);
                });
            } else {
              db.collection("assistance")
                .add({
                  idStudent: students[index].id,
                  dates: [
                    {
                      date: date,
                      status: item.status,
                      license: item.license,
                      delay: item.delay,
                    },
                  ],
                })
                .then(() => {
                  setUpdateData(true);
                })
                .finally(() => {
                  setIsLoadingButton(false);
                });
            }
          })
          .finally(() => {
            setIsLoadingButton(false);
          });
      }
    });
    toast.info("La Asistencia de los estudiantes, fue modificada con exito!", {
      transition: Zoom,
    });
  };

  useEffect(() => {
    if (setUpdateData) {
      setIsLoadingTable(true);
      db.collection("students")
        .get()
        .then((response) => {
          const studentsArrayAux = [];
          const assistanceArrayAux = [];
          map(response.docs, (student) => {
            const studentAux = student.data();
            studentAux.id = student.id;
            studentsArrayAux.push(studentAux);
          });

          setIsLoadingTable(true);
          db.collection("assistance")
            .get()
            .then((response2) => {
              map(response2.docs, (assistance) => {
                const dates = assistance.data().dates;
                const assistanceAux = assistance.data();
                assistanceAux.idAssistance = assistance.id;
                map(dates, (item, index) => {
                  const date1 = dateBirthFormat(item.date?.seconds);
                  const date2 = moment(viewList).format("D-MMMM-YYYY");
                  if (date1 === date2) {
                    assistanceAux.dateInfo = item;
                  }
                });
                delete assistanceAux.dates;
                assistanceArrayAux.push(assistanceAux);
              });
              map(studentsArrayAux, (item, index) => {
                map(assistanceArrayAux, (item2, index2) => {
                  if (item.id === item2.idStudent) {
                    item.assistanceInfo = item2;
                  }
                });
              });
              setStudents(studentsArrayAux);
            })
            .finally(() => {
              setIsLoadingTable(false);
              setUpdateData(false);
            });
        })
        .finally(() => {
          setIsLoadingTable(false);
          setUpdateData(false);
        });
    }
  }, [updateData]);

  return (
    <div>
      <Alert
        message={`Fecha seleccionada: ${
          viewList && viewList.format("YYYY-MM-DD")
        }`}
      />
      {isLoadingTable ? (
        <LoadingTable />
      ) : (
        <>
          <div className="title-list-students-assistance">
            <h1>Lista de Estudiantes</h1>
          </div>
          <div className="assistance-table">
            <Table inverted celled padded striped className="list-students">
              <Table.Header>
                <Table.Row textAlign="center">
                  <Table.HeaderCell>Foto</Table.HeaderCell>
                  <Table.HeaderCell>C.I.</Table.HeaderCell>
                  <Table.HeaderCell>Nombre</Table.HeaderCell>
                  <Table.HeaderCell>Edad</Table.HeaderCell>
                  <Table.HeaderCell>Teléfono Celular</Table.HeaderCell>
                  <Table.HeaderCell>Asistencia</Table.HeaderCell>
                  <Table.HeaderCell>Licencia</Table.HeaderCell>
                  <Table.HeaderCell>Atraso</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {map(students, (student) => (
                  <RenderPerson
                    key={student.id}
                    student={student}
                    studentsAssistance={studentsAssistance}
                    setStudentsAssistance={setStudentsAssistance}
                  />
                ))}
              </Table.Body>
            </Table>
          </div>
          <div className="save-student">
            <Button
              icon
              labelPosition="right"
              positive
              loading={isLoadingButton}
              className="save-student__button-save"
              onClick={onSubmit}
            >
              Guardar Cambios
              <Icon name="add square" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function RenderPerson(props) {
  const { key, student, setStudentsAssistance, studentsAssistance } = props;

  const [checkedAssistance, setCheckedAssistance] = useState(
    student.assistanceInfo && student.assistanceInfo.dateInfo
      ? student.assistanceInfo.dateInfo.status
      : false
  );
  const [checkedLicense, setCheckedLicense] = useState(
    student.assistanceInfo && student.assistanceInfo.dateInfo
      ? student.assistanceInfo.dateInfo.license
      : false
  );
  const [checkedDelay, setCheckedDelay] = useState(
    student.assistanceInfo && student.assistanceInfo.dateInfo
      ? student.assistanceInfo.dateInfo.delay
      : false
  );
  const [imageUrl, setImageUrl] = useState(null);
  // console.log("studentsAssistance", studentsAssistance);

  useEffect(() => {
    const arrayAux = studentsAssistance;
    arrayAux.push({
      idStudent: student.id,
      status:
        student.assistanceInfo && student.assistanceInfo.dateInfo
          ? student.assistanceInfo.dateInfo.status
          : false,
      delay:
        student.assistanceInfo && student.assistanceInfo.dateInfo
          ? student.assistanceInfo.dateInfo.delay
          : false,
      license:
        student.assistanceInfo && student.assistanceInfo.dateInfo
          ? student.assistanceInfo.dateInfo.license
          : false,
    });
    setStudentsAssistance(removeArrayDuplicatesByIDStudent(arrayAux));
  }, []);

  useEffect(() => {
    firebase
      .storage()
      .ref(`photoStudents/${student.filePhotoId}`)
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
      });
  }, [student]);

  return (
    <Table.Row
      textAlign="center"
      className={
        student.studentStatus === "Disponible"
          ? "list-students__status-available"
          : "list-students__status-blocked"
      }
      key={student.id}
    >
      <Table.Cell>
        <div className="photo-student">
          <Image.PreviewGroup>
            <Image
              alt={`${student.firstName} ${student.secondName}`}
              src={imageUrl}
            />
          </Image.PreviewGroup>
        </div>
      </Table.Cell>
      <Table.Cell>{student.id}</Table.Cell>
      <Table.Cell>
        {`${student.firstName} ${student.secondName} ${student.fatherLastName} ${student.motherLastName}`}
      </Table.Cell>
      <Table.Cell>{student.age}</Table.Cell>
      <Table.Cell>{student.personalPhone}</Table.Cell>
      <>
        <Table.Cell collapsing>
          <Checkbox
            checked={checkedAssistance}
            onClick={(e, data) => {
              setCheckedAssistance(e.target.checked);
              const dataAssistance = studentsAssistance;
              map(dataAssistance, (item) => {
                if (item.idStudent === student.id) {
                  item.status = e.target.checked;
                }
              });
              setStudentsAssistance(dataAssistance);
            }}
          />
        </Table.Cell>
        <Table.Cell collapsing>
          <Checkbox
            checked={checkedLicense}
            onClick={(e, data) => {
              setCheckedLicense(e.target.checked);
              const dataAssistance = studentsAssistance;
              map(dataAssistance, (item) => {
                if (item.idStudent === student.id) {
                  item.license = e.target.checked;
                }
              });
              setStudentsAssistance(dataAssistance);
            }}
          />
        </Table.Cell>
        <Table.Cell collapsing>
          <Checkbox
            checked={checkedDelay}
            onClick={(e, data) => {
              setCheckedDelay(e.target.checked);
              const dataAssistance = studentsAssistance;
              map(dataAssistance, (item) => {
                if (item.idStudent === student.id) {
                  item.delay = e.target.checked;
                }
              });
              setStudentsAssistance(dataAssistance);
            }}
          />
        </Table.Cell>
      </>
    </Table.Row>
  );
}
