import React from 'react';

function NotesList({ notes, deleteNote }) {
  if (notes.length === 0) {
    return <p>No notes yet. Add one!</p>;
  }

  // Function to format date nicely
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="notes-list">
      <h2>Your Notes</h2>
      {notes.map((note) => (
        <div key={note._id} className="note-card">
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <div className="note-footer">
            <small>
              {formatDate(note.createdAt)}
            </small>
            <button 
              className="delete-btn"
              onClick={() => deleteNote(note._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotesList;