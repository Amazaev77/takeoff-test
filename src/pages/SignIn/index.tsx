import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch } from "react-redux";
import { signIn, onError } from "../../redux/ducks/auth";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
  error: {
    textAlign: "center",
    color: 'red',
    width: "100%",
    height: "16px"
  }
}));

const SignIn: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const loading = useTypedSelector(state => state.auth.loading)
  const token = useTypedSelector(state => state.auth.token)
  const error = useTypedSelector(state => state.auth.error)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username && password) {
      dispatch(signIn(username, password));
    } else {
      dispatch(onError());
    }
  }

  if (token) {
    return <Redirect to="/" />
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Войти
        </Typography>
        <form onSubmit={onSubmit} className={classes.form} noValidate>
          <TextField
            value={username}
            onChange={handleUsernameChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Имя пользователя"
            name="email"
            autoComplete="email"
            autoFocus
            error={error && !username ? true : false}
          />
          <TextField
            value={password}
            onChange={handlePasswordChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            error={error && !password ? true : false}
          />

            <div className={classes.error}>
              {error && "Неверный логин или пароль"}
            </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Войти
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Забыли пароль?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Нет аккаунта? Зарегистрируйся"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignIn