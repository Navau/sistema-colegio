import React, { useState, useEffect } from "react";
import { Table, Button } from "semantic-ui-react";
import { Image } from "antd";
import { map } from "lodash";
import { Link } from "react-router-dom";

import LoadingTable from "../../Loadings/LoadingTable";
import firebase from "../../../utils/firebase";
import ReportModal from "../../Modal/ReportModal";

import "./ListStudentsReports.scss";

import "firebase/firestore";
import "firebase/storage";

const db = firebase.firestore(firebase);

export default function ListStudentsReports(props) {
  const { viewList } = props;

  const [students, setStudents] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [iconNameModal, setIconNameModal] = useState("");
  const [typePerson, setTypePerson] = useState("");
  const [typeAction, setTypeAction] = useState("");
  const [studentInfo, setStudentInfo] = useState(null);

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
            studentsArrayAux.push(studentAux);
          });
          setStudents(studentsArrayAux);
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
          <div className="report-title-list-students">
            <h1>Lista de Estudiantes</h1>
          </div>
          <div className="report-table">
            <Table
              inverted
              celled
              padded
              striped
              className="report-list-students"
            >
              <Table.Header>
                <Table.Row textAlign="center">
                  <Table.HeaderCell>Foto</Table.HeaderCell>
                  <Table.HeaderCell>C.I.</Table.HeaderCell>
                  <Table.HeaderCell>Nombre</Table.HeaderCell>
                  <Table.HeaderCell>Edad</Table.HeaderCell>
                  <Table.HeaderCell>Teléfono Celular</Table.HeaderCell>
                  <Table.HeaderCell>Género</Table.HeaderCell>
                  <Table.HeaderCell>Correo Electrónico</Table.HeaderCell>
                  <Table.HeaderCell>Generar Reporte</Table.HeaderCell>
                  <Table.HeaderCell>Reportes</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {map(students, (student) => (
                  <RenderPerson
                    key={student.id}
                    student={student}
                    setShowModal={setShowModal}
                    setTitleModal={setTitleModal}
                    setIconNameModal={setIconNameModal}
                    setTypePerson={setTypePerson}
                    setTypeAction={setTypeAction}
                    setStudentInfo={setStudentInfo}
                  />
                ))}
              </Table.Body>
            </Table>
          </div>
        </>
      )}
      <ReportModal
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        iconName={iconNameModal}
        typePerson={typePerson}
        typeAction={typeAction}
        student={studentInfo}
      />
    </>
  );
}

function RenderPerson(props) {
  const {
    student,
    setShowModal,
    setTitleModal,
    setIconNameModal,
    setTypePerson,
    setTypeAction,
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
      <Table.Cell>{student.gender ? "Masculino" : "Femenino"}</Table.Cell>
      <Table.Cell>{student.email}</Table.Cell>
      <Table.Cell collapsing>
        <Button
          inverted
          positive
          onClick={() => {
            setShowModal(true);
            setTitleModal("Registrar Reporte");
            setIconNameModal("student");
            setTypePerson("student");
            setTypeAction("report");
            setStudentInfo(student);
          }}
        >
          Generar Reporte
        </Button>
      </Table.Cell>
      <Table.Cell collapsing>
        <Link to={`/student-reports/${student.id}`}>
          <Button inverted color="blue">
            Ver Reportes
          </Button>
        </Link>
      </Table.Cell>
    </Table.Row>
  );
}
