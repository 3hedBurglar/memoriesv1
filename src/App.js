import React, { Suspense } from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

//import User from "./user/pages/Users";
//import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
//import UserPlace from "./places/pages/UserPlace";
//import UpdatePlace from "./places/pages/UpdatePlace.js";
//import Auth from "./user/pages/Auth.js";
import { AuthContext } from "./shared/context/Auth-context.js";
import { useAuth } from "./shared/Hooks/auth-hook";

const User = React.lazy(() => import("./user/pages/Users"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UserPlace = React.lazy(() => import("./places/pages/UserPlace"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace.js"));
const Auth = React.lazy(() => import("./user/pages/Auth.js"));

function App() {
  const { token, login, logout, userId } = useAuth();
  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <User />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlace />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <User />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlace />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner asOverlay />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
