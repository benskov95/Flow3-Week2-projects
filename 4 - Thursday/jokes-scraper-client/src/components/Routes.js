import { Route, Switch } from "react-router-dom";
import {Home, Login, Jokes, Scrape} from "../App";

export default function Routes({isLoggedIn, loginMsg, setLoginStatus}) {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/jokes">
        <Jokes />
      </Route>
      <Route path="/scrape">
        <Scrape />
      </Route>
      <Route path="/login-out">
        <Login 
        isLoggedIn={isLoggedIn}
        loginMsg={loginMsg}
        setLoginStatus={setLoginStatus}
        />
      </Route>
      <Route></Route>
    </Switch>
  );
}