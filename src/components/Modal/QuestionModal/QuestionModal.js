import React, { useState } from "react";
import { Icon, Modal } from "semantic-ui-react";

import RemoveStudentForm from "../../StudentsComponents/RemoveStudentForm";
import ReAddStudentForm from "../../StudentsComponents/ReAddStudentForm";
import RemoveTeacherForm from "../../TeachersComponents/RemoveTeacherForm";
import ReAddTeacherForm from "../../TeachersComponents/ReAddTeacherForm";

import "./QuestionModal.scss";

export default function QuestionModal(props) {
  const {
    show,
    setShow,
    title,
    iconName,
    type,
    student,
    teacher,
    setUpdateData,
  } = props;

  const handlerModalQuestion = (typeX) => {
    switch (typeX) {
      case "remove-student":
        return (
          <RemoveStudentForm
            student={student}
            onClose={onClose}
            setUpdateData={setUpdateData}
          />
        );
      case "re-add-student":
        return (
          <ReAddStudentForm
            student={student}
            onClose={onClose}
            setUpdateData={setUpdateData}
          />
        );
      case "remove-teacher":
        return (
          <RemoveTeacherForm
            teacher={teacher}
            onClose={onClose}
            setUpdateData={setUpdateData}
          />
        );
      case "re-add-teacher":
        return (
          <ReAddTeacherForm
            teacher={teacher}
            onClose={onClose}
            setUpdateData={setUpdateData}
          />
        );
      default:
        return "ERROR";
    }
  };

  const onClose = () => {
    setShow(false);
  };

  return (
    <Modal
      open={show}
      onClose={onClose}
      size="small"
      className="question-modal"
    >
      <Modal.Header>
        <div className="question-modal__header-left">
          <Icon name={iconName} size="large" />
          <h3>{title}</h3>
        </div>
        <div className="question-modal__header-right">
          <Icon name="close" onClick={onClose} />
        </div>
      </Modal.Header>
      <Modal.Content>{handlerModalQuestion(type)}</Modal.Content>
    </Modal>
  );
}
