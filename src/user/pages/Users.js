import React from "react";

import UserLists from "../components/UserLists";

const User = () => {
  const USERS = [
    {
      id: "u1",
      name: "Faisal Rahman",
      places: 3,
      image:
        "https://images.unsplash.com/photo-1597404294360-feeeda04612e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
    },
    {
      id: "u2",
      name: "HUH Rahman",
      places: 3,
      image:
        "https://images.unsplash.com/photo-1597404294360-feeeda04612e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
    },
  ];

  return <UserLists items={USERS} />;
};

export default User;
