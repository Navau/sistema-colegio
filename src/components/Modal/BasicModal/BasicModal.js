import React, { useState } from "react";
import { Button, Icon, Modal, Progress } from "semantic-ui-react";
import AddStudentForm from "../../StudentsComponents/AddStudentForm";
import ModifyStudentForm from "../../StudentsComponents/ModifyStudentForm";
import AddTeacherForm from "../../TeachersComponents/AddTeacherForm";
import ModifyTeacherForm from "../../TeachersComponents/ModifyTeacherForm";

import "./BasicModal.scss";

export default function BasicModal(props) {
  const {
    show,
    setShow,
    title,
    iconName,
    typePerson,
    typeAction,
    valuePGB,
    student,
    teacher,
    setUpdateData,
  } = props;

  const [valueTotalProgressBar, setValueTotalProgressBar] = useState(valuePGB);
  const [sliderRef, setSliderRef] = useState(null);
  const [activeSlide, setActiveSlide] = useState(1);
  const [isLoadingInfo, setIsLoadingInfo] = useState(false);

  const goToNext = () => {
    sliderRef.current.slickNext();
  };
  const goToPreview = () => {
    sliderRef.current.slickPrev();
  };

  const onClose = () => {
    setShow(isLoadingInfo);
    setActiveSlide(1);
  };

  const handlerModalPerson = (typeUserPerson, typeUserAction) => {
    switch (typeUserPerson) {
      case "student":
        switch (typeUserAction) {
          case "add":
            return (
              <AddStudentForm
                setSliderRef={setSliderRef}
                setActiveSlide={setActiveSlide}
                setUpdateData={setUpdateData}
                setIsLoadingInfo={setIsLoadingInfo}
                onClose={onClose}
              />
            );
          case "modify":
            return (
              <ModifyStudentForm
                setSliderRef={setSliderRef}
                setActiveSlide={setActiveSlide}
                student={student}
                isLoadingInfo={isLoadingInfo}
                setIsLoadingInfo={setIsLoadingInfo}
                setUpdateData={setUpdateData}
                onClose={onClose}
              />
            );
        }
      case "teacher":
        switch (typeUserAction) {
          case "add":
            return (
              <AddTeacherForm
                setSliderRef={setSliderRef}
                setActiveSlide={setActiveSlide}
                setUpdateData={setUpdateData}
                setIsLoadingInfo={setIsLoadingInfo}
                onClose={onClose}
              />
            );
          case "modify":
            return (
              <ModifyTeacherForm
                setSliderRef={setSliderRef}
                setActiveSlide={setActiveSlide}
                teacher={teacher}
                isLoadingInfo={isLoadingInfo}
                setIsLoadingInfo={setIsLoadingInfo}
                setUpdateData={setUpdateData}
                onClose={onClose}
              />
            );
        }
      default:
        return "ERROR";
    }
  };

  return (
    <Modal open={show} onClose={onClose} size="large" className="basic-modal">
      <Modal.Header>
        <div className="basic-modal__header-left">
          <Icon name={iconName} size="large" />
          <h3>{title}</h3>
        </div>
        <div className="basic-modal__header-right">
          <Icon name="close" onClick={onClose} />
        </div>
      </Modal.Header>
      <Modal.Content>
        {handlerModalPerson(typePerson, typeAction)}
      </Modal.Content>
      {!isLoadingInfo && (
        <Modal.Actions>
          <div className="buttons-left-right">
            <Button
              circular
              icon="angle left"
              size="huge"
              onClick={() => {
                goToPreview();
              }}
            />
            <Progress
              value={activeSlide}
              color="green"
              active
              total={valueTotalProgressBar}
              progress="ratio"
            />
            <Button
              circular
              icon="angle right"
              size="huge"
              onClick={() => {
                goToNext();
              }}
            />
          </div>
        </Modal.Actions>
      )}
    </Modal>
  );
}
