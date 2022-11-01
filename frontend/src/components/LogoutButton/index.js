import { useTokenContext } from "../../contexts/TokenContext";
import { Link } from "react-router-dom";
import gemaAzul from "../../assets/images/gemaazul.png";
import gemaVerde from "../../assets/images/gemaverde.png";
import gemaRoja from "../../assets/images/gemaroja.png";

const LogoutButton = ({ setUseGemaRoja, setUseGemaVerde }) => {
  const { setToken, setLoggedUser } = useTokenContext();

  return (
    <>
      <p>Cerrar sesión</p>
      <Link
        onClick={() => {
          setToken("");
          setLoggedUser("");
          setUseGemaRoja(gemaRoja);
          setUseGemaVerde(gemaVerde);
        }}
        to={`/`}
      >
        <img src={gemaAzul} alt="Cerrar sesión"></img>
      </Link>
    </>
  );
};

export default LogoutButton;
