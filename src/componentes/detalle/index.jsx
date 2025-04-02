import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"; 

function Detalle() {

  const { url } = useParams(); 
  let id = url.split("/")[6];
  const [datapoke, setDatapoke] = useState([]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then(responseData => setDatapoke(responseData))
      .catch(error => console.error("Error:", error));
  }, []); 

  if (!datapoke) return <p>Cargando...</p>;
  return (
    <div>
      <h1>{datapoke.nombre}</h1>
      <img 
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} 
        alt={datapoke.nombre} 
        width="200"
      />
    </div>
  );
}

export default Detalle;
