import React from "react";
import { NavLink } from "react-router-dom";

export default function Header({isLoggedIn, loginMsg}) {
  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      {isLoggedIn && (
      <React.Fragment>
      <li>
        <NavLink activeClassName="active" to="/jokes">
          Jokes
        </NavLink>
      </li>
        <li>
          <NavLink activeClassName="active" to="/scrape">
            Scrape
          </NavLink>
        </li>
      </React.Fragment>
      )}
      <li>
        <NavLink activeClassName="active" to="/login-out">
          {loginMsg}
        </NavLink>
      </li>
    </ul>
  );
};