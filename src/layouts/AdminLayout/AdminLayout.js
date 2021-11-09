import React from "react";
import { Grid } from "semantic-ui-react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../../routes/routes";
import MenuLeft from "../../components/MenuLeft";
import TopBar from "../../components/TopBar";

import "./AdminLayout.scss";

export default function AdminLayout(props) {
  const { user } = props;
  return (
    <Router>
      <Grid className="admin-layout">
        <Grid.Row>
          <Grid.Column width={3}>
            <MenuLeft />
          </Grid.Column>
          <Grid.Column className="content" width={13}>
            <TopBar user={user} />
            <Routes user={user} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Router>
  );
}
