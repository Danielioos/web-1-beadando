import React, { useState } from "react";
import "./App.css";

function App() {

  const [lista, setLista] = useState([]);

  const [urlap, setUrlap] = useState({
    filmid: "",
    moziid: "",
    datum: "",
    nezoszam: "",
    bevetel: ""
  });

  const [szerkesztId, setSzerkesztId] = useState(null);

  const valtozas = (e) => {
    setUrlap({
      ...urlap,
      [e.target.name]: e.target.value
    });
  };

  const hozzaadas = () => {
    if (!urlap.filmid) return;

    setLista([
      ...lista,
      {
        id: Date.now(),
        ...urlap
      }
    ]);

    setUrlap({
      filmid: "",
      moziid: "",
      datum: "",
      nezoszam: "",
      bevetel: ""
    });
  };

  const torles = (id) => {
    setLista(lista.filter(e => e.id !== id));
  };

  const szerkesztes = (elem) => {
    setSzerkesztId(elem.id);
    setUrlap(elem);
  };

  const mentes = () => {
    setLista(lista.map(e =>
        e.id === szerkesztId ? { ...urlap, id: szerkesztId } : e
    ));

    setSzerkesztId(null);

    setUrlap({
      filmid: "",
      moziid: "",
      datum: "",
      nezoszam: "",
      bevetel: ""
    });
  };

  return (
      <>
        <div className="header">
          <h1>React CRUD</h1>
          <button
              className="vissza"
              onClick={() =>
                  window.location.href = "../index.html"
              }
          >
            Vissza
          </button>
        </div>

        <div className="container">

          <input name="filmid" value={urlap.filmid} onChange={valtozas} placeholder="Filmid" />
          <input name="moziid" value={urlap.moziid} onChange={valtozas} placeholder="Moziid" />
          <input name="datum" type="date" value={urlap.datum} onChange={valtozas} />
          <input name="nezoszam" value={urlap.nezoszam} onChange={valtozas} placeholder="Nézőszám" />
          <input name="bevetel" value={urlap.bevetel} onChange={valtozas} placeholder="Bevétel" />

          {szerkesztId ? (
              <button onClick={mentes}>Mentés</button>
          ) : (
              <button onClick={hozzaadas}>Hozzáadás</button>
          )}

          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>Filmid</th>
              <th>Moziid</th>
              <th>Dátum</th>
              <th>Nézőszám</th>
              <th>Bevétel</th>
              <th>Művelet</th>
            </tr>
            </thead>
            <tbody>
            {lista.map(elem => (
                <tr key={elem.id}>
                  <td>{elem.id}</td>
                  <td>{elem.filmid}</td>
                  <td>{elem.moziid}</td>
                  <td>{elem.datum}</td>
                  <td>{elem.nezoszam}</td>
                  <td>{elem.bevetel}</td>
                  <td>
                    <button onClick={() => szerkesztes(elem)}>♻️</button>
                    <button onClick={() => torles(elem.id)}>❌</button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>

        </div>
      </>
  );
}

export default App;