import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, Zoom } from "react-toastify";
import { map, size } from "lodash";

import "./Student.scss";

import StudentInfoComponent from "../../components/StudentsComponents/StudentProfile/StudentInfo";
import StudentInfoTutor from "../../components/StudentsComponents/StudentProfile/StudentTutorInfo";
import StudentAcademyInfo from "../../components/StudentsComponents/StudentProfile/StudentAcademyInfo";
import StudentDocumentInfo from "../../components/StudentsComponents/StudentProfile/StudentDocumentInfo";

import firebase from "../../utils/firebase";

import "firebase/storage";
import "firebase/firestore";

const db = firebase.firestore(firebase);

export default function Student() {
  const { id } = useParams();
  const [photoStudent, setPhotoStudent] = useState(null);
  const [carnetStudent, setCarnetStudent] = useState(null);
  const [rudeStudent, setRudeStudent] = useState(null);
  const [birthCertificateStudent, setBirthCertificateStudent] = useState(null);

  const [birthCertificateTutor, setBirthCertificateTutor] = useState(null);
  const [carnetTutor, setCarnetTutor] = useState(null);

  const [studentInfo, setStudentInfo] = useState({});
  const [classRoomInfo, setClassRoomInfo] = useState({});
  const [tutorInfo, setTutorInfo] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [qualifications, setQualifications] = useState([]);

  useEffect(() => {
    //STUDENT
    db.collection("students")
      .doc(id)
      .get()
      .then((response) => {
        const student = response.data();
        student.id = id;
        setStudentInfo(student);
        //PHOTO
        if (response.data().filePhotoId) {
          const filePhotoStudent = response.data().filePhotoId;
          firebase
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
        if (response.data().fileRudeId) {
          const fileRudeStudent = response.data().fileRudeId;
          firebase
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
        if (response.data().fileCarnetId) {
          const fileCarnetStudent = response.data().fileCarnetId;
          firebase
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
        if (response.data().fileBirthCertificateId) {
          const fileBirthCertificateStudent =
            response.data().fileBirthCertificateId;
          firebase
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
        db.collection("tutorsStudents")
          .doc(response.data().tutorId)
          .get()
          .then((responseTutor) => {
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
        db.collection("classRooms")
          .doc(response.data().classRoomId)
          .get()
          .then((response) => {
            setClassRoomInfo(response.data());
            const arraySubjects = response.data().subjects;
            const arraySubjectsOutput = [];
            if (size(arraySubjects) > 0) {
              map(arraySubjects, (item, index) => {
                db.collection("school_material")
                  .where("id_matter", "==", item)
                  .get()
                  .then((response) => {
                    arraySubjectsOutput.push(response.docs[0].data());
                  });
              });
              setSubjects(arraySubjectsOutput);
            }
          })
          .catch((err) => {
            toast.error(
              "El curso del estudiante que usted busca no existe o hubo un error de conexión!!",
              {
                transition: Zoom,
              }
            );
          });

        //QUALIFICATIONS
        db.collection("qualificationStudents")
          .where("idStudent", "==", id)
          .get()
          .then((response) => {
            if (response.docs.length > 0) {
              setQualifications(response.docs[0].data().subjects);
            } else {
              setQualifications(null);
            }
          });
      })
      .catch((err) => {
        toast.error(
          "El estudiante que usted busca no existe o hubo un error de conexión!!",
          {
            transition: Zoom,
          }
        );
      });
  }, []);

  return (
    <div className="student">
      <div className="student__header">
        <h1>Pefil del Estudiante</h1>
      </div>
      <div className="student__content">
        <StudentInfoComponent
          studentInfoState={studentInfo}
          photoStudent={photoStudent}
        />
        <StudentInfoTutor tutorInfo={tutorInfo} />
        <StudentAcademyInfo
          classRoomInfo={classRoomInfo}
          subjects={subjects}
          qualifications={qualifications}
        />
        <StudentDocumentInfo
          photoStudent={photoStudent}
          carnetStudent={carnetStudent}
          rudeStudent={rudeStudent}
          birthCertificateStudent={birthCertificateStudent}
          birthCertificateTutor={birthCertificateTutor}
          carnetTutor={carnetTutor}
        />
      </div>
    </div>
  );
}
