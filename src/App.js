import React, { useState, useEffect } from "react";
import firebase from "./utils/firebase";
import { ToastContainer } from "react-toastify";
import { map } from "lodash";
import { PARAMS } from "./utils/constants";

import AdminLayout from "./layouts/AdminLayout";
import Auth from "./pages/Auth";
import Loading from "./components/Loading";

import "firebase/firestore";

const db = firebase.firestore(firebase);

export default function App() {
  const [user, setUser] = useState(null);
  const [params, setParams] = useState(null);
  const [reloadParams, setReloadParams] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const paramsStorage = localStorage.getItem(PARAMS);
    const paramsArray = JSON.parse(paramsStorage);
    setParams(paramsArray);
    setReloadParams(false);
  }, [reloadParams]);

  useEffect(() => {
    if (!user) {
      const paramsStorage = localStorage.getItem(PARAMS);
      if (paramsStorage) {
        const paramsArray = JSON.parse(paramsStorage);
        if (paramsArray.zid && paramsArray.type) {
          const idUserAux = atob(paramsArray.zid);
          const typeUserAux = atob(paramsArray.type);
          db.collection(typeUserAux + "s")
            .where("id", "==", idUserAux)
            .limit(1)
            .get()
            .then((response) => {
              map(response.docs, (user) => {
                const userAux = user.data();
                setUser(userAux);
              });
            })
            .catch(() => {})
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
    return <Loading />;
  }

  return (
    <>
      {!user ? (
        <Auth setUser={setUser} setParams={setParams} />
      ) : (
        <AdminLayout user={user} />
      )}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover={false}
      />
    </>
  );
}
