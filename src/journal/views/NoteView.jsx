import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { setActiveNote } from '../../store/journal/journalSlice'
import { startSaveNote } from '../../store/journal/thunks'
import { ImageGallery } from '../components'
import Swal from 'sweetalert2'

export const NoteView = () => {
  const { active: note, messageSaved, isSaving } = useSelector((state) => (state.journal))
  const { body, title, date, onInputChange, formState } = useForm(note)
  const dispatch = useDispatch()

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

  return (
    <Grid className='animate__animated animate__fadeInDown animate__fast' container direction='row' justifyContent='space-between' alignItems='center' mb={1}>
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
      </Grid>

      <Grid item>
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
      {/* Image Gallery */}
      <ImageGallery />
    </Grid>
  )
}
