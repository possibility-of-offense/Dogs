import { useContext } from "react";
import { DogsContext } from "../../context/dogs-context";
import NavigationLink from "../UI/NavigationLink";

function DogsSidebar(props) {
  const dogsContext = useContext(DogsContext);

  return (
    <div className="list-group list-group-flush">
      {dogsContext.dogs.length > 0 &&
        dogsContext.dogs.map((dog) => (
          <NavigationLink
            className={`cursor-pointer list-group-item list-group-item-action ${
              dog.id === dogsContext.dog.id && "active"
            }`}
            id="list-home-list"
            onClick={props.onUpdateDog.bind(dog)}
            key={dog.id}
          >
            {dog.name}
          </NavigationLink>
        ))}
    </div>
  );
}

export default DogsSidebar;
