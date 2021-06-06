import React, { useEffect, useState } from "react";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/Hooks/http-hook";

import UserLists from "../components/UserLists";

const User = () => {
  const [isLoadedUser, setIsLoadedUser] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKENED_URL + "/users"
        );
        setIsLoadedUser(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  //console.log(isLoadedUser);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && isLoadedUser && <UserLists items={isLoadedUser} />}
    </React.Fragment>
  );
};

export default User;
