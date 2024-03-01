import React, {useContext} from 'react';
import NoteContext from '../context/notes/NoteContext';
import './styles/Note.css';

const Note = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { title, description, tag } = props.note;
    const {note, updateNote} = props;
  return (
    <div className='col-md-3'>
        <div className="card my-3">
            <div className="card-body">
                <div className="d-flex align-items-baseline justify-content-between">
                    <h5 className="card-title">{title}</h5> 
                    <div className=''>
                        <i className="fa-regular fa-trash-can mx-1" style={{color: '#7a0060'}} onClick={() => {
                            deleteNote(note._id);
                            props.showAlert("Deleted successfully", "success");
                        }} />
                        <i className="fa-solid fa-pen-to-square mx-1" style={{color: '#7a0060'}} onClick={() => {updateNote(note)}} />
                    </div>
                </div>
                <p className='card-subtitle mb-2 text-body-secondary'>#{tag}</p>

                <p className="card-text" id="desc">{description.length>165? description.slice(0, 165)+'...' : description}</p>
            </div>
        </div>
    </div>
  )
}

export default Note