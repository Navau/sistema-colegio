import React, { useState } from "react";
import { Icon, Button } from "semantic-ui-react";
import BasicModal from "../../Modal/BasicModal";
import AddStudentForm from "../../StudentsComponents/AddStudentForm";

import "./HeaderPersons.scss";

export default function HeaderPersons() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [iconNameModal, setIconNameModal] = useState("");
  return (
    <>
      <div className="header-persons">
        <div className="header-persons__export-options">
          <Button
            animated="fade"
            className="header-persons__export-options__button-word"
          >
            <Button.Content visible>Exportar a Word</Button.Content>
            <Button.Content hidden>
              <Icon name="file word" />
            </Button.Content>
          </Button>
          <Button
            animated="fade"
            className="header-persons__export-options__button-pdf"
          >
            <Button.Content visible>Exportar a PDF</Button.Content>
            <Button.Content hidden>
              <Icon name="file pdf" />
            </Button.Content>
          </Button>
        </div>
        <div className="header-persons__add-person">
          <Button
            icon
            labelPosition="right"
            positive
            className="header-persons__add-person__button-add"
            onClick={() => {
              setShowModal(true);
              setTitleModal("Registrar Estudiante");
              setIconNameModal("student");
            }}
          >
            Añadir Estudiante
            <Icon name="add user" />
          </Button>
        </div>
      </div>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        iconName={iconNameModal}
      >
        <AddStudentForm />
      </BasicModal>
    </>
  );
}
