import { useContext, useRef, useState } from "react";
import { useTokenContext } from "../../contexts/TokenContext";
import Avatar from "../Avatar/index";
import shownIcon from "../../assets/images/shown.png";
import dontShownIcon from "../../assets/images/dontshown.png";
import Spinner from "../Spinner";
import { AlertContext } from "../../contexts/AlertContext";
import "./style.css";

const EditUserForm = ({ user, setUser, setShowEditForm }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newAvatarPreview, setNewAvatarPreview] = useState("");
  const newAvatarRef = useRef();
  const { token } = useTokenContext();
  const { setAlert } = useContext(AlertContext);
  const [oldShown, setOldShown] = useState(false);
  const [newShown, setNewShown] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <form
      className="edituserform"
      onSubmit={async (event) => {
        try {
          event.preventDefault();
          setLoading(true);
          const file = newAvatarRef.current.files[0];
          let body;

          if (file || username || email || oldPass || newPass) {
            const formData = new FormData();

            formData.append("avatar", file);
            formData.append("username", username);
            formData.append("email", email);
            formData.append("oldPass", oldPass);
            formData.append("newPass", newPass);
            const res = await fetch(
              `${process.env.REACT_APP_API_URL}/users/edit`,
              {
                method: "PUT",
                headers: {
                  Authorization: token,
                },
                body: formData,
              }
            );

            body = await res.json();

            if (!res.ok) {
              throw new Error(body.message);
            }

            setUser({
              ...user,
              username: username || user.username,
              email: email || user.email,
              password: newPass || user.password,
              avatar: body.data || user.avatar,
            });
          }

          if (!body) {
            throw new Error("No se ha modificado ningún dato");
          }
          setShowEditForm(false);
          setAlert({ type: "success", msg: body.message });
        } catch (error) {
          console.error(error.message);
          setAlert({ type: "error", msg: error.message });
        } finally {
          setLoading(false);
        }
      }}
    >
      <label htmlFor="avatar">
        {!newAvatarPreview && (
          <Avatar avatar={user.avatar} username={user.username} />
        )}
        {newAvatarPreview && (
          <img src={newAvatarPreview} alt={username || user.username} />
        )}
      </label>
      <input
        id="avatar"
        type="file"
        hidden
        ref={newAvatarRef}
        onChange={() => {
          const file = newAvatarRef.current.files[0];
          setNewAvatarPreview(URL.createObjectURL(file));
        }}
      />
      <aside>
        <label htmlFor="username">Nombre de usuario:</label>
        <input
          id="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          placeholder={user.username}
        />

        <label htmlFor="email">Correo electrónico:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder={user.email}
        />
        <p>
          <label htmlFor="oldPass">Vieja contraseña:</label>
          <input
            id="oldPass"
            type={oldShown ? "text" : "password"}
            autoComplete="off"
            value={oldPass}
            onChange={(event) => {
              setOldPass(event.target.value);
            }}
          />

          <button
            type="button"
            onClick={() => {
              setOldShown(!oldShown);
            }}
          >
            {oldShown && <img src={shownIcon} alt="Ver contraseña" />}
            {!oldShown && <img src={dontShownIcon} alt="No ver contraseña" />}
          </button>
        </p>
        <p>
          <label htmlFor="newPass">Nueva contraseña:</label>
          <input
            id="newPass"
            type={newShown ? "text" : "password"}
            autoComplete="off"
            value={newPass}
            onChange={(event) => {
              setNewPass(event.target.value);
            }}
          />

          <button
            type="button"
            onClick={() => {
              setNewShown(!newShown);
            }}
          >
            {newShown && <img src={shownIcon} alt="Ver contraseña" />}
            {!newShown && <img src={dontShownIcon} alt="No ver contraseña" />}
          </button>
        </p>
        <button type="submit">Guardar Cambios</button>
        {loading && <Spinner />}
      </aside>
    </form>
  );
};
export default EditUserForm;
