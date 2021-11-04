import React from "react";
import { Switch, Route } from "react-router-dom";

//pages
import Home from "../pages/Home";
import StudentsManagement from "../pages/StudentsManagement";
import TeachersManagement from "../pages/TeachersManagement";
import QualificationManagement from "../pages/QualificationManagement";
import SchedulesManagement from "../pages/SchedulesManagement";
import AcademyTeacher from "../pages/AcademyTeacher";
import RatingsStudent from "../pages/RatingsStudent";
import Profile from "../pages/Profile";
import Licences from "../pages/Licences";
import Memorandums from "../pages/Memorandums";
import Notices from "../pages/Notices";
import Student from "../pages/Student";
import Teacher from "../pages/Teacher";
import AssistanceManagement from "../pages/AssistanceManagement";
import Reports from "../pages/Reports";
import ViewReports from "../pages/ViewReports";

export default function routes(props) {
  const { user, userAccount, setPage } = props;
  return (
    <>
      {userAccount.typeUser === "Director" ||
      userAccount.typeUser === "Secretario" ? (
        <Switch>
          <Route path="/" exact>
            <Profile user={user} accountValue={userAccount} />
          </Route>
          <Route path="/sistema-colegio" exact>
            <Profile user={user} accountValue={userAccount} />
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
          <Route path="/student/:id" exact>
            <Student />
          </Route>
          <Route path="/teacher/:id" exact>
            <Teacher />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route path="/licences" exact>
            <Licences />
          </Route>
          <Route path="/memorandums" exact>
            <Memorandums />
          </Route>
          <Route path="/notices" exact>
            <Notices />
          </Route>
        </Switch>
      ) : userAccount.typeUser === "Profesor" ? (
        <Switch>
          <Route path="/" exact>
            <Profile user={user} accountValue={userAccount} />
          </Route>
          <Route path="/sistema-colegio" exact>
            <Profile user={user} accountValue={userAccount} />
          </Route>
          <Route path="/assistance-management" exact>
            <AssistanceManagement />
          </Route>
          <Route path="/academy-teacher" exact>
            <AcademyTeacher user={user} />
          </Route>
          <Route path="/reports" exact>
            <Reports />
          </Route>
          <Route path="/student-reports/:id" exact>
            <ViewReports />
          </Route>
          <Route path="/ratings-student" exact>
            <RatingsStudent user={user} />
          </Route>
          <Route path="/profile" exact>
            <Profile user={user} accountValue={userAccount} />
          </Route>
        </Switch>
      ) : null}
    </>
  );
}
