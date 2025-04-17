import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../contexto/contexto';
import { useNavigate } from "react-router-dom";
import './style.css'
import Filtro from '../filtro'

function Lista() {
  
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');

  const { data, setData, tipoSeleccionado, setTipoSeleccionado } = useContext(AppContext);
  const handleTipoChange = (tipo) => {
    setTipoSeleccionado(tipo);
  };


  let resultados = data;

  if (busqueda.length >= 3 && isNaN(busqueda)) {
    resultados = data.filter(pokemon =>
      pokemon.name.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  if (!isNaN(busqueda)) {
    resultados = data.filter(pokemon =>
      pokemon.url.includes('/' + busqueda)
    );
  }
    

  return (
    <>
    <input
        type="text"
        placeholder="Buscar Pokémon"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />
    <Filtro onTipoChange={handleTipoChange} />
    <section className='c-lista'>

      {resultados.map((pokemon, index) => (
        <div className='c-lista-pokemon'
        onClick={() => navigate(`/detalle/${pokemon.name}`)}
        key={index}>
          <p>{pokemon.url.split("/")[6]}</p>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split("/")[6]}.png`} 
                alt={`Pokémon ${pokemon.name}`} width='auto' height='60' loading='lazy'
              />
          <p>{pokemon.name}</p>
        </div>
      ))}
    </section>
    </>
  );
}
  
export default Lista