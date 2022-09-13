import React, { useContext, useState } from "react";
import DogsQuantityModal from "./DogsQuantityModal";
import { DogsContext } from "../../context/dogs-context";
import ReactDOM from "react-dom";

import Alert from "../UI/Alert";

import "./DogsOutput.css";

function DogsOutput(props) {
  const dogsContext = useContext(DogsContext);
  const [nameToBeChanged, setNameToBeChanged] = useState(false);
  const [name, setName] = useState("");

  const [showAlert, setShowAlert] = useState(false);

  function handleToggleFormVisibility() {
    setNameToBeChanged((prev) => !prev);
  }

  function handleInputChange(e) {
    setName(e.target.value);
    setShowAlert(false);
  }

  function handleChangeName(e) {
    e.preventDefault();
    if (name.length < 2 || name.length > 20) {
      setShowAlert(true);
    } else {
      dogsContext.changingDogName(name);
    }
    setName("");
  }

  return (
    <div className={props.className}>
      {Object.values(dogsContext.dog).length > 0 &&
      dogsContext.dog.medicaments.length > 0 ? (
        <React.Fragment>
          {showAlert &&
            ReactDOM.createPortal(
              <Alert className="alert-danger">
                You need between 2 and 20 characters
              </Alert>,
              document.getElementById("modal")
            )}
          <div className="d-flex align-items-center justify-content-between m-3 pb-2 border-bottom">
            <h5
              onClick={handleToggleFormVisibility}
              className="name-of-dog text-start cursor-pointer"
              style={{ userSelect: "none" }}
            >
              {dogsContext.dog.name}
            </h5>
            &nbsp;
            {nameToBeChanged && (
              <div style={{ marginRight: "auto" }}>
                <form onSubmit={handleChangeName}>
                  <div className="row g-3 align-items-center">
                    <div className="col-auto">
                      <label
                        style={{ display: "none" }}
                        htmlFor="changeName"
                        className="col-form-label"
                      >
                        Change name
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        value={name}
                        onChange={handleInputChange}
                        type="text"
                        id="changeName"
                        className="form-control"
                        aria-describedby="changeNameAdditionalInfo"
                      />
                    </div>
                    <div className="col-auto">
                      <span id="changeNameAdditionalInfo" className="form-text">
                        Change the name and hit enter. Must be 2-20 characters
                        long.
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            )}
            <button
              onClick={() =>
                dogsContext.toggleContainerViewAndIsExisting(false, true)
              }
              className="btn btn-primary"
            >
              <i className="fa-solid fa-file-pen"></i>
            </button>
          </div>

          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {dogsContext.dog.medicaments.length > 0 &&
                dogsContext.dog.medicaments.map((medicament, ind) => (
                  <tr key={medicament.name.toLowerCase()}>
                    <th scope="row">{ind + 1}</th>
                    <td>{medicament.name}</td>
                    <td>{medicament.quantity}</td>
                    <td>
                      <div className="text-end">
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            dogsContext.deleteMedicament(medicament.name);
                          }}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                        &nbsp;
                        <button
                          className="btn btn-primary"
                          data-bs-toggle={`modal`}
                          data-bs-target={`#${medicament.name
                            .split(" ")
                            .join("-")}-modal`}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <DogsQuantityModal
                          name={medicament.name}
                          qnt={medicament.quantity}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </React.Fragment>
      ) : (
        <h4>No medicaments yet!</h4>
      )}
    </div>
  );
}

export default DogsOutput;
