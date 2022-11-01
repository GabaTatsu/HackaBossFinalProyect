import "./style.css";
import linkedin from "../../assets/images/linkedin.png";
const Footer = () => {
  return (
    <footer>
      <h4>Creado por:</h4>
      Raúl Cotino{" "}
      <a
        href="https://www.linkedin.com/in/ra%C3%BAlcotinoabril/"
        target="_blank"
        rel="noreferrer"
      >
        <img src={linkedin} alt="Linkedin"></img>
      </a>
      Sebastián Penas{" "}
      <a
        href="https://www.linkedin.com/in/sebasti%C3%A1n-penas-orza-9bba044b/"
        target="_blank"
        rel="noreferrer"
      >
        <img src={linkedin} alt="Linkedin"></img>
      </a>
      David Goldero{" "}
      <a
        href="https://www.linkedin.com/in/david-goldero-gabarda-4570191a3/"
        target="_blank"
        rel="noreferrer"
      >
        <img src={linkedin} alt="Linkedin"></img>
      </a>
    </footer>
  );
};
export default Footer;
