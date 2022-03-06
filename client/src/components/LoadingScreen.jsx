
function LoadingScreen() {
  return (
    <section className="loading d-flex justify-content-center align-items-center vw-100 vh-100">
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </section>
  );
}

export default LoadingScreen