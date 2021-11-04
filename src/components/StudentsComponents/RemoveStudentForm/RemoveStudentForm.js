import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import firebase from "../../../utils/firebase";
import { toast, Zoom } from "react-toastify";
import LoadingForm from "../../Loadings/LoadingForm";

import "./RemoveStudentForm.scss";

import "firebase/firestore";

const db = firebase.firestore(firebase);

export default function RemoveStudentForm(props) {
  const { student, onClose, setUpdateData } = props;
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setIsLoading(true);
    db.collection("students")
      .doc(student.id)
      .update({ studentStatus: "Bloqueado" })
      .then(() => {
        db.collection("accounts")
          .doc(student.tutorId)
          .update({ status: "Bloqueado" })
          .then(() => {
            toast.success("El estudiante fue dado de baja.", {
              transition: Zoom,
            });
            setUpdateData(true);
            onClose();
          })
          .catch(() => {
            toast.error("Hubo un error al dar de baja a un estudiante.", {
              transition: Zoom,
            });
          });
      })
      .catch(() => {
        toast
          .error("Hubo un error al dar de baja a un estudiante.", {
            transition: Zoom,
          })
          .finally(() => {
            setIsLoading(false);
          });
      });
  };

  if (isLoading) {
    return <LoadingForm />;
  }

  return (
    <div className="remove-student-form">
      <h1>
        ¿Esta seguro de dar de baja al estudiante <br></br>{" "}
        <span>
          {student.firstName} {student.secondName} {student.fatherLastName}{" "}
          {student.motherLastName}
        </span>
        ?
      </h1>
      <div className="remove-student-form__buttons">
        <Button.Group>
          <Button positive onClick={onSubmit}>
            Sí
          </Button>
          <Button.Or />
          <Button negative onClick={onClose}>
            No
          </Button>
        </Button.Group>
      </div>
    </div>
  );
}
