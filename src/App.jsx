import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all notes
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://notes-app-backend-orum.onrender.com/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new note
  const addNote = async (note) => {
    setLoading(true);
    try {
      await axios.post('https://notes-app-backend-orum.onrender.com/notes', note);
      fetchNotes(); // Refresh the list
    } catch (error) {
      console.error('Error adding note:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`https://notes-app-backend-orum.onrender.com/notes/${id}`);
      fetchNotes(); // Refresh the list
    } catch (error) {
      console.error('Error deleting note:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="App">
      <h1>Mini Notes App</h1>
      <NoteForm addNote={addNote} />
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <NotesList notes={notes} deleteNote={deleteNote} />
      )}
    </div>
  );
}

export default App;
