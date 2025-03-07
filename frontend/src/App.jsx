import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Form from "react-bootstrap/Form";
import { Table } from "react-bootstrap"; 

import { collection, addDoc } from "firebase/firestore";
import { db } from "./servicios/db";

const App = () => {
  const [tabla, setTabla] = useState("");
  const [limite, setLimite] = useState("");
  const [resultados, setResultados] = useState([]);

  const camposColor = (color) => {
    if (color === 'AZUL') {
      return '#a2d2ff';
    } else if (color === 'VERDE') {
      return '#2a9d8f';
    } else if (color === 'ROJO') {
      return '#d00000';
    }
    return '#ffd60a'; 
  };

  const generarTabla = async () => {
    try {
      const response = await axios.post("http://localhost:3001/tabla", {
        tabla: Number(tabla),
        limite: Number(limite),
      });
      const nuevaTabla = response.data;
      setResultados(nuevaTabla);

      // Guardar los resultados en Firestore
      await guardarTablaEnFirestore(nuevaTabla);

    } catch (error) {
      console.error("Error al obtener la tabla:", error);
    }
  };

  const guardarTablaEnFirestore = async (tabla) => {
    try {
      const docRef = await addDoc(collection(db, "tablasMultiplicar"), {
        tabla: tabla,
        fecha: new Date(),
      });
    } catch (e) {
      console.error("Error añadiendo el documento: ", e);
    }
  };

  return (
    <div>
      <h1>INFORMACIÓN DE LA TABLA</h1>
      <p>Azul: si el número es múltiplo de 3</p>
      <p>Verde: si el número es múltiplo de 5</p>
      <p>Rojo: si el número es múltiplo de 7</p>
      <p>Si el número es múltiplo de varios de estos, el color será el del múltiplo mayor</p>
    <div className="form-container">
      <h1 className="title">Tabla de Multiplicar</h1>
      <Form.Control
        className="form"
        size="lg"
        type="number"
        placeholder="Número a calcular"
        value={tabla}
        onChange={(e) => setTabla(e.target.value)}
      />
      <h3 className="form">*</h3>
      <Form.Control
        className="form"
        type="number"
        placeholder="Límite superior de la tabla"
        value={limite}
        onChange={(e) => setLimite(e.target.value)}
      />
      <br />
      <button onClick={generarTabla}>Generar tabla</button>

      <Table bordered>
        <thead>
          <tr>
            <th>Multiplicación</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map((tab, oper) => {
            const { multiplicacion, color } = tab;
            const colorFondo = camposColor(color);

            return (
              <tr key={oper}>
                <td>{multiplicacion}</td>
                <td 
                    style={{
                      backgroundColor: colorFondo, 
                      color: colorFondo === 'yellow' ? 'white' : 'black', 
                    }}
                >
                  {color}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
    </div>
  );
};

export default App;
 
