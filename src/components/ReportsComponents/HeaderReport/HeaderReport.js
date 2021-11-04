import React, { useState } from "react";
import {
  Icon,
  Button,
  Search,
  Label,
  Dropdown,
  Message,
} from "semantic-ui-react";
import ReportModal from "../../Modal/ReportModal";

import "./HeaderReport.scss";

export default function HeaderReport(props) {
  const { title } = props;
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [iconNameModal, setIconNameModal] = useState("");
  const [typePerson, setTypePerson] = useState("");
  const [typeAction, setTypeAction] = useState("");

  return (
    <>
      <div className="header-reports">
        <div className="message">
          <Message className="fond-message">
            <Message.Header>
              <h3>Reportes - Unidad Educativa Ave Maria</h3>
            </Message.Header>
          </Message>
        </div>
        <div className="header-reports__actions">
          <div className="header-reports__actions__export-options">
            <Button
              animated="fade"
              className="header-reports__actions__export-options__button-word"
            >
              <Button.Content visible>Exportar a Word</Button.Content>
              <Button.Content hidden>
                <Icon name="file word" />
              </Button.Content>
            </Button>
            <Button
              animated="fade"
              className="header-reports__actions__export-options__button-pdf"
            >
              <Button.Content visible>Exportar a PDF</Button.Content>
              <Button.Content hidden>
                <Icon name="file pdf" />
              </Button.Content>
            </Button>
          </div>
          <div className="header-reports__actions__add-student">
            <Button
              icon
              labelPosition="right"
              positive
              className="header-reports__actions__add-student__button-add"
              onClick={() => {
                setShowModal(true);
                setTitleModal("Registrar Reporte");
                setIconNameModal("student");
                setTypePerson("student");
                setTypeAction("report");
              }}
            >
              Registrar Reporte
              <Icon name="add user" />
            </Button>
          </div>
        </div>
      </div>
      <ReportModal
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        iconName={iconNameModal}
        typePerson={typePerson}
        typeAction={typeAction}
      />
    </>
  );
}
