import React, {useContext} from 'react';
import NoteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context =  useContext(NoteContext)
    const {deleteNotes} = context
    const { id,  title, description, note, updateNote } = props;
    return (
                <div className="col-md-3 my-2">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <i className="far fa-trash-alt" onClick={()=>{deleteNotes(id)}}></i>
                            <i className="far fa-edit" onClick={()=>{updateNote(note)}}></i>
                        </div>
                    </div>
                </div>         
    )
}

export default Noteitem;