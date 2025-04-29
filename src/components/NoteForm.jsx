import React, { useState } from 'react';

function NoteForm({ addNote }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    // Create a new note with the current date and time
    const newNote = {
      title,
      content,
      createdAt: new Date().toISOString() // ISO format is perfect for MongoDB
    };
    
    addNote(newNote);
    setTitle('');
    setContent('');
  };

  return (
    <div className="note-form">
      <h2>Add New Note</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
}

export default NoteForm;