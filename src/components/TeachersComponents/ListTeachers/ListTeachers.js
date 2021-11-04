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

import "./ListTeachers.scss";

import "firebase/firestore";
import "firebase/storage";

const db = firebase.firestore(firebase);

export default function ListTeachers(props) {
  const { teachers, setTeachers, setTeachersInfoExport } = props;
  const [showModal, setShowModal] = useState(false);
  const [showModalQuestion, setShowModalQuestion] = useState(false);

  const [titleModal, setTitleModal] = useState("");
  const [titleModalQuestion, setTitleModalQuestion] = useState("");

  const [iconNameModal, setIconNameModal] = useState("");
  const [iconNameModalQuestion, setIconNameModalQuestion] = useState("");

  const [typePerson, setTypePerson] = useState("");
  const [typeAction, setTypeAction] = useState("");
  const [typeActionQuestion, setTypeActionQuestion] = useState("");

  const [teacherInfo, setTeacherInfo] = useState(null);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    if (setUpdateData) {
      setIsLoadingTable(true);
      db.collection("teachers")
        .get()
        .then((response) => {
          const teachersArrayAux = [];
          map(response.docs, (teacher) => {
            const teacherAux = teacher.data();
            teacherAux.id = teacher.id;
            teacherAux.dateBirthNew = moment(
              new Date(parseInt(teacherAux.dateBirth.seconds * 1000))
            ).format("D [de] MMMM [de] YYYY");
            teachersArrayAux.push(teacherAux);
          });
          setTeachersInfoExport(teachersArrayAux);
          setTeachers(teachersArrayAux);
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
          <div className="title-list-teachers">
            <h1>Lista de Profesores</h1>
          </div>
          <div className="title">
            <Table inverted celled padded striped className="list-teachers">
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
                {map(teachers, (teacher) => (
                  <RenderPerson
                    key={teacher.id}
                    teacher={teacher}
                    setShowModal={setShowModal}
                    setShowModalQuestion={setShowModalQuestion}
                    setTitleModal={setTitleModal}
                    setTitleModalQuestion={setTitleModalQuestion}
                    setIconNameModal={setIconNameModal}
                    setIconNameModalQuestion={setIconNameModalQuestion}
                    setTypePerson={setTypePerson}
                    setTypeAction={setTypeAction}
                    setTeacherInfo={setTeacherInfo}
                    setTypeActionQuestion={setTypeActionQuestion}
                  />
                ))}
              </Table.Body>
            </Table>
          </div>
        </>
      )}
      <div className="list-teachers__pagination">
        <Pagination />
      </div>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        iconName={iconNameModal}
        typePerson={typePerson}
        typeAction={typeAction}
        teacher={teacherInfo}
        valuePGB={5}
        setUpdateData={setUpdateData}
      />
      <QuestionModal
        show={showModalQuestion}
        setShow={setShowModalQuestion}
        title={titleModalQuestion}
        iconName={iconNameModalQuestion}
        type={typeActionQuestion}
        teacher={teacherInfo}
        setUpdateData={setUpdateData}
      />
    </>
  );
}

function RenderPerson(props) {
  const {
    teacher,
    setShowModal,
    setShowModalQuestion,
    setTitleModal,
    setTitleModalQuestion,
    setIconNameModal,
    setIconNameModalQuestion,
    setTypePerson,
    setTypeAction,
    setTypeActionQuestion,
    setTeacherInfo,
  } = props;

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    firebase
      .storage()
      .ref(`photoTeachers/${teacher.filePhotoId}`)
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
      });
  }, [teacher]);

  return (
    <Table.Row
      textAlign="center"
      className={
        teacher.teacherStatus === "Disponible"
          ? "list-teachers__status-available"
          : "list-teachers__status-blocked"
      }
    >
      <Table.Cell>
        <div className="photo-teacher">
          <Image.PreviewGroup>
            <Image
              alt={`${teacher.firstName} ${teacher.secondName}`}
              src={imageUrl}
            />
          </Image.PreviewGroup>
        </div>
      </Table.Cell>
      <Table.Cell>{teacher.id}</Table.Cell>
      <Table.Cell>
        {`${teacher.firstName} ${teacher.secondName} ${teacher.fatherLastName} ${teacher.motherLastName}`}
      </Table.Cell>
      <Table.Cell>{teacher.age}</Table.Cell>
      <Table.Cell>{teacher.personalPhone}</Table.Cell>
      <Table.Cell>{teacher.departament}</Table.Cell>
      <Table.Cell>
        {teacher.gender === true
          ? "Masculino"
          : teacher.gender === false
          ? "Femenino"
          : "Sin Género"}
      </Table.Cell>
      <Table.Cell>{teacher.email}</Table.Cell>
      <Table.Cell collapsing>
        <Link to={`/teacher/${teacher.id}`}>
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
              setTitleModal("Modificación de Profesor");
              setIconNameModal("clipboard");
              setTypePerson("teacher");
              setTypeAction("modify");
              setTeacherInfo(teacher);
            }}
          >
            Modificar
          </Button>
          <Button.Or text="o" />
          {teacher.teacherStatus === "Disponible" ? (
            <Button
              color="red"
              onClick={() => {
                setShowModalQuestion(true);
                setTitleModalQuestion("Dar de Baja a un Profesor");
                setIconNameModalQuestion("user delete");
                setTypeActionQuestion("remove-teacher");
                setTeacherInfo(teacher);
              }}
            >
              Dar de Baja
            </Button>
          ) : (
            <Button
              color="green"
              onClick={() => {
                setShowModalQuestion(true);
                setTitleModalQuestion("Dar de Alta a un Profesor");
                setIconNameModalQuestion("user plus");
                setTypeActionQuestion("re-add-teacher");
                setTeacherInfo(teacher);
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
