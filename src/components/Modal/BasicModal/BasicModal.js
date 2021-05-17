import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

import "./BasicModal.scss";

export default function BasicModal(props) {
  const { show, setShow, title, iconName, children } = props;

  const onClose = () => {
    setShow(false);
  };

  return (
    <Modal open={show} onClose={onClose} size="large" className="basic-modal">
      <Modal.Header>
        <div className="basic-modal__header-left">
          <Icon name={iconName} size="large" />
          <h3>{title}</h3>
        </div>
        <div className="basic-modal__header-right">
          <Icon name="close" onClick={onClose} />
        </div>
      </Modal.Header>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
}
