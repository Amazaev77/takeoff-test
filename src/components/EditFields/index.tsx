import React, { ChangeEvent, FC, useState } from 'react';
import { Box, makeStyles, TextField } from "@material-ui/core";
import { ContactType } from "../../redux/types/contacts";
import CheckIcon from "@material-ui/icons/Check";
import { green } from "@material-ui/core/colors";
import { editContact } from "../../redux/ducks/contacts";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  checkIcon: {
    cursor: "pointer",
    color: green[500],
    marginLeft: 15
  },
})

type PropsType = {
  contact: ContactType,
  handleShowEditFields: () => void
}

const EditFields: FC<PropsType> = ({ contact, handleShowEditFields }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [name, setName] = useState(contact.name)
  const [number, setNumber] = useState(contact.number)

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value)
  }

  const handleEditContact = () => {
    dispatch(editContact(name, number, contact.id))
    handleShowEditFields()
  }

  return (
    <Box display="flex" alignItems="center">
      <TextField
        value={name}
        onChange={handleChangeName}
        label="Имя"
        style={{ marginRight: 15 }}
      />
      <TextField
        value={number}
        onChange={handleChangeNumber}
        label="Номер"
      />
      <CheckIcon
        className={classes.checkIcon}
        onClick={handleEditContact}
      />
    </Box>
  );
};

export default EditFields;
