import { useTokenContext } from "../../contexts/TokenContext.js";
import { Navigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import "./style.css";

const LoginPage = ({ setUseGemaRoja, setUseGemaVerde }) => {
  const { token } = useTokenContext();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <section className="loginpage">
      <h2>Iniciar sesion</h2>

      <LoginForm
        setUseGemaRoja={setUseGemaRoja}
        setUseGemaVerde={setUseGemaVerde}
      />
    </section>
  );
};

export default LoginPage;
