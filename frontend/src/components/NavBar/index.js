import { Link } from "react-router-dom";
import { useTokenContext } from "../../contexts/TokenContext";
import LogoutButton from "../LogoutButton";
import gemaVerde from "../../assets/images/gemaverde.png";
import gemaRoja from "../../assets/images/gemaroja.png";
import gemaVerdeNeg from "../../assets/images/gemaverdeneg.png";
import gemaRojaNeg from "../../assets/images/gemarojaneg.png";

const NavBar = ({
  useGemaRoja,
  setUseGemaRoja,
  useGemaVerde,
  setUseGemaVerde,
}) => {
  const { loggedUser } = useTokenContext();

  return (
    <nav>
      <ul>
        {!loggedUser && (
          <>
            <li>
              <p>Registrarse</p>
              <Link
                onClick={() => {
                  setUseGemaVerde(gemaVerde);
                  setUseGemaRoja(gemaRojaNeg);
                }}
                to="/user/register"
              >
                <img src={useGemaRoja} alt="Registrarse"></img>
              </Link>
            </li>
            <li>
              <p>Iniciar sesión</p>
              <Link
                onClick={() => {
                  setUseGemaVerde(gemaVerdeNeg);
                  setUseGemaRoja(gemaRoja);
                }}
                to="/user/login"
              >
                <img src={useGemaVerde} alt="Nuevo enlace"></img>
              </Link>
            </li>
          </>
        )}
        {loggedUser && (
          <>
            <li>
              <Link to="/">
                <LogoutButton
                  setUseGemaRoja={setUseGemaRoja}
                  setUseGemaVerde={setUseGemaVerde}
                />
              </Link>
            </li>
            <li>
              <p>Perfil de usuario</p>
              <Link
                onClick={() => {
                  setUseGemaVerde(gemaVerde);
                  setUseGemaRoja(gemaRojaNeg);
                }}
                to={`/user/profile/${loggedUser.id}`}
              >
                <img src={useGemaRoja} alt="Perfil de usuario"></img>
              </Link>
            </li>
            <li>
              <p>Nuevo enlace</p>
              <Link
                onClick={() => {
                  setUseGemaVerde(gemaVerdeNeg);
                  setUseGemaRoja(gemaRoja);
                }}
                to={"/link/new"}
              >
                <img src={useGemaVerde} alt="Nuevo enlace"></img>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default NavBar;
