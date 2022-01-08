//     // Giver code is for example how to use useState and create a function here
// import NoteContext from "./noteContext";
// // import { useState } from "react";

// const NoteState = (props)=>{
//     const s1 = {
//         "name": "aman",
//         "class": "javascript"
//     }

//     // const [state, setstate] = useState(s1)

//     // const update = ()=>{
//     //     setTimeout(()=>{
//     //         setstate({
//     //             "name": "Aman",
//     //             "class": "REACT MERN STACK"
//     //         })
//     //     }, 2000)
//     // }
    
//     return(
//         // <NoteContext.Provider value={{state, update}}>
//         <NoteContext.Provider value={s1}>
//             {props.children}
//         </NoteContext.Provider>
//     )
// }

// export default NoteState;

import React, {useState} from 'react'
import NoteContext from "./noteContext";

const NoteState = (props)=>{
  const host  = "http://localhost:5000";
    const noteData = []

      const [Notes, setNotes] = useState(noteData)

      // Get All Notes 
      const getNotes = async ()=>{
        const response = await fetch(`${host}/api/notes/fetchdata`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
        });
        const json = await response.json()
        // console.log(json)
        setNotes(json)
      }

      // Add notes 
      const addNotes = async (title, description, tag)=>{
        console.log('adding the note')
        // APi CALLS
        const response = await fetch(`${host}/api/notes/adddata`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
        const note = await response.json()
        setNotes(Notes.concat(note))


        // // Add notes Logic when it is hard core in any
        // const notes = getNotes()

      }

      // Delete notes 
      const deleteNotes = async (id)=>{
        console.log('deleting the data from id ' + id)
        // API CALLS
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          // body: JSON.stringify(title, description, tag)
        });

        // delete notes logic
        const newNotes = Notes.filter((note)=>{return note._id !== id})
        setNotes(newNotes)
      }

      // Edit Notes 
      const editNotes = async (id, title, description, tag )=>{
        // API CALLS
        const response = await fetch(`${host}/api/notes/updatedata/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
        const json = await response.json()
        
        // Logic for edit notes
        const newNotes = JSON.parse(JSON.stringify(Notes))
        // console.log(newNotes)
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id === id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag
            break;
          }
        }
        setNotes(newNotes)

      }

    return(
        <NoteContext.Provider value={{Notes, addNotes, deleteNotes, editNotes, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;

