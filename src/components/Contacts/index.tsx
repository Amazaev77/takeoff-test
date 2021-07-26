import React, { useEffect } from 'react';
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Contact from "../Contact";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { fetchContacts, removeItems } from "../../redux/ducks/contacts";
import { useDispatch } from "react-redux";
import { Alert, Skeleton } from "@material-ui/lab";

const useStyles = makeStyles({
  box: {
    height: "30px"
  }
})

const Contacts = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const searchValue = useTypedSelector(state => state.contacts.searchValue)
  const removeContacts = useTypedSelector(state => state.contacts.removeItems)
  const removing = useTypedSelector(state => state.contacts.removing)
  const error = useTypedSelector(state => state.contacts.error)
  const loading = useTypedSelector(state => state.contacts.loading)

  const contacts = useTypedSelector(state => state.contacts.contacts.filter(
    contact => contact.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
  ))

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

  const removeClickHandler = () => {
    dispatch(removeItems())
  }

  if (error) {
    return (
      <Alert severity="error">
        Не удалось загрузить контакты !!
      </Alert>
    )
  }

  if (loading) {
    return (
      <>
        {new Array(7).fill('').map((_, idx) => (
          <Skeleton key={idx} height={65} />
        ))}
      </>
    )
  }

  return (
    <div>
      <Box
        display="flex"
        justifyContent="flex-end"
        marginBottom={1}
        className={classes.box}
      >
        {removeContacts.length > 0 && (
          <Button
            onClick={removeClickHandler}
            disabled={removing}
            size="small"
            variant="contained"
            color="secondary"
          >
            Удалить
          </Button>
        )}
      </Box>
      <div>
        {contacts.length === 0 && (
          <Typography variant={"h5"} align="center">
            Список контактов пуст
          </Typography>
        )}
        {contacts.map((contact) => {
          return <Contact key={contact.id} contact={contact} />
        })}
      </div>
    </div>
  );
};

export default Contacts;
