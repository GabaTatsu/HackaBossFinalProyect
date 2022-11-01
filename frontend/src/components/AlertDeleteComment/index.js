import alertIcon from "../../assets/images/alertIcon.png";
import { useContext, useState } from "react";
import Spinner from "../Spinner";
import { AlertContext } from "../../contexts/AlertContext";

const AlertDeleteComment = ({ token, id, comments, setComments }) => {
  const [alertDeleteComment, setAlertDeleteComment] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);
  return (
    <>
      {alertDeleteComment === false && (
        <button
          onClick={() => {
            setAlertDeleteComment(true);
          }}
        >
          Borrar
        </button>
      )}
      {alertDeleteComment === true && (
        <div className="alertwrapper">
          <article className="alertdelete">
            <img src={alertIcon} alt="Alert icon" />
            <section>
              <p>¿Seguro que quieres borrar el comentario?</p>
              <aside>
                <button
                  onClick={async (event) => {
                    try {
                      event.preventDefault();
                      setLoading(true);
                      const res = await fetch(
                        `${process.env.REACT_APP_API_URL}/comment/delete/${id}`,
                        {
                          method: "DELETE",
                          headers: {
                            Authorization: token,
                          },
                        }
                      );
                      const body = await res.json();

                      if (!res.ok) {
                        throw new Error(body.message);
                      }
                      const indexToDelete = comments.findIndex((comment) => {
                        return comment.id === id;
                      });
                      comments.splice(indexToDelete, 1);
                      setComments([...comments]);

                      setAlert({ type: "success", msg: body.message });
                      setAlertDeleteComment(false);
                    } catch (error) {
                      console.error(error.message);
                      setAlert({ type: "error", msg: error.message });
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  Borrar
                </button>
                <button
                  onClick={() => {
                    setAlertDeleteComment(false);
                  }}
                >
                  Cancelar
                </button>
              </aside>
            </section>
            {loading && <Spinner />}
          </article>
        </div>
      )}
    </>
  );
};

export default AlertDeleteComment;
