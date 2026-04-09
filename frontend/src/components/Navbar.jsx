import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/dashboard" className="navbar-logo">
          NotesApp
        </Link>

        <div className="navbar-actions">
          <Link to="/dashboard" className="btn btn-ghost btn-sm">
            Dashboard
          </Link>

          <Link to="/create" className="btn btn-primary btn-sm">
            + New Note
          </Link>

          <Link to="/profile" className="btn btn-ghost btn-sm">
            Profile
          </Link>

          <button className="btn btn-danger btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
