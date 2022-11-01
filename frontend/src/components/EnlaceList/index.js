import Enlaces from "../Enlaces";

const EnlaceList = ({ enlaces, deleteLink }) => {
  return (
    <ul>
      {enlaces.map((enlace) => {
        return (
          <li key={enlace.id}>
            <Enlaces enlace={enlace} deleteLink={deleteLink} />
          </li>
        );
      })}
    </ul>
  );
};

export default EnlaceList;
