import { useState, useContext } from "react";
import { AlertContext } from "../../contexts/AlertContext";
import { useNavigate } from "react-router-dom";
import shownIcon from "../../assets/images/shown.png";
import dontShownIcon from "../../assets/images/dontshown.png";
import Spinner from "../Spinner";
import gemaRoja from "../../assets/images/gemaroja.png";
import gemaVerdeNeg from "../../assets/images/gemaverdeneg.png";

const RegisterForm = ({ setUseGemaRoja, setUseGemaVerde }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shown, setShown] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <form
      onSubmit={async (event) => {
        try {
          event.preventDefault();
          setLoading(true);

          const newUser = { username, email, password };

          const res = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          });
          const body = await res.json();

          if (!res.ok) {
            throw new Error(body.message);
          }
          setAlert({ type: "success", msg: body.message });
          navigate("/user/login");
          setUseGemaRoja(gemaRoja);
          setUseGemaVerde(gemaVerdeNeg);
        } catch (error) {
          console.error(error.message);
          setAlert({ type: "error", msg: error.message });
        } finally {
          setLoading(false);
        }
      }}
    >
      <label htmlFor="username">Nombre de usuario:</label>
      <input
        id="username"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />

      <label htmlFor="email">Correo electrónico:</label>
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

      <button type="submit">Crear cuenta</button>
      {loading && <Spinner />}
    </form>
  );
};

export default RegisterForm;
