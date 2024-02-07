import { useState } from 'react'


function Notes() {
const [add, setAdd] = useState(false);
const [editIndex, setEditIndex] = useState(-1);
const [newNote, setnewNote] = useState("")
const [notesItems, setNotesItems] = useState([])

const handleSubmit = (e) => {
e.preventDefault();
if (editIndex !== -1) {
  const updatedNotes = [...notesItems];
  updatedNotes[editIndex] = newNote;
setNotesItems(updatedNotes)
setEditIndex(-1)
}else {
  setNotesItems([...notesItems, newNote]);
}
setAdd(false);
setnewNote("")

};

const handleEdit = (index, note) => {
  if (editIndex === index) {
    // Save the edited note when "Save" is clicked
    const updatedNotes = [...notesItems];
    updatedNotes[index] = newNote;
    setNotesItems(updatedNotes);
    setEditIndex(-1);
  } else {
    // Start editing the note
    setEditIndex(index);
    setnewNote(note);
  }
};


const deleteItem = (id) => {
    const notes = notesItems.filter(note => note!==id);
    setNotesItems(notes);
}
  return (
      <div className='w-screen h-screen flex flex-col items-center'>   
        <h1 className='w-full font-semibold text-center'>NOTES APP</h1>
        <div className='border-2 w-1/2 h-1/2 flex flex-col'>
          <button className={`w-fit self-end mr-5 px-2 py-1 rounded ${add ? "bg-gray-100" : "bg-yellow-200"}`} onClick={()=>setAdd(!add)}>Add note +</button>
          <div className='bg-gray-200 w-full h-full'>
          <ul className='flex flex-col items-center justify-start px-5'>
            {notesItems.map((note, index)=>{
              return <li key={index} className='w-full border-b border-black p-1 flex justify-between '>
                {editIndex === index ? <input type='text' value={newNote} onChange={(e)=>setnewNote(e.target.value)}/> :<p>{note}</p>}
                <div className='flex gap-2'>
                  <button className='text-sm bg-green-600 px-2 rounded' onClick={()=>{handleEdit(index, note)}}>{editIndex===index ? "save" : "edit"}</button>
                  <button className='bg-red-500 text-sm px-2 rounded' onClick={()=>deleteItem(note)}>del</button>
                </div>
              </li>
            })}
          </ul>
          {add ? <form onSubmit={handleSubmit} className='py-2 px-3 '>
                    <input type="text" 
                    value={newNote} 
                    onChange={(e)=>setnewNote(e.target.value)} 
                    placeholder='Enter new note...' 
                    className='w-full px-2 py-1 rounded bg-transparent outline-gray-200'
                    />
                </form> 
          : ""
          }
          </div>
        </div>
      </div>
    )
}

export default Notes
