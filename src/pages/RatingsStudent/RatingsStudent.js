import React from "react";
import { Message } from "semantic-ui-react";
import { UpRatings } from "../../components/UpRatings/UpRatings";
import "../QualificationManagement/styl.css";

export const RatingsStudent = () => {
  return (
    <>
      <div className="message">
        <Message className="fond-message">
          <Message.Header>
            <center>
              <h3>Asignar Calificaciones - Unidad Educativa Ave Maria</h3>
            </center>
          </Message.Header>
        </Message>
      </div>
      <UpRatings />
    </>
  );
};
