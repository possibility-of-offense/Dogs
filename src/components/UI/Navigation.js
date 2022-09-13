import { useEffect, useState } from "react";

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

  return (
    <nav className="p-2 bg-white shadow d-flex align-items-center">
      <h4 className="m-0">Welcome</h4>
      <ul className="nav nav-pills d-flex ml-auto">
        <li className="nav-item">
          <a
            onClick={handleButtonClick}
            className="nav-link active"
            aria-current="page"
            href="#"
            style={{
              pointerEvents: !playAudio ? "all" : "none",
              opacity: !playAudio ? "1" : ".5",
            }}
          >
            Dogs
          </a>
        </li>
        &nbsp;
        <li className="nav-item">
          <a
            onClick={() => props.onClickAddNewDog(false)}
            className="btn btn-link px-1 "
            aria-current="page"
            href="#"
          >
            Add new dog
          </a>
        </li>
        <li className="nav-item">
          <a
            onClick={() => props.onClickAddNewDog(true)}
            className="btn btn-link px-1"
            aria-current="page"
            href="#"
          >
            See all dogs
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
