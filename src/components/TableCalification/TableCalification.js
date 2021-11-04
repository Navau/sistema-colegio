import React from "react";
<<<<<<< HEAD
import { Table } from "semantic-ui-react";
import "./TableCalification.scss";
=======
import { Icon, Table } from "semantic-ui-react";
import "./styl.css";
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e

export const TableCalification = () => {
  const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const valor = "nega";
  return (
<<<<<<< HEAD
    <div className="table">
      <Table inverted celled padded striped className="list-qualifications">
=======
    <div>
      <Table
        inverted
        celled
        selectable
        padded
        striped
        className="tabla-view-notas"
      >
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Apellido</Table.HeaderCell>
            <Table.HeaderCell>Trimestre 1</Table.HeaderCell>
            <Table.HeaderCell>Trimestre 2</Table.HeaderCell>
            <Table.HeaderCell>Trimestre 3</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
<<<<<<< HEAD
        <Table.Body>
=======
        <Table.Body className="table-notas">
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
          {num.map(() => (
            <RenderCalification />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
function RenderCalification() {
  return (
<<<<<<< HEAD
    <Table.Row className="list-qualifications__status-available">
      <Table.Cell width="16">Juna</Table.Cell>
=======
    <Table.Row textAlign="center">
      <Table.Cell>Juna</Table.Cell>
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
      <Table.Cell>Robels</Table.Cell>
      <Table.Cell>70</Table.Cell>
      <Table.Cell>30</Table.Cell>
      <Table.Cell>11</Table.Cell>
    </Table.Row>
  );
}
