import { useState, useEffect, useContext } from "react";
import { AlertContext } from "../contexts/AlertContext";

const useTopLinks = () => {
  const { setAlert } = useContext(AlertContext);
  const [topLinks, setTopLinks] = useState([]);
  const [loadingTopLinks, setLoadingTopLinks] = useState(true);

  useEffect(() => {
    const fetchTopLinks = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/links/topfive`
        );

        const body = await res.json();
        if (!res.ok) {
          throw new Error(body.message);
        }

        setTopLinks(body.data);
        setAlert({ type: "success", msg: body.message });
      } catch (error) {
        console.error(error.message);
        setAlert({ type: "error", msg: error.message });
      } finally {
        setLoadingTopLinks(false);
      }
    };

    fetchTopLinks();
  }, [setAlert]);

  return {
    topLinks,
    loadingTopLinks,
  };
};

export default useTopLinks;
