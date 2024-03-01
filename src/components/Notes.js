import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Note from './Note';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
import './styles/Notes.css'

const Notes = (props) => {
  const navigate = useNavigate();
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""});
  
  useEffect(()=>{
    if(localStorage.getItem("token")) getNotes();
    else navigate("/login");
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
  }
  
  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Updated successfully", "success");
  };

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value});
  };

  return (
    <>
    <AddNote showAlert={props.showAlert}/>
    
    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">Launch Modal demo</button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form action='/' method='post' className='my-2'>
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">Title *</label>
                <input type="text" className="form-control" name='etitle' onChange={onChange} value={note.etitle}/>
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Description *</label>
                <input type="text" className="form-control" name='edescription' onChange={onChange} value={note.edescription}/>
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">tag *</label>
                <input type="text" className="form-control" name='etag' onChange={onChange} value={note.etag}/>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn update-btn" onClick={handleClick}>Update Note</button>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div className="row my-3">
      <h2>Your Notes:</h2>
      <div className="container mx-1">{notes.length === 0 && "No notes to display"}</div>
        {notes.map((note) => {
          return <Note key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>
        })}
    </div>
    </>
  )
}

export default Notes;
