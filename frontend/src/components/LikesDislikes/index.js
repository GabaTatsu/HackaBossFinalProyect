import { useTokenContext } from "../../contexts/TokenContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import { AlertContext } from "../../contexts/AlertContext";
import "./style.css";
import pulgar from "../../assets/images/pulgar.png";
import pulgarNo from "../../assets/images/pulgarno.png";

const LikesDislikes = (props) => {
  const { likes, dislikes, idLink } = props;
  const [likeDislike, setLikeDislike] = useState("");
  const [newLikes, setNewLikes] = useState(likes);
  const [newDislikes, setNewDislikes] = useState(dislikes);
  const [loading, setLoading] = useState(false);
  const { token } = useTokenContext();
  const { setAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  return (
    <>
      <form
        className="formulariovaloraciones"
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            setLoading(true);
            const res = await fetch(
              `${process.env.REACT_APP_API_URL}/valoraciones/edit/${idLink}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
                },
                body: JSON.stringify({ valoracion: likeDislike }),
              }
            );
            const body = await res.json();

            if (!res.ok) {
              throw new Error(body.message);
            }

            if (body.data.length > 0) {
              if (body.data[0].valoracion === likeDislike) {
                likeDislike === 0 && setNewLikes(newLikes - 1);
                likeDislike === 1 && setNewDislikes(newDislikes - 1);
              } else {
                likeDislike === 0 && setNewLikes(newLikes + 1);
                likeDislike === 0 && setNewDislikes(newDislikes - 1);
                likeDislike === 1 && setNewLikes(newLikes - 1);
                likeDislike === 1 && setNewDislikes(newDislikes + 1);
              }
            } else {
              likeDislike === 0 && setNewLikes(newLikes + 1);
              likeDislike === 1 && setNewDislikes(newDislikes + 1);
            }
            setAlert({ type: "success", msg: body.message });
          } catch (error) {
            console.error(error.message);
            setAlert({ type: "error", msg: error.message });
          } finally {
            setLoading(false);
          }
        }}
      >
        <section>
          {newLikes}
          <button
            type="submit"
            onClick={() => {
              if (token) {
                setLikeDislike(0);
              } else {
                navigate("/user/login");
              }
            }}
          >
            <img src={pulgar} alt="Me gusta"></img>
          </button>
        </section>
        <section>
          {newDislikes}

          <button
            type="submit"
            onClick={() => {
              if (token) {
                setLikeDislike(1);
              } else {
                navigate("/user/login");
              }
            }}
          >
            <img src={pulgarNo} alt="No me gusta"></img>
          </button>
        </section>
      </form>
      {loading && <Spinner />}
    </>
  );
};

export default LikesDislikes;
