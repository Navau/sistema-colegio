import React from "react";
import { Table } from "semantic-ui-react";

export const AsigmentMaterial = () => {
  const num = [1, 2, 3, 4];

  return (
    <>
      <div>
        <Table celled inverted selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nro.</Table.HeaderCell>
              <Table.HeaderCell>Materia</Table.HeaderCell>
              <Table.HeaderCell>Curso-Paralelo</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {num.map(() => (
              <RenderMaterial />
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};
function RenderMaterial() {
  return (
    <Table.Row>
      <Table.Cell textAlign="center"> 1</Table.Cell>
      <Table.Cell textAlign="center">Materia1</Table.Cell>
      <Table.Cell textAlign="center">Materia1</Table.Cell>
    </Table.Row>
  );
}
