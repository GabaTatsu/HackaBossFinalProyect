import { useState } from "react";
import { useParams } from "react-router-dom";
import AlertDeleteUser from "../../components/AlertDeleteUser";
import Avatar from "../../components/Avatar";
import EditUserForm from "../../components/EditUserForm";
import EnlaceList from "../../components/EnlaceList";
import Spinner from "../../components/Spinner";
import { useTokenContext } from "../../contexts/TokenContext";
import useUserById from "../../hooks/useUserById";
import "./style.css";

const ProfilePage = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  const { loggedUser } = useTokenContext();
  const { userId } = useParams();
  const { user, setUser, loading, deleteLink, userLinks } = useUserById(userId);
  const { email, username, avatar, createdAt } = user;

  return (
    <article className="profilepage">
      <h2>Perfil de usuario</h2>

      {username && (
        <section className="profileform">
          {!showEditForm && (
            <>
              <Avatar avatar={avatar} username={username} />
              <aside>
                <p>Usuario: {username}</p>
                <p>Correo electrónico: {email}</p>
                <p>Creado: {createdAt.split("T")[0]}</p>
              </aside>
            </>
          )}
          <aside>
            {showEditForm && (
              <EditUserForm
                user={user}
                setShowEditForm={setShowEditForm}
                setUser={setUser}
              />
            )}
            {loading && <Spinner />}

            {loggedUser.id === +userId && (
              <>
                <button
                  onClick={() => {
                    setShowEditForm(!showEditForm);
                  }}
                >
                  {!showEditForm && "Editar"}
                  {showEditForm && "Dejar de editar"}
                </button>
                <AlertDeleteUser />
              </>
            )}
          </aside>
        </section>
      )}

      {userLinks && (
        <section className="userlinks">
          <h2>Enlaces del usuario</h2>

          {userLinks.length > 0 && (
            <EnlaceList enlaces={userLinks} deleteLink={deleteLink} />
          )}
          {userLinks.length === 0 && (
            <p>Este usuario aún no ha subido enlaces</p>
          )}
        </section>
      )}
    </article>
  );
};

export default ProfilePage;
