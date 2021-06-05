import React, { useState, useEffect } from "react";
import { Button, Form, Input, Icon, Dropdown } from "semantic-ui-react";
import firebase from "../../utils/firebase";
import { toast, Zoom } from "react-toastify";
import { map } from "lodash";
import { PARAMS } from "../../utils/constants";

import "./LoginForm.scss";
import "firebase/firestore";

const db = firebase.firestore(firebase);

export default function LoginForm(props) {
  const { setSelectedForm, setUser, setParams } = props;
  const [formData, setFormData] = useState(defaultValueForm());
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState({});

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    setFormError({});
    let errors = {};
    let formOk = true;
    if (formData.userName.length < 6) {
      errors.userName = true;
      formOk = false;
    }
    if (formData.password.length < 6) {
      errors.password = true;
      formOk = false;
    }
    setFormError(errors);
    if (formOk) {
      setIsLoading(true);
      db.collection("accounts")
        .where("userName", "==", formData.userName)
        .where("password", "==", formData.password)
        .limit(1)
        .get()
        .then((response) => {
          if (response?.size > 0) {
            map(response.docs, (user) => {
              const userAux = user.data();
              userAux.id = user.id;
              toast.success(
                `Iniciaste sesión de manera correcta como ${userAux.typeUser}`,
                {
                  transition: Zoom,
                }
              );
              setUser(userAux);
              const paramsAux = {};
              paramsAux.zid = btoa(userAux.id);
              paramsAux.type = btoa(userAux.typeUser);
              localStorage.setItem(PARAMS, JSON.stringify(paramsAux));
              setParams(paramsAux);
            });
          } else {
            toast.warn("El usuario no existe o es incorrecto", {
              transition: Zoom,
            });
          }
        })
        .catch((err) => {
          toast.error(
            "Ocurrio un error de conexion, puede ser que el sistema no funcione o el internet este muy lento",
            {
              transition: Zoom,
            }
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="login-form">
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <label>Carnet de Identidad</label>
          <Input
            type="number"
            name="userName"
            placeholder="Carnet de Identidad"
            icon="id card"
            error={formError.userName}
          />
          {formError.userName && (
            <span className="error-text">
              * Por favor, introduzca un carnet de identidad válido.
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <label>Contraseña</label>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            icon={
              showPassword ? (
                <Icon
                  name="eye slash outline"
                  link
                  onClick={handlerShowPassword}
                />
              ) : (
                <Icon name="eye" link onClick={handlerShowPassword} />
              )
            }
            error={formError.password}
          />
          {formError.password && (
            <span className="error-text">
              * Por favor, introduzca una contraseña mayor a 5 digitos.
            </span>
          )}
        </Form.Field>
        <Button type="Submit" loading={isLoading}>
          Iniciar Sesión
        </Button>
      </Form>
    </div>
  );
}

function defaultValueForm() {
  return {
    userName: "",
    password: "",
  };
}
