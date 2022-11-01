import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import LikesDislikes from "../LikesDislikes";

const TopFiveLink = ({ topLink, index }) => {
  const { title, link, id, idUser, avatar, likes, dislikes, username } =
    topLink;
  return (
    <article>
      {avatar !== undefined && (
        <Link to={`/user/profile/${idUser}`}>
          <Avatar avatar={avatar} username={username} />
        </Link>
      )}

      <LikesDislikes likes={likes} dislikes={dislikes} idLink={id} />

      <p>Posición:{index}</p>
      <a className="enlacetopcinco" href={link} target="blank">
        {link}
      </a>
      <h3>{title}</h3>
    </article>
  );
};

export default TopFiveLink;
