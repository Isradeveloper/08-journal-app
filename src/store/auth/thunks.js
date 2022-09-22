/* eslint-disable padded-blocks */
import { LoginWithEmailPassword, registerUserWithEmailPassword, signInWithGoogle } from '../../firebase/providers'
import { checkingCredentials, login, logout } from './authSlice'

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
  }
}

export const startGoogleSignIn = () => {
  return async (dispatch) => {

    dispatch(checkingCredentials())

    const result = await signInWithGoogle()
    console.log({ result })

    if (!result.ok) return dispatch(logout(result))
    dispatch(login(result))
  }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

  return async (dispatch) => {
    dispatch(checkingCredentials())
    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName })

    if (!ok) return dispatch(logout({ errorMessage }))
    dispatch(login({ uid, displayName, email, photoURL }))
  }
}

export const startLoginWithEmailPassword = ({ email, password }) => {

  return async (dispatch) => {
    dispatch(checkingCredentials())

    const result = await LoginWithEmailPassword({ email, password })

    if (!result.ok) return dispatch(logout(result))
    dispatch(login(result))
  }
}
