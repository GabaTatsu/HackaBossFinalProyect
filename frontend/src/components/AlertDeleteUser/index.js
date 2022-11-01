import alertIcon from "../../assets/images/alertIcon.png";
import { useTokenContext } from "../../contexts/TokenContext";
import { useContext, useState } from "react";
import shownIcon from "../../assets/images/shown.png";
import dontShownIcon from "../../assets/images/dontshown.png";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../contexts/AlertContext";

const AlertDeleteUser = () => {
  const { setToken, setLoggedUser, token } = useTokenContext();
  const [alertDeleteUser, setAlertDeleteUser] = useState(false);
  const [password, setPassword] = useState("");
  const [shown, setShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const navigate = useNavigate();
  return (
    <>
      {alertDeleteUser === false && (
        <button
          type="button"
          onClick={() => {
            setAlertDeleteUser(true);
          }}
        >
          Borrar
        </button>
      )}

      {alertDeleteUser === true && (
        <div className="alertwrapper">
          <article className="alertdelete">
            <img src={alertIcon} alt="Alert icon" />
            <section>
              <p>¿Seguro que quieres borrar al usuario?</p>
              <form
                onSubmit={async (event) => {
                  try {
                    event.preventDefault();
                    setLoading(true);
                    const res = await fetch(
                      `${process.env.REACT_APP_API_URL}/users/delete`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: token,
                        },
                        body: JSON.stringify({ password }),
                      }
                    );
                    const body = await res.json();

                    if (!res.ok) {
                      throw new Error(body.message);
                    }
                    setAlertDeleteUser(false);
                    setToken("");
                    setLoggedUser("");
                    setAlert({ type: "success", msg: body.message });
                    navigate("/user/register");
                  } catch (error) {
                    console.error(error.message);
                    setAlert({ type: "error", msg: error.message });
                  } finally {
                    setLoading(false);
                  }
                }}
              >
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
                  {!shown && (
                    <img src={dontShownIcon} alt="No ver contraseña" />
                  )}
                </button>
                <button type="submit">Borrar</button>
                <button
                  type="button"
                  onClick={() => {
                    setAlertDeleteUser(false);
                  }}
                >
                  Cancelar
                </button>
              </form>
            </section>
            {loading && <Spinner />}
          </article>
        </div>
      )}
    </>
  );
};

export default AlertDeleteUser;
