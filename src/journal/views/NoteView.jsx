import { CloudUpload, DeleteOutline, SaveOutlined, UploadFileRounded } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { setActiveNote } from '../../store/journal/journalSlice'
import { startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal/thunks'
import { ImageGallery } from '../components'
import Swal from 'sweetalert2'

export const NoteView = () => {
  const { active: note, messageSaved, isSaving } = useSelector((state) => (state.journal))
  const { body, title, date, onInputChange, formState } = useForm(note)
  const dispatch = useDispatch()
  const fileInputRef = useRef()

  const dateString = useMemo(() => {
    const newDate = new Date(date).toUTCString()
    return newDate
  }, [date])

  useEffect(() => { // Siempre que se edite el formulario, la info se convierte en activa
    dispatch(setActiveNote(formState))
  }, [formState])

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire({
        icon: 'success',
        title: 'Completado',
        text: messageSaved
      })
    }
  }, [messageSaved])

  const onSaveNote = () => {
    dispatch(startSaveNote())
  }

  const onDelete = () => {
    dispatch(startDeletingNote())
  }

  // const myWidget = window.cloudinary.createUploadWidget({
  //   cloudName: 'isradeveloper',
  //   uploadPreset: 'react-journal'
  // }, (error, result) => {
  //   if (!error && result && result.event === 'success') {
  //     console.log('Done! Here is the image info: ', result.info)
  //   }
  // }
  // )

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return
    dispatch(startUploadingFiles(target.files))
  }

  return (
    <Grid className='animate__animated animate__fadeInDown animate__fast' container direction='row' justifyContent='space-between' alignItems='center' mb={1}>
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
      </Grid>

      <Grid item>

        <input
          type='file'
          multiple
          onChange={(e) => {
            // myWidget.open()
            onFileInputChange(e)
          }}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />

        <Button disabled={isSaving} sx={{ padding: 2 }} onClick={(e) => { fileInputRef.current.click() }}>
          <UploadFileRounded sx={{ fontSize: 40, mr: 1, color: 'primary' }} />
          SUBIDA NORMAL
        </Button>

        {/* <Button onClick={(e) => { myWidget.open() }} sx={{ padding: 2 }}>
          <CloudUpload sx={{ fontSize: 40, mr: 1, color: 'primary' }} />
          CLOUDINARY WIDGET
        </Button> */}

        <Button onClick={(e) => onSaveNote()} disabled={isSaving} color='primary' sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 40, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Ingrese un título'
          label='Título'
          sx={{ border: 'none', mb: 1 }}
          name='title'
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='¿Qué sucedió el día de hoy?'
          minRows={5}
          name='body'
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent='end'>
        <Button sx={{ mt: 2, padding: 2 }} onClick={(e) => { onDelete() }}>
          <DeleteOutline color='error' sx={{ fontSize: 40 }} />
          BORRAR NOTA
        </Button>
      </Grid>
      {/* Image Gallery */}
      <ImageGallery images={note.imageUrls} />
    </Grid>
  )
}
