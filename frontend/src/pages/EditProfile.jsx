import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function EditProfile() {
  const [form, setForm] = useState({ email: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile");
        setForm({ email: res.data.email });
      } catch (err) {
        setError("Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.email) {
      setError("Email is required");
      return;
    }

    try {
      await API.put("/users/profile", form);
      setSuccess("Profile updated successfully!");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <div className="loading-wrapper">
        <Navbar />
        <div className="loading-text">
          <div className="spinner"></div>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar />

      <div className="page-wrapper">
        <div className="form-page">
          <div className="form-page-header">
            <h2 className="page-title">Edit Profile</h2>
            <p className="page-subtitle">Update your account information.</p>
          </div>

          {error && <div className="message-error">{error}</div>}
          {success && <div className="message-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>

            <div className="form-actions">
              <button className="btn btn-primary" type="submit">
                Save Changes
              </button>
              <Link to="/profile" className="btn btn-secondary">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
