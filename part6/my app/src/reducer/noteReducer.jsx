import { createSlice } from '@reduxjs/toolkit'
import noteServices from '../services/notes'





const NoteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {

    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note =>
        note.id !== id ? note : changedNote
      )

    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    }

  },
})

export const initialiseNotes = () => {
  return async dispatch => {
    const notes = await noteServices.getAll()
    dispatch(setNotes(notes))
  }
}
export const createNote = content => {
  return async dispatch => {
    const newNote = await noteServices.createNew(content)
    dispatch(appendNote(newNote))
  }
}

export const { toggleImportanceOf, appendNote, setNotes } = NoteSlice.actions
export default NoteSlice.reducer