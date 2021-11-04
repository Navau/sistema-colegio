import React, { useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import { ToastContainer } from "react-toastify";
import { map } from "lodash";
import { PARAMS } from "../../utils/constants";

import AdminLayout from "../../layouts/AdminLayout";
import TeacherLayout from "../../layouts/TeacherLayout";
import Auth from "../Auth";
import LoadingLogin from "../../components/Loadings/LoadingLogin";

import "firebase/firestore";
import { FormatListBulletedOutlined } from "@material-ui/icons";

const db = firebase.firestore(firebase);
document.addEventListener("wheel", function (event) {
  if (document.activeElement.type === "number") {
    document.activeElement.blur();
  }
});
export default function System(props) {
  const { setPage } = props;
  const [user, setUser] = useState(null);
  const [userAccount, setUserAccount] = useState(null);
  const [params, setParams] = useState(null);
  const [reloadParams, setReloadParams] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const paramsStorage = localStorage.getItem(PARAMS);
    const paramsArray = JSON.parse(paramsStorage);
    setParams(paramsArray);
    setReloadParams(false);
  }, [reloadParams]);

  // console.log("USER", user);
  // console.log("USER_ACCOUNT", userAccount);

  // console.log("USER_INFO", userInfo);
  // console.log("TYPE_USER", typeUser);

  useEffect(() => {
    if (!userAccount) {
      setIsLoading(true);
      //USER==NULL
      const paramsStorage = localStorage.getItem(PARAMS); //OBTENIENDO PARAMETROS
      if (paramsStorage) {
        // PREGUNTAMOS SI EXISTE LOS PARAMETROS
        const paramsArray = JSON.parse(paramsStorage); //VOLVIENDO LOS PARAMETROS A JSON
        if (paramsArray.zid && paramsArray.type) {
          //VERIFICANDO SI ID Y TIPO DE USUARIO EXISTEN
          const idUserAux = atob(paramsArray.zid); //ID DE USUARIO
          const typeUserAux = atob(paramsArray.type); //TIPO DE USUARIO
          const typeUserCollection =
            typeUserAux === "Secretario"
              ? "admins"
              : typeUserAux === "Director"
              ? "admins"
              : typeUserAux === "Profesor"
              ? "teachers"
              : "admins"; //TIPO DE USUARIO PARA LA CONSULTA
          db.collection(typeUserCollection)
            .where("accountId", "==", idUserAux)
            .limit(1)
            .get()
            .then((response) => {
              map(response.docs, (user) => {
                const userAux = user.data();
                db.collection("accounts")
                  .doc(idUserAux)
                  .get()
                  .then((response) => {
                    const userAccountAux = response.data();
                    setUser(userAux);
                    setUserAccount(userAccountAux);
                  });
              });
            })
            .catch(() => {
              console.log("ERROR");
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      } else {
        setIsLoading(false);
      }
    }
  }, []);

  if (isLoading) {
    return <LoadingLogin />;
  }

  return (
    <>
      {!userAccount ? (
        <Auth
          setUser={setUser}
          setUserAccount={setUserAccount}
          setParams={setParams}
        />
      ) : userAccount.typeUser === "Secretario" ? (
        <AdminLayout user={user} userAccount={userAccount} setPage={setPage} />
      ) : userAccount.typeUser === "Director" ? (
        <AdminLayout user={user} userAccount={userAccount} setPage={setPage} />
      ) : userAccount.typeUser === "Profesor" ? (
        <TeacherLayout
          user={user}
          userAccount={userAccount}
          setPage={setPage}
        />
      ) : null}

      <ToastContainer
        position="bottom-left"
        autoClose={6000}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover={true}
      />
    </>
  );
}
