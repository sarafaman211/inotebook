import React, {useContext, useState} from 'react'
import NoteContext from '../context/notes/noteContext'

const AddNotes = ()=>{
    const context = useContext(NoteContext)
    const {addNotes} = context;

    const [notes, setNotes] = useState({title: "", description: "", tag: ""})
    
    const onChange = (e)=>{
        setNotes({...notes, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        addNotes(notes.title, notes.description, notes.tag);
        setNotes({title: "", description: "", tag: ""})
    }

    return(
        <div className="my-3">
        <h1 className="heading">Add A Note</h1>
        <form>
        <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" onChange={onChange} value={notes.title} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={notes.description} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={notes.tag} />
            </div>
            <button disabled={notes.title.length < 3 || notes.description.length < 5} type="submit" onClick={handleSubmit} className="btn btn-primary">Add Note</button>
        </form>
    </div>
    )
}

export default AddNotes;