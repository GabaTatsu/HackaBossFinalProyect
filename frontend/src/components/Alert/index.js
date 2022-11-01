import successIcon from "../../assets/images/success-icon.png";
import errorIcon from "../../assets/images/error.png";
import { useContext, useEffect } from "react";
import { AlertContext } from "../../contexts/AlertContext";

const Alert = () => {
  const { alert, setAlert } = useContext(AlertContext);
  const { type, msg } = alert;

  useEffect(() => {
    if (alert.msg) {
      const timeoutID = setTimeout(() => {
        setAlert({ type: "", msg: "" });
      }, 4000);

      return () => {
        clearTimeout(timeoutID);
      };
    }
  }, [alert, setAlert]);

  return (
    <>
      {msg && (
        <section className={`alert ${type}`}>
          {type === "success" && <img src={successIcon} alt="success icon" />}
          {type === "error" && <img src={errorIcon} alt="error icon" />}

          <p>{msg}</p>
        </section>
      )}
    </>
  );
};

export default Alert;
