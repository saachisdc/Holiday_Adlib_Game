import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/* import Main from "./Main/Main";
import Fall29aoi from "./AoI/Fall2029/Fall2029aoi"; */
import "/styles/modern-normalize.css";
import "/styles/global.css";
import "/styles/utility.css";
import "/styles/components/game.css";
import Typewriter from "./components/Typewriter";

export default function App() {
  return (
    <Router>
      <div className="container" style={{ paddingBottom: "4.5rem" }}>
        <h1> Baked Mittens</h1>
        {/** Example story displayed with the Typewriter component. */}
        <Typewriter
          className="story"
          text={`White flakes swirled around in the landscape behind me, accumulating in the corners of the bakery window, as I ordered a hot cup of coffee with a sweet treat. The latte swirl melted into the surface while a puff of steam curled on top. I snagged a table by the window, shucked off my mittens next to my plate. My defrosting fingers smelled lightly of lanolin, which made my nose wrinkle. Sitting back, I contentedly took a big bite out of my donut and let the sweet glaze mingle with the bitter caffeine already coating my stomach. I absently watched the snowflakes dance outside while listening to the bustling hum of other patrons munching away. What a delightfully cozy day.`}
          speed={40}
        />
        <div className="game_btn">
          <button className="btn"> cup of coffee </button>
          <button className="btn"> mittens </button>
          <button className="btn"> donut </button>
        </div>
        {/*       < <Menu />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/fall29aoi" element={<Fall29aoi />} />
        </Routes>
        > */}
      </div>
    </Router>
  );
}
