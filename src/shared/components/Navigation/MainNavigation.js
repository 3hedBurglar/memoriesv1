import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLink from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import "./MainNavigation.css";

const MainNavigation = (props) => {
  const [IsDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerOpen(false);
  };

  return (
    <React.Fragment>
      {IsDrawerOpen && <Backdrop onClick={closeDrawerHandler} />}

      <SideDrawer show={IsDrawerOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLink />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button
          onClick={openDrawerHandler}
          className="main-navigation__menu-btn"
        >
          <span />
          <span />
          <span />
        </button>

        <h1 className="main-navigation__title">
          <Link to="/">Memories</Link>
        </h1>

        <nav className="main-navigation__header-nav">
          <NavLink />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
