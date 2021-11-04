import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../../routes/routes";
import MenuLeft from "../../components/MenuLeft";
import TopBar from "../../components/TopBar";

import "./TeacherLayout.scss";

export default function TeacherLayout(props) {
  const { user, userAccount, setPage } = props;
  const [showHideMenu, setShowHideMenu] = useState(3);

  return (
    <Router>
      <Grid className="admin-layout">
        <Grid.Row>
          <Grid.Column width={showHideMenu}>
            <MenuLeft showHideMenu={showHideMenu} userAccount={userAccount} />
          </Grid.Column>
          <Grid.Column className="content" width={16 - showHideMenu}>
            <TopBar
              user={user}
              setShowHideMenu={setShowHideMenu}
              showHideMenu={showHideMenu}
              setPage={setPage}
            />
            <Routes user={user} userAccount={userAccount} setPage={setPage} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Router>
  );
}
