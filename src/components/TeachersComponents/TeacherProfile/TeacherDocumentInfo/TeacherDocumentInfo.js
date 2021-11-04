import React from "react";
import { Divider, Header } from "semantic-ui-react";
import SliderDocuments from "../../../Sliders/SliderDocuments";

import "./TeacherDocumentInfo.scss";

export default function TeacherDocumentInfo(props) {
  const { photoTeacher, carnetTeacher, birthCertificateTeacher } = props;

  const arrayDocuments = [];
  arrayDocuments.push({
    nameDocument: "Carnet del Profesor",
    url: carnetTeacher,
  });
  arrayDocuments.push({
    nameDocument: "Foto del Profesor",
    url: photoTeacher,
  });
  arrayDocuments.push({
    nameDocument: "Certificado de Nacimiento del Profesor",
    url: birthCertificateTeacher,
  });

  return (
    <div className="teacher-document-info">
      <Divider section />
      <Header as="h2">Información Documental del Profesor</Header>
      <SliderDocuments data={arrayDocuments} />
      <Divider section />
    </div>
  );
}
