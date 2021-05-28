import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "The Taj MAHAL",
    description: "The Taj Mahal is One of the WONDERS OF THE WORLD",
    imageURL:
      "https://thumbs-prod.si-cdn.com/Abm-e-V_cqdIqYDo_cXApagw8zI=/800x600/filters:no_upscale():focal(1471x1061:1472x1062)/https://public-media.si-cdn.com/filer/b6/30/b630b48b-7344-4661-9264-186b70531bdc/istock-478831658.jpg",
    address: "Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001",
    creatorId: "u1",
    location: {
      lat: 27.1751448,
      lng: 78.0399535,
    },
  },
  {
    id: "p2",
    title: "The HAWA MAHAL",
    description: "The hawa Mahal is One of the WONDERS OF THE WORLD",
    imageURL:
      "https://thumbs-prod.si-cdn.com/Abm-e-V_cqdIqYDo_cXApagw8zI=/800x600/filters:no_upscale():focal(1471x1061:1472x1062)/https://public-media.si-cdn.com/filer/b6/30/b630b48b-7344-4661-9264-186b70531bdc/istock-478831658.jpg",
    address: "Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001",
    creatorId: "u2",
    location: {
      lat: 40.6892494,
      lng: -74.0445004,
    },
  },
];

const UserPlace = () => {
  const userId = useParams().userId;
  const newPlaces = DUMMY_PLACES.filter((place) => place.creatorId === userId);

  return <PlaceList items={newPlaces} />;
};

export default UserPlace;
