import { Google } from '@mui/icons-material'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from '../../hooks/'
import { checkingAuthentication, startGoogleSignIn } from '../../store/auth/'
import { AuthLayout } from '../layout/AuthLayout'

export const LoginPage = () => {
  const dispatch = useDispatch()

  const { email, password, onInputChange } = useForm({
    email: 'ingisraeltrujillo@google.com',
    password: '123456'
  })

  const onSubmit = (e) => {
    e.preventDefault()
    console.log({ email, password })
    dispatch(checkingAuthentication())
  }

  const onGoogleSignIn = () => {
    console.log('google')
    dispatch(startGoogleSignIn())
  }

  return (
    <AuthLayout title='Login'>
      <form onSubmit={onSubmit}>
        <Grid container>

          <Grid item xs={12} md={6} sx={{ mt: 1 }}>
            <TextField
              label='Correo'
              type='email'
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} md={6} sx={{ mt: 1 }}>
            <TextField
              label='Contraseña'
              type='password'
              placeholder='Contraseña'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1 }}>

            <Grid item xs={12} sm={6}>
              <Button type='submit' variant='contained' fullWidth>Login</Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant='contained' fullWidth onClick={(e) => (onGoogleSignIn())}>
                <Google />
                <Typography sx={{ ml: 1 }} variant='p'>Google</Typography>
              </Button>
            </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end'>

            <Link component={RouterLink} color='inherit' to='/auth/register'>
              Crea una cuenta
            </Link>

          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
