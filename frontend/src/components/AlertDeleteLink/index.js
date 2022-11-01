import alertIcon from "../../assets/images/alertIcon.png";
import { useContext, useState } from "react";
import Spinner from "../Spinner";
import { AlertContext } from "../../contexts/AlertContext";

const AlertDeleteLink = ({ token, deleteLink, id, title }) => {
  const [alertDeleteLink, setAlertDeleteLink] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);
  return (
    <>
      {alertDeleteLink === false && (
        <button
          onClick={() => {
            setAlertDeleteLink(true);
          }}
        >
          Borrar
        </button>
      )}
      {alertDeleteLink === true && (
        <div className="alertwrapper">
          <article className="alertdelete">
            <img src={alertIcon} alt="Alert icon" />
            <section>
              <p>¿Seguro que quieres borrar el enlace con título: {title}?</p>
              <aside>
                <button
                  onClick={async (event) => {
                    try {
                      event.preventDefault();
                      setLoading(true);
                      const res = await fetch(
                        `${process.env.REACT_APP_API_URL}/links/delete/${id}`,
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
                      deleteLink(id);
                      setAlert({ type: "success", msg: body.message });
                      setAlertDeleteLink(false);
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
                    setAlertDeleteLink(false);
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

export default AlertDeleteLink;
