import React, { useState, useCallback } from "react";
import {
  Form,
  Input,
  Button,
  Image,
  Icon,
  Progress,
  Label,
} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import { Animated } from "react-animated-css";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import firebase from "../../../utils/firebase";
import "firebase/firestore";
import "firebase/storage";

import StudentDefault from "../../../assets/img/student.png";
import user from "../../../assets/img/user.png";

import "./AddStudentForm.scss";

const db = firebase.firestore(firebase);

export default function AddStudentForm() {
  const [photoStudent, setPhotoStudent] = useState(null);
  const [hoverPhoto, setHoverPhoto] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  return (
    <>
      <Form className="add-student-form" size="small">
        <Form.Group className="student-photo">
          <Form.Field>
            <div
              className="photo"
              style={{ backgroundImage: `url(${photoStudent})` }}
            />
            {!photoStudent && <Image src={StudentDefault} />}
          </Form.Field>
        </Form.Group>
        <div className="student-inputs">
          <Form.Group>
            <Form.Field>
              <Form.Input
                placeholder="Carnet de Identidad"
                error={false}
                fluid
                label="Carnet de Identidad"
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                placeholder="Primer Nombre"
                error={false}
                fluid
                label="Primer Nombre"
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                placeholder="Segundo Nombre"
                error={false}
                fluid
                label="Segundo Nombre"
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <Form.Input
                placeholder="Apellido Paterno"
                error={false}
                fluid
                label="Apellido Paterno"
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                placeholder="Apellido Materno"
                error={false}
                fluid
                label="Apellido Materno"
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <Form.Input
                placeholder="Fec"
                error={false}
                fluid
                label="Apellido Paterno"
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                placeholder="Apellido Materno"
                error={false}
                fluid
                label="Apellido Materno"
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <Form.Input error={false} fluid label="Fecha de Nacimiento">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </Form.Input>
            </Form.Field>
            <Form.Field>
              <Form.Input
                placeholder="Teléfono Celular"
                error={false}
                fluid
                label="Teléfono Celular"
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                placeholder="Teléfono Fijo"
                error={false}
                fluid
                label="Teléfono Fijo"
              />
            </Form.Field>
          </Form.Group>
        </div>
      </Form>
      <div className="progress-bar">
        <Progress value="4" total="5" progress="ratio" />
      </div>
    </>
  );
}
/* <Form.Field>
        <Input placeholder="Primer Nombre" />
      </Form.Field>
      <Form.Field>
        <Input placeholder="Segundo Nombre" />
      </Form.Field>
      <Form.Field>
        <Input placeholder="Apellido Paterno" />
      </Form.Field>
      <Form.Field>
        <Input placeholder="Apellido Materno" />
      </Form.Field>
      <Form.Field>
        <Input placeholder="Fecha de Nacimiento" />
      </Form.Field>
      <Form.Field>
        <Input placeholder="Edad" />
      </Form.Field>
      <Form.Field>
        <Input placeholder="Teléfono Celular" />
      </Form.Field>
      <Form.Field>
        <Input placeholder="Teléfono Fijo" />
      </Form.Field>
      <Form.Field>
        <Input placeholder="Dirección" />
      </Form.Field>
      <Form.Field>
        <Input placeholder="Género" />
      </Form.Field>
      <Form.Field>
        <Input placeholder="Peso" />
      </Form.Field>
      <Form.Field>
        <Input placeholder="Altura" />
      </Form.Field>
      <Form.Field>
        <Input placeholder="País" />
      </Form.Field>
      <Form.Field>
        <Input placeholder="Departamento" />
      </Form.Field>
      <Form.Field>
        <Input placeholder="Correo Electrónico" />
      </Form.Field>
      <Form.Field>
        <Input placeholder="Curso" />
      </Form.Field> */
