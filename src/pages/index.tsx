import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./SignIn";
import Main from "./Main";
import { useTypedSelector } from "../hooks/useTypedSelector";

const routes = [
  { path: '/sign-in', component: SignIn },
  { path: '/', component: Main, requiredAuth: true }
]

const Index = () => {
  const token = useTypedSelector(state => state.auth.token)

  return (
    <Router>
      <Switch>
        {routes.map((route) => {
          if (!token && route.requiredAuth) {
            return <Redirect key={route.path} to="sign-in" />
          }

          return (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
            />
          )
        })}
      </Switch>
    </Router>
  );
};

export default Index;
