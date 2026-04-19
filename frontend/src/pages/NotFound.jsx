import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="notfound-wrapper">
      <div className="notfound-card">
        <div className="notfound-code">404</div>
        <h2 className="notfound-title">Page not found</h2>
        <p className="notfound-text">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/dashboard" className="btn btn-primary">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
