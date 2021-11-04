import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, Zoom } from "react-toastify";
import { Grid } from "semantic-ui-react";
import { Image } from "antd";
import { map, size } from "lodash";
import moment from "moment";
import "moment/locale/es";

import "./ViewReports.scss";

import LoadingTable from "../../components/Loadings/LoadingTable";
import firebase from "../../utils/firebase";

import "firebase/storage";
import "firebase/firestore";

const db = firebase.firestore(firebase);

export default function ViewReports() {
  const { id } = useParams();
  const [reports, setReports] = useState([]);
  const [student, setStudent] = useState();
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoadingStudent, setIsLoadingStudent] = useState(true);
  const [isLoadingReports, setIsLoadingReports] = useState(true);

  useEffect(() => {
    setIsLoadingStudent(true);
    setIsLoadingReports(true);
    db.collection("students")
      .doc(id)
      .get()
      .then((response) => {
        console.log(response.data());
        setStudent(response.data());
        firebase
          .storage()
          .ref(`photoStudents/${response.data().filePhotoId}`)
          .getDownloadURL()
          .then((url) => {
            setImageUrl(url);
          });
      })
      .catch(() => {
        toast.error("Hubo un error al traer informacion del estudiante", {
          transition: Zoom,
        });
      })
      .finally(() => {
        setIsLoadingStudent(false);
      });
    db.collection("reports")
      .where("idStudent", "==", id)
      .get()
      .then((response) => {
        const arrayReportsAux = [];
        map(response.docs, (item) => {
          arrayReportsAux.push(item.data());
        });
        setReports(arrayReportsAux);
      })
      .catch(() => {
        toast.error(
          "Hubo un error al tratar de obtener los Reportes del Estudiante",
          {
            transition: Zoom,
          }
        );
      })
      .finally(() => {
        setIsLoadingReports(false);
      });
  }, []);

  return (
    <div className="view-reports">
      <div className="view-reports__header">
        <h1>Reportes del Estudiante</h1>
      </div>
      <div className="view-reports__content">
        {isLoadingStudent ? (
          <LoadingTable />
        ) : (
          <>
            <div className="photo-student">
              <Image.PreviewGroup>
                <Image
                  alt={`${student.firstName} ${student.secondName}`}
                  src={imageUrl}
                />
              </Image.PreviewGroup>
            </div>
            <div className="texts">
              <h2>
                {student.firstName} {student.secondName}{" "}
                {student.fatherLastName} {student.motherLastName}
              </h2>
              <h3>C.I. {id}</h3>
            </div>
          </>
        )}
        {isLoadingReports ? (
          <LoadingTable />
        ) : (
          <div className="reports">
            {map(reports, (item) => (
              <RenderReport report={item} />
            ))}
          </div>
        )}
        {size(reports) <= 0 && (
          <div className="empty">
            <h1>ESTE ESTUDIANTE NO TIENE REPORTES</h1>
          </div>
        )}
      </div>
    </div>
  );
}

function RenderReport(props) {
  const { report } = props;

  const dateBirthFormat = (date) => {
    const dateMiliseconds = date * 1000;
    const dateResult = new Date(dateMiliseconds);
    return moment(dateResult).format("D [de] MMMM [de] YYYY");
  };

  return (
    <Grid relaxed>
      <Grid.Row className="title-date">
        <Grid.Column mobile={16} tablet={13} computer={13}>
          <div className="title">
            <h1>Razon: {report.name}</h1>
          </div>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={3} computer={3}>
          <div className="date">
            <h4>Fecha: {dateBirthFormat(report?.creationDate?.seconds)}</h4>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="info-row">
        <Grid.Column mobile={16} tablet={16} computer={16}>
          <div className="info">
            <h3>{report.info}</h3>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
