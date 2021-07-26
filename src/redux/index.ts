import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import auth from './ducks/auth';
import contacts from './ducks/contacts';


const rootReducer = combineReducers({ auth, contacts })

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof rootReducer>