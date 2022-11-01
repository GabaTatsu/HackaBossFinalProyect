import { useContext, useState } from "react";
import { AlertContext } from "../../contexts/AlertContext";
import Spinner from "../Spinner";
import "./style.css";

const EditLinkForm = ({
  id,
  token,
  setEditTitle,
  setEditDescription,
  setEditLink,
}) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const { setAlert } = useContext(AlertContext);
  const [editLinkForm, setEditLinkForm] = useState(false);

  return (
    <>
      {editLinkForm === false && (
        <button
          onClick={() => {
            setEditLinkForm(true);
          }}
        >
          Modificar
        </button>
      )}
      {editLinkForm === true && (
        <div className="alertwrapper">
          <form
            className="editlink"
            onSubmit={async (event) => {
              try {
                event.preventDefault();
                setLoading(true);

                const res = await fetch(
                  `${process.env.REACT_APP_API_URL}/links/${id}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: token,
                    },
                    body: JSON.stringify({ title, description, link }),
                  }
                );

                const body = await res.json();
                if (!res.ok) {
                  throw new Error(body.message);
                }

                if (title) {
                  setEditTitle(title);
                }
                if (description) {
                  setEditDescription(description);
                }
                if (link) {
                  setEditLink(link);
                }

                setAlert({ type: "success", msg: body.message });
                setEditLinkForm(false);
              } catch (error) {
                console.error(error.message);
                setAlert({ type: "error", msg: error.message });
              } finally {
                setLoading(false);
              }
            }}
          >
            <section>
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
            </section>
            <section>
              <button type="submit">Modificar</button>
              <button
                type="button"
                onClick={() => {
                  setEditLinkForm(false);
                }}
              >
                Cancelar
              </button>
              {loading && <Spinner />}
            </section>
          </form>
        </div>
      )}
    </>
  );
};
export default EditLinkForm;
