import React, { useState } from "react";
import {
  Icon,
  Button,
  Search,
  Label,
  Dropdown,
  Message,
} from "semantic-ui-react";
import BasicModal from "../../Modal/BasicModal";
import ReactExport from "react-export-excel";
import jsPDF from "jspdf";
import "jspdf-autotable";
import LogoSchool from "../../../assets/img/logo-school.jpg";

import { map } from "lodash";

import "./HeaderStudent.scss";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const doc = new jsPDF();

export default function HeaderStudent(props) {
  const { title, updateData, setUpdateData, studentsInfoExport } = props;
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [iconNameModal, setIconNameModal] = useState("");
  const [typePerson, setTypePerson] = useState("");
  const [typeAction, setTypeAction] = useState("");

  const options = [
    { key: 1, text: "Escoge un Filtro", value: null },
    { key: 2, text: "C.I.", value: "carnet" },
    { key: 3, text: "Nombres", value: "nombre" },
    { key: 4, text: "Apellidos", value: "apellido" },
  ];

  return (
    <>
      <div className="header-students">
        <div className="message">
          <Message className="fond-message">
            <Message.Header>
              <h3>Gestión de Estudiantes - Unidad Educativa Ave Maria</h3>
            </Message.Header>
          </Message>
        </div>
        <div className="header-students__actions">
          <div className="header-students__actions__export-options">
            <ExportExcel data={studentsInfoExport} />
            <ButtonPDF studentsInfoExport={studentsInfoExport} />
          </div>
          <div className="header-students__actions__add-student">
            <Button
              icon
              labelPosition="right"
              positive
              className="header-students__actions__add-student__button-add"
              onClick={() => {
                setShowModal(true);
                setTitleModal("Registrar Estudiante");
                setIconNameModal("student");
                setTypePerson("student");
                setTypeAction("add");
              }}
            >
              Añadir Estudiante
              <Icon name="add user" />
            </Button>
          </div>
        </div>
        <div className="header-students__search">
          <div className="header-students__search__search-student">
            <Label>Buscar Estudiante</Label>
            <Search placeholder="Buscar Estudiante" />
          </div>
          <div className="header-students__search__filter-student">
            <Label>Filtro</Label>
            <Dropdown
              clearable
              options={options}
              search
              selection
              labeled
              placeholder="Filtro de Búsqueda"
            />
          </div>
        </div>
      </div>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        iconName={iconNameModal}
        typePerson={typePerson}
        typeAction={typeAction}
        valuePGB={7}
        setUpdateData={setUpdateData}
      />
    </>
  );
}

function ExportExcel(props) {
  const { data } = props;

  return (
    <ExcelFile element={<ButtonExcel />}>
      <ExcelSheet data={data} name="Estudiantes">
        <ExcelColumn label="Carnet de Identidad" value="id" />
        <ExcelColumn label="Primer Nombre" value="firstName" />
        <ExcelColumn label="Segundo Nombre" value="secondName" />
        <ExcelColumn label="Apellido Paterno" value="fatherLastName" />
        <ExcelColumn label="Apellido Materno" value="motherLastName" />
        <ExcelColumn label="Fecha de Nacimiento" value="dateBirthNew" />
        <ExcelColumn label="Edad" value="age" />
        <ExcelColumn label="Celular" value="personalPhone" />
        <ExcelColumn label="Correo Electrónico" value="email" />
        <ExcelColumn label="Nivel de Educación" value="educationLevel" />
      </ExcelSheet>
    </ExcelFile>
  );
}

function ButtonExcel() {
  return (
    <Button
      animated="fade"
      className="header-students__actions__export-options__button-excel"
    >
      <Button.Content visible>Exportar a Excel</Button.Content>
      <Button.Content hidden>
        <Icon name="file excel" />
      </Button.Content>
    </Button>
  );
}
function ButtonPDF(props) {
  const { studentsInfoExport } = props;
  const exportToPDF = () => {
    const data = studentsInfoExport;
    var doc = new jsPDF();
    doc.addImage(LogoSchool, "JPEG", 15, 13, 50, 50);
    doc.text("UNIDAD EDUCATIVA PRIVADA", 80, 30);
    doc.text("AVE MARIA GESTION 2021", 85, 40);
    /**TABLA PARA LISTA DE ESTUDIANTES */
    map(data, (item, index) => {
      doc.autoTable({
        styles: { 0: { fillColor: [50, 56, 100] } },
        columnStyles: {
          0: { halign: "center", fillColor: [13, 130, 206] },
        }, // Cells in first column centered and green
        margin: { top: 70 },
        head: [
          [
            "Carnet de Identidad",
            "Primer Nombre",
            "Segundo Nombre",
            "Apellido Paterno",
            "Apellido Materno",
            "Correo Electronico",
            "Fecha de Nacimiento",
          ],
        ],
        body: [
          [
            item.id,
            item.firstName,
            item.secondName,
            item.fatherLastName,
            item.motherLastName,
            item.email,
            item.dateBirthNew,
          ],
        ],
      });
    });
    doc.save("Estudiantes.pdf");
  };
  return (
    <Button
      animated="fade"
      className="header-students__actions__export-options__button-pdf"
      onClick={exportToPDF}
    >
      <Button.Content visible>Exportar a PDF</Button.Content>
      <Button.Content hidden>
        <Icon name="file pdf" />
      </Button.Content>
    </Button>
  );
}
