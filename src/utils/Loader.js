import React, { useState } from "react";
import Loader from "react-loader";


function App() {
  const [loaded, setLoaded] = useState(true);
  return (
    <div className="App">
      <button onClick={() => setLoaded(!loaded)}>Start Loading</button>
      <Loader
        loaded={loaded}
        lines={13}
        length={20}
        width={10}
        radius={30}
        corners={1}
        rotate={0}
        direction={1}
        color="#000"
        speed={1}
        trail={60}
        shadow={false}
        hwaccel={false}
        className="spinner"
        zIndex={2e9}
        top="50%"
        left="50%"
        scale={1.0}
        loadedClassName="loadedContent"
      />
    </div>
  );
}