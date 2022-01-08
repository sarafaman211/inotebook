// Example
// import React, {useContext, useEffect} from 'react';
// import NoteContext from '../context/notes/noteContext';

// function About(){
//     const a = useContext(NoteContext);
// // Exampole how to update context api and use other methods
//     // useEffect(()=>{
//     //     a.update()
//     // }, [])
//     return(
//         <div>
//             {/* this is about {a.state.name} and learn about {a.state.class} */}
//             {a.name} {a.class}
//         </div>
//     )
// }

// export default About;


import React from "react";

function About (){
    return(
        <div>
            This is about page
        </div>
    )
}

export default About;