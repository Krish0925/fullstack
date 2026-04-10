function NoteCard({ note, onEdit, onDelete }) {
  const formattedDate = note.created_at
    ? new Date(note.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="note-card">
      <div className="note-card-header">
        <h3 className="note-title">{note.title}</h3>
        {note.category_name && (
          <span className="note-category">{note.category_name}</span>
        )}
      </div>

      <p className="note-content">{note.content}</p>

      <div className="note-footer">
        {formattedDate && <span className="note-date">{formattedDate}</span>}
        <div className="note-actions">
          <button className="btn btn-primary btn-sm" onClick={() => onEdit(note.id)}>
            Edit
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => onDelete(note.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
