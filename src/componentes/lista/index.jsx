import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './style.css'
import Detalle from "../detalle/";

function Lista() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=1025")
      .then(response => response.json())
      .then(responseData => setData(responseData.results))
      .catch(error => console.error("Error:", error));
  }, []); 

  return (
    <section className='c-lista'>
      {data.map((pokemon, index) => (
        <div className='c-lista-pokemon'
        onClick={() => navigate(`/${pokemon.url.split("/")[6]}`)}
        key={index}>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split("/")[6]}.png`} 
                alt={`Pokémon ${pokemon.name}`} width='auto' height='60' loading='lazy'
              />
          <p>{pokemon.name}</p>
        </div>
      ))}
    </section>
  );
}
  
export default Lista