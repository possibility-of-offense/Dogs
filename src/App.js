import "./App.css";
import React, { useEffect, useReducer, useState } from "react";
import ReactDOM from "react-dom";

// components
import DogsAddingForm from "./components/Dogs/DogsAddingForm";
import DogsOutput from "./components/Dogs/DogsOutput";
import Card from "./components/UI/Card";
import Navigation from "./components/UI/Navigation";
import Alert from "./components/UI/Alert";

// functions
import dispatchDogReducer from "./helpers/functions";
import { fetchRequest } from "./helpers/functions";
import { reducerView } from "./helpers/functions";

// context
import { DogsContext } from "./context/dogs-context";
import DogsSidebar from "./components/Dogs/DogsSidebar";

export const ExistingDogContext = React.createContext({
  isDogExisting: false,
  setIsDogExisting: () => {},
});

function App() {
  // Initial State
  const [dogsState, dispatchDog] = useReducer(dispatchDogReducer, {
    selectedDog: 1,
    dog: {},
    dogs: [],
    isDogExisting: false,
  });

  const [viewsState, dispatchViews] = useReducer(reducerView, {
    view: "dogs",
  });

  // If dog is existing
  const [isDogExisting, setIsDogExisting] = useState(false);

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
    handleTogglingView(false, "dogs");
  }

  // Updating the dogs
  function handleUpdateDogs(dog) {
    fetchRequest(null, dispatchDog, "UPDATE_DOGS", "POST", dog);
    handleTogglingView(false);
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
    handleTogglingView(false);
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

  const [showModal, setShowModal] = useState(false);
  // Search for dogs
  function handleSearchForDogs(name) {
    const getDog = dogsState.dogs.find((dog) =>
      dog.name.toLowerCase().includes(name.toLowerCase())
    );

    if (getDog) {
      dispatchViews({ type: "CHANGE_VIEW", payload: "dogs" });
      dispatchDog({ type: "UPDATE_SELECTED_DOG", payload: getDog });
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  }

  // HELPERS
  // Toggling the container and chaning the isExisting property on the context
  function handleTogglingView(dog, view = "dogs") {
    setIsDogExisting((prev) => dog);
    dispatchViews({ type: "CHANGE_VIEW", payload: view });
  }

  // Wrapper component
  function EstablishView(props) {
    if (props.view === "dogs") {
      return <DogsOutput className="bg-white rounded p-2 shadow-sm" />;
    } else if (props.view === "add_dog") {
      return (
        <ExistingDogContext.Provider
          value={{
            isDogExisting: isDogExisting,
            setIsDogExisting: () => setIsDogExisting((prev) => !prev),
          }}
        >
          <DogsAddingForm lastId={dogsState.dogs.slice().pop().id} />
        </ExistingDogContext.Provider>
      );
    }
  }

  return (
    <div className="App">
      <Navigation
        onSearch={handleSearchForDogs}
        onClickAddNewDog={handleTogglingView}
      />
      <br />

      {showModal &&
        ReactDOM.createPortal(
          <Alert className="alert-info">No dog was found</Alert>,
          document.getElementById("modal")
        )}

      <DogsContext.Provider
        value={{
          dog: dogsState.dog,
          dogs: dogsState.dogs,
          changeQuantity: handleChangeQuantity,
          deleteMedicament: handleDeleteMedicament,
          updateDogs: handleUpdateDogs,
          addQuantity: handleAddQuantity,
          changingDogName: handleChangingDogName,
          toggleContainerViewAndIsExisting: handleTogglingView,
        }}
      >
        <div className="container text-center mt-4 px-4">
          <div className="row gx-5">
            <div className="col-3">
              <Card>
                <DogsSidebar onUpdateDog={handleUpdateDog} />
              </Card>
            </div>
            <div className="col-9">
              <EstablishView view={viewsState?.view} />
            </div>
          </div>
        </div>
      </DogsContext.Provider>
    </div>
  );
}

export default App;
