import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="app-container">
      <div className="landing-page">
        <div className="landing-header">
          <span className="landing-badge">✦ Personal Notes App</span>
          <h1 className="landing-title">
            Your thoughts,<br />organized beautifully
          </h1>
          <p className="landing-subtitle">
            Create, organize, and manage your notes with ease. Keep everything in one secure place.
          </p>
          <div className="landing-cta">
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started Free
            </Link>
            <Link to="/login" className="btn btn-outline btn-lg" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}>
              Sign In
            </Link>
          </div>
        </div>

        <div className="features-container">
          <div className="feature-card">
            <span className="feature-icon">📝</span>
            <h3>Create Notes</h3>
            <p>Quickly capture thoughts and ideas with a clean writing experience.</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">🏷️</span>
            <h3>Organize</h3>
            <p>Categorize your notes to keep everything structured and easy to find.</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">✏️</span>
            <h3>Edit Anytime</h3>
            <p>Update your notes whenever you need. Changes save instantly.</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">🔒</span>
            <h3>Secure Account</h3>
            <p>Your notes are private and protected with secure authentication.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
