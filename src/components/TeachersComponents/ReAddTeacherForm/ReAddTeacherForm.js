import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { toast, Zoom } from "react-toastify";

import firebase from "../../../utils/firebase";
import LoadingForm from "../../Loadings/LoadingForm";

import "./ReAddTeacherForm.scss";

import "firebase/firestore";

const db = firebase.firestore(firebase);

export default function ReAddTeacherForm(props) {
  const { teacher, onClose, setUpdateData } = props;
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setIsLoading(true);
    db.collection("teachers")
      .doc(teacher.id)
      .update({ teacherStatus: "Disponible" })
      .then(() => {
        db.collection("accounts")
          .doc(teacher.accountId)
          .update({ status: "Disponible" })
          .then(() => {
            toast.success("El Profesor fue dado de alta.", {
              transition: Zoom,
            });
            setUpdateData(true);
            onClose();
          })
          .catch(() => {
            toast.error("Hubo un error al dar de alta a un Profesor.", {
              transition: Zoom,
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch(() => {
        toast.error("Hubo un error al dar de alta a un Profesor.", {
          transition: Zoom,
        });
      });
  };

  if (isLoading) {
    return <LoadingForm />;
  }

  return (
    <div className="re-add-teacher-form">
      <h1>
        ¿Esta seguro de dar de alta al profesor <br></br>{" "}
        <span>
          {teacher.firstName} {teacher.secondName} {teacher.fatherLastName}{" "}
          {teacher.motherLastName}
        </span>
        ?
      </h1>
      <div className="re-add-teacher-form__buttons">
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
