import React, { ChangeEvent, FC } from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { CssBaseline } from '@material-ui/core';
import Contacts from "../../components/Contacts";
import AddContact from "../../components/AddContact";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { searchContact } from "../../redux/ducks/contacts";
import { logOut } from "../../redux/ducks/auth";
import {
  AppBar,
  Box,
  Container,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Toolbar,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      display: "flex"
    },
    main: { marginTop: 60, padding: "0 20px" },
    searchField: {
      marginBottom: 25,
      marginTop: 25
    },
    exitToAppIcon: {
      cursor: "pointer",
      fontSize: 30,
      marginRight: 20
    }
  }),
);

const Main: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const searchValue = useTypedSelector(state => state.contacts.searchValue)

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchContact(e.target.value))
  }

  const handleLogout = () => {
    dispatch(logOut())
  }

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Toolbar>
              <Typography variant="h6" noWrap>
                Контакты
              </Typography>
          </Toolbar>
          <ExitToAppIcon
            className={classes.exitToAppIcon}
            onClick={handleLogout}
          />
        </Box>
      </AppBar>
      <main className={classes.main}>
        <TextField
          value={searchValue}
          onChange={handleChangeSearch}
          fullWidth
          id="standard-search"
          placeholder="Search field"
          type="search"
          className={classes.searchField}
        />
        <Container maxWidth="md">
          <AddContact />
          <Contacts />
        </Container>
      </main>
    </div>
  )
};

export default Main;
