import React, { useState, useCallback, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "/styles/modern-normalize.css";
import "/styles/global.css";
import "/styles/utility.css";
import "/styles/components/game.css";

import Typewriter from "./components/Typewriter";

export default function App() {
  const [choice, setChoice] = useState(null);
  const [paused, setPaused] = useState(false);

  const handlePause = useCallback(() => {
    setChoice(null);
    setPaused(true);
  }, []);

  const pauseAfter = useMemo(() => ["cup of coffee", "mittens", "donut"], []);

  const branchMap = useMemo(
    () => ({
      cup_of_coffee: {
        "cup of coffee": {
          insert:
            " with a sweet treat. The latte swirl melted into the surface while a puff of steam curled on top. ",
          skipUntil: "I snagged a table",
        },
        mittens: {
          insert:
            " with a sweet treat. The smell of warm yarn invaded my throat, making me feel disturbingly cozy inside. ",
          skipUntil: "I snagged a table",
        },
        donut: {
          insert:
            "  with a sweet treat. The redundancy was not lost on me, but I'm an adult and can get two treats if I want.  ",
          skipUntil: "I snagged a table",
        },
        default: {
          insert:
            " with a sweet treat. The latte swirl melted into the surface while a puff of steam curled on top. ",
          skipUntil: "I snagged a table",
        },
      },

      mittens: {
        mittens: {
          insert:
            " next to my plate. My defrosting fingers smelled lightly of lanolin, which made my nose wrinkle. ",
          skipUntil: "Sitting back,",
        },
        "cup of coffee": {
          insert:
            " next to my plate. My defrosting fingers smelled lightly of early mornings, late nights, and an overactive caffeine dependency. ",
          skipUntil: "Sitting back,",
        },
        donut: {
          insert:
            " next to my plate. My defrosting fingers smelled lightly of yeast and glaze, but that made me right at home in this little shop. ",
          skipUntil: "Sitting back,",
        },
        default: {
          insert:
            " next to my plate. My defrosting fingers smelled lightly of lanolin, which made my nose wrinkle. ",
          skipUntil: "Sitting back,",
        },
      },

      donut: {
        donut: {
          insert:
            " and let the sweet glaze mingle with the bitter caffeine already coating my stomach. ",
          skipUntil: "I absently watched",
        },
        "cup of coffee": {
          insert: " quite literally. My tooth cracked the porcelain...loudly. ",
          skipUntil: "I absently watched",
        },
        mittens: {
          insert: " and chewed slowly. The warm yarn caught between my teeth. ",
          skipUntil: "I absently watched",
        },
        default: {
          insert:
            " and let the sweet glaze mingle with the bitter caffeine already coating my stomach. ",
          skipUntil: "I absently watched",
        },
      },
    }),
    []
  );

  return (
    <Router>
      <div className="container">
        <h1> Baked Mittens</h1>
        <Typewriter
          className="story"
          text={`White flakes swirled around in the landscape behind me, accumulating in the corners of the bakery window, as I ordered a hot cup of coffee with a sweet treat. The latte swirl melted into the surface while a puff of steam curled on top. I snagged a table by the window and shucked off my mittens next to my plate. My defrosting fingers smelled lightly of lanolin, which made my nose wrinkle. Sitting back, I contentedly took a big bite out of my donut and let the sweet glaze mingle with the bitter caffeine already coating my stomach. I absently watched the snowflakes dance outside while listening to the bustling hum of other patrons munching away. What a delightfully cozy day.`}
          speed={40}
          pauseAfter={pauseAfter}
          choice={choice}
          onPause={handlePause}
          branchMap={branchMap}
        />

        <div className="game_btn">
          <button
            className="btn"
            disabled={!paused}
            onClick={(e) => {
              setChoice(e.currentTarget.textContent.trim());
              setPaused(false);
            }}
          >
            cup of coffee
          </button>
          <button
            className="btn"
            disabled={!paused}
            onClick={(e) => {
              setChoice(e.currentTarget.textContent.trim());
              setPaused(false);
            }}
          >
            mittens
          </button>
          <button
            className="btn"
            disabled={!paused}
            onClick={(e) => {
              setChoice(e.currentTarget.textContent.trim());
              setPaused(false);
            }}
          >
            donut
          </button>
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
