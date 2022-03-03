import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Popup({ faCircleCheck, success, setSuccess }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <header className="popup-head bg-success">Email Confirmation</header>
        <div className="popup-body">
          <FontAwesomeIcon
            icon={faCircleCheck}
            size="4x"
            className="text-success d-block mt-3 mx-auto"
          />
          <br />
          {success}
        </div>
        <footer className="popup-footer">
          <button
            onClick={() => {
              setSuccess(false);
            }}
            className="btn btn-outline-success mt-3"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}

export default Popup;
