import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../../routes/routes";
import MenuLeft from "../../components/MenuLeft";
import MenuLeftSecretary from "../../components/MenuLeftSecretary";

import TopBar from "../../components/TopBar";
import "./AdminLayout.scss";

import firebase from "../../utils/firebase";
import MenuLeftTeacher from "../../components/MenuLeftTeacher/MenuLeftTeacher";
const db = firebase.firestore(firebase);

export default function AdminLayout(props) {
  const { user } = props;
  const [accountValue, setAccountValue] = useState([]);

  useEffect(() => {
    db.collection("accounts")
      .doc(user.accountId)
      .get()
      .then((response) => {
        //console.log(response.data().typeUser);
        const da = response.data().typeUser;
        setAccountValue(da);
      });
  }, []);

  console.log(accountValue);

  return (
    <>
      <Router>
        <Grid className="admin-layout">
          <Grid.Row>
            <Grid.Column width={3}>
              {accountValue === "Director" ? (
                <MenuLeft user={user} accountValue={accountValue} />
              ) : accountValue === "Secretario" ? (
                <MenuLeftSecretary user={user} accountValue={accountValue} />
              ) : accountValue === "Profesor" ? (
                <MenuLeftTeacher user={user} accountValue={accountValue} />
              ) : (
                ""
              )}
            </Grid.Column>
            <Grid.Column className="content" width={13}>
              <TopBar user={user} />
              <Routes user={user} accountValue={accountValue} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Router>
    </>
  );
}
/*
import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { BrowserRouter as Router } from "react-router-dom";
import { map } from "lodash";
import Routes from "../../routes/routes";
import MenuLeft from "../../components/MenuLeft";
import TopBar from "../../components/TopBar";

import firebase from "../../utils/firebase";

import "./AdminLayout.scss";
import "firebase/firestore";

const db = firebase.firestore(firebase);

export default function AdminLayout(props) {
  const { user } = props;
  const [userInfo, setuserInfo] = useState(null);
  const [showHideMenu, setShowHideMenu] = useState(3);

  useEffect(() => {
    if (user.typeUser) {
      const typeUserAux = user.typeUser;
      const typeUserCollection =
        typeUserAux == "Secretario"
          ? "admins"
          : typeUserAux == "Director"
          ? "admins"
          : typeUserAux == "Profesor"
          ? "teachers"
          : "admins";
      db.collection(typeUserCollection)
        .where("accountId", "==", user.id)
        .limit(1)
        .get()
        .then((response) => {
          map(response.docs, (user) => {
            console.log(user);
            const userAux = user.data();
            setuserInfo(userAux);
          });
        })
        .catch(() => {
          console.log("ERROR");
        })
        .finally(() => {});
    } else {
      setuserInfo(user);
    }
  }, []);

  return (
    <Router>
      <Grid className="admin-layout">
        <Grid.Row>
          <Grid.Column width={showHideMenu}>
            <MenuLeft showHideMenu={showHideMenu} />
          </Grid.Column>
          <Grid.Column className="content" width={16 - showHideMenu}>
            <TopBar
              user={userInfo}
              setShowHideMenu={setShowHideMenu}
              showHideMenu={showHideMenu}
            />
            <Routes user={userInfo} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Router>
  );
}*/
