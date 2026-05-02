import { useState } from "react";

export default function App() {
  const [tabla, setTabla] = useState(Array(9).fill(null));
  const [kovetkezoX, setKovetkezoX] = useState(true);

  function kattintas(index) {
    if (tabla[index] || nyertesVizsgalat(tabla)) return;

    const ujTabla = [...tabla];
    ujTabla[index] = kovetkezoX ? "X" : "O";

    setTabla(ujTabla);
    setKovetkezoX(!kovetkezoX);
  }

  function nyertesVizsgalat(negyzetek) {
    const nyeroKombok = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];

    for (let [a,b,c] of nyeroKombok) {
      if (
          negyzetek[a] &&
          negyzetek[a] === negyzetek[b] &&
          negyzetek[a] === negyzetek[c]
      ) {
        return negyzetek[a];
      }
    }
    return null;
  }

  const nyertes = nyertesVizsgalat(tabla);
  const dontetlen = !nyertes && tabla.every((elem) => elem !== null);

  return (
      <div style={{ textAlign: "center" }}>
        <h1>Tic-Tac-Toe</h1>

        <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 60px)",
              justifyContent: "center",
              gap: "5px",
              marginBottom: "20px"
            }}
        >
          {tabla.map((ertek, i) => (
              <button
                  key={i}
                  onClick={() => kattintas(i)}
                  style={{
                    width: "60px",
                    height: "60px",
                    fontSize: "24px",
                    cursor: "pointer"
                  }}
              >
                {ertek}
              </button>
          ))}
        </div>

        <h2>
          {nyertes
              ? `Nyertes: ${nyertes}`
              : dontetlen
                  ? "Döntetlen!"
                  : `Következő játékos: ${kovetkezoX ? "X" : "O"}`}
        </h2>

        <button onClick={() => setTabla(Array(9).fill(null))}>
          Új játék
        </button>
      </div>
  );
}