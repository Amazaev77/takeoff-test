import { AuthAction, AuthActionTypes, AuthState } from "../types/auth";
import { Dispatch } from "redux";
import axios from "axios";

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  loading: false,
  error: false
}

export default function reducer(state = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionTypes.AUTH_STARTED:
      return { ...state, loading: true, error: false }
    case AuthActionTypes.AUTH_SUCCEEDED:
      return {
        ...state,
        token: action.payload,
        loading: false,
        error: false,
      }
    case AuthActionTypes.AUTH_FAILED:
      return {
        ...state,
        loading: false,
        error: true
      }
    case AuthActionTypes.ON_ERROR:
      return { ...state, error: true }

    case AuthActionTypes.LOG_OUT:
      return {
        ...state,
        token: null
      }
    default:
      return state;
  }
}

export const signIn = (username: string, password: string) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: AuthActionTypes.AUTH_STARTED })
    try {
      const api = 'https://takeoff-test-default-rtdb.firebaseio.com/admin.json'
      const { data } = await axios.get(api)
      // Тут нам пришел бы token с сервера
      const token = '&FG4&%6lse'
      if (username === data.username && password === data.password) {
        dispatch({
          type: AuthActionTypes.AUTH_SUCCEEDED,
          payload: token
        })
        window.localStorage.setItem('token', token)
      } else {
        dispatch({ type: AuthActionTypes.AUTH_FAILED })
      }
    } catch (error) {
      dispatch({ type: AuthActionTypes.AUTH_FAILED })
    }
  }
}

export const onError = () => {
  return { type: AuthActionTypes.ON_ERROR }
}

export const logOut = () => {
  window.localStorage.removeItem('token')
  return { type: AuthActionTypes.LOG_OUT }
}
