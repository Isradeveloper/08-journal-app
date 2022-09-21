import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from '../../hooks'
import { AuthLayout } from '../layout/AuthLayout'

const formData = {
  email: 'ingisraeltrujillo@google.com',
  password: '123456',
  displayName: 'Isra Trujillo'
}

export const RegisterPage = () => {
  const { email, password, displayName, onInputChange, formState, isFormValid, displayNameValid, emailValid, passwordValid } = useForm(formData)

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(formState)
  }

  return (
    <AuthLayout title='Register'>
      <form onSubmit={onSubmit}>
        <Grid container>

          <Grid item xs={12} md={6} sx={{ mt: 1 }}>
            <TextField name='displayName' value={displayName} onChange={onInputChange} label='Nombre completo' type='text' placeholder='Tu nombre' fullWidth />
          </Grid>

          <Grid item xs={12} md={6} sx={{ mt: 1 }}>
            <TextField name='email' value={email} onChange={onInputChange} label='Correo' type='email' placeholder='correo@google.com' fullWidth />
          </Grid>

          <Grid item xs={12} md={6} sx={{ mt: 1 }}>
            <TextField name='password' value={password} onChange={onInputChange} label='Contraseña' type='password' placeholder='Contraseña' fullWidth />
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1 }}>

            <Grid item xs={12} sm={6}>
              <Button type='submit' variant='contained' fullWidth>Register</Button>
            </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Inicia sesión
            </Link>

          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
