/* eslint-disable no-extra-boolean-cast */
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from '../../hooks'
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'
import { AuthLayout } from '../layout/AuthLayout'

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe de tener una @'],
  password: [(value) => value.length >= 6, 'El password debe de tener más de 6 letras'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligario']
}

export const RegisterPage = () => {
  const { email, password, displayName, onInputChange, formState, isFormValid, displayNameValid, emailValid, passwordValid } = useForm(formData, formValidations)

  const dispatch = useDispatch()
  const { status, errorMessage } = useSelector((state) => state.auth)
  const isCheckingAuthentication = useMemo(() => {
    return status === 'checking'
  }, [status])

  const [formSubmitted, setFormSubmitted] = useState(false)
  // console.log(passwordValid)

  const onSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)

    if (!isFormValid) return
    // console.log(formState)
    dispatch(startCreatingUserWithEmailPassword(formState))
  }

  return (
    <AuthLayout title='Crear cuenta'>
      <h1>FormValid {isFormValid ? 'Valido' : 'Incorrecto'}</h1>
      <form onSubmit={onSubmit}>
        <Grid container>

          <Grid item xs={12} sx={{ mt: 1 }}>
            <TextField
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              label='Nombre completo'
              type='text'
              placeholder='Tu nombre'
              fullWidth
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 1 }}>
            <TextField
              name='email'
              value={email}
              onChange={onInputChange}
              label='Correo'
              type='email' placeholder='correo@google.com'
              fullWidth
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 1 }}>
            <TextField
              name='password'
              value={password}
              onChange={onInputChange}
              label='Contraseña'
              type='password' placeholder='Contraseña'
              fullWidth
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1 }}>

            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>

          </Grid>
          <Grid container spacing={2} sx={{ mt: 1 }}>

            <Grid item xs={12} sm={6}>
              <Button disabled={isCheckingAuthentication} type='submit' variant='contained' fullWidth>Register</Button>
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
