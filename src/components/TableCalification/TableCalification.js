import React from "react";
import { Icon, Table } from "semantic-ui-react";
import "./styl.css";

export const TableCalification = () => {
  const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const valor = "nega";
  return (
    <div>
      <Table
        inverted
        celled
        selectable
        padded
        striped
        className="tabla-view-notas"
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Apellido</Table.HeaderCell>
            <Table.HeaderCell>Trimestre 1</Table.HeaderCell>
            <Table.HeaderCell>Trimestre 2</Table.HeaderCell>
            <Table.HeaderCell>Trimestre 3</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body className="table-notas">
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
    <Table.Row textAlign="center">
      <Table.Cell>Juna</Table.Cell>
      <Table.Cell>Robels</Table.Cell>
      <Table.Cell>70</Table.Cell>
      <Table.Cell>30</Table.Cell>
      <Table.Cell>11</Table.Cell>
    </Table.Row>
  );
}
