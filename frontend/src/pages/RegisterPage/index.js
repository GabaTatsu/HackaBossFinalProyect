import RegisterForm from "../../components/RegisterForm";
import "./style.css";

const RegisterPage = ({ setUseGemaRoja, setUseGemaVerde }) => {
  return (
    <section className="registerpage">
      <h2>Registrarse</h2>

      <RegisterForm
        setUseGemaRoja={setUseGemaRoja}
        setUseGemaVerde={setUseGemaVerde}
      />
    </section>
  );
};

export default RegisterPage;
