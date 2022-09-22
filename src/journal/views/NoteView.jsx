import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { ImageGallery } from '../components'

export const NoteView = () => {
  return (
    <Grid className='animate__animated animate__fadeInDown animate__fast' container direction='row' justifyContent='space-between' alignItems='center' mb={1}>
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>28 de agosto, 2023</Typography>
      </Grid>

      <Grid item>
        <Button color='primary' sx={{ padding: 2 }}>
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
        />
        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='¿Qué sucedió el día de hoy?'
          minRows={5}
        />
      </Grid>
      {/* Image Gallery */}
      <ImageGallery />
    </Grid>
  )
}
