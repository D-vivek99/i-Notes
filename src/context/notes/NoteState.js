import React from 'react';
import NoteContext from './NoteContext.js';
import { useState } from 'react';

const NoteState = (props) => {
  const host = "http://localhost:5000";

    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    // Get all Notes
    const getNotes = async () => {
      const response = await fetch(`${host}/api/notes/fetchall`, 
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          }
      });
      const json = await response.json();
      setNotes(json);
    };


    // Add a note
    const addNote = async ({title, description, tag}) => {
      const response = await fetch(`${host}/api/notes/addnote`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({title, description, tag}),
      });

      const json = await response.json();
      const note = json
      
      setNotes(notes.concat(note));
    }
    

    // Delete a note
    const deleteNote = async (id) => {
      await fetch(`${host}/api/notes/deletenote/${id}`, 
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        }
      });

      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    }
    

    // Edit a note
    const editNote = async (id, title, description, tag) => {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, 
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({title, description, tag}),
      });

      // eslint-disable-next-line
      const json = await response.json();

      // getNotes();

      let newNotes = JSON.parse(JSON.stringify(notes));
      for (let note = 0; note < newNotes.length; note++) {
        const element = newNotes[note];
        if(element._id === id){
          newNotes[note].title = title;
          newNotes[note].description = description;
          newNotes[note].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    }
    
  return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
};

export default NoteState
