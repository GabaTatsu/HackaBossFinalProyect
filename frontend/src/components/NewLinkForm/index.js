import { useNavigate } from "react-router-dom";
import { useTokenContext } from "../../contexts/TokenContext";
import { useContext, useState } from "react";
import Spinner from "../Spinner";
import { AlertContext } from "../../contexts/AlertContext";

const NewLinkForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useTokenContext();
  const { setAlert } = useContext(AlertContext);
  const navigate = useNavigate();
  return (
    <>
      <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            setLoading(true);
            const newLink = { title, description, link };
            const res = await fetch(
              `${process.env.REACT_APP_API_URL}/links/new`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
                },
                body: JSON.stringify(newLink),
              }
            );

            const body = await res.json();
            if (!res.ok) {
              throw new Error(body.message);
            }
            setAlert({ type: "success", msg: body.message });
            navigate("/");
          } catch (error) {
            console.error(error.message);
            setAlert({ type: "error", msg: error.message });
          } finally {
            setLoading(false);
          }
        }}
      >
        <label htmlFor="title">Título:</label>
        <input
          id="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <label htmlFor="description">Descripción:</label>
        <input
          id="description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <label htmlFor="link">Enlace:</label>
        <input
          id="link"
          value={link}
          onChange={(event) => {
            setLink(event.target.value);
          }}
        />
        <button>Publicar enlace</button>
      </form>
      {loading && <Spinner />}
    </>
  );
};

export default NewLinkForm;
