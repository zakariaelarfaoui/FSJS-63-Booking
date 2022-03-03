import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Modal({
  title,
  icon,
  iconClassName,
  message,
  headerClassName,
  btnClassName,
  btnContent,
  btnAction,
  setSuccess,
  setError
}) {
  console.log(title);
  return (
    <div className="popup">
      <div className="popup-content">
        <header className={headerClassName}>{title}</header>
        <div className="popup-body">
          <FontAwesomeIcon icon={icon} size="4x" className={iconClassName} />
          <br />
          {message}
        </div>
        <footer className="popup-footer">
          <button
            className={btnClassName}
            onClick={() => {
              setSuccess(false);
              setError(false);
            }}
          >
            {btnContent}
          </button>
        </footer>
      </div>
    </div>
  );
}

export default Modal;
