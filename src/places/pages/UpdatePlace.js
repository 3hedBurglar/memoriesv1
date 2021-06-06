import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/Util/Validator";
import { useForm } from "../../shared/Hooks/form-hook";
import "./NewPlace.css";
import Card from "../../shared/components/UIElements/Card";
import { useHttpClient } from "../../shared/Hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/Auth-context";

const UpdatePlace = () => {
  const [isLoadedPlace, setIsLoadedPlace] = useState();
  const placeId = useParams().placeId;
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const history = useHistory();
  const auth = useContext(AuthContext);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKENED_URL}/places/${placeId}`
        );
        console.log(responseData);
        setIsLoadedPlace(responseData.place);

        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKENED_URL}/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push(`/${auth.userId}/places`);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && !isLoadedPlace && !error && (
        <div className="center">
          <Card>
            <h2>Could not Find Place!</h2>
          </Card>
        </div>
      )}
      {!isLoading && isLoadedPlace && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a Valid title"
            onInput={inputHandler}
            initialValue={isLoadedPlace.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter Valid description (min 5 characters)"
            onInput={inputHandler}
            initialValue={isLoadedPlace.description}
            initialValid={true}
          />
          <Button type="submit" inverse disabled={!formState.isValid}>
            UPDATE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;
