import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
// import { data } from "./data"
import Split from "react-split"
import {nanoid} from "nanoid"



function App() {
      /**
     * Challenge:
     * 1. Every time the `notes` array changes, save it 
     *    in localStorage. You'll need to use JSON.stringify()
     *    to turn the array into a string to save in localStorage.
     * 2. When the app first loads, initialize the notes state
     *    with the notes saved in localStorage. You'll need to
     *    use JSON.parse() to turn the stringified array back
     *    into a real JS array.
     */

  const [notes, setNotes] = React.useState(
    function(){
      
      return JSON.parse(localStorage.getItem("notes"))||[]
    }
   
  )

  console.log("notes ", notes)



    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )

  //   const [state, setState] = React.useState(
  //     function() { 
  //         return console.log("State initialization")
  //     }
  // )

//   const [state, setState] = React.useState(
    
//     function (){
//       return  console.log("State initialization")
//     }
  
    
// )

  
    
    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }
    

    function updateNote(text) {

      
      // console.log("updateNote notes ", notes)

      setNotes(prevNotes=>{
        const reorderedNotes = [];
        for(let i=0; i< prevNotes.length; i++){
          if(prevNotes[i].id === currentNoteId){
              console.log("notes[i] " , prevNotes[i])
              reorderedNotes.unshift({...prevNotes[i], body:text})
          }else{
              reorderedNotes.push(prevNotes[i])
          }
    }
    return reorderedNotes;



      })
    


      // doesn't reorder
        // setNotes(oldNotes => oldNotes.map(oldNote => {
        //     return oldNote.id === currentNoteId
        //         ? { ...oldNote, body: text}
        //         : oldNote
        // }))
    }





 /**
     * Challenge: complete and implement the deleteNote function
     * 
     * Hints: 
     * 1. What array method can be used to return a new
     *    array that has filtered out an item based 
     *    on a condition?
     * 2. Notice the parameters being based to the function
     *    and think about how both of those parameters
     *    can be passed in during the onClick event handler
     */


    
 function deleteNote(event, noteId) {
    event.stopPropagation()
    setNotes((oldNotes) => oldNotes.filter((note)=>{
        return note.id !== noteId
        }
    
        ) 
    
    )
}






    
    
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }

    

    React.useEffect(()=>{
      localStorage.setItem("notes", JSON.stringify(notes))
     
     

      // console.log("note is " , JSON.stringify(notes[0].body))
    },[notes])

    
    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}

                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                        
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}

export default App