import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './Journal.css';
import Sidebar from '../../Dashboard/Sidebar';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Journal = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [journalList, setJournalList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [singleJournal, setSingleJournal] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: '', severity: '' });
  };

  const fetchJournalList = async () => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch('https://mental-health-assistant-backend.onrender.com/api/journal/list', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setJournalList(data.journals || []);
      } else {
        setSnackbar({ open: true, message: data.message || 'Failed to fetch journal list.', severity: 'error' });
      }
    } catch (err) {
      setSnackbar({ open: true, message: 'Error fetching journal list.', severity: 'error' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleJournal = async (journalId) => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`https://mental-health-assistant-backend.onrender.com/api/journal/single/${journalId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setSingleJournal(data.journal);
      } else {
        setSnackbar({ open: true, message: data.message || 'Failed to fetch journal details.', severity: 'error' });
      }
    } catch (err) {
      setSnackbar({ open: true, message: 'Error fetching journal details.', severity: 'error' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJournalList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setSnackbar({ open: true, message: 'Title and content are required.', severity: 'warning' });
      return;
    }

    setSaving(true);

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch('https://mental-health-assistant-backend.onrender.com/api/journal/write', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ title, content }),
      });
      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setSnackbar({ open: true, message: data.message || 'Journal saved successfully!', severity: 'success' });
        setTitle('');
        setContent('');
        fetchJournalList();
      } else {
        setSnackbar({ open: true, message: data.message || 'Error saving journal.', severity: 'error' });
      }
    } catch (err) {
      setSnackbar({ open: true, message: 'Error saving journal.', severity: 'error' });
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
    <div className="journal-container">
        <Sidebar />
      <div className="journal-form">
        {/* Right container */}
        <div className="journal-post-container">
          <h2>Write a daily Journal</h2><br />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">What would you like to title this journal entry?</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={saving}
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">how are you feeling?</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                disabled={saving}
              />
            </div>
            <button type="submit" className="btn" disabled={saving}>
              {saving ? 'Saving...' : 'Save Journal'}
            </button>
          </form>
        </div>
        </div>
        {/* Left container */}
        <div className="journal-list-container">
          <h3>Your Journal Entries</h3>
          {singleJournal && (
          <div className="single-journal" style={{ position: 'relative' }}>
            <div className="journal-header">
              <h3>Journal Details</h3>
              <button 
                className="close-button" 
                onClick={() => setSingleJournal(null)}
                aria-label="Close Journal"
              >
                ✕
              </button>
            </div>
            <h4>{singleJournal.title}</h4>
            <p>{singleJournal.content}</p>
          </div>
        )}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="journal-list">
              {journalList.length > 0 ? (
                journalList.map((journal) => (
                  <li key={journal.id} onClick={() => fetchSingleJournal(journal.id)}>
                    <h4> {journal.title}</h4>
                    <p>{journal.content.substring(0, 50)}...</p>
                  </li>
                ))
              ) : (
                <p>No journals available.</p>
              )}
            </ul>
          )}

        </div>
      </div>
      

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Journal;
