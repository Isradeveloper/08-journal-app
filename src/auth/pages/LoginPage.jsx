/* eslint-disable no-extra-boolean-cast */
import { Google } from '@mui/icons-material'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from '../../hooks/'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/'
import { AuthLayout } from '../layout/AuthLayout'

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const dispatch = useDispatch()

  const FormData = {
    email: '',
    password: ''
  }

  const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe de tener una @'],
    password: [(value) => value.length >= 6, 'El password debe de tener más de 6 letras']
  }
  const { email, password, onInputChange, isFormValid, emailValid, passwordValid } = useForm(FormData, formValidations)

  // console.log(formState)

  const onSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    // console.log({ email, password })
    // dispatch(checkingAuthentication())
    if (!isFormValid) return
    dispatch(startLoginWithEmailPassword({ email, password }))
  }

  const onGoogleSignIn = () => {
    // console.log('google')
    dispatch(startGoogleSignIn())
  }

  return (
    <AuthLayout title='Login'>
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__fast'>
        <Grid container>

          <Grid item xs={12} sx={{ mt: 1 }}>
            <TextField
              label='Correo'
              type='email'
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 1 }}>
            <TextField
              label='Contraseña'
              type='password'
              placeholder='Contraseña'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1 }}>

            <Grid
              item
              xs={12}
              display={!!errorMessage ? '' : 'none'}
            >
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticating} type='submit' variant='contained' fullWidth>Login</Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticating} variant='contained' fullWidth onClick={(e) => (onGoogleSignIn())}>
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
