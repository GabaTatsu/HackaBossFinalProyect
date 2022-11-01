import { useContext, useState } from "react";
import arrowOpen from "../../assets/images/arrowOpen.png";
import arrowClose from "../../assets/images/arrowClose.png";
import CommentList from "../CommentList";
import Spinner from "../Spinner";
import { AlertContext } from "../../contexts/AlertContext";

const CommentComponent = ({ idLink }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);

  return (
    <>
      <h4>Comentarios:</h4>
      <button
        onClick={async (event) => {
          try {
            event.preventDefault();
            setShowComments(true);
            setLoading(true);

            const res = await fetch(
              `${process.env.REACT_APP_API_URL}/comment/${idLink}`
            );

            const body = await res.json();
            if (!res.ok) {
              throw new Error(body.message);
            }

            setComments(body.data);
            setAlert({ type: "success", msg: body.message });
          } catch (error) {
            console.error(error.message);
            setAlert({ type: "error", msg: error.message });
          } finally {
            setLoading(false);
          }
        }}
      >
        {!showComments && <img src={arrowOpen} alt="Abrir comentarios"></img>}
      </button>
      <button
        onClick={() => {
          setShowComments(false);
        }}
      >
        {showComments && <img src={arrowClose} alt="Cerrar comentarios"></img>}
      </button>
      {showComments && (
        <CommentList
          comments={comments}
          idLink={idLink}
          setComments={setComments}
        />
      )}
      {loading && <Spinner />}
    </>
  );
};
export default CommentComponent;
