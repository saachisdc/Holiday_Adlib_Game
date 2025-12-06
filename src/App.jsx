import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/* import Main from "./Main/Main";
import Fall29aoi from "./AoI/Fall2029/Fall2029aoi"; */
import "/styles/modern-normalize.css";
import "/styles/global.css";
import "/styles/utility.css";

export default function App() {
  return (
    <Router>
      <div className="container">
        <h1> Baked Mittens</h1>
        <p>
          'White lakes swirled around in the landscape behind me, accumulating
          in the corners of the bakery window, as I ordered a hot
          <strong> cup of coffee </strong>
          with a sweet treat. The{" "}
          <emphasis>
            latte swirl melted into the surface while a puff of steam curled on
            top
          </emphasis>
          . I snagged a table by the window, shucked off my{" "}
          <strong> mittens </strong> next to my plate. My defrosting fingers
          smelled lightly of{" "}
          <emphasis>lanolin, which made my nose wrinkle</emphasis>. Sitting
          back, I contentedly took a big bite out of my <strong> donut </strong>
          <emphasis>
            and let the sweet glaze mingle with the bitter caffeine already
            coating my stomach
          </emphasis>
          . I absently watched the snowflakes dance outside while{" "}
          <emphasis>
            listening to the bustling hum of other patrons munching away
          </emphasis>
          . What a <emphasis>delightfully cozy</emphasis> day.'
        </p>
        <button class="btn"> Icon 1 </button>
        <button class="btn"> Icon 2 </button>
        <button class="btn"> Icon 3 </button>
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
