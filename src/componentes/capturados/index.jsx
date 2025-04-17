import { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../contexto/contexto';
import "./style.css"

function Capturados() {
    const { listaCapturados, totalPokes } = useContext(AppContext);
    const espacio = Array.from({ length: totalPokes }, (_, i) => i + 1);
    const navigate = useNavigate();
    return (
      <>
      {listaCapturados.length} / {totalPokes}
      <section className="c-aleatorio c-lista">
      {espacio.map((id) => (
        <div
          key={id}
          className={listaCapturados.includes(id.toString()) ? "c-unpoke c-mios-pokemon" : "c-unpoke"}
          onClick={() => listaCapturados.includes(id.toString()) ? navigate(`/detalle/${id}`) : null}
        >
          {listaCapturados.includes(id.toString()) ? (
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              width="auto"
              height="45"
              loading="lazy"
              alt={id}
            />
          ) : null}
          
          <p>{id}</p>
        </div>
      ))}
      </section>
      </>
    )
  }
  
  export default Capturados