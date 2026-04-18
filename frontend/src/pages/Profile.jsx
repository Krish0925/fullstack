import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Profile() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ total_notes: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [profileRes, statsRes] = await Promise.all([
          API.get("/users/profile"),
          API.get("/users/stats"),
        ]);
        setUser(profileRes.data);
        setStats(statsRes.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="loading-wrapper">
        <Navbar />
        <div className="loading-text">
          <div className="spinner"></div>
          Loading profile...
        </div>
      </div>
    );
  }

  const initials = user?.email
    ? user.email.charAt(0).toUpperCase()
    : "?";

  return (
    <div className="app-container">
      <Navbar />

      <div className="page-wrapper">
        <div className="profile-header">
          <div className="profile-avatar">{initials}</div>
          <h1 className="page-title">My Profile</h1>
          <p className="page-subtitle">Manage your account information.</p>
        </div>

        <div className="profile-container">
          <div className="profile-card">
            <div className="profile-card-title">Account Details</div>
            <div className="profile-info">
              <div className="info-row">
                <label>Email</label>
                <span>{user?.email}</span>
              </div>

              <div className="info-row">
                <label>Member Since</label>
                <span>
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "—"}
                </span>
              </div>

              <div className="info-row">
                <label>Total Notes</label>
                <span className="stat-badge">{stats.total_notes}</span>
              </div>
            </div>

            <div className="profile-actions">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/edit-profile")}
              >
                Edit Profile
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/change-password")}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
