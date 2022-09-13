import { useState } from "react";

function Search(props) {
  const [inputVal, setInputVal] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    props.onSearch(inputVal);
    setInputVal("");
  }

  return (
    <form className="grid mleft-3" onSubmit={handleSearch}>
      <div>
        <label
          htmlFor="searchForm"
          className="form-label m-0"
          style={{ display: "none" }}
        >
          Search
        </label>
        <input
          type="text"
          id="searchForm"
          placeholder="Search..."
          className="form-control"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Search for
      </button>
    </form>
  );
}

export default Search;
