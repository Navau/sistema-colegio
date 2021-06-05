import React from "react";
import { Switch, Route } from "react-router-dom";

//pages
import Home from "../pages/Home";
import StudentsManagement from "../pages/StudentsManagement/StudentsManagement";
import TeachersManagement from "../pages/TeachersManagement/TeachersManagement";
import QualificationManagement from "../pages/QualificationManagement/QualificationManagement";
import SchedulesManagement from "../pages/SchedulesManagement";
import { AcademyTeacher } from "../pages/AcademyTeacher/AcademyTeacher";
import { RatingsStudent } from "../pages/RatingsStudent/RatingsStudent";
import { PerfilTeacher } from "../pages/PerfilTeacher/PerfilTeacher";
import { Licenses } from "../pages/Licenses/Licenses";
import { Memorandums } from "../pages/Memorandums/Memorandums";
import { Notices } from "../pages/Notices/Notices";

export default function routes(props) {
  const { user, accountValue } = props;
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
      <Route path="/academy-teacher" exact>
        <AcademyTeacher />
      </Route>
      <Route path="/ratings-student" exact>
        <RatingsStudent />
      </Route>
      <Route path="/perfil-teacher" exact>
        <PerfilTeacher user={user} accountValue={accountValue} />
      </Route>
      <Route path="/licencias" exact>
        <Licenses />
      </Route>
      <Route path="/memorandums" exact>
        <Memorandums />
      </Route>
      <Route path="/avisos" exact>
        <Notices />
      </Route>
    </Switch>
  );
}
