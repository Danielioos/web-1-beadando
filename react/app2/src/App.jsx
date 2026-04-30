import { useState } from "react";

export default function App() {
  const [lista, setLista] = useState([]);
  const [szoveg, setSzoveg] = useState("");

  function hozzaad() {
    if (szoveg.trim() === "") return;

    setLista([...lista, szoveg]);
    setSzoveg("");
  }

  function torol(index) {
    const ujLista = lista.filter((_, i) => i !== index);
    setLista(ujLista);
  }

  return (
      <div style={{ textAlign: "center" }}>
        <h1>Teendő lista</h1>

        <input
            value={szoveg}
            onChange={(e) => setSzoveg(e.target.value)}
            placeholder="Írj be egy feladatot..."
            style={{ padding: "8px", marginRight: "10px" }}
        />

        <button onClick={hozzaad}>Hozzáadás</button>

        <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
          {lista.map((elem, i) => (
              <li key={i} style={{ marginBottom: "10px" }}>
                {elem}
                <button
                    onClick={() => torol(i)}
                    style={{
                      marginLeft: "10px",
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "5px",
                      cursor: "pointer"
                    }}
                >
                  Törlés
                </button>
              </li>
          ))}
        </ul>
      </div>
  );
}