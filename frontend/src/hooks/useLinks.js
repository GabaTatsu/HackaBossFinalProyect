import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { AlertContext } from "../contexts/AlertContext";

const useLinks = () => {
  const [links, setLinks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/links?${searchParams.toString()}`
        );

        const body = await res.json();
        if (!res.ok) {
          throw new Error(body.message);
        }

        setLinks(body.data);
        setAlert({ type: "success", msg: body.message });
      } catch (error) {
        console.error(error.message);
        setAlert({ type: "error", msg: error.message });
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, [searchParams, setAlert]);
  const deleteLink = (id) => {
    const indexToDelete = links.findIndex((link) => {
      return link.id === id;
    });
    links.splice(indexToDelete, 1);
    setLinks([...links]);
  };
  return {
    links,
    loading,
    deleteLink,
    searchParams,
    setSearchParams,
  };
};

export default useLinks;
