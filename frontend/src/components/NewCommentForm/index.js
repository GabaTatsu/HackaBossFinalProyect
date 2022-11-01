import { useContext, useState } from "react";
import { AlertContext } from "../../contexts/AlertContext";
import { useTokenContext } from "../../contexts/TokenContext";
import Spinner from "../Spinner";

const NewCommentForm = ({
  setShowNewCommentForm,
  idLink,
  setComments,
  comments,
}) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const { token } = useTokenContext();

  return (
    <>
      <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            setLoading(true);

            const res = await fetch(
              `${process.env.REACT_APP_API_URL}/comment/new`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
                },
                body: JSON.stringify({ comment, idLink }),
              }
            );

            const body = await res.json();
            if (!res.ok) {
              throw new Error(body.message);
            }
            const newComment = body.data[0];
            setComments([newComment, ...comments]);

            setAlert({ type: "success", msg: body.message });
            setShowNewCommentForm(false);
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
        <button type="submit">Añadir comentario</button>
        <button
          type="button"
          onClick={() => {
            setShowNewCommentForm(false);
          }}
        >
          Cancelar
        </button>
      </form>
      {loading && <Spinner />}
    </>
  );
};
export default NewCommentForm;
