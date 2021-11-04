import React from "react";
import DataTeacher from "../../components/DataTeacher/DataTeacher";
import { Message } from "semantic-ui-react";
import LoadingTable from "../../components/Loadings/LoadingTable";

import "./Profile.scss";

export default function Profile(props) {
  const { user, accountValue } = props;

  if (!user || !accountValue) {
    return <LoadingTable />;
  }

  return (
    <div className="profile">
      <div className="fondo-pag">
        <div className="message">
          <Message className="fond-message">
            <Message.Header>
              <h3>Perfil - Unidad Educativa Ave Maria</h3>
            </Message.Header>
          </Message>
        </div>
        <DataTeacher user={user} accountValue={accountValue} />
      </div>
    </div>
  );
}
