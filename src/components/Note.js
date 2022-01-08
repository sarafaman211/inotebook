import React, { useContext, useEffect, useState, useRef } from 'react';
import NoteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNotes from './AddNotes';
import { useHistory } from 'react-router-dom';

const Note = () => {
    let index = 0
    let history = useHistory()
    const context = useContext(NoteContext);
    const { Notes, getNotes, editNotes } = context
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }else{
            history.push("/Login")
        }
    }, [])

    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    const ref = useRef(null)
    const refClose = useRef(null)

    const updateNote = (currentNote)=>{
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
        // console.log(currentNote)
    }

    const onUpdate = (e)=>{
        // console.log('updating the note', note)
        e.preventDefault()
        editNotes(note.id, note.etitle, note.edescription, note.etag)
        ref.current.click();

    }
    return (
        <>
            <AddNotes />

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" onChange={onChange} value={note.etitle} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={onUpdate} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row my-5">
                <h1 className='heading'>Your <span className="text-primary">Notes</span></h1>
                <div className="container">
                {Notes.length === 0 && "No notes available right now"}
                </div>
                {Notes.map((notes) => {
                    return <Noteitem key={index++} id={notes._id} title={notes.title} updateNote={updateNote} note={notes} description={notes.description} tag={notes.tag} />
                })}
            </div>
        </>
    )
}

export default Note;