import React from "react";
import { Divider, Header } from "semantic-ui-react";
import SliderDocuments from "../../../Sliders/SliderDocuments";

import "./StudentDocumentInfo.scss";

export default function StudentDocumentInfo(props) {
  const {
    photoStudent,
    carnetStudent,
    rudeStudent,
    birthCertificateStudent,
    birthCertificateTutor,
    carnetTutor,
  } = props;

  const arrayDocuments = [];
  arrayDocuments.push({
    nameDocument: "Carnet del Estudiante",
    url: carnetStudent,
  });
  arrayDocuments.push({
    nameDocument: "Rude del Estudiante",
    url: rudeStudent,
  });
  arrayDocuments.push({
    nameDocument: "Certificado de Nacimiento del Estudiante",
    url: birthCertificateStudent,
  });
  arrayDocuments.push({ nameDocument: "Carnet del Tutor", url: carnetTutor });
  arrayDocuments.push({
    nameDocument: "Certificado de Nacimiento del Tutor",
    url: birthCertificateTutor,
  });

  return (
    <div className="student-document-info">
      <Divider section />
      <Header as="h2">Información Documental del Estudiante</Header>
      <SliderDocuments data={arrayDocuments} />
      <Divider section />
    </div>
  );
}
