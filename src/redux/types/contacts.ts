export type ContactType = {
  name: string,
  number: string,
  id: string
}

export interface ContactsState {
  contacts: ContactType[],
  removeItems: string[]
  loading: boolean,
  editing: boolean,
  removing: boolean,
  adding: boolean,
  error: boolean,
  searchValue: string
}

export enum ContactsActionTypes {
  LOAD_CONTACTS_STARTED = "LOAD_CONTACTS_STARTED",
  LOAD_CONTACTS_SUCCEEDED = "LOAD_CONTACTS_SUCCEEDED",
  LOAD_CONTACTS_FAILED = "LOAD_CONTACTS_FAILED",
  EDIT_CONTACT_STARTED = "EDIT_CONTACT_STARTED",
  EDIT_CONTACT_SUCCEEDED = "EDIT_CONTACT_SUCCEEDED",
  REMOVE_CONTACT_STARTED = "REMOVE_CONTACT_STARTED",
  REMOVE_CONTACT_SUCCEEDED = "REMOVE_CONTACT_SUCCEEDED",
  ADD_CONTACT_STARTED = "ADD_CONTACT_STARTED",
  ADD_CONTACT_SUCCEEDED = "ADD_CONTACT_SUCCEEDED",
  ADD_REMOVE_ITEM = "ADD_REMOVE_ITEM",
  SEARCH_CONTACT = "SEARCH_CONTACT"
}

interface FetchContactsAction {
  type: ContactsActionTypes.LOAD_CONTACTS_STARTED
}

interface FetchContactsSucceededAction {
  type: ContactsActionTypes.LOAD_CONTACTS_SUCCEEDED,
  payload: ContactType[]
}

interface FetchContactsFailedAction {
  type: ContactsActionTypes.LOAD_CONTACTS_FAILED
}

interface EditContactStarted { type: ContactsActionTypes.EDIT_CONTACT_STARTED }
interface RemoveContactStarted { type: ContactsActionTypes.REMOVE_CONTACT_STARTED }
interface AddContactStarted { type: ContactsActionTypes.ADD_CONTACT_STARTED }

interface EditContactSucceeded {
  type: ContactsActionTypes.EDIT_CONTACT_SUCCEEDED,
  payload: ContactType
}

interface RemoveContactSucceeded {
  type: ContactsActionTypes.REMOVE_CONTACT_SUCCEEDED,
}

interface AddContactSucceeded {
  type: ContactsActionTypes.ADD_CONTACT_SUCCEEDED,
  payload: ContactType
}

interface AddRemoveItem {
  type: ContactsActionTypes.ADD_REMOVE_ITEM,
  payload: string
}

interface SearchContact {
  type: ContactsActionTypes.SEARCH_CONTACT,
  payload: string
}

export type ContactsAction =
    FetchContactsAction
  | FetchContactsSucceededAction
  | FetchContactsFailedAction
  | EditContactStarted
  | RemoveContactStarted
  | AddContactStarted
  | EditContactSucceeded
  | RemoveContactSucceeded
  | AddContactSucceeded
  | AddRemoveItem
  | SearchContact