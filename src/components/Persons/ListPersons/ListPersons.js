import React, { useState, useEffect } from "react";
import { Table, Icon, Button } from "semantic-ui-react";
import { map } from "lodash";
import moment from "moment";
import firebase from "../../../utils/firebase";
import Pagination from "../../Pagination";

import "./ListPersons.scss";

import "firebase/firestore";

const db = firebase.firestore(firebase);

export default function ListPersons(props) {
  const { persons } = props;
  return (
    <>
      <Table inverted celled selectable padded striped className="list-persons">
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell>Foto</Table.HeaderCell>
            <Table.HeaderCell>C.I.</Table.HeaderCell>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Edad</Table.HeaderCell>
            <Table.HeaderCell>Teléfono Celular</Table.HeaderCell>
            <Table.HeaderCell>Sede</Table.HeaderCell>
            <Table.HeaderCell>Género</Table.HeaderCell>
            <Table.HeaderCell>Correo Electrónico</Table.HeaderCell>
            <Table.HeaderCell>Mas Información</Table.HeaderCell>
            <Table.HeaderCell>Acciones</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {map(persons, (person) => (
            <RenderPerson key={person.id} person={person} />
          ))}
        </Table.Body>
      </Table>
      <div className="list-persons__pagination">
        <Pagination />
      </div>
    </>
  );
}

function RenderPerson(props) {
  const { person, key } = props;

  return (
    <Table.Row textAlign="center">
      <Table.Cell>{person.photoId}</Table.Cell>
      <Table.Cell>{person.id}</Table.Cell>
      <Table.Cell>
        {`${person.firstName} ${person.secondName} ${person.fatherLastName} ${person.motherLastName}`}
      </Table.Cell>
      <Table.Cell>{person.age}</Table.Cell>
      <Table.Cell>{person.personalPhone}</Table.Cell>
      <Table.Cell>{person.departament}</Table.Cell>
      <Table.Cell>{person.gender ? "Masculino" : "Femenino"}</Table.Cell>
      <Table.Cell>{person.email}</Table.Cell>
      <Table.Cell collapsing>
        <Button inverted color="blue">
          Mas Info
        </Button>
      </Table.Cell>
      <Table.Cell collapsing>
        <Button.Group>
          <Button color="violet">Modificar</Button>
          <Button.Or text="o" />
          <Button color="red">Dar de Baja</Button>
        </Button.Group>
      </Table.Cell>
    </Table.Row>
  );
}
