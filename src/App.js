import React, { useState } from "react";
import System from "./pages/System";
import Main from "./pages/Main";

export default function App() {
  const [page, setPage] = useState("home");
  const [userInicial, setUserInicial] = useState(null);
  return (
    <>
      {page === "system" ? (
        <System setUserInicial={setUserInicial} setPage={setPage} />
      ) : page === "home" ? (
        <Main
          setUserInicial={setUserInicial}
          userInicial={userInicial}
          setPage={setPage}
        />
      ) : null}
    </>
  );
}
