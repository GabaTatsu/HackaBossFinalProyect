import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import { useTokenContext } from "../../contexts/TokenContext";
import LikesDislikes from "../LikesDislikes";
import AlertDeleteLink from "../AlertDeleteLink";
import "./style.css";
import EditLinkForm from "../EditLinkForm";
import { useState } from "react";
import CommentComponent from "../CommentComponent";

const Enlaces = ({ enlace, deleteLink }) => {
  const { token, loggedUser } = useTokenContext();
  const {
    title,
    description,
    link,
    createdAt,
    id,
    idUser,
    username,
    avatar,
    likes,
    dislikes,
  } = enlace;
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editLink, setEditLink] = useState(link);

  return (
    <article className="enlaceListLanding">
      <h3>{editTitle}</h3>
      <section>
        <aside>
          <p>Descripción:</p>
          <p>{editDescription}</p>
          <a href={editLink} target="blank">
            {editLink}
          </a>
        </aside>
        <aside>
          <LikesDislikes likes={likes} dislikes={dislikes} idLink={id} />
          {idUser === loggedUser.id && (
            <>
              <AlertDeleteLink
                token={token}
                id={id}
                deleteLink={deleteLink}
                title={title}
              />
              <EditLinkForm
                id={id}
                token={token}
                setEditTitle={setEditTitle}
                setEditDescription={setEditDescription}
                setEditLink={setEditLink}
              />
            </>
          )}
        </aside>
        <aside>
          <p>{createdAt.split("T")[0]}</p>
          {username && (
            <Link
              to={`/user/profile/${idUser}`}
              style={{
                textDecoration: "none",
              }}
            >
              {username}
            </Link>
          )}
          {avatar !== undefined && (
            <Link to={`/user/profile/${idUser}`}>
              <Avatar avatar={avatar} username={username} />
            </Link>
          )}
        </aside>
      </section>
      <section>
        <CommentComponent idLink={id} />
      </section>
    </article>
  );
};

export default Enlaces;
