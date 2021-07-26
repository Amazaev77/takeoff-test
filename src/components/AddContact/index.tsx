import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { addContact } from "../../redux/ducks/contacts";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  form: {
    display: "flex",
    alignItems: "center",
    margin: "12px 0 25px"
  },
  textField: {
    marginRight: 10
  }
})

const AddContact: FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [number, setNumber] = useState("")

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value)
  }

  const adding = useTypedSelector(state => state.contacts.adding)
  const loading = useTypedSelector(state => state.contacts.loading)
  const error = useTypedSelector(state => state.contacts.error)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(addContact(name, number))
    setName("")
    setNumber("")
  }

  if (loading || error) {
    return null;
  }

  return (
    <div>
      <Typography variant="h6" noWrap>
        Добавить контакт
      </Typography>
      <form onSubmit={onSubmit} className={classes.form}>
        <TextField
          value={name}
          onChange={handleChangeName}
          size="small"
          variant="outlined"
          placeholder="Имя"
          className={classes.textField}
          required
        />
        <TextField
          value={number}
          onChange={handleChangeNumber}
          size="small"
          variant="outlined"
          placeholder="Номер телефона"
          className={classes.textField}
          type="number"
          required
        />
        <Button disabled={adding} type="submit" variant="contained" color="primary">
          Добавить
        </Button>
      </form>
    </div>
  );
};

export default AddContact;
