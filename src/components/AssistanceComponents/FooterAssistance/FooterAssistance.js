import React from "react";
import { Icon, Button } from "semantic-ui-react";

import "./FooterAssistance.scss";

export default function FooterAssistance(props) {
  const {} = props;
  return (
    <div className="footer-assistance">
      <div className="footer-assistance__actions">
        <div className="footer-assistance__actions__save-student">
          <Button
            icon
            labelPosition="right"
            positive
            className="footer-assistance__actions__save-student__button-save"
          >
            Guardar Cambios
            <Icon name="add user" />
          </Button>
        </div>
      </div>
    </div>
  );
}
