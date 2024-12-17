import React, { useState } from "react";
import "./Journal.css";
import Navbar from "../../Component/Navbar/Navbar"
import Footer from "../../Component/Footer/Footer";

export const Journal = () => {
  const [journalEntry, setJournalEntry] = useState("");

  const handleSave = () => {
    alert("Your journal entry has been saved!");
    setJournalEntry("");
  };

  const handleClear = () => {
    setJournalEntry("");
  };

  return (
    <>
    <Navbar/>
    <div className="journal-container">
      <h1 className="journal-header">Daily Journal</h1>
      <p className="journal-subtext">Express your thoughts and feelings here:</p>
      <textarea
        className="journal-textarea"
        value={journalEntry}
        onChange={(e) => setJournalEntry(e.target.value)}
        placeholder="Write your thoughts here..."
      />
      <div className="journal-actions">
        <button className="journal-button save" onClick={handleSave}>
          Save
        </button>
        <button className="journal-button clear" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
    <Footer/>
    </>
  );
};
