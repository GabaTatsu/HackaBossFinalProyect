import { Link } from "react-router-dom";
import logoPagina from "../../assets/images/royalcrest.png";
import linkProyectLogo from "../../assets/images/LinkProyectLogo.png";
import NavBar from "../NavBar";
import gemaVerde from "../../assets/images/gemaverde.png";
import gemaRoja from "../../assets/images/gemaroja.png";
import "./style.css";

const Header = ({
  useGemaRoja,
  setUseGemaRoja,
  useGemaVerde,
  setUseGemaVerde,
}) => {
  return (
    <header>
      <Link
        onClick={() => {
          setUseGemaVerde(gemaVerde);
          setUseGemaRoja(gemaRoja);
        }}
        to="/"
      >
        <img src={linkProyectLogo} alt="ProyectLink"></img>
      </Link>

      <Link
        onClick={() => {
          setUseGemaVerde(gemaVerde);
          setUseGemaRoja(gemaRoja);
        }}
        to="/"
      >
        <img className="logoPagina" src={logoPagina} alt="ProyectLink"></img>
      </Link>
      <NavBar
        useGemaRoja={useGemaRoja}
        setUseGemaRoja={setUseGemaRoja}
        useGemaVerde={useGemaVerde}
        setUseGemaVerde={setUseGemaVerde}
      />
    </header>
  );
};

export default Header;
