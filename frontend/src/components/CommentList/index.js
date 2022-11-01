import { useState } from "react";
import { useTokenContext } from "../../contexts/TokenContext";
import Comment from "../Comment";
import NewCommentForm from "../NewCommentForm";
import "./style.css";

const CommentList = ({ comments, idLink, setComments }) => {
  const { loggedUser } = useTokenContext();
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);

  return (
    <>
      {loggedUser && (
        <button
          onClick={() => {
            setShowNewCommentForm(true);
          }}
        >
          Nuevo comentario
        </button>
      )}
      {showNewCommentForm && (
        <NewCommentForm
          setShowNewCommentForm={setShowNewCommentForm}
          idLink={idLink}
          setComments={setComments}
          comments={comments}
        />
      )}
      <article>
        <ul className="listadocomentarios">
          {comments.map((commentary) => {
            return (
              <li key={commentary.id}>
                <Comment
                  commentary={commentary}
                  comments={comments}
                  setComments={setComments}
                />
              </li>
            );
          })}
        </ul>
        {comments.length < 1 && <p>No existen comentarios para este enlace</p>}
      </article>
    </>
  );
};

export default CommentList;
