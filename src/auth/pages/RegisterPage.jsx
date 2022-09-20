import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout'

export const RegisterPage = () => {
  return (
    <AuthLayout title='Register'>
      <form>
        <Grid container>

          <Grid item xs={12} md={6} sx={{ mt: 1 }}>
            <TextField label='Nombre completo' type='text' placeholder='Tu nombre' fullWidth />
          </Grid>

          <Grid item xs={12} md={6} sx={{ mt: 1 }}>
            <TextField label='Correo' type='email' placeholder='correo@google.com' fullWidth />
          </Grid>

          <Grid item xs={12} md={6} sx={{ mt: 1 }}>
            <TextField label='Contraseña' type='password' placeholder='Contraseña' fullWidth />
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1 }}>

            <Grid item xs={12} sm={6}>
              <Button variant='contained' fullWidth>Login</Button>
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
