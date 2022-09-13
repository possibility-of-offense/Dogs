export function fetchRequest(
  id,
  dispatchCb,
  dispatchType,
  method = "GET",
  data = null
) {
  if (id) {
    if (method === "GET") {
      fetch(`http://localhost:3001/dogs?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length) {
            switch (dispatchType) {
              case "SET_DOG":
                dispatchCb({ type: "SET_DOG", payload: data[0] });
                break;
              default:
                break;
            }
          }
        });
    } else if (method === "PUT") {
      fetch(`http://localhost:3001/dogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      dispatchCb({ type: dispatchType, payload: data });
    }
  } else {
    if (method === "GET") {
      fetch(`http://localhost:3001/dogs`)
        .then((res) => res.json())
        .then((data) => {
          data.length > 0 && dispatchCb({ type: dispatchType, payload: data });
        });
    } else if (method === "POST") {
      fetch(`http://localhost:3001/dogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      dispatchCb({ type: dispatchType, payload: data });
    }
  }
}

function dispatchDogReducer(state, action) {
  switch (action.type) {
    case "SET_DOG":
      state = {
        ...state,
        dog: action.payload,
      };
      break;
    case "INITIAL_DOGS_SET":
      state = { ...state, dogs: action.payload };
      break;

    case "UPDATE_SELECTED_DOG":
      state = { ...state, selectedDog: action.payload.id };
      break;
    case "UPDATE_MEDICAMENTS":
      state = { ...state, dog: action.payload };
      break;
    case "UPDATE_DOG":
      let modifiedDogs = state.dogs.map((el) => {
        if (el.id === action.payload.id) {
          el.name = action.payload.name;
          return el;
        } else {
          return el;
        }
      });

      state.dog.name = action.payload.name;

      state = { ...state, dogs: modifiedDogs };
      break;
    case "UPDATE_DOGS":
      const appendToDogs = state.dogs.slice();
      state = { ...state, dogs: [...appendToDogs, action.payload] };
      break;
    default:
      break;
  }

  return state;
}

export default dispatchDogReducer;
