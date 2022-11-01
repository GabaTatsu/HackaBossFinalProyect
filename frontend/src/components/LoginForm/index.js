import { useState, useContext } from "react";
import { AlertContext } from "../../contexts/AlertContext";
import { useTokenContext } from "../../contexts/TokenContext";
import Spinner from "../Spinner";
import shownIcon from "../../assets/images/shown.png";
import dontShownIcon from "../../assets/images/dontshown.png";
import gemaVerde from "../../assets/images/gemaverde.png";
import gemaRoja from "../../assets/images/gemaroja.png";

const LoginForm = ({ setUseGemaRoja, setUseGemaVerde }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useTokenContext();
  const [loading, setLoading] = useState(false);
  const [shown, setShown] = useState(false);
  const { setAlert } = useContext(AlertContext);

  return (
    <form
      onSubmit={async (event) => {
        try {
          setLoading(true);
          event.preventDefault();

          const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const body = await res.json();

          if (!res.ok) {
            throw new Error(body.message);
          }
          setAlert({ type: "success", msg: body.message });

          setToken(body.authToken);
          setUseGemaRoja(gemaRoja);
          setUseGemaVerde(gemaVerde);
        } catch (error) {
          setAlert({ type: "error", msg: error.message });

          console.error(error.message);
        } finally {
          setLoading(false);
        }
      }}
    >
      {" "}
      {loading && <Spinner />}
      <label htmlFor="email">Correo Electrónico:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <label htmlFor="password">Contraseña:</label>
      <input
        id="password"
        type={shown ? "text" : "password"}
        autoComplete="off"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button
        type="button"
        onClick={() => {
          setShown(!shown);
        }}
      >
        {shown && <img src={shownIcon} alt="Ver contraseña" />}
        {!shown && <img src={dontShownIcon} alt="No ver contraseña" />}
      </button>
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default LoginForm;
