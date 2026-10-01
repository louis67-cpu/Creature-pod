import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const creatures = [
  {
    id: "african-elephant",
    common: "African Elephant",
    scientific: "Loxodonta africana",
    className: "Mammal",
    habitat: "Savannas, woodlands, grasslands",
    diet: "Herbivore",
    range: "Sub-Saharan Africa",
    special: "Powerful trunk, social intelligence, long-distance communication",
    fact: "Elephants can communicate using low-frequency rumbles."
  },
  {
    id: "tiger",
    common: "Tiger",
    scientific: "Panthera tigris",
    className: "Mammal",
    habitat: "Forests, grasslands, mangroves",
    diet: "Carnivore",
    range: "Asia",
    special: "Stealth, strength, night vision, swimming",
    fact: "Each tiger has a unique stripe pattern."
  },
  {
    id: "bald-eagle",
    common: "Bald Eagle",
    scientific: "Haliaeetus leucocephalus",
    className: "Bird",
    habitat: "Near rivers, lakes, and coasts",
    diet: "Mostly fish",
    range: "North America",
    special: "Excellent eyesight and powerful flight",
    fact: "Bald eagles build some of the largest nests of any bird."
  }
];

function App() {
  const [screen, setScreen] = useState("home");
  const [photo, setPhoto] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  function handleImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(URL.createObjectURL(file));
    setScreen("scan");
  }

  function runScan() {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScreen("unavailable");
    }, 2200);
  }

  return (
    <main className="page">
      <section className="pod-shell">
        <div className="pod-topbar">
          <span>▥ LINK</span>
          <span>● READY</span>
          <span>87% ▣</span>
        </div>

        <div className="pod-body">
          <div className="screen">
            {screen === "home" && (
              <div className="home">
                <p>WILDLIFE FIELD SYSTEM</p>
                <h1>CREATURE <span>POD</span></h1>

                <button onClick={() => setScreen("scan")}>
                  SCAN A CREATURE →
                </button>

                <button onClick={() => setScreen("database")}>
                  CREATURE DATABASE →
                </button>
              </div>
            )}

            {screen === "scan" && (
              <div className="scan">
                {!photo ? (
                  <label className="upload">
                    TAKE / CHOOSE PHOTO
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleImage}
                    />
                  </label>
                ) : (
                  <>
                    <div className="camera-box">
                      <img src={photo} alt="Creature" />
                      {scanning && <div className="scan-line" />}
                    </div>

                    <button onClick={runScan} disabled={scanning}>
                      {scanning ? "SCANNING..." : "START SCAN"}
                    </button>
                  </>
                )}
              </div>
            )}

            {screen === "unavailable" && (
              <div className="message">
                <h2>IDENTIFICATION UNAVAILABLE</h2>
                <p>REAL VISION MODEL NOT CONNECTED</p>
                <p>
                  This version will not invent a random animal or fake confidence score.
                </p>

                <button onClick={() => setScreen("database")}>
                  CHOOSE CREATURE MANUALLY
                </button>

                <button onClick={() => setScreen("scan")}>
                  SCAN ANOTHER
                </button>
              </div>
            )}

            {screen === "database" && (
              <div>
                <h2>CREATURE DATABASE</h2>

                {creatures.map((c) => (
                  <button
                    key={c.id}
                    className="creature-card"
                    onClick={() => {
                      setSelected(c);
                      setScreen("profile");
                    }}
                  >
                    {c.common}
                  </button>
                ))}
              </div>
            )}

            {screen === "profile" && selected && (
              <div>
                <h2>{selected.common}</h2>
                <p><i>{selected.scientific}</i></p>
                <p><b>Class:</b> {selected.className}</p>
                <p><b>Habitat:</b> {selected.habitat}</p>
                <p><b>Diet:</b> {selected.diet}</p>
                <p><b>Range:</b> {selected.range}</p>
                <p><b>Abilities:</b> {selected.special}</p>
                <p><b>Fun fact:</b> {selected.fact}</p>

                <button onClick={() => setScreen("database")}>
                  BACK
                </button>
              </div>
            )}
          </div>

          <aside className="controls">
            <div className="paw">
              <button>▲</button>
              <button>◀</button>
              <button>🐾</button>
              <button>▶</button>
              <button>▼</button>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
