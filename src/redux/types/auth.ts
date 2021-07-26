export interface AuthState {
  token: string | null
  loading: boolean
  error: boolean
}

export enum AuthActionTypes {
  AUTH_STARTED = "AUTH_STARTED",
  AUTH_SUCCEEDED = "AUTH_SUCCEEDED",
  AUTH_FAILED = "AUTH_FAILED",
  ON_ERROR = "ON_ERROR",
  LOG_OUT = "LOG_OUT"
}

interface AuthStartedAction {
  type: AuthActionTypes.AUTH_STARTED
}

interface AuthSucceededAction {
  type: AuthActionTypes.AUTH_SUCCEEDED,
  payload: string
}

interface AuthFailedAction { type: AuthActionTypes.AUTH_FAILED }

interface OnErrorAction { type: AuthActionTypes.ON_ERROR }

interface LogOut {
  type: AuthActionTypes.LOG_OUT
}

export type AuthAction =
    AuthStartedAction
  | AuthSucceededAction
  | AuthFailedAction
  | OnErrorAction
  | LogOut