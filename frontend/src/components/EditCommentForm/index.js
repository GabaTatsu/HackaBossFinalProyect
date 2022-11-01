import { useContext, useState } from "react";
import { AlertContext } from "../../contexts/AlertContext";
import { useTokenContext } from "../../contexts/TokenContext";
import Spinner from "../Spinner";
import "./style.css";

const EditCommentForm = ({ setShowEditComment, id, setCommenta }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useTokenContext();
  const { setAlert } = useContext(AlertContext);

  return (
    <div className="alertwrapper">
      <form
        className="editcommentform"
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            setLoading(true);

            const res = await fetch(
              `${process.env.REACT_APP_API_URL}/comment/${id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
                },
                body: JSON.stringify({ comment }),
              }
            );

            const body = await res.json();
            if (!res.ok) {
              throw new Error(body.message);
            }
            setCommenta(comment);

            setAlert({ type: "success", msg: body.message });
            setShowEditComment(false);
          } catch (error) {
            console.error(error.message);
            setAlert({ type: "error", msg: error.message });
          } finally {
            setLoading(false);
          }
        }}
      >
        <label htmlFor="comment">Comentario:</label>
        <input
          id="comment"
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        />
        <section>
          <button type="submit">Editar comentario</button>
          <button
            type="button"
            onClick={() => {
              setShowEditComment(false);
            }}
          >
            Cancelar
          </button>
        </section>
        {loading && <Spinner />}
      </form>
    </div>
  );
};

export default EditCommentForm;
