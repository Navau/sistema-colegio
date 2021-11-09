import React from "react";
import { Message } from "semantic-ui-react";
import { UpRatings } from "../../components/UpRatings/UpRatings";

import "./RatingsStudent.scss";

export default function RatingsStudent(props) {
  const { user } = props;
  return (
    <div className="rating-students">
      <div className="message">
        <Message className="fond-message">
          <Message.Header>
            <h3>Asignar Calificaciones - Unidad Educativa Ave Maria</h3>
          </Message.Header>
        </Message>
      </div>
      <UpRatings user={user} />
    </div>
  );
}
