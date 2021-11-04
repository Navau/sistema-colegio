import React, { useState } from "react";
import { Button, Icon, Modal, Progress } from "semantic-ui-react";
import AddReportForm from "../../ReportsComponents/AddReportForm";

import "./ReportModal.scss";

export default function ReportModal(props) {
  const {
    show,
    setShow,
    title,
    iconName,
    typePerson,
    typeAction,
    valuePGB,
    student,
    setUpdateData,
  } = props;

  const [valueTotalProgressBar, setValueTotalProgressBar] = useState(valuePGB);
  const [sliderRef, setSliderRef] = useState(null);
  const [activeSlide, setActiveSlide] = useState(1);
  const [isLoadingInfo, setIsLoadingInfo] = useState(false);

  const onClose = () => {
    setShow(isLoadingInfo);
    setActiveSlide(1);
  };

  return (
    <Modal open={show} onClose={onClose} size="small" className="report-modal">
      <Modal.Header>
        <div className="report-modal__header-left">
          <Icon name={iconName} size="large" />
          <h3>{title}</h3>
        </div>
        <div className="report-modal__header-right">
          <Icon name="close" onClick={onClose} />
        </div>
      </Modal.Header>
      <Modal.Content>
        <AddReportForm
          setUpdateData={setUpdateData}
          setIsLoadingInfo={setIsLoadingInfo}
          isLoadingInfo={isLoadingInfo}
          onClose={onClose}
          student={student}
        />
      </Modal.Content>
    </Modal>
  );
}
