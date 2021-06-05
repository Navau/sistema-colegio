import React from "react";
import DataTeacher from "../../components/DataTeacher/DataTeacher";
import { Message } from "semantic-ui-react";

import "./style.css";

export const PerfilTeacher = (props) => {
  const { user, accountValue } = props;
  return (
    <>
      <div className="fondo-pag">
        <div className="message">
          <Message className="fond-message">
            <Message.Header>
              <center>
                <h3>Perfil - Unidad Educativa Ave Maria</h3>
              </center>
            </Message.Header>
          </Message>
        </div>
        <DataTeacher user={user} accountValue={accountValue} />
      </div>
    </>
  );
};
