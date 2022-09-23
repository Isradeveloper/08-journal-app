import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'
import { fileUpload } from '../../helpers'
import { loadNotes } from '../../helpers/loadNotes'
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './journalSlice'

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
      date: new Date().getTime(),
      imageUrls: []

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

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {

    const { uid } = getState().auth

    const notes = await loadNotes(uid)

    dispatch(setNotes(notes))
  }
}

export const startSaveNote = () => {
  return async (dispatch, getState) => {

    dispatch(setSaving())

    const { uid } = getState().auth
    const { active: note } = getState().journal

    const noteToFireStore = { ...note }
    delete noteToFireStore.id

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
    await setDoc(docRef, noteToFireStore, { merge: true })

    dispatch(updateNote(note))

  }
}

export const startUploadingFiles = (files = []) => {
  return async (dispatch, getState) => {
    dispatch(setSaving())
    // await fileUpload(files[0])

    const fileUploadPromises = []

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file))
    }

    const filesUrls = await Promise.all(fileUploadPromises)
    // console.log(filesUrls)
    dispatch(setPhotosToActiveNote(filesUrls))
  }
}
