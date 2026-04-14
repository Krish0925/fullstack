import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (err) {
      setError("Failed to load notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await API.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (err) {
      setError("Failed to delete note.");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (loading) {
    return (
      <div className="loading-wrapper">
        <Navbar />
        <div className="loading-text">
          <div className="spinner"></div>
          Loading your notes...
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar />

      <div className="page-wrapper">
        <div className="notes-header">
          <div>
            <h1 className="page-title">Your Notes</h1>
            <p className="page-subtitle">All your notes in one place.</p>
            {notes.length > 0 && (
              <span className="notes-count-badge">{notes.length} note{notes.length !== 1 ? "s" : ""}</span>
            )}
          </div>
        </div>

        {error && <div className="message-error">{error}</div>}

        {notes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <h3>No notes yet</h3>
            <p>Create your first note to get started.</p>
            <button className="btn btn-primary" onClick={() => navigate("/create")}>
              + Create Note
            </button>
          </div>
        ) : (
          <div className="notes-grid">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={(id) => navigate(`/edit/${id}`)}
                onDelete={deleteNote}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
