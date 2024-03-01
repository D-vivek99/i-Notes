import React, {useContext, useState} from 'react';
import NoteContext from '../context/notes/NoteContext';
import './styles/AddNote.css';

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const {addNote} = context;

  const [note, setNote] = useState({title: "", description: "", tag: ""});
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note);
    props.showAlert("Added successfully", "success")
    setNote({title: "", description: "", tag: ""});
  };

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value});
  };

  return (
    <div className="container my-1">
      <h2>Add a Note</h2>
      <form action='/' method='post' className='my-2'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title <span className='text-secondary' id="input-restriction3">(min. 3 characters)</span></label>
          <input type="text" className="form-control" name='title' onChange={onChange} value={note.title} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description <span className='text-secondary' id="input-restriction5">(min. 5 characters)</span></label>
          <input type="text" className="form-control" name='description' onChange={onChange} value={note.description} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" name='tag' onChange={onChange} value={note.tag}/>
        </div>
        <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary btn-sm" onClick={handleClick}>Submit</button>
      </form>
    </div>
  )
}

export default AddNote
