import React, { useState, useEffect } from "react";
import { Table, Button } from "semantic-ui-react";
import { Image } from "antd";
import { map } from "lodash";
import { Link } from "react-router-dom";

import moment from "moment";
import "moment/locale/es";

import LoadingTable from "../../Loadings/LoadingTable";
import firebase from "../../../utils/firebase";
import Pagination from "../../Pagination";
import BasicModal from "../../Modal/BasicModal";
import QuestionModal from "../../Modal/QuestionModal";

import "./ListStudents.scss";

import "firebase/firestore";
import "firebase/storage";

const db = firebase.firestore(firebase);

export default function ListStudents(props) {
  const {
    students,
    setStudents,
    updateData,
    setUpdateData,
    setStudentsInfoExport,
  } = props;
  const [showModal, setShowModal] = useState(false);
  const [showModalQuestion, setShowModalQuestion] = useState(false);

  const [titleModal, setTitleModal] = useState("");
  const [titleModalQuestion, setTitleModalQuestion] = useState("");

  const [iconNameModal, setIconNameModal] = useState("");
  const [iconNameModalQuestion, setIconNameModalQuestion] = useState("");

  const [typePerson, setTypePerson] = useState("");
  const [typeAction, setTypeAction] = useState("");
  const [typeActionQuestion, setTypeActionQuestion] = useState("");

  const [studentInfo, setStudentInfo] = useState(null);
  const [isLoadingTable, setIsLoadingTable] = useState(false);

  useEffect(() => {
    if (setUpdateData) {
      setIsLoadingTable(true);
      db.collection("students")
        .get()
        .then((response) => {
          const studentsArrayAux = [];
          map(response.docs, (student) => {
            const studentAux = student.data();
            studentAux.id = student.id;
            studentAux.dateBirthNew = moment(
              new Date(parseInt(studentAux.dateBirth.seconds * 1000))
            ).format("D [de] MMMM [de] YYYY");
            studentsArrayAux.push(studentAux);
          });
          setStudents(studentsArrayAux);
          setStudentsInfoExport(studentsArrayAux);
        })
        .finally(() => {
          setIsLoadingTable(false);
          setUpdateData(false);
        });
    }
  }, [updateData]);

  return (
    <>
      {isLoadingTable ? (
        <LoadingTable />
      ) : (
        <>
          <div className="title-list-students">
            <h1>Lista de Estudiantes</h1>
          </div>
          <div className="table">
            <Table inverted celled padded striped className="list-students">
              <Table.Header>
                <Table.Row textAlign="center">
                  <Table.HeaderCell>Foto</Table.HeaderCell>
                  <Table.HeaderCell>C.I.</Table.HeaderCell>
                  <Table.HeaderCell>Nombre</Table.HeaderCell>
                  <Table.HeaderCell>Edad</Table.HeaderCell>
                  <Table.HeaderCell>Teléfono Celular</Table.HeaderCell>
                  <Table.HeaderCell>Sede</Table.HeaderCell>
                  <Table.HeaderCell>Género</Table.HeaderCell>
                  <Table.HeaderCell>Correo Electrónico</Table.HeaderCell>
                  <Table.HeaderCell>Mas Información</Table.HeaderCell>
                  <Table.HeaderCell>Acciones</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {map(students, (student) => (
                  <RenderPerson
                    key={student.id}
                    student={student}
                    setShowModal={setShowModal}
                    setShowModalQuestion={setShowModalQuestion}
                    setTitleModal={setTitleModal}
                    setTitleModalQuestion={setTitleModalQuestion}
                    setIconNameModal={setIconNameModal}
                    setIconNameModalQuestion={setIconNameModalQuestion}
                    setTypePerson={setTypePerson}
                    setTypeAction={setTypeAction}
                    setTypeActionQuestion={setTypeActionQuestion}
                    setStudentInfo={setStudentInfo}
                  />
                ))}
              </Table.Body>
            </Table>
          </div>
        </>
      )}
      <div className="list-students__pagination">
        <Pagination />
      </div>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        iconName={iconNameModal}
        typePerson={typePerson}
        typeAction={typeAction}
        student={studentInfo}
        valuePGB={7}
        setUpdateData={setUpdateData}
      />
      <QuestionModal
        show={showModalQuestion}
        setShow={setShowModalQuestion}
        title={titleModalQuestion}
        iconName={iconNameModalQuestion}
        type={typeActionQuestion}
        student={studentInfo}
        setUpdateData={setUpdateData}
      />
    </>
  );
}
function RenderPerson(props) {
  const {
    student,
    setShowModal,
    setShowModalQuestion,
    setTitleModal,
    setTitleModalQuestion,
    setIconNameModal,
    setIconNameModalQuestion,
    setTypePerson,
    setTypeAction,
    setTypeActionQuestion,
    setStudentInfo,
  } = props;

  const [imageUrl, setImageUrl] = useState(null);

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
      <Table.Cell>{student.departament}</Table.Cell>
      <Table.Cell>
        {student.gender === true
          ? "Masculino"
          : student.gender === false
          ? "Femenino"
          : "Sin Género"}
      </Table.Cell>
      <Table.Cell>{student.email}</Table.Cell>
      <Table.Cell collapsing>
        <Link to={`/student/${student.id}`}>
          <Button inverted color="blue">
            Mas Info
          </Button>
        </Link>
      </Table.Cell>
      <Table.Cell collapsing>
        <Button.Group>
          <Button
            color="violet"
            onClick={() => {
              setShowModal(true);
              setTitleModal("Modificación Estudiante");
              setIconNameModal("student");
              setTypePerson("student");
              setTypeAction("modify");
              setStudentInfo(student);
            }}
          >
            Modificar
          </Button>
          <Button.Or text="o" />
          {student.studentStatus === "Disponible" ? (
            <Button
              color="red"
              onClick={() => {
                setShowModalQuestion(true);
                setTitleModalQuestion("Dar de Baja a un Estudiante");
                setIconNameModalQuestion("user delete");
                setTypeActionQuestion("remove-student");
                setStudentInfo(student);
              }}
            >
              Dar de Baja
            </Button>
          ) : (
            <Button
              color="green"
              onClick={() => {
                setShowModalQuestion(true);
                setTitleModalQuestion("Dar de Alta a un Estudiante");
                setIconNameModalQuestion("user plus");
                setTypeActionQuestion("re-add-student");
                setStudentInfo(student);
              }}
            >
              Dar de Alta
            </Button>
          )}
        </Button.Group>
      </Table.Cell>
    </Table.Row>
  );
}
