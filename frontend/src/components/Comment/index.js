import { useState } from "react";
import { useTokenContext } from "../../contexts/TokenContext";
import AlertDeleteComment from "../AlertDeleteComment";
import Avatar from "../Avatar";
import EditCommentForm from "../EditCommentForm";

const Comment = ({ commentary, comments, setComments }) => {
  const { loggedUser, token } = useTokenContext();
  const [showEditComment, setShowEditComment] = useState(false);
  const { comment, createdAt, username, avatar, id, idUser } = commentary;
  const [commenta, setCommenta] = useState(comment);

  return (
    <>
      <section>
        <p>{createdAt.split("T")[0]}</p>
        <aside>
          <Avatar username={username} avatar={avatar} />
          <p>{username}</p>
        </aside>
      </section>
      <p>{commenta}</p>
      {loggedUser && idUser === loggedUser.id && (
        <section>
          <button
            onClick={() => {
              setShowEditComment(true);
            }}
          >
            Editar
          </button>
          <AlertDeleteComment
            id={id}
            token={token}
            comments={comments}
            setComments={setComments}
          />
        </section>
      )}

      {showEditComment && (
        <EditCommentForm
          setShowEditComment={setShowEditComment}
          id={id}
          setCommenta={setCommenta}
        />
      )}
    </>
  );
};

export default Comment;
