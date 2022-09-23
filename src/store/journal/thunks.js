import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'
import { addNewEmptyNote, savingNewNote, setActiveNote } from './journalSlice'

/* eslint-disable padded-blocks */
export const startNewNote = () => {
  return async (dispatch, getState) => {

    dispatch(savingNewNote())

    const { uid } = getState().auth
    console.log(uid)
    // uid

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    // Crea la nueva nota en firebase
    const newDoc = doc(collection((FirebaseDB), `${uid}/journal/notes`))
    await setDoc(newDoc, newNote)

    newNote.id = newDoc.id // Se le asigna el id de la nota de firebase al objeto de nueva nota

    // Dispatch

    dispatch(addNewEmptyNote(newNote)) // Se agrega la nota vacía al state
    dispatch(setActiveNote(newNote)) // Al agregar una nota se coloca esta cómo activa
    // Dispatch( activarNote )
    // console.log({ newDoc, setDocResp })
  }
}
