import React, { FC, useState } from 'react';
import { ContactType } from "../../redux/types/contacts";
import { Box, Checkbox, makeStyles } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch } from "react-redux";
import { addRemoveItem } from '../../redux/ducks/contacts';
import EditFields from "../EditFields";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const useStyles = makeStyles({
  root: {
    borderBottom: "1px solid #a7a7a7",
    paddingBottom: 8,
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 15
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: "100%",
    backgroundColor: "#a7a7a7",
    marginRight: 15
  },
  name: {
    fontWeight: 500,
  },
  editIcon: {
    cursor: "pointer",
    color: "#1976d2",
    marginRight: 8
  },
})

type PropsType = {
  contact: ContactType
}

const Contact: FC<PropsType> = ({ contact }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isShowEditFields, setIsShowEditFields] = useState(false)

  const editing = useTypedSelector(state => state.contacts.editing)

  const checkboxClickHandler = () => {
    dispatch(addRemoveItem(contact.id))
  }

  const handleShowEditFields = () => {
    if (!editing) {
      setIsShowEditFields(!isShowEditFields)
    }
  }

  return (
    <div className={classes.root}>
      <Box display="flex">
        <div className={classes.circle} />
        {isShowEditFields ? (
          <EditFields
            contact={contact}
            handleShowEditFields={handleShowEditFields}
          />
        ) : (
          <Box display="flex" flexDirection="column" justifyContent="center">
            <div className={classes.name}>{contact.name}</div>
            <div>{contact.number}</div>
          </Box>
        )}
      </Box>
      <Box display="flex" alignItems="center">
        {!isShowEditFields && (
          <EditIcon
            className={classes.editIcon}
            onClick={handleShowEditFields}
          />
        )}
        <Checkbox onClick={checkboxClickHandler} color="primary" />
      </Box>
    </div>
  );
};

export default Contact;
