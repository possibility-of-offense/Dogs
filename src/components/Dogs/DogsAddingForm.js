import { useContext, useRef, useState } from "react";
import { ExistingDogContext } from "../../App";
import { DogsContext } from "../../context/dogs-context";

import ReactDOM from "react-dom";

import Alert from "../UI/Alert";
import Card from "../UI/Card";

function DogsAddingForm(props) {
  const [name, setName] = useState("");
  const [medicaments, setMedicaments] = useState([]);
  const [medicamentValue, setMedicamentValue] = useState("");

  const [showAlert, setShowAlert] = useState(false);

  const dogsContext = useContext(DogsContext);
  const isExistingContext = useContext(ExistingDogContext);

  function handleEnterPress(e) {
    if (e.code === "Enter") {
      setMedicaments((prev) => [
        ...prev,
        { name: medicamentValue, quantity: 0 },
      ]);
      setMedicamentValue("");
      setShowAlert(false);
      e.preventDefault();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isExistingContext.isDogExisting) {
      const oldObj = {
        ...dogsContext.dog,
        medicaments: [...dogsContext.dog.medicaments, ...medicaments],
      };
      if (medicaments.length === 0) {
        setShowAlert(true);
      } else {
        dogsContext.addQuantity(oldObj);
      }
    } else {
      if (medicaments.length === 0) {
        setShowAlert(true);
      } else {
        let nextId = props.lastId;

        const obj = {
          id: ++nextId,
          name: name,
          medicaments: medicaments,
        };

        if (obj) {
          dogsContext.updateDogs(obj);
        }
      }
    }
  }

  return (
    <Card>
      <h2 className="mb-4">Add new dog</h2>
      {showAlert &&
        ReactDOM.createPortal(
          <Alert className="alert-success">Fill the medicaments input</Alert>,
          document.getElementById("modal")
        )}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3 col-6">
            <label htmlFor="dogName" className="form-label">
              Dog Name
            </label>
            <div id="dogName" className="form-text">
              Add some medicaments
            </div>
            <input
              value={
                isExistingContext.isDogExisting ? dogsContext.dog.name : name
              }
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              id="dogName"
              aria-describedby="dogName"
            />
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="medicaments" className="form-label">
              Medicaments
            </label>
            <br />
            <br />
            <input
              type="text"
              className="form-control"
              id="medicaments"
              aria-describedby="medicaments"
              value={medicamentValue}
              onChange={(e) => {
                setMedicamentValue(e.target.value);
              }}
              onKeyDown={handleEnterPress}
            />
            <div id="medicaments" className="form-text">
              Medicaments:
              {medicaments.map((m) => (
                <span
                  className="badge text-bg-primary"
                  key={m.name.toLowerCase()}
                >
                  {m.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Card>
  );
}

export default DogsAddingForm;
