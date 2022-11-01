import { Navigate } from "react-router-dom";
import NewLinkForm from "../../components/NewLinkForm";
import { useTokenContext } from "../../contexts/TokenContext";
import "./style.css";

const NewLinkPage = () => {
  const { token } = useTokenContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="newlinkpage">
      <h2>Nuevo enlace</h2>

      <NewLinkForm />
    </section>
  );
};

export default NewLinkPage;
