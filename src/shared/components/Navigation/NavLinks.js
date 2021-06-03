import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { AuthContext } from "../../context/Auth-context";
import Button from "../FormElements/Button";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const logoutHandler = () => {
    auth.logout();
    history.push("/");
  };
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          All Users
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/places`}>My Places</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">Add Place</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">Authenticate</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <Button inverse onClick={logoutHandler}>
            Logout
          </Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
