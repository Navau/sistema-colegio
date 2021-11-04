import React from "react";
import { Message } from "semantic-ui-react";
import { UpRatings } from "../../components/UpRatings/UpRatings";
<<<<<<< HEAD

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
=======
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
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
