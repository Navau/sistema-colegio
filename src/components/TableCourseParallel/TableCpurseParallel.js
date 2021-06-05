import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";

export const TableCpurseParallel = () => {
  const num = [1, 2, 3, 4];

  return (
    <>
      <div>
        <Table celled inverted selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nro.</Table.HeaderCell>
              <Table.HeaderCell>Curso-Paralelo</Table.HeaderCell>
              <Table.HeaderCell>Descargar Plantilla</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {num.map(() => (
              <RenderCourse />
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

function RenderCourse() {
  return (
    <Table.Row>
      <Table.Cell textAlign="center"> 1</Table.Cell>
      <Table.Cell textAlign="center">1 "A" Sec.</Table.Cell>
      <Table.Cell textAlign="center">
        <Button positive>
          <Icon name="arrow alternate circle down" />
          Descargar Plantilla
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}
