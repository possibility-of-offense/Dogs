import { useEffect, useState } from "react";
import NavigationLink from "./NavigationLink";
import Search from "./Search";

// Clearing the audio

function checkAudio(audio, cb) {
  let toClear = false;

  let interval = setInterval(() => {
    if (audio.paused) {
      audio.pause();
      audio.currentTime = 0;
      toClear = true;
      if (toClear) {
        clearInterval(interval);
        cb((prev) => !prev);
      }
    }
  }, 300);
}

function Navigation(props) {
  let bark = new Audio("/bark.mp3");
  const [playAudio, setPlayAudio] = useState(!bark.paused);

  // Click on the button to trigger the sound
  function handleButtonClick() {
    setPlayAudio(true);
    bark.play();
    checkAudio(bark, setPlayAudio);
  }

  useEffect(() => {
    return () => {
      if (!bark.paused) {
        bark.pause();
        bark.currentTime = 0;
      }
    };
  }, []);

  // Handling click on link
  function handleLinkClick(e, dog, view) {
    props.onClickAddNewDog(dog, view);
    e.preventDefault();
  }

  return (
    <nav className="p-2 bg-white shadow d-flex align-items-center">
      <h4 className="m-0">Welcome</h4>
      <Search onSearch={props.onSearch} />
      <ul className="nav nav-pills d-flex ml-auto">
        <NavigationLink
          styling={{
            pointerEvents: !playAudio ? "all" : "none",
            opacity: !playAudio ? "1" : ".5",
          }}
          className="nav-link active"
          onClick={handleButtonClick}
        >
          <li className="nav-item">Dogs</li>
        </NavigationLink>
        &nbsp;
        <NavigationLink
          className="btn btn-link px-1"
          onClick={(e) => handleLinkClick(e, false, "add_dog")}
        >
          <li className="nav-item">Add new dog</li>
        </NavigationLink>
        <NavigationLink
          className="btn btn-link px-1"
          onClick={(e) => handleLinkClick(e, false, "dogs")}
        >
          <li className="nav-item">See all dogs</li>
        </NavigationLink>
      </ul>
    </nav>
  );
}

export default Navigation;
