import React from "react";
import { Switch, Route } from "react-router-dom";

//pages
import Home from "../pages/Home";
import StudentsManagement from "../pages/StudentsManagement";
import TeachersManagement from "../pages/TeachersManagement";
import QualificationManagement from "../pages/QualificationManagement";
import SchedulesManagement from "../pages/SchedulesManagement";

export default function routes(props) {
  const { user } = props;
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/students-management" exact>
        <StudentsManagement user={user} />
      </Route>
      <Route path="/teachers-management" exact>
        <TeachersManagement />
      </Route>
      <Route path="/qualification-management" exact>
        <QualificationManagement />
      </Route>
      <Route path="/schedules-management" exact>
        <SchedulesManagement />
      </Route>
    </Switch>
  );
}
