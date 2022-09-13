import { useState, useContext } from "react";
import { DogsContext } from "../../context/dogs-context";

function DogsQuantityModal(props) {
  const dogsContext = useContext(DogsContext);
  const [quantity, setQuantity] = useState(props.qnt);

  function handleSubmit(e) {
    e.preventDefault();
    if (quantity) {
      dogsContext.changeQuantity(props.name, Number(quantity));
    }
  }

  return (
    <>
      <div
        className={`modal fade ${props.name.split(" ").join("-")}-modal`}
        id={`${props.name.split(" ").join("-")}-modal`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Change quantity of {props.name} to:
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <label htmlFor="quantity" className="form-label d-none">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  className="form-control"
                  aria-describedby="quantityHelpBlock"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <br />
                <div>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  &nbsp;
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DogsQuantityModal;
