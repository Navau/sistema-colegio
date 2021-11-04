import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, Zoom } from "react-toastify";
import { map, size } from "lodash";

import "./Teacher.scss";

import TeacherInfoComponent from "../../components/TeachersComponents/TeacherProfile/TeacherInfo";
import TeacherAcademyInfo from "../../components/TeachersComponents/TeacherProfile/TeacherAcademyInfo";
import TeacherDocumentInfo from "../../components/TeachersComponents/TeacherProfile/TeacherDocumentInfo";

import firebase from "../../utils/firebase";

import "firebase/storage";
import "firebase/firestore";

const db = firebase.firestore(firebase);

export default function Teacher() {
  const { id } = useParams();
  const [photoTeacher, setPhotoTeacher] = useState(null);
  const [carnetTeacher, setCarnetTeacher] = useState(null);
  const [birthCertificateTeacher, setBirthCertificateTeacher] = useState(null);

  const [teacherInfo, setTeacherInfo] = useState({});
  const [subjectInfo, setSubjectInfo] = useState({});
  const [classRooms, setClassRooms] = useState([]);

  useEffect(() => {
    //STUDENT
    db.collection("teachers")
      .doc(id)
      .get()
      .then((response) => {
        const teacher = response.data();
        teacher.id = id;
        setTeacherInfo(teacher);

        //PHOTO
        if (response.data().filePhotoId) {
          const filePhotoTeacher = response.data().filePhotoId;
          firebase
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
        if (response.data().fileCarnetId) {
          const fileCarnetTeacher = response.data().fileCarnetId;
          firebase
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
        if (response.data().fileBirthCertificateId) {
          const fileBirthCertificateTeacher =
            response.data().fileBirthCertificateId;
          firebase
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

        //MATERIAS
        db.collection("school_material")
          .doc(response.data().subjectId)
          .get()
          .then((response) => {
            setSubjectInfo(response.data());
          })
          .catch((err) => {
            toast.error(
              "El curso del profesor que usted busca no existe o hubo un error de conexión!!",
              {
                transition: Zoom,
              }
            );
          });

        //CLASSROOMS
        db.collection("classRooms")
          .where("Teachers", "array-contains", id)
          .get()
          .then((response) => {
            const arrayAux = [];
            map(response.docs, (item, index) => {
              arrayAux.push(item.data());
            });
            setClassRooms(arrayAux);
          });
      })
      .catch((err) => {
        toast.error(
          "El profesor que usted busca no existe o hubo un error de conexión!!",
          {
            transition: Zoom,
          }
        );
      });
  }, []);

  return (
    <div className="teacher">
      <div className="teacher__header">
        <h1>Pefil del Estudiante</h1>
      </div>
      <div className="teacher__content">
        <TeacherInfoComponent
          teacherInfoState={teacherInfo}
          photoTeacher={photoTeacher}
        />
        <TeacherAcademyInfo classRooms={classRooms} subjectInfo={subjectInfo} />
        <TeacherDocumentInfo
          photoTeacher={photoTeacher}
          carnetTeacher={carnetTeacher}
          birthCertificateTeacher={birthCertificateTeacher}
        />
      </div>
    </div>
  );
}
