import { ContactsAction, ContactsActionTypes, ContactsState } from "../types/contacts";
import { Dispatch } from "redux";
import axios from "axios";
import { RootState } from "../index";

const initialState: ContactsState = {
  contacts: [],
  removeItems: [],
  loading: true,
  editing: false,
  removing: false,
  adding: false,
  error: false,
  searchValue: ''
}

export default function reducer(state = initialState, action: ContactsAction): ContactsState {
  switch (action.type) {
    case ContactsActionTypes.LOAD_CONTACTS_STARTED:
      return { ...state, loading: true, error: false }

    case ContactsActionTypes.LOAD_CONTACTS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        contacts: action.payload
      }
    case ContactsActionTypes.LOAD_CONTACTS_FAILED:
      return { ...state, loading: false, error: true }

    case ContactsActionTypes.EDIT_CONTACT_STARTED:
      return { ...state, editing: true, error: false }

    case ContactsActionTypes.EDIT_CONTACT_SUCCEEDED:
      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          if (contact.id === action.payload.id) {
            return action.payload
          }
          return contact
        }),
        editing: false
      }

    case ContactsActionTypes.REMOVE_CONTACT_STARTED:
      return { ...state, removing: true, error: false }

    case ContactsActionTypes.REMOVE_CONTACT_SUCCEEDED:
      return {
        ...state,
        contacts: state.contacts.filter((contact) => {
          const isToRemove = state.removeItems.some(id => id === contact.id)
          return !isToRemove
        }),
        removing: false,
        removeItems: []
      }

    case ContactsActionTypes.ADD_CONTACT_STARTED:
      return { ...state, adding: true, error: false }

    case ContactsActionTypes.ADD_CONTACT_SUCCEEDED:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        adding: false
      }

    case ContactsActionTypes.ADD_REMOVE_ITEM:
      const isExistId = state.removeItems.some((id) => id === action.payload)
      if (isExistId) {
        return {
          ...state,
          removeItems: state.removeItems.filter(id => id !== action.payload)
        }
      }
      return {
        ...state,
        removeItems: [...state.removeItems, action.payload]
      }
    case ContactsActionTypes.SEARCH_CONTACT:
      return {
        ...state,
        searchValue: action.payload
      }
    default:
      return state;
  }
}

const api = 'https://takeoff-test-default-rtdb.firebaseio.com'

export const fetchContacts = () => {
  return async (dispatch: Dispatch<ContactsAction>) => {
    dispatch({ type: ContactsActionTypes.LOAD_CONTACTS_STARTED })

    try {
      const { data } = await axios.get(api + '/contacts.json')
      const contacts = Object.keys(data).map(key => ({ ...data[key], id: key }))

      dispatch({
        type: ContactsActionTypes.LOAD_CONTACTS_SUCCEEDED,
        payload: contacts
      })
    } catch (e) {
      dispatch({ type: ContactsActionTypes.LOAD_CONTACTS_FAILED })
    }
  }
}

export const addRemoveItem = (id: string) => {
  return {
    type: ContactsActionTypes.ADD_REMOVE_ITEM,
    payload: id
  }
}

export const addContact = (name: string, number: string) => {
  return async (dispatch: Dispatch<ContactsAction>) => {
    dispatch({ type: ContactsActionTypes.ADD_CONTACT_STARTED })

    const { data } = await axios.post(api  + '/contacts.json', { name, number })

    dispatch({
      type: ContactsActionTypes.ADD_CONTACT_SUCCEEDED,
      payload: { name, number, id: data.name }
    })
  }
}

export const removeItems = () => {
  return async(dispatch: Dispatch<ContactsAction>, getState: () => RootState) => {
    dispatch({ type: ContactsActionTypes.REMOVE_CONTACT_STARTED })

    const { removeItems } = getState().contacts

    removeItems.forEach(id => {
      axios.delete(api + `/contacts/${id}.json`)
    })

    dispatch({ type: ContactsActionTypes.REMOVE_CONTACT_SUCCEEDED })
  }
}

export const searchContact = (value: string) => {
  return {
    type: ContactsActionTypes.SEARCH_CONTACT,
    payload: value
  }
}

export const editContact = (name: string, number: string, id: string) => {
  return async (dispatch: Dispatch<ContactsAction>) => {
    dispatch({ type: ContactsActionTypes.EDIT_CONTACT_STARTED })

    const body = { name, number }

    await axios.put(api + `/contacts/${id}.json`, body)

    console.log(name, number)

    dispatch({
      type: ContactsActionTypes.EDIT_CONTACT_SUCCEEDED,
      payload: { name, number, id }
    })
  }
}