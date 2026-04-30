import React, { useEffect, useState } from "react";
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

  const API = "/webprog-1-beadando/CRUD2.php";

  const adatokLekerse = async () => {
    const res = await fetch(`${API}?action=get`);
    const data = await res.json();
    setLista(data);
  };

  useEffect(() => {
    adatokLekerse();
  }, []);

  const valtozas = (e) => {
    setUrlap({
      ...urlap,
      [e.target.name]: e.target.value
    });
  };

  const hozzaadas = async () => {
    await fetch(`${API}?action=add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        filmid: urlap.filmid,
        moziid: urlap.moziid,
        datum: urlap.datum,
        nezoszam: urlap.nezoszam,
        bevetel: urlap.bevetel
      })
    });

    setUrlap({
      filmid: "",
      moziid: "",
      datum: "",
      nezoszam: "",
      bevetel: ""
    });

    adatokLekerse();
  };

  const torles = async (id) => {
    await fetch(`${API}?action=delete&id=${id}`);
    adatokLekerse();
  };

  const szerkesztes = (elem) => {
    setSzerkesztId(elem.id);
    setUrlap(elem);
  };

  const mentes = async () => {
    await fetch(`${API}?action=update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: szerkesztId,
        ...urlap
      })
    });

    setSzerkesztId(null);

    setUrlap({
      filmid: "",
      moziid: "",
      datum: "",
      nezoszam: "",
      bevetel: ""
    });

    adatokLekerse();
  };

  return (
      <>
        <div className="header">
          <h1>Mozi CRUD (Axios)</h1>
          <button
              className="vissza"
              onClick={() => window.location.href = "/webprog-1-beadando/index.html"}
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