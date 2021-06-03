import React, { useEffect, useState } from "react";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/Hooks/http-hook";

import UserLists from "../components/UserLists";

const User = () => {
  const [isLoadedUser, setIsLoadedUser] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        );
        setIsLoadedUser(responseData.users);
      } catch (err) {}
    };
    fetchUers();
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
