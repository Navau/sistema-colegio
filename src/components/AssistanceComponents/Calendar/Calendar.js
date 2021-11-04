import React, { useState, useEffect } from "react";
import { Calendar as CalendarAntd } from "antd";
import { Icon, Button } from "semantic-ui-react";
import moment from "moment";
import "moment/locale/es";

import "./Calendar.scss";

export default function Calendar(props) {
  const { setViewList } = props;
  const [calendarValue, setCalendarValue] = useState(moment().locale("es"));

  const localeCalendar = {
    lang: {
      locale: "es_MX",
      placeholder: "Selecciona una Fecha",
      rangePlaceholder: ["Fecha Inicial", "Fecha Final"],
      today: "Today",
      now: "Now",
      backToToday: "Back to today",
      ok: "Ok",
      clear: "Clear",
      month: "Mes",
      year: "Año",
      timeSelect: "Select time",
      dateSelect: "Select date",
      monthSelect: "Choose a month",
      yearSelect: "Choose a year",
      decadeSelect: "Choose a decade",
      yearFormat: "YYYY",
      dateFormat: "M/D/YYYY",
      dayFormat: "D",
      dateTimeFormat: "M/D/YYYY HH:mm:ss",
      monthFormat: "MMMM",
      monthBeforeYear: true,
      previousMonth: "Previous month (PageUp)",
      nextMonth: "Next month (PageDown)",
      previousYear: "Last year (Control + left)",
      nextYear: "Next year (Control + right)",
      previousDecade: "Last decade",
      nextDecade: "Next decade",
      previousCentury: "Last century",
      nextCentury: "Next century",
    },
    timePickerLocale: {
      placeholder: "Select time",
    },
    dateFormat: "YYYY-MM-DD",
    dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
    weekFormat: "YYYY-wo",
    monthFormat: "YYYY-MM",
  };

  const onSelect = (value) => {
    setCalendarValue(value);
  };

  const onPanelChange = (value) => {
    setCalendarValue(value);
  };

  return (
    <div className="calendar">
      <h2>Calendario</h2>
      <h3>Seleccione una Fecha para verificar o registrar asistencia</h3>
      <CalendarAntd
        disabledDate={(current) => {
          const customDate = moment();
          return current && current > moment(customDate, "YYYY-MM-DD");
        }}
        locale={localeCalendar}
        fullscreen={false}
        value={calendarValue}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
      />
      <Button
        icon
        labelPosition="right"
        positive
        className="calendar__button-save"
        onClick={() => {
          setViewList(calendarValue);
        }}
      >
        Seleccionar Fecha
        <Icon name="checked calendar" />
      </Button>
    </div>
  );
}
