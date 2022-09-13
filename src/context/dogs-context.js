import React from "react";

export const DogsContext = React.createContext({
  selectedDog: 1,
  dog: {},
  dogs: [],
  changeQuantity: (id, name, qnt) => {},
  deleteMedicament: (name) => {},
  updateDogs: (dog) => {},
  addQuantity: () => {},
  changingDogName: (name) => {},
});
