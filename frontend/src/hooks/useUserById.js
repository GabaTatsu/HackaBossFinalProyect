import { useState, useEffect } from "react";

const useUserById = (userId) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [userLinks, setUserLinks] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/users/${userId}`
        );

        const body = await res.json();

        if (!res.ok) {
          throw new Error(body.message);
        }

        setUser(body.data);
        setUserLinks(body.data.userLinks);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const deleteLink = (id) => {
    const indexToDelete = userLinks.findIndex((link) => {
      return link.id === id;
    });
    userLinks.splice(indexToDelete, 1);
    setUserLinks([...userLinks]);
  };

  return { user, setUser, loading, userLinks, deleteLink };
};
export default useUserById;
