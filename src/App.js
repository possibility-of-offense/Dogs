import "./App.css";
import React, { useEffect, useReducer, useState } from "react";

// components
import DogsAddingForm from "./components/Dogs/DogsAddingForm";
import DogsOutput from "./components/Dogs/DogsOutput";
import Card from "./components/UI/Card";
import Navigation from "./components/UI/Navigation";

// functions
import dispatchDogReducer from "./helpers/functions";
import { fetchRequest } from "./helpers/functions";

// context
import { DogsContext } from "./context/dogs-context";

export const ExistingDogContext = React.createContext({
  isDogExisting: false,
  setIsDogExisting: () => {},
});

function reducerView(state, action) {
  if (action.type === "CHANGE_VIEW") {
    switch (action.payload) {
      case "dogs":
        state.view = "dogs";
        break;
      case "add_dog":
        state.view = "add_dog";
        break;
      default:
        break;
    }
  }
}

function App() {
  // Initial State
  const [dogsState, dispatchDog] = useReducer(dispatchDogReducer, {
    selectedDog: 1,
    dog: {},
    dogs: [],
    isDogExisting: false,
  });

  const [viewsState, dispatchViews] = useReducer(() => {}, {
    view: "dogs",
    changeView: (view) => {},
  });

  // If dog is existing
  const [isDogExisting, setIsDogExisting] = useState(false);

  // State for toggling view
  const [showDogsContainer, setShowDogsContainer] = useState(true);

  // Hook for fetching the dog when the selectedDog is being changed
  useEffect(() => {
    fetchRequest(dogsState.selectedDog, dispatchDog, "SET_DOG");
  }, [dogsState.selectedDog]);

  // Initially fetch all dogs
  useEffect(() => {
    fetchRequest(null, dispatchDog, "INITIAL_DOGS_SET");
  }, []);

  // Setting selectedDog and fetching appropriate dog
  function handleUpdateDog() {
    dispatchDog({ type: "UPDATE_SELECTED_DOG", payload: this });
    setShowDogsContainer(true);
  }

  // Updating the dogs
  function handleUpdateDogs(dog) {
    fetchRequest(null, dispatchDog, "UPDATE_DOGS", "POST", dog);
    handleToggleContainerViewAndIsExisting(true, false);
  }

  // Function to change medicaments quantity
  function handleAddQuantity(obj) {
    fetchRequest(
      dogsState.selectedDog,
      dispatchDog,
      "UPDATE_MEDICAMENTS",
      "PUT",
      obj
    );
    handleToggleContainerViewAndIsExisting(true, false);
  }

  // Function to change quantity of medicament
  function handleChangeQuantity(name, qnt = 1) {
    const cloneObj = { ...dogsState.dog };
    const medicamentIndex = cloneObj.medicaments.findIndex(
      (medicament) => medicament.name === name
    );
    if (medicamentIndex !== -1) {
      cloneObj.medicaments[medicamentIndex].quantity = qnt;
    }

    fetchRequest(
      dogsState.selectedDog,
      dispatchDog,
      "UPDATE_SELECTED_DOG",
      "PUT",
      cloneObj
    );
  }

  // Function to delete a medicament
  function handleDeleteMedicament(name) {
    let cloneObj = { ...dogsState.dog };
    cloneObj.medicaments = cloneObj.medicaments.filter(
      (medicament) => medicament.name !== name
    );

    fetchRequest(
      dogsState.selectedDog,
      dispatchDog,
      "UPDATE_MEDICAMENTS",
      "PUT",
      cloneObj
    );
  }

  // function to update dog's name
  function handleChangingDogName(name) {
    const getInd = dogsState.dogs.findIndex(
      (dog) => dog.id === dogsState.selectedDog
    );
    const getDog = dogsState.dogs[getInd];
    getDog.name = name;

    fetchRequest(
      dogsState.selectedDog,
      dispatchDog,
      "UPDATE_DOG",
      "PUT",
      getDog
    );
  }

  // HELPERS
  // HELPERS
  // HELPERS
  // Toggling the container and chaning the isExisting property on the context
  function handleToggleContainerViewAndIsExisting(container, dog) {
    setShowDogsContainer(container);
    setIsDogExisting((prev) => dog);
  }

  return (
    <div className="App">
      <Navigation onClickAddNewDog={handleToggleContainerViewAndIsExisting} />
      <br />

      <DogsContext.Provider
        value={{
          dog: dogsState.dog,
          changeQuantity: handleChangeQuantity,
          deleteMedicament: handleDeleteMedicament,
          updateDogs: handleUpdateDogs,
          addQuantity: handleAddQuantity,
          changingDogName: handleChangingDogName,
          toggleContainerViewAndIsExisting:
            handleToggleContainerViewAndIsExisting,
        }}
      >
        <div className="container text-center mt-4 px-4">
          <div className="row gx-5">
            <div className="col-3">
              <Card>
                <div className="list-group list-group-flush">
                  {dogsState.dogs.length > 0 &&
                    dogsState.dogs.map((dog) => (
                      <a
                        className={`cursor-pointer list-group-item list-group-item-action ${
                          dog.id === dogsState.dog.id && "active"
                        }`}
                        id="list-home-list"
                        key={dog.id}
                        onClick={handleUpdateDog.bind(dog)}
                      >
                        {dog.name}
                      </a>
                    ))}
                </div>
              </Card>
            </div>
            <div className="col-9">
              {showDogsContainer ? (
                <DogsOutput className="bg-white rounded p-2 shadow-sm" />
              ) : (
                <ExistingDogContext.Provider
                  value={{
                    isDogExisting: isDogExisting,
                    setIsDogExisting: () => setIsDogExisting((prev) => !prev),
                  }}
                >
                  <DogsAddingForm lastId={dogsState.dogs.slice().pop().id} />
                </ExistingDogContext.Provider>
              )}
            </div>
          </div>
        </div>
      </DogsContext.Provider>
    </div>
  );
}

export default App;
