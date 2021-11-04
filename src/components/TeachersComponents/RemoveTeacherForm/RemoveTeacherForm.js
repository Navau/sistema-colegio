import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { toast, Zoom } from "react-toastify";

import firebase from "../../../utils/firebase";
import LoadingForm from "../../Loadings/LoadingForm";

import "./RemoveTeacherForm.scss";

import "firebase/firestore";

const db = firebase.firestore(firebase);

export default function RemoveTeacherForm(props) {
  const { teacher, onClose, setUpdateData } = props;
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setIsLoading(true);
    db.collection("teachers")
      .doc(teacher.id)
      .update({ teacherStatus: "Bloqueado" })
      .then(() => {
        db.collection("accounts")
          .doc(teacher.accountId)
          .update({ status: "Bloqueado" })
          .then(() => {
            toast.success("El Profesor fue dado de baja.", {
              transition: Zoom,
            });
            setUpdateData(true);
            onClose();
          })
          .catch(() => {
            toast.error("Hubo un error al dar de baja a un Profesor.", {
              transition: Zoom,
            });
          });
      })
      .catch(() => {
        toast
          .error("Hubo un error al dar de baja a un Profesor.", {
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
    <div className="remove-teacher-form">
      <h1>
        ¿Esta seguro de dar de baja al Profesor <br></br>{" "}
        <span>
          {teacher.firstName} {teacher.secondName} {teacher.fatherLastName}{" "}
          {teacher.motherLastName}
        </span>
        ?
      </h1>
      <div className="remove-teacher-form__buttons">
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
