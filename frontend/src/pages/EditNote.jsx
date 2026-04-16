import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function EditNote() {
  const [form, setForm] = useState({ title: "", content: "", category_id: "" });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await API.get(`/notes/${id}`);
        setForm({
          title: res.data.title,
          content: res.data.content,
          category_id: res.data.category_id,
        });
      } catch (err) {
        setError("Unable to load note.");
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await API.get("/categories");
        setCategories(res.data);
      } catch (err) {
        setError("Could not load categories.");
      }
    };

    fetchNote();
    fetchCategories();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.content || !form.category_id) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await API.put(`/notes/${id}`, form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Navbar />

      <div className="page-wrapper">
        <div className="form-page">
          <div className="form-page-header">
            <h2 className="page-title">Edit Note</h2>
            <p className="page-subtitle">Update your note details.</p>
          </div>

          {error && <div className="message-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Note title"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Content</label>
              <textarea
                className="form-control"
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Note content..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-control"
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-actions">
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Update Note"}
              </button>
              <Link to="/dashboard" className="btn btn-secondary">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditNote;
