import React from "react";
import {
  Icon,
  Button,
  Search,
  Label,
  Dropdown,
  Message,
} from "semantic-ui-react";

import "./HeaderAssistance.scss";

export default function HeaderAssistance(props) {
  const { setViewList } = props;
  return (
    <div className="header-assistance">
      <div className="message">
        <Message className="fond-message">
          <Message.Header>
            <h3>Gestión de Asistencia - Unidad Educativa Ave Maria</h3>
          </Message.Header>
        </Message>
      </div>
      <div className="header-assistance__actions">
        <div className="header-assistance__actions__options">
          <Button
            animated="fade"
            className="header-assistance__actions__options__button-back"
            onClick={() => {
              setViewList(null);
            }}
          >
            <Button.Content visible>Seleccionar otra fecha</Button.Content>
            <Button.Content hidden>
              <Icon name="calendar alternate" />
            </Button.Content>
          </Button>
        </div>
      </div>
    </div>
  );
}
